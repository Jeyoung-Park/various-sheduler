const { GatewayIntentBits, Client, Events } = require("discord.js");

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

export const sendDiscordMsgCAU= (msg = "") => {
  if (!process.env.DISCORD_CHANNEL_ID_UNIV) return;
  const channel = cauClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID_UNIV);
  channel?.send(msg);
};

export const handleCAUData=()=>{
  const prefix='!';

  cauClient.once(Events.ClientReady, () => {
    console.log('discord cau bot Ready!');
  });

  cauClient.on('message', (message:any)=>{
    console.log({message})
    // message 작성자가 봇이면 그냥 return
    if (message.author.bot) return;
    // message 시작이 prefix가 아니면 return
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    
    if (command === "ping") {
        message.reply(`pong!`);
    }
  })
}