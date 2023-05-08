const { GatewayIntentBits, Client } = require("discord.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

export const login = () => {
  client.login(process.env.DISCORD_BOT_TOKEN_JANDI);
  client.login(process.env.DISCORD_BOT_TOKEN_CAU);
};

export const sendDiscordMsg = (msg = "") => {
  if (!process.env.CHANNEL_ID_JANDI || process.env.NODE_ENV !== "production")
    return;
  const channel = client.channels.cache.get(process.env.CHANNEL_ID_JANDI);
  channel?.send(msg);
};
