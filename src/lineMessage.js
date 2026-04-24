const { formatPrice } = require("./format");

function formatServiceDateForHeader(date) {
  const text = String(date || "").trim();
  const match = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) return text;
  const dd = String(match[1]).padStart(2, "0");
  const mm = String(match[2]).padStart(2, "0");
  const yyyy = String(match[3]);
  return `${dd}/${mm}/${yyyy}`;
}

function getBranchAbbrev(branch) {
  const text = String(branch || "").trim();
  if (!text) return "";
  if (text.startsWith("004") || text.includes("สะพานควาย")) return "SK.";
  if (text.startsWith("002") || text.includes("บางนา")) return "B.";
  const cleaned = text.replace(/\s+/g, " ").trim();
  const firstToken = cleaned.split(" ")[0] || "";
  if (/^[A-Za-z]{1,3}\.?$/.test(firstToken)) return firstToken.endsWith(".") ? firstToken : `${firstToken}.`;
  return "BR.";
}

function extractTime(timestamp) {
  const text = String(timestamp || "").trim();
  const match = text.match(/\b(\d{1,2}):(\d{2})(?::\d{2})?\b/);
  if (!match) return text;
  return `${String(match[1]).padStart(2, "0")}:${match[2]}`;
}

function extractDateYmd(timestamp) {
  const text = String(timestamp || "").trim();
  const match = text.match(/^\s*(\d{4})-(\d{2})-(\d{2})\b/);
  if (match) return { y: match[1], m: match[2], d: match[3] };

  const dmyMatch = text.match(/^\s*(\d{1,2})\/(\d{1,2})\/(\d{4})\b/);
  if (!dmyMatch) return null;
  return { y: dmyMatch[3], m: String(dmyMatch[2]).padStart(2, "0"), d: String(dmyMatch[1]).padStart(2, "0") };
}

function parseServiceDmy(date) {
  const text = String(date || "").trim();
  const m = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return null;
  return { d: m[1].padStart(2, "0"), m: m[2].padStart(2, "0"), y: m[3] };
}

function shortenTentName(name) {
  const s = String(name || "").trim();
  const idx = s.indexOf("/");
  if (idx < 0) return s;
  const left = s.slice(0, idx).trim();
  const right = s.slice(idx + 1).trim();
  const rightShort = right.slice(0, 8).trimEnd();
  return `${left}/${rightShort}`;
}

function normalizeTentName(name) {
  const s = String(name || "").replace(/\s+/g, " ").trim();
  const match = s.match(/^JCD\d+\s*(.+)$/i);
  return match ? match[1].trim() : s;
}

function stableHashInt(text) {
  const s = String(text || "");
  let hash = 5381;
  for (let i = 0; i < s.length; i += 1) {
    hash = (hash * 33) ^ s.charCodeAt(i);
  }
  return Math.abs(hash >>> 0);
}

function pickFoodEmoji(key) {
  const emojis = [
    "🍉",
    "🍓",
    "🍒",
    "🍍",
    "🍌",
    "🍎",
    "🍇",
    "🍑",
    "🍊",
    "🥭",
    "🍔",
    "🍟",
    "🍕",
    "🌭",
    "🍜",
    "🍣",
    "🍛",
    "🍩",
    "🍪",
    "🍰",
    "🍭"
  ];
  const idx = stableHashInt(key) % emojis.length;
  return emojis[idx];
}

function isAfterHours({ serviceDate, timestamp }) {
  const service = parseServiceDmy(serviceDate);
  if (!service) return false;
  const ymd = extractDateYmd(timestamp);
  if (!ymd) return false;
  return !(ymd.d === service.d && ymd.m === service.m && ymd.y === service.y);
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

function compareTimestamp(a, b) {
  const sa = String(a || "").trim();
  const sb = String(b || "").trim();
  if (sa && sb) {
    const ka = parseTimestampKey(sa);
    const kb = parseTimestampKey(sb);
    if (ka != null && kb != null) return ka - kb;
    if (ka != null && kb == null) return -1;
    if (ka == null && kb != null) return 1;
    return sa.localeCompare(sb);
  }
  return sa ? 1 : sb ? -1 : 0;
}

function compareLatestCandidate(a, b) {
  const t = compareTimestamp(a.timestamp, b.timestamp);
  if (t !== 0) return t;
  const p = String(a.plate || "").localeCompare(String(b.plate || ""), "th-TH");
  if (p !== 0) return p;
  const n = String(a.tentName || "").localeCompare(String(b.tentName || ""), "th-TH");
  if (n !== 0) return n;
  const pa = Number(a.price) || 0;
  const pb = Number(b.price) || 0;
  if (pa !== pb) return pa - pb;
  return 0;
}

function collapseBidsByTent(bids) {
  const byTent = new Map();
  for (const bid of bids || []) {
    const tentName = normalizeTentName(bid.tentName);
    if (!tentName) continue;
    const entry = {
      tentName,
      price: Number(bid.price) || 0,
      status: String(bid.status || "").trim(),
      timestamp: String(bid.timestamp || "").trim()
    };
    const existing = byTent.get(tentName);
    if (!existing) {
      byTent.set(tentName, { latest: entry, count: 1 });
      continue;
    }
    existing.count += 1;
    if (compareTimestamp(existing.latest.timestamp, entry.timestamp) < 0) {
      existing.latest = entry;
    }
  }

  const collapsed = [];
  for (const v of byTent.values()) {
    collapsed.push({ ...v.latest, moved: v.count > 1 });
  }
  return collapsed;
}

function formatNumberWithCommas(value) {
  if (!value) return "";
  const num = Number(String(value).replace(/,/g, ""));
  if (Number.isNaN(num)) return value;
  return new Intl.NumberFormat("th-TH").format(num);
}

function buildBranchDayLineMessage({ branch, date, cars }) {
  const header = `${getBranchAbbrev(branch)}${formatServiceDateForHeader(date)}`;
  const lines = [header];

  const computedCars = (cars || []).map((car) => {
    const plate = String(car.plate || "").trim();
    const bids = collapseBidsByTent(car.bids).map((b) => ({ ...b, plate }));
    return {
      plate,
      model: String(car.model || "").trim(),
      note: String(car.note || "").trim(),
      bookStatus: String(car.bookStatus || "").trim(),
      financeAmount: String(car.financeAmount || "").trim(),
      financeName: String(car.financeName || "").trim(),
      expectedPrice: String(car.expectedPrice || "").trim(),
      mileage: String(car.mileage || "").trim(),
      bids
    };
  });

  let latestBid = null;
  for (const car of computedCars) {
    for (const bid of car.bids || []) {
      const candidate = {
        plate: car.plate,
        tentName: normalizeTentName(bid.tentName),
        price: Number(bid.price) || 0,
        timestamp: String(bid.timestamp || "").trim()
      };
      if (!candidate.timestamp) continue;
      if (!latestBid || compareLatestCandidate(latestBid, candidate) < 0) latestBid = candidate;
    }
  }

  let hasFlagged = false;
  for (let i = 0; i < computedCars.length; i += 1) {
    const car = computedCars[i];
    const model = car.model;
    const plate = car.plate;
    
    const extraInfo = [];
    if (car.mileage) {
      extraInfo.push(`เลขไมล์ : ${formatNumberWithCommas(car.mileage)}`);
    }
    if (String(car.bookStatus || "").includes("ติดไฟแนนซ์")) {
      if (car.financeName) {
        extraInfo.push(`ไฟแนนซ์ : ${car.financeName}`);
      }
      if (car.financeAmount) {
        extraInfo.push(`ยอดไฟแนนซ์ : ${formatNumberWithCommas(car.financeAmount)}`);
      }
    }
    if (car.expectedPrice) {
      extraInfo.push(`คาดหวัง : ${formatNumberWithCommas(car.expectedPrice)}`);
    }
    const extraStr = extraInfo.length > 0 ? ` ${extraInfo.join(" ")}` : "";

    lines.push(`${i + 1}. ${[model, plate].filter(Boolean).join(" ")}${extraStr}`.trim());
    const note = car.note;
    if (note) lines.push(note);
    const bids = Array.from(car.bids || []);
    bids.sort((a, b) => {
      const pa = Number(a.price) || 0;
      const pb = Number(b.price) || 0;
      if (pb !== pa) return pb - pa;
      return compareTimestamp(a.timestamp, b.timestamp);
    });
    if (bids.length > 0) {
      const emoji = pickFoodEmoji(`${branch}||${date}||${plate}`);
      lines.push(`${emoji}${emoji}`);
    }
    for (const bid of bids) {
      const candidate = {
        plate,
        tentName: normalizeTentName(bid.tentName),
        price: Number(bid.price) || 0,
        status: String(bid.status || "").trim(),
        timestamp: String(bid.timestamp || "").trim()
      };
      const shouldFlag =
        !hasFlagged &&
        latestBid &&
        candidate.timestamp &&
        latestBid.timestamp === candidate.timestamp &&
        latestBid.plate === candidate.plate &&
        latestBid.tentName === candidate.tentName &&
        latestBid.price === candidate.price;
      if (shouldFlag) hasFlagged = true;
      const tentName = `${shouldFlag ? "🚩" : ""}${shortenTentName(bid.tentName)}`;
      const time = extractTime(bid.timestamp);
      const statusText = String(bid.status || "").trim();
      const movedSuffix = bid.moved ? " *ขยับราคา" : "";
      const afterHoursSuffix = isAfterHours({ serviceDate: date, timestamp: bid.timestamp }) ? " *นอกเวลา" : "";
      lines.push(
        `${tentName} ${formatPrice(bid.price)} ${[time, statusText].filter(Boolean).join(" ")}${movedSuffix}${afterHoursSuffix}`.trim()
      );
    }
    if (bids.length > 0) {
      const emoji = pickFoodEmoji(`${branch}||${date}||${plate}`);
      lines.push(`${emoji}${emoji}`);
    }
    if (i < computedCars.length - 1) lines.push("");
  }

  return lines.join("\n");
}

module.exports = { buildBranchDayLineMessage };
