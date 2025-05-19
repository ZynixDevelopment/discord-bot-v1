const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Renvoie la latence du bot.'),
  async execute(interaction) {
    await interaction.reply(`🏓 Pong ! Latence : ${interaction.client.ws.ping}ms`);
  }
};
