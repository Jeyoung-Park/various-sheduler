const { GatewayIntentBits, Client } = require("discord.js");

type ChannelType = "JANDI" | "CAU" | "KU";

const CHANNEL_ID_CAU =
  process.env.NODE_ENV !== "production"
    ? process.env.CHANNEL_ID_CAU_DEV
    : process.env.CHANNEL_ID_CAU;

const CHANNEL_ID_KU =
  process.env.NODE_ENV !== "production"
    ? process.env.CHANNEL_ID_KU_DEV
    : process.env.CHANNEL_ID_KU;

export const sendDiscordMsg = async (msg = "", channelType: ChannelType) => {
  if (!channelType) return;

  const channelMapper = {
    JANDI: {
      botToken: process.env.DISCORD_BOT_TOKEN_JANDI,
      channelId: process.env.CHANNEL_ID_JANDI,
    },
    CAU: {
      botToken: process.env.DISCORD_BOT_TOKEN_CAU,
      channelId: CHANNEL_ID_CAU,
    },
    KU: {
      botToken: process.env.DISCORD_BOT_TOKEN_KU,
      channelId: CHANNEL_ID_KU,
    },
  };

  const client = new Client({ intents: [GatewayIntentBits.Guilds] });
  await client.login(channelMapper[channelType].botToken);

  const channel = client.channels.cache.get(
    channelMapper[channelType].channelId
  );
  channel?.send(msg);
};
