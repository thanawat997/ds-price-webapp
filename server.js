const path = require("path");

require("dotenv").config();

const express = require("express");

const {
  getAvailableDates,
  getPlatesByDate,
  getCaseByDateAndPlate,
  appendPriceRow,
  getBranchDaySummary,
  listTents,
  createTent,
  updateTent,
  deleteTent
} = require("./src/sheets");
const { pushLineGroupMessage } = require("./src/line");
const { formatBangkokTimestampForSheet } = require("./src/format");
const { buildBranchDayLineMessage } = require("./src/lineMessage");

const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/dates", async (_req, res) => {
  try {
    const dates = await getAvailableDates();
    res.json({ dates });
  } catch (error) {
    res.status(500).json({ error: String(error?.message || error) });
  }
});

app.get("/api/plates", async (req, res) => {
  try {
    const date = String(req.query.date || "").trim();
    if (!date) return res.status(400).json({ error: "missing date" });
    const plates = await getPlatesByDate(date);
    res.json({ plates });
  } catch (error) {
    res.status(500).json({ error: String(error?.message || error) });
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
      await pushLineGroupMessage(messageText);
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

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
