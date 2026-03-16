const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const SHEET1_ID = process.env.SHEET1_ID;
const SHEET2_ID = process.env.SHEET2_ID;

const SHEET1_NAME = process.env.SHEET1_NAME || "ราคารถเข้าสาขา";
const SHEET2_NAME = process.env.SHEET2_NAME || "primary key";

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
  const range = `'${SHEET2_NAME}'!A:M`;
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
    const date = String(row[0] || "").trim();
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
  const rows = await readSheet2Values();
  const seen = new Set();
  for (const row of rows) {
    const rowDate = String(row[0] || "").trim();
    if (rowDate !== date) continue;
    const plate = String(row[1] || "").trim();
    if (plate) seen.add(plate);
  }
  const plates = Array.from(seen);
  plates.sort((a, b) => a.localeCompare(b, "th-TH"));
  return plates;
}

function rowToCase(row) {
  return {
    serviceDate: String(row[0] || "").trim(),
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
    mileage: String(row[12] || "").trim()
  };
}

async function getCaseByDateAndPlate({ date, plate }) {
  const rows = await readSheet2Values();
  const matches = [];
  for (const row of rows) {
    const rowDate = String(row[0] || "").trim();
    const rowPlate = String(row[1] || "").trim();
    if (rowDate === date && rowPlate === plate) matches.push(row);
  }
  if (matches.length === 0) return null;
  return rowToCase(matches[0]);
}

async function appendPriceRow({ date, plate, price, dealerSales, tentName, status, timestamp }) {
  getRequiredEnv("SHEET1_ID");
  const sheets = await getSheetsClient();
  const range = `'${SHEET1_NAME}'!A:G`;
  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET1_ID,
    range,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[date, plate, price, dealerSales, tentName, status, timestamp]]
    }
  });
  return {
    updatedRange: response.data?.updates?.updatedRange || null,
    updatedRows: response.data?.updates?.updatedRows || null
  };
}

async function getCasesByDateAndBranch({ date, branch }) {
  const rows = await readSheet2Values();
  const cases = [];
  for (const row of rows) {
    const rowDate = String(row[0] || "").trim();
    if (rowDate !== date) continue;
    const caseData = rowToCase(row);
    if (String(caseData.branch || "").trim() !== String(branch || "").trim()) continue;
    if (!caseData.plate) continue;
    cases.push(caseData);
  }
  return cases;
}

async function getPriceEntriesByDate({ date }) {
  const rows = await readSheet1Values();
  const entries = [];
  for (const row of rows) {
    const rowDate = String(row[0] || "").trim();
    if (rowDate !== date) continue;
    const plate = String(row[1] || "").trim();
    const priceRaw = row[2];
    const price =
      typeof priceRaw === "number" ? priceRaw : Number(String(priceRaw || "").trim().replace(/,/g, ""));
    const tentName = String(row[4] || "").trim();
    const timestamp = String(row[6] || "").trim();
    if (!plate) continue;
    if (!Number.isFinite(price)) continue;
    entries.push({ plate, price, tentName, timestamp });
  }
  entries.sort((a, b) => String(a.timestamp).localeCompare(String(b.timestamp)));
  return entries;
}

async function getBranchDaySummary({ date, branch }) {
  const cases = await getCasesByDateAndBranch({ date, branch });
  const entries = await getPriceEntriesByDate({ date });

  const byKey = new Map();
  const keyOf = (plate) => `${date}||${plate}`;

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
    ordered.push({ plate: c.plate, model: c.model, note: c.customerStatus, bids: group.bids });
    byKey.delete(key);
  }

  for (const group of byKey.values()) {
    if (!group.bids.length) continue;
    ordered.push({ plate: group.plate, model: "", note: "", bids: group.bids });
  }

  return { date, branch, cars: ordered };
}

module.exports = {
  getAvailableDates,
  getPlatesByDate,
  getCaseByDateAndPlate,
  appendPriceRow,
  getBranchDaySummary
};
