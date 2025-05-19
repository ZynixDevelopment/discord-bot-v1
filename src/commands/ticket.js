import { SlashCommandBuilder, PermissionFlagsBits, ChannelType, PermissionsBitField } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Crée un salon de ticket privé'),

  async execute(interaction) {
    const guild = interaction.guild;
    const user = interaction.user;
    const channelName = `ticket-${user.username}`;
    let channel = guild.channels.cache.find(ch => ch.name === channelName);

    if (channel) {
      return interaction.reply({ content: "Vous avez déjà un ticket ouvert.", ephemeral: true });
    }

    channel = await guild.channels.create({
      name: channelName,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        {
          id: guild.roles.everyone,
          deny: [PermissionsBitField.Flags.ViewChannel],
        },
        {
          id: user.id,
          allow: [
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.SendMessages,
            PermissionsBitField.Flags.AttachFiles,
          ],
        },
      ],
    });

    await channel.send(`Bonjour ${user}, explique ton problème ici. Un membre du staff va te répondre.`);
    await interaction.reply({ content: `🎫 Ticket créé : ${channel}`, ephemeral: true });
  }
};
