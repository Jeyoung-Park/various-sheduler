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
  cauClient.commands = new Collection();

  const commands=[]

  const commandsPath = path.join(__dirname, 'commands');
  const commandFiles = fs.readdirSync(commandsPath).filter((file:any) => file.endsWith('.js')||file.endsWith('.ts'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
      cauClient.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }

  // // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
  }

  // Construct and prepare an instance of the REST module
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN_CAU);

  // and deploy your commands!
  (async () => {
    try {
      console.log(`Started refreshing ${commands.length} application (/) commands.`);

      // The put method is used to fully refresh all commands in the guild with the current set
      const data = await rest.put(
        Routes.applicationGuildCommands(process.env.DISCORD_APPLICATION_ID_CAU, process.env.DISCORD_GUILD_ID),
        { body: commands },
      );

      console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
      // And of course, make sure you catch and log any errors!
      console.error(error);
    }
  })();


  cauClient.once(Events.ClientReady, () => {
    console.log("discord cau bot Ready!");
  });

  cauClient.on(Events.InteractionCreate, async (interaction: any) => {
    console.log('interactionCreated')
    
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  });
};
