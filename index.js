require('dotenv').config();
const { Client, GatewayIntentBits, Partials, EmbedBuilder, PermissionsBitField } = require('discord.js');

// Initialisation du client Discord
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

// Log lors du démarrage du bot
client.once('ready', () => {
  console.log(`✅ Connecté en tant que ${client.user.tag}`);
});

// Message de bienvenue
client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'général' && ch.isTextBased());
  if (channel) {
    channel.send(`Bienvenue ${member} sur **${member.guild.name}** !`);
  }
});

// Commandes textuelles
client.on('messageCreate', async message => {
  if (message.author.bot) return;

  // Préfixe des commandes
  const prefix = '!';
  if (!message.content.startsWith(prefix)) return;

  // Découpage de la commande et des arguments
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // Commande ping
  if (command === 'ping') {
    await message.reply(`Pong ! Latence : ${client.ws.ping}ms`);
  }

  // Commande info
  if (command === 'info') {
    const embed = new EmbedBuilder()
      .setTitle("Informations du serveur")
      .setColor(0x3498db)
      .addFields(
        { name: "Nom", value: message.guild.name, inline: true },
        { name: "Membres", value: `${message.guild.memberCount}`, inline: true },
        { name: "Créé le", value: `<t:${Math.floor(message.guild.createdTimestamp / 1000)}:d>`, inline: true }
      );
    await message.reply({ embeds: [embed] });
  }

  // Commande annonce (admin uniquement)
  if (command === 'annonce') {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return message.reply("⛔ Vous n'avez pas la permission d'utiliser cette commande.");
    }
    const annonce = args.join(" ");
    const channel = message.guild.channels.cache.find(ch => ch.name === 'annonces' && ch.isTextBased());
    if (channel) {
      channel.send(`📢 **Annonce :** ${annonce}`);
      message.reply("Annonce envoyée !");
    } else {
      message.reply("Salon #annonces introuvable.");
    }
  }
});

// Gestion des erreurs
process.on('unhandledRejection', error => {
  console.error('Erreur non gérée:', error);
});

// Connexion au bot
client.login(process.env.DISCORD_TOKEN);
