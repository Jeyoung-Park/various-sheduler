const {
  GatewayIntentBits,
  Client,
  Events,
  Routes,
  REST,
} = require("discord.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
export const cauClient = new Client({ intents: [GatewayIntentBits.Guilds] });

export const login = () => {
  client.login(process.env.DISCORD_BOT_TOKEN);
  cauClient.login(process.env.DISCORD_BOT_TOKEN_CAU);
};

export const sendDiscordMsg = (msg = "") => {
  if (!process.env.CHANNEL_ID) return;
  const channel = client.channels.cache.get(process.env.CHANNEL_ID);
  channel?.send(msg);
};

export const sendDiscordMsgCAU = (msg = "") => {
  if (!process.env.DISCORD_CHANNEL_ID_UNIV) return;
  const channel = cauClient.channels.cache.get(
    process.env.DISCORD_CHANNEL_ID_UNIV
  );
  channel?.send(msg);
};

export const handleCAUData = () => {
  const commands = [
    {
      name: "ping",
      description: "Replies with Pong!",
    },
  ];

  const rest = new REST({ version: "10" }).setToken(
    process.env.DISCORD_BOT_TOKEN_CAU
  );

  (async () => {
    try {
      console.log("Started refreshing application (/) commands.");

      await rest.put(
        Routes.applicationCommands(process.env.DISCORD_APPLICATION_ID_CAU),
        { body: commands }
      );

      console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  })();

  cauClient.once(Events.ClientReady, () => {
    console.log("discord cau bot Ready!");
  });

  cauClient.on(Events.InteractionCreate, async (interaction: any) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "ping") {
      console.log("!!!!");
      await interaction.reply("Pong!");
    }
  });
};
