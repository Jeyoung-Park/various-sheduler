const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cau")
    .setDescription("get cau notice data"),
  async execute(interaction: any) {
    await interaction.reply("cau");
  },
};
