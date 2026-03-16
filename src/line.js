async function pushLineGroupMessage(text) {
  const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  const groupId = process.env.LINE_GROUP_ID;

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

