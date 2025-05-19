module.exports = {
  name: 'c',
  execute(member) {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'général');
    if (channel) {
      channel.send(`Bienvenue ${member} sur **${member.guild.name}** !`);
    }
  }
};
