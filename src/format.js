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

function formatPrice(price) {
  return new Intl.NumberFormat("th-TH").format(price);
}

module.exports = { formatBangkokTimestamp, formatPrice };

