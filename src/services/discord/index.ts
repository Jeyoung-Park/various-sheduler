const {
  GatewayIntentBits,
  Client,
  Events,
  Routes,
  REST,
  Collection
} = require("discord.js");
const fs = require('node:fs');
const path = require('node:path');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

export const login = () => {
  client.login(process.env.DISCORD_BOT_TOKEN);
};

export const sendDiscordMsg = (msg = "") => {
  if (!process.env.CHANNEL_ID) return;
  const channel = client.channels.cache.get(process.env.CHANNEL_ID);
  channel?.send(msg);
};