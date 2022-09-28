import { GatewayIntentBits, Client } from "discord.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

export const login = () => {
  client.login(process.env.DISCORD_BOT_TOKEN);
};

export const sendDiscordMsg = (msg = "") => {};
