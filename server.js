const path = require("path");

require("dotenv").config();

const express = require("express");

const {
  getAvailableDates,
  getPlatesByDate,
  getCaseByDateAndPlate,
  listBiddingCars,
  updateBiddingFieldByPrimaryKey,
  upsertFinalWindow,
  listActiveFinalCars,
  getFinalWindow,
  listDueFinalWindows,
  markFinalWindowNotified,
  deleteFinalWindow,
  appendFinalPriceRow,
  getFinalPriceEntriesByDateAndPlate,
  getPriceDashboardByDate,
  appendPriceRow,
  getBranchDaySummary,
  listTents,
  createTent,
  updateTent,
  deleteTent
} = require("./src/sheets");
const { pushLineGroupMessage } = require("./src/line");
const { formatBangkokTimestampForSheet } = require("./src/format");
const { buildBranchDayLineMessage, buildFinalSummaryLineMessage } = require("./src/lineMessage");

const app = express();
const FINAL_PRICE_LINE_GROUP_ID = "C4677699cad88645bd20d769314377b9e";
const FINAL_SUMMARY_LINE_GROUP_ID = "Cb462e86dd87ea77f974c6d04ae7893b4";
const TEST_LINE_GROUP_ID = "C6d43778944005a9289c754ebaedb0443";
const GOOGLE_SERVICE_ACCOUNT_EMAIL = "drive-upload-service@my-api-469606.iam.gserviceaccount.com";

function toClientErrorMessage(error) {
  const message = String(error?.message || error);
  if (message.includes("The caller does not have permission")) {
    return `Google Sheet ยังไม่ได้แชร์สิทธิ์ให้ service account: ${GOOGLE_SERVICE_ACCOUNT_EMAIL}`;
  }
  return message;
}

app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/company-logo.png", (_req, res) => {
  res.sendFile(path.join(__dirname, "JUST CAR_PNG (3).png"));
});

app.get("/api/bidding-cars", async (req, res) => {
  try {
    const limit = Number(req.query.limit || 50);
    const cars = await listBiddingCars({ limit });
    res.json({ cars });
  } catch (error) {
    res.status(500).json({ error: toClientErrorMessage(error) });
  }
});

app.patch("/api/bidding-cells", async (req, res) => {
  try {
    const primaryKey = String(req.body?.primaryKey || "").trim();
    const field = String(req.body?.field || "").trim();
    const value = req.body?.value;
    const result = await updateBiddingFieldByPrimaryKey({ primaryKey, field, value });
    res.json({ ok: true, result });
  } catch (error) {
    const message = toClientErrorMessage(error);
    const status = message.includes("not found") ? 404 : message.includes("invalid") || message.includes("missing") ? 400 : 500;
    res.status(status).json({ error: message });
  }
});

function buildBangkokIso({ date, time }) {
  const dateText = String(date || "").trim();
  const timeText = String(time || "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateText)) throw new Error("invalid final date");
  if (!/^\d{2}:\d{2}$/.test(timeText)) throw new Error("invalid final time");
  return `${dateText}T${timeText}:00+07:00`;
}

function formatFinalPriceMessage({ date, plate, price, status, tentName, note }) {
  return [
    "FINAL PRICE",
    `วันที่ : ${date}`,
    "บริการ : JUSTCAR",
    `ทะเบียน : ${plate}`,
    `ราคาสุดท้าย : ${Number(price).toLocaleString("th-TH")}`,
    `สถานะ : ${status}`,
    "ชื่อ DS ผู้ใส่ราคา : นิด",
    `ชื่อเต็นท์ : ${tentName}`,
    `หมายเหตุ : ${note}`
  ].join("\n");
}

app.post("/api/final-windows", async (req, res) => {
  try {
    const car = req.body?.car || {};
    const finalDate = String(req.body?.finalDate || "").trim();
    const startTime = String(req.body?.startTime || "").trim();
    const endTime = String(req.body?.endTime || "").trim();
    const testMode = Boolean(req.body?.testMode);
    if (!finalDate) return res.status(400).json({ error: "missing finalDate" });
    if (!startTime) return res.status(400).json({ error: "missing startTime" });
    if (!endTime) return res.status(400).json({ error: "missing endTime" });

    const startIso = buildBangkokIso({ date: finalDate, time: startTime });
    const endIso = buildBangkokIso({ date: finalDate, time: endTime });
    if (Date.parse(endIso) <= Date.parse(startIso)) {
      return res.status(400).json({ error: "endTime must be after startTime" });
    }

    const timestamp = formatBangkokTimestampForSheet(new Date());
    const finalWindow = await upsertFinalWindow({
      car,
      finalDate,
      startTime,
      endTime,
      startIso,
      endIso,
      timestamp,
      testMode
    });
    res.json({ ok: true, finalWindow });
  } catch (error) {
    res.status(500).json({ error: toClientErrorMessage(error) });
  }
});

app.get("/api/final-cars", async (_req, res) => {
  try {
    const cars = await listActiveFinalCars();
    res.json({ cars });
  } catch (error) {
    res.status(500).json({ error: toClientErrorMessage(error) });
  }
});

app.delete("/api/final-windows", async (req, res) => {
  try {
    const date = String(req.query.date || "").trim();
    const plate = String(req.query.plate || "").trim();
    if (!date) return res.status(400).json({ error: "missing date" });
    if (!plate) return res.status(400).json({ error: "missing plate" });
    await deleteFinalWindow({ date, plate });
    res.json({ ok: true });
  } catch (error) {
    const message = toClientErrorMessage(error);
    const status = message.includes("not found") ? 404 : 500;
    res.status(status).json({ error: message });
  }
});

app.get("/api/dates", async (_req, res) => {
  try {
    const dates = await getAvailableDates();
    res.json({ dates });
  } catch (error) {
    res.status(500).json({ error: toClientErrorMessage(error) });
  }
});

app.get("/api/price-dashboard", async (req, res) => {
  try {
    const date = String(req.query.date || "").trim();
    if (!date) return res.status(400).json({ error: "missing date" });
    const dashboard = await getPriceDashboardByDate({ date });
    res.json({ dashboard });
  } catch (error) {
    res.status(500).json({ error: toClientErrorMessage(error) });
  }
});

app.get("/api/plates", async (req, res) => {
  try {
    const date = String(req.query.date || "").trim();
    if (!date) return res.status(400).json({ error: "missing date" });
    const plates = await getPlatesByDate(date);
    res.json({ plates });
  } catch (error) {
    res.status(500).json({ error: toClientErrorMessage(error) });
  }
});

app.get("/api/case", async (req, res) => {
  try {
    const date = String(req.query.date || "").trim();
    const plate = String(req.query.plate || "").trim();
    if (!date) return res.status(400).json({ error: "missing date" });
    if (!plate) return res.status(400).json({ error: "missing plate" });

    const caseData = await getCaseByDateAndPlate({ date, plate });
    if (!caseData) return res.status(404).json({ error: "not found" });
    res.json({ case: caseData });
  } catch (error) {
    res.status(500).json({ error: String(error?.message || error) });
  }
});

app.get("/api/tents", async (_req, res) => {
  try {
    const tents = await listTents();
    res.json({ tents });
  } catch (error) {
    res.status(500).json({ error: String(error?.message || error) });
  }
});

app.post("/api/tents", async (req, res) => {
  try {
    const name = String(req.body?.name || "").trim();
    if (!name) return res.status(400).json({ error: "missing name" });
    const tent = await createTent({ name });
    res.json({ ok: true, tent });
  } catch (error) {
    const message = String(error?.message || error);
    const status = message.includes("duplicate") ? 409 : 500;
    res.status(status).json({ error: message });
  }
});

app.put("/api/tents/:code", async (req, res) => {
  try {
    const code = String(req.params?.code || "").trim();
    const name = String(req.body?.name || "").trim();
    if (!code) return res.status(400).json({ error: "missing code" });
    if (!name) return res.status(400).json({ error: "missing name" });
    const tent = await updateTent({ code, name });
    res.json({ ok: true, tent });
  } catch (error) {
    const message = String(error?.message || error);
    const status = message.includes("not found") ? 404 : message.includes("duplicate") ? 409 : 500;
    res.status(status).json({ error: message });
  }
});

app.delete("/api/tents/:code", async (req, res) => {
  try {
    const code = String(req.params?.code || "").trim();
    if (!code) return res.status(400).json({ error: "missing code" });
    await deleteTent({ code });
    res.json({ ok: true });
  } catch (error) {
    const message = String(error?.message || error);
    const status = message.includes("not found") ? 404 : 500;
    res.status(status).json({ error: message });
  }
});

app.post("/api/submit", async (req, res) => {
  try {
    const date = String(req.body?.date || "").trim();
    const plate = String(req.body?.plate || "").trim();
    const priceInput = String(req.body?.price || "").trim();
    const tentName = String(req.body?.tentName || "").trim();
    const status = String(req.body?.status || "").trim();
    const testMode = Boolean(req.body?.testMode);

    if (!date) return res.status(400).json({ error: "missing date" });
    if (!plate) return res.status(400).json({ error: "missing plate" });
    if (!priceInput) return res.status(400).json({ error: "missing price" });
    if (!tentName) return res.status(400).json({ error: "missing tentName" });
    if (!status) return res.status(400).json({ error: "missing status" });

    const normalizedPrice = Number(priceInput.replace(/,/g, ""));
    if (!Number.isFinite(normalizedPrice) || normalizedPrice < 0) {
      return res.status(400).json({ error: "invalid price" });
    }

    const caseData = await getCaseByDateAndPlate({ date, plate });
    if (!caseData) return res.status(404).json({ error: "case not found" });

    const dealerSales = String(process.env.DEFAULT_DEALER_SALES || "").trim();
    const timestamp = formatBangkokTimestampForSheet(new Date());

    const appendResult = await appendPriceRow({
      date,
      plate,
      price: normalizedPrice,
      dealerSales,
      tentName,
      status,
      timestamp
    });

    const summary = await getBranchDaySummary({ date, branch: caseData.branch });
    const messageText = buildBranchDayLineMessage(summary);

    let lineOk = false;
    let lineError = null;
    try {
      const toOverride = testMode
        ? String(process.env.TEST_LINE_GROUP_ID || "C6d43778944005a9289c754ebaedb0443")
        : undefined;
      await pushLineGroupMessage(messageText, toOverride);
      lineOk = true;
    } catch (error) {
      lineOk = false;
      lineError = String(error?.message || error);
    }

    res.json({
      ok: true,
      sheetAppend: appendResult,
      line: { ok: lineOk, error: lineError }
    });
  } catch (error) {
    res.status(500).json({ error: String(error?.message || error) });
  }
});

app.post("/api/submit-final", async (req, res) => {
  try {
    const date = String(req.body?.date || "").trim();
    const plate = String(req.body?.plate || "").trim();
    const priceInput = String(req.body?.price || "").trim();
    const tentName = String(req.body?.tentName || "").trim();
    const status = String(req.body?.status || "").trim();
    const note = String(req.body?.note || "").trim();
    const testMode = Boolean(req.body?.testMode);

    if (!date) return res.status(400).json({ error: "missing date" });
    if (!plate) return res.status(400).json({ error: "missing plate" });
    if (!priceInput) return res.status(400).json({ error: "missing price" });
    if (!tentName) return res.status(400).json({ error: "missing tentName" });
    if (!status) return res.status(400).json({ error: "missing status" });

    const normalizedPrice = Number(priceInput.replace(/,/g, ""));
    if (!Number.isFinite(normalizedPrice) || normalizedPrice < 0) {
      return res.status(400).json({ error: "invalid price" });
    }

    const finalWindow = await getFinalWindow({ date, plate });
    if (!finalWindow) return res.status(404).json({ error: "final window not found" });
    const now = Date.now();
    const startMs = Date.parse(finalWindow.startIso);
    const endMs = Date.parse(finalWindow.endIso);
    if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || now < startMs || now > endMs) {
      return res.status(400).json({ error: "final window is not active" });
    }

    const dealerSales = String(process.env.DEFAULT_DEALER_SALES || "นิด").trim();
    const timestamp = formatBangkokTimestampForSheet(new Date());
    const appendResult = await appendFinalPriceRow({
      date,
      plate,
      price: normalizedPrice,
      dealerSales,
      tentName,
      status,
      note,
      timestamp
    });

    let lineOk = false;
    let lineError = null;
    try {
      const toOverride = testMode
        ? String(process.env.TEST_LINE_GROUP_ID || TEST_LINE_GROUP_ID)
        : FINAL_PRICE_LINE_GROUP_ID;
      await pushLineGroupMessage(
        formatFinalPriceMessage({ date, plate, price: normalizedPrice, status, tentName, note }),
        toOverride
      );
      lineOk = true;
    } catch (error) {
      lineOk = false;
      lineError = String(error?.message || error);
    }

    res.json({
      ok: true,
      sheetAppend: appendResult,
      line: { ok: lineOk, error: lineError }
    });
  } catch (error) {
    res.status(500).json({ error: String(error?.message || error) });
  }
});

let finalWatcherRunning = false;

async function processDueFinalWindows() {
  if (finalWatcherRunning) return;
  finalWatcherRunning = true;
  try {
    const dueWindows = await listDueFinalWindows();
    for (const finalWindow of dueWindows) {
      const timestamp = formatBangkokTimestampForSheet(new Date());
      try {
        const bids = await getFinalPriceEntriesByDateAndPlate({
          date: finalWindow.serviceDate,
          plate: finalWindow.plate
        });
        const messageText = buildFinalSummaryLineMessage({ finalWindow, bids });
        const toOverride = finalWindow.testMode
          ? String(process.env.TEST_LINE_GROUP_ID || TEST_LINE_GROUP_ID)
          : FINAL_SUMMARY_LINE_GROUP_ID;
        await pushLineGroupMessage(messageText, toOverride);
        await markFinalWindowNotified({
          date: finalWindow.serviceDate,
          plate: finalWindow.plate,
          timestamp
        });
      } catch (error) {
        console.error(`Final summary failed for ${finalWindow.serviceDate} ${finalWindow.plate}:`, error);
      }
    }
  } finally {
    finalWatcherRunning = false;
  }
}

function startFinalWatcher() {
  setInterval(() => {
    processDueFinalWindows().catch((error) => {
      console.error("Final watcher failed:", error);
    });
  }, 30000);
  processDueFinalWindows().catch((error) => {
    console.error("Final watcher failed:", error);
  });
}

const port = Number(process.env.PORT || 3000);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
    startFinalWatcher();
  });
}

module.exports = app;
