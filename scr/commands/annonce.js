const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('annonce')
    .setDescription('Envoie une annonce dans #annonces (admin uniquement)')
    .addStringOption(option =>
      option.setName('message').setDescription('Le message à annoncer').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const message = interaction.options.getString('message');
    const channel = interaction.guild.channels.cache.find(ch => ch.name === 'annonces');
    if (!channel) {
      return interaction.reply({ content: "Salon #annonces introuvable.", ephemeral: true });
    }
    await channel.send(`📢 **Annonce :** ${message}`);
    await interaction.reply({ content: "Annonce envoyée !", ephemeral: true });
  }
};
