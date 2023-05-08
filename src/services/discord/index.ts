const { GatewayIntentBits, Client } = require("discord.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

export const login = () => {
  client.login(process.env.DISCORD_BOT_TOKEN_JANDI);
  client.login(process.env.DISCORD_BOT_TOKEN_CAU);
};

export const sendDiscordMsg = (msg = "", channelId = "") => {
  if (!channelId) return;
  const channel = client.channels.cache.get(channelId);
  channel?.send(msg);
};
