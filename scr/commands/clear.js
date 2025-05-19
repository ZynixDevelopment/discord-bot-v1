const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Supprime un nombre de messages (modération)')
    .addIntegerOption(option =>
      option.setName('nombre').setDescription('Nombre de messages à supprimer').setMinValue(1).setMaxValue(100).setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction) {
    const amount = interaction.options.getInteger('nombre');
    await interaction.channel.bulkDelete(amount, true);
    await interaction.reply({ content: `${amount} messages supprimés !`, ephemeral: true });
  }
};
