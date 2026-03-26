async function pushLineGroupMessage(text, toOverride) {
  const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  const defaultGroupId = process.env.LINE_GROUP_ID;
  const testGroupId = process.env.TEST_LINE_GROUP_ID || "C6d43778944005a9289c754ebaedb0443";
  const groupId = toOverride || defaultGroupId;

  if (!channelAccessToken) throw new Error("Missing env: LINE_CHANNEL_ACCESS_TOKEN");
  if (!groupId) throw new Error("Missing env: LINE_GROUP_ID");

  const response = await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${channelAccessToken}`
    },
    body: JSON.stringify({
      to: groupId,
      messages: [{ type: "text", text }]
    })
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`LINE push failed (${response.status}): ${body}`);
  }
}

module.exports = { pushLineGroupMessage };
