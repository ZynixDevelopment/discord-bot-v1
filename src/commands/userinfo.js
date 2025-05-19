import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Affiche des informations sur un utilisateur')
    .addUserOption(option =>
      option.setName('utilisateur').setDescription('Utilisateur à inspecter')),

  async execute(interaction) {
    const user = interaction.options.getUser('utilisateur') || interaction.user;
    const member = await interaction.guild.members.fetch(user.id);

    const embed = new EmbedBuilder()
      .setTitle(`Informations de ${user.tag}`)
      .setThumbnail(user.displayAvatarURL())
      .addFields(
        { name: '👤 Pseudo', value: user.username, inline: true },
        { name: '🆔 ID', value: user.id, inline: true },
        { name: '📅 A rejoint le', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:D>`, inline: true }
      )
      .setColor(0x3498db);

    await interaction.reply({ embeds: [embed] });
  }
};
