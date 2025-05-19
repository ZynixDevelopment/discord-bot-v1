import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Supprime un nombre de messages (modération)')
    .addIntegerOption(option =>
      option
        .setName('nombre')
        .setDescription('Nombre de messages à supprimer')
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const amount = interaction.options.getInteger('nombre');

    // Supprime les messages
    await interaction.channel.bulkDelete(amount, true).catch(err => {
      console.error(err);
      return interaction.reply({ content: "Erreur lors de la suppression.", ephemeral: true });
    });

    // Confirme la suppression
    await interaction.reply({ content: `${amount} messages supprimés !`, ephemeral: true });
  }
};
