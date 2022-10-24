const { GatewayIntentBits, Client } = require("discord.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const cauClient = new Client({ intents: [GatewayIntentBits.Guilds] });

export const login = () => {
  client.login(process.env.DISCORD_BOT_TOKEN);
  cauClient.login(process.env.DISCORD_BOT_TOKEN_CAU);
};

export const sendDiscordMsg = (msg = "") => {
  if (!process.env.CHANNEL_ID) return;
  const channel = client.channels.cache.get(process.env.CHANNEL_ID);
  channel?.send(msg);
};

export const sendDiscordMsgCAU= (msg = "") => {
  if (!process.env.DISCORD_CHANNEL_ID_UNIV) return;
  const channel = cauClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID_UNIV);
  channel?.send(msg);
};