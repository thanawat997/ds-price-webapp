function formatBangkokTimestamp(date) {
  const parts = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).formatToParts(date);

  const dict = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  return `${dict.year}-${dict.month}-${dict.day} ${dict.hour}:${dict.minute}:${dict.second}`;
}

function formatBangkokTimestampForSheet(date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).formatToParts(date);

  const dict = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  return `${dict.day}/${dict.month}/${dict.year}, ${dict.hour}:${dict.minute}:${dict.second}`;
}

function formatServiceDateDDMMYYYY(dateText) {
  const text = String(dateText || "").trim();
  const m = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return text;
  const dd = String(m[1]).padStart(2, "0");
  const mm = String(m[2]).padStart(2, "0");
  const yyyy = String(m[3]);
  return `${dd}/${mm}/${yyyy}`;
}

function formatPrice(price) {
  return new Intl.NumberFormat("th-TH").format(price);
}

module.exports = { formatBangkokTimestamp, formatBangkokTimestampForSheet, formatServiceDateDDMMYYYY, formatPrice };
