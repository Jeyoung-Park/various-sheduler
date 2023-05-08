const { GatewayIntentBits, Client } = require("discord.js");

type ChannelType = "JANDI" | "CAU" | "KU";

const jandiClient = new Client({ intents: [GatewayIntentBits.Guilds] });
const cauClient = new Client({ intents: [GatewayIntentBits.Guilds] });
const kuClient = new Client({ intents: [GatewayIntentBits.Guilds] });

export const login = () => {
  jandiClient.login(process.env.DISCORD_BOT_TOKEN_JANDI);
  cauClient.login(process.env.DISCORD_BOT_TOKEN_CAU);
  kuClient.login(process.env.DISCORD_BOT_TOKEN_KU);
};

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
      client: jandiClient,
    },
    CAU: {
      botToken: process.env.DISCORD_BOT_TOKEN_CAU,
      channelId: CHANNEL_ID_CAU,
      client: cauClient,
    },
    KU: {
      botToken: process.env.DISCORD_BOT_TOKEN_KU,
      channelId: CHANNEL_ID_KU,
      client: kuClient,
    },
  };

  const channel = channelMapper[channelType].client.channels.cache.get(
    channelMapper[channelType].channelId
  );
  channel?.send(msg);
};
