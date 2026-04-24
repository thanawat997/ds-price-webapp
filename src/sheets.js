const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const { formatServiceDateDDMMYYYY } = require("./format");
const { getCodeTentNameForSheet, getTentCode } = require("./tentCodes");

const SHEET1_ID = process.env.SHEET1_ID;
const SHEET2_ID = process.env.SHEET2_ID;

const SHEET1_NAME = process.env.SHEET1_NAME || "ราคารถเข้าสาขา";
const SHEET2_NAME = process.env.SHEET2_NAME || "primary key";
const TENTS_SHEET_NAME = process.env.TENTS_SHEET_NAME || "tents";

const BASE_TENT_CODE_NUMBER = 67100033;

function normalizeTentName(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\s*\/\s*/g, "/");
}

function parseTentCodeNumber(code) {
  const text = String(code || "").trim();
  const match = text.match(/^JCD(\d{8})$/);
  if (!match) return null;
  const number = Number(match[1]);
  return Number.isFinite(number) ? number : null;
}

function parseSeedTentNamesFromPublicApp() {
  const appPath = path.join(__dirname, "..", "public", "app.js");
  const content = fs.readFileSync(appPath, "utf8");
  const match = content.match(/const\s+(?:tents|fallbackTents)\s*=\s*\[([\s\S]*?)\];/);
  if (!match) return [];
  const body = match[1];
  const names = [];
  const regex = /"([^"]+)"/g;
  let m;
  while ((m = regex.exec(body))) {
    const raw = String(m[1] || "").trim();
    if (raw) names.push(raw);
  }
  return names;
}

async function getSpreadsheetMeta({ spreadsheetId }) {
  const sheets = await getSheetsClient();
  const response = await sheets.spreadsheets.get({ spreadsheetId });
  return response.data;
}

async function ensureSheetExists({ spreadsheetId, title }) {
  const meta = await getSpreadsheetMeta({ spreadsheetId });
  const existing = (meta.sheets || []).find((s) => String(s?.properties?.title || "") === title);
  if (existing?.properties?.sheetId != null) return existing.properties.sheetId;

  const sheets = await getSheetsClient();
  const response = await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [{ addSheet: { properties: { title } } }]
    }
  });
  const sheetId = response.data?.replies?.[0]?.addSheet?.properties?.sheetId;
  if (sheetId == null) throw new Error(`Failed to create sheet: ${title}`);
  return sheetId;
}

async function ensureTentsSheetInitialized() {
  getRequiredEnv("SHEET1_ID");
  const sheetId = await ensureSheetExists({ spreadsheetId: SHEET1_ID, title: TENTS_SHEET_NAME });
  const sheets = await getSheetsClient();
  const range = `'${TENTS_SHEET_NAME}'!A:B`;
  const current = await sheets.spreadsheets.values.get({ spreadsheetId: SHEET1_ID, range });
  const values = current.data?.values || [];
  const hasDataRows = values.length >= 2 || (values.length === 1 && values[0].some((v) => String(v || "").trim()));
  if (hasDataRows) return { sheetId };

  const seedNames = parseSeedTentNamesFromPublicApp();
  const deduped = new Map();
  for (const name of seedNames) {
    const normalized = normalizeTentName(name);
    if (!normalized) continue;
    if (!deduped.has(normalized)) deduped.set(normalized, name);
  }

  let maxNumber = BASE_TENT_CODE_NUMBER;
  const seedEntries = [];
  for (const name of deduped.values()) {
    const code = String(getTentCode(name) || "").trim();
    const n = parseTentCodeNumber(code);
    if (n != null && n > maxNumber) maxNumber = n;
    seedEntries.push({ code, name });
  }

  for (const entry of seedEntries) {
    if (entry.code) continue;
    maxNumber += 1;
    entry.code = `JCD${String(maxNumber).padStart(8, "0")}`;
  }

  const seedRows = seedEntries.map((e) => [e.code, e.name]);
  seedRows.sort((a, b) => String(a[1]).localeCompare(String(b[1])));

  const newValues = [["code", "name"], ...seedRows];
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET1_ID,
    range: `'${TENTS_SHEET_NAME}'!A1`,
    valueInputOption: "RAW",
    requestBody: { values: newValues }
  });

  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET1_ID,
    range: `'${TENTS_SHEET_NAME}'!C1:D1`,
    valueInputOption: "RAW",
    requestBody: { values: [["last_issued_code_number", String(maxNumber)]] }
  });

  return { sheetId };
}

async function readTentsRawRows() {
  await ensureTentsSheetInitialized();
  const sheets = await getSheetsClient();
  const range = `'${TENTS_SHEET_NAME}'!A:B`;
  const response = await sheets.spreadsheets.values.get({ spreadsheetId: SHEET1_ID, range });
  const values = response.data?.values || [];
  const rows = [];
  for (let index = 0; index < values.length; index += 1) {
    const row = values[index] || [];
    const code = String(row[0] || "").trim();
    const name = String(row[1] || "").trim();
    rows.push({ rowNumber: index + 1, code, name });
  }
  return rows;
}

async function listTents() {
  const rows = await readTentsRawRows();
  const result = [];
  for (const row of rows) {
    if (row.rowNumber === 1 && normalizeTentName(row.code) === "code") continue;
    if (!row.name) continue;
    result.push({ code: row.code, name: row.name });
  }
  result.sort((a, b) => normalizeTentName(a.name).localeCompare(normalizeTentName(b.name)));
  return result;
}

async function findTentByName(name) {
  const normalized = normalizeTentName(name);
  if (!normalized) return null;
  const rows = await readTentsRawRows();
  for (const row of rows) {
    if (row.rowNumber === 1 && normalizeTentName(row.code) === "code") continue;
    if (!row.name) continue;
    if (normalizeTentName(row.name) === normalized) {
      return { code: row.code, name: row.name, rowNumber: row.rowNumber };
    }
  }
  return null;
}

async function findTentByCode(code) {
  const normalizedCode = String(code || "").trim();
  if (!normalizedCode) return null;
  const rows = await readTentsRawRows();
  for (const row of rows) {
    if (row.rowNumber === 1 && normalizeTentName(row.code) === "code") continue;
    if (!row.code) continue;
    if (row.code === normalizedCode) return row;
  }
  return null;
}

async function readLastIssuedTentCodeNumber() {
  await ensureTentsSheetInitialized();
  const sheets = await getSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET1_ID,
    range: `'${TENTS_SHEET_NAME}'!D1`
  });
  const value = response.data?.values?.[0]?.[0];
  const number = Number(String(value || "").trim());
  return Number.isFinite(number) ? number : null;
}

async function writeLastIssuedTentCodeNumber(number) {
  await ensureTentsSheetInitialized();
  const sheets = await getSheetsClient();
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET1_ID,
    range: `'${TENTS_SHEET_NAME}'!C1:D1`,
    valueInputOption: "RAW",
    requestBody: { values: [["last_issued_code_number", String(number)]] }
  });
}

async function createTent({ name }) {
  const normalizedName = normalizeTentName(name);
  if (!normalizedName) throw new Error("missing name");
  const existing = await findTentByName(normalizedName);
  if (existing) throw new Error("duplicate name");

  const tents = await listTents();
  let maxNumber = BASE_TENT_CODE_NUMBER;
  for (const tent of tents) {
    const n = parseTentCodeNumber(tent.code);
    if (n != null && n > maxNumber) maxNumber = n;
  }
  const lastIssued = await readLastIssuedTentCodeNumber();
  const base = Math.max(maxNumber, lastIssued != null ? lastIssued : BASE_TENT_CODE_NUMBER);
  const nextNumber = base + 1;
  const code = `JCD${String(nextNumber).padStart(8, "0")}`;

  const sheets = await getSheetsClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET1_ID,
    range: `'${TENTS_SHEET_NAME}'!A:B`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [[code, name]] }
  });

  await writeLastIssuedTentCodeNumber(nextNumber);
  return { code, name };
}

async function updateTent({ code, name }) {
  const normalizedName = normalizeTentName(name);
  if (!normalizedName) throw new Error("missing name");
  const row = await findTentByCode(code);
  if (!row) throw new Error("not found");

  const existing = await findTentByName(normalizedName);
  if (existing && existing.code !== row.code) throw new Error("duplicate name");

  const sheets = await getSheetsClient();
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET1_ID,
    range: `'${TENTS_SHEET_NAME}'!B${row.rowNumber}`,
    valueInputOption: "RAW",
    requestBody: { values: [[name]] }
  });

  return { code: row.code, name };
}

async function deleteTent({ code }) {
  const row = await findTentByCode(code);
  if (!row) throw new Error("not found");
  if (row.rowNumber === 1) throw new Error("cannot delete header");

  const { sheetId } = await ensureTentsSheetInitialized();
  const sheets = await getSheetsClient();
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SHEET1_ID,
    requestBody: {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId,
              dimension: "ROWS",
              startIndex: row.rowNumber - 1,
              endIndex: row.rowNumber
            }
          }
        }
      ]
    }
  });
  return { ok: true };
}

async function getCodeTentNameForSheetFromTents(name) {
  const tent = await findTentByName(name);
  const code = String(tent?.code || "").trim();
  const cleanName = String(tent?.name || name || "").trim();
  if (code) return `${code} ${cleanName}`.trim();
  return getCodeTentNameForSheet(cleanName);
}

function normalizeServiceDate(value) {
  return formatServiceDateDDMMYYYY(value);
}

function parseTimestampKey(value) {
  const text = String(value || "").trim();

  const ymdMatch = text.match(/^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2}):(\d{2})/);
  if (ymdMatch) {
    const year = Number(ymdMatch[1]);
    const month = Number(ymdMatch[2]);
    const day = Number(ymdMatch[3]);
    const hour = Number(ymdMatch[4]);
    const minute = Number(ymdMatch[5]);
    const second = Number(ymdMatch[6]);
    return (((((year * 100 + month) * 100 + day) * 100 + hour) * 100 + minute) * 100 + second);
  }

  const dmyMatch = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4}),\s*(\d{1,2}):(\d{2}):(\d{2})/);
  if (dmyMatch) {
    const day = Number(dmyMatch[1]);
    const month = Number(dmyMatch[2]);
    const year = Number(dmyMatch[3]);
    const hour = Number(dmyMatch[4]);
    const minute = Number(dmyMatch[5]);
    const second = Number(dmyMatch[6]);
    return (((((year * 100 + month) * 100 + day) * 100 + hour) * 100 + minute) * 100 + second);
  }

  return null;
}

function getRequiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env: ${name}`);
  return value;
}

function parseServiceAccountFromEnv() {
  const jsonString = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!jsonString) return null;
  if (jsonString.includes('"project_id":"..."') || jsonString.includes('"private_key_id":"..."') || jsonString.includes("\\n...\\n")) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON is still a placeholder. Paste the real Service Account JSON.");
  }
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed?.client_email || !parsed?.private_key) {
      throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON missing client_email/private_key");
    }
    if (typeof parsed.private_key === "string" && !parsed.private_key.includes("BEGIN PRIVATE KEY")) {
      throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON private_key is not a valid PEM key");
    }
    return parsed;
  } catch (error) {
    throw new Error(`Invalid GOOGLE_SERVICE_ACCOUNT_JSON: ${String(error?.message || error)}`);
  }
}

function parseServiceAccountFromFile() {
  const filePath =
    String(process.env.GOOGLE_SERVICE_ACCOUNT_FILE || "").trim() ||
    String(process.env.GOOGLE_APPLICATION_CREDENTIALS || "").trim();
  if (!filePath) return null;

  const resolved = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
  const content = fs.readFileSync(resolved, "utf8");
  const parsed = JSON.parse(content);
  if (!parsed?.client_email || !parsed?.private_key) {
    throw new Error("Service Account JSON file missing client_email/private_key");
  }
  return parsed;
}

async function getAuth() {
  const credentials = parseServiceAccountFromEnv() || parseServiceAccountFromFile();
  if (!credentials && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    throw new Error(
      "Google credentials not set. Provide GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_SERVICE_ACCOUNT_FILE (or GOOGLE_APPLICATION_CREDENTIALS)."
    );
  }
  const auth = new google.auth.GoogleAuth({
    credentials: credentials || undefined,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });
  return auth;
}

async function getSheetsClient() {
  const auth = await getAuth();
  return google.sheets({ version: "v4", auth });
}

function shouldSkipHeaderRow(values) {
  const firstRow = values?.[0] || [];
  const joined = firstRow.map((v) => String(v || "").trim()).join("|");
  return (
    joined.includes("วันที่รับบริการ") ||
    joined.includes("ทะเบียนรถ") ||
    joined.includes("รุ่น+รุ่นย่อย") ||
    joined.includes("วันที่เข้ารับบริการ") ||
    joined.includes("ทะเบียน")
  );
}

async function readSheet2Values() {
  getRequiredEnv("SHEET2_ID");
  const sheets = await getSheetsClient();
  const range = `'${SHEET2_NAME}'!A:N`;
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET2_ID,
    range
  });
  const values = response.data.values || [];
  if (values.length === 0) return [];
  return shouldSkipHeaderRow(values) ? values.slice(1) : values;
}

async function readSheet1Values() {
  getRequiredEnv("SHEET1_ID");
  const sheets = await getSheetsClient();
  const range = `'${SHEET1_NAME}'!A:G`;
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET1_ID,
    range
  });
  const values = response.data.values || [];
  if (values.length === 0) return [];
  return shouldSkipHeaderRow(values) ? values.slice(1) : values;
}

async function getAvailableDates() {
  const rows = await readSheet2Values();
  const seen = new Set();
  for (const row of rows) {
    const date = normalizeServiceDate(row[0]);
    if (date) seen.add(date);
  }
  const dates = Array.from(seen);
  const parseDmy = (value) => {
    const text = String(value || "").trim();
    const match = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (!match) return null;
    const day = Number(match[1]);
    const month = Number(match[2]);
    const year = Number(match[3]);
    if (!Number.isFinite(day) || !Number.isFinite(month) || !Number.isFinite(year)) return null;
    if (day < 1 || day > 31 || month < 1 || month > 12) return null;
    return new Date(Date.UTC(year, month - 1, day));
  };

  dates.sort((a, b) => {
    const da = parseDmy(a);
    const db = parseDmy(b);
    if (da && db) return db.getTime() - da.getTime();
    if (da && !db) return -1;
    if (!da && db) return 1;
    return String(b).localeCompare(String(a), "th-TH");
  });
  return dates;
}

async function getPlatesByDate(date) {
  const normalizedDate = normalizeServiceDate(date);
  const rows = await readSheet2Values();
  const seen = new Set();
  for (const row of rows) {
    const rowDate = normalizeServiceDate(row[0]);
    if (rowDate !== normalizedDate) continue;
    const plate = String(row[1] || "").trim();
    if (plate) seen.add(plate);
  }
  const plates = Array.from(seen);
  plates.sort((a, b) => a.localeCompare(b, "th-TH"));
  return plates;
}

function rowToCase(row) {
  return {
    serviceDate: normalizeServiceDate(row[0]),
    plate: String(row[1] || "").trim(),
    model: String(row[2] || "").trim(),
    auctionDate: String(row[3] || "").trim(),
    branch: String(row[4] || "").trim(),
    customerStatus: String(row[5] || "").trim(),
    bookStatus: String(row[6] || "").trim(),
    financeAmount: String(row[7] || "").trim(),
    insuranceInfo: String(row[8] || "").trim(),
    insurance: String(row[9] || "").trim(),
    taxExpireDate: String(row[10] || "").trim(),
    expectedPrice: String(row[11] || "").trim(),
    mileage: String(row[12] || "").trim(),
    financeName: String(row[13] || "").trim()
  };
}

async function getCaseByDateAndPlate({ date, plate }) {
  const normalizedDate = normalizeServiceDate(date);
  const rows = await readSheet2Values();
  const matches = [];
  for (const row of rows) {
    const rowDate = normalizeServiceDate(row[0]);
    const rowPlate = String(row[1] || "").trim();
    if (rowDate === normalizedDate && rowPlate === plate) matches.push(row);
  }
  if (matches.length === 0) return null;
  return rowToCase(matches[0]);
}

async function appendPriceRow({ date, plate, price, dealerSales, tentName, status, timestamp }) {
  getRequiredEnv("SHEET1_ID");
  const serviceDate = normalizeServiceDate(date);
  const codeTentName = await getCodeTentNameForSheetFromTents(tentName);
  const sheets = await getSheetsClient();
  const range = `'${SHEET1_NAME}'!A:G`;
  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET1_ID,
    range,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[serviceDate, plate, price, dealerSales, codeTentName, status, timestamp]]
    }
  });
  return {
    updatedRange: response.data?.updates?.updatedRange || null,
    updatedRows: response.data?.updates?.updatedRows || null
  };
}

async function getCasesByDateAndBranch({ date, branch }) {
  const normalizedDate = normalizeServiceDate(date);
  const rows = await readSheet2Values();
  const cases = [];
  for (const row of rows) {
    const rowDate = normalizeServiceDate(row[0]);
    if (rowDate !== normalizedDate) continue;
    const caseData = rowToCase(row);
    if (String(caseData.branch || "").trim() !== String(branch || "").trim()) continue;
    if (!caseData.plate) continue;
    cases.push(caseData);
  }
  return cases;
}

async function getPriceEntriesByDate({ date }) {
  const normalizedDate = normalizeServiceDate(date);
  const rows = await readSheet1Values();
  const entries = [];
  for (const row of rows) {
    const rowDate = normalizeServiceDate(row[0]);
    if (rowDate !== normalizedDate) continue;
    const plate = String(row[1] || "").trim();
    const priceRaw = row[2];
    const price =
      typeof priceRaw === "number" ? priceRaw : Number(String(priceRaw || "").trim().replace(/,/g, ""));
    const tentCell = String(row[4] || "").trim();
    const codeNameMatch = tentCell.match(/^JCD\d+\s*(.+)$/i);
    const tentName = codeNameMatch ? String(codeNameMatch[1] || "").trim() : tentCell;
    const status = String(row[5] || "").trim();
    const timestamp = String(row[6] || "").trim();
    if (!plate) continue;
    if (!Number.isFinite(price)) continue;
    entries.push({ plate, price, tentName, status, timestamp });
  }
  entries.sort((a, b) => {
    const ka = parseTimestampKey(a.timestamp);
    const kb = parseTimestampKey(b.timestamp);
    if (ka != null && kb != null) return ka - kb;
    if (ka != null && kb == null) return -1;
    if (ka == null && kb != null) return 1;
    return String(a.timestamp).localeCompare(String(b.timestamp));
  });
  return entries;
}

async function getBranchDaySummary({ date, branch }) {
  const normalizedDate = normalizeServiceDate(date);
  const cases = await getCasesByDateAndBranch({ date: normalizedDate, branch });
  const entries = await getPriceEntriesByDate({ date: normalizedDate });

  const byKey = new Map();
  const keyOf = (plate) => `${normalizedDate}||${plate}`;

  for (const entry of entries) {
    const key = keyOf(entry.plate);
    let group = byKey.get(key);
    if (!group) {
      group = { plate: entry.plate, bids: [] };
      byKey.set(key, group);
    }
    group.bids.push(entry);
  }

  const ordered = [];
  for (const c of cases) {
    const key = keyOf(c.plate);
    const group = byKey.get(key);
    if (!group || group.bids.length === 0) continue;
    ordered.push({
      plate: c.plate,
      model: c.model,
      note: c.customerStatus,
      bookStatus: c.bookStatus,
      financeAmount: c.financeAmount,
      financeName: c.financeName,
      expectedPrice: c.expectedPrice,
      mileage: c.mileage,
      bids: group.bids
    });
    byKey.delete(key);
  }

  return { date: normalizedDate, branch, cars: ordered };
}

module.exports = {
  getAvailableDates,
  getPlatesByDate,
  getCaseByDateAndPlate,
  appendPriceRow,
  getBranchDaySummary,
  listTents,
  createTent,
  updateTent,
  deleteTent
};
