const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
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
      type: 0, // 0 = GUILD_TEXT
      permissionOverwrites: [
        {
          id: guild.roles.everyone,
          deny: ['ViewChannel']
        },
        {
          id: user.id,
          allow: ['ViewChannel', 'SendMessages', 'AttachFiles']
        }
      ]
    });

    await channel.send(`Bonjour ${user}, explique ton problème ici. Un membre du staff va te répondre.`);
    await interaction.reply({ content: `Ticket créé : ${channel}`, ephemeral: true });
  }
};
