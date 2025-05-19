require('dotenv').config();
const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js');
const chalk = require('chalk');
const fs = require('node:fs');
const path = require('node:path');

// Initialisation du client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions
  ],
  partials: [Partials.Channel]
});

// Collection des commandes
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Chargement dynamique des commandes
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  }
}

// Gestionnaire d'événements (exemple : logs, bienvenue, tickets, etc.)
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

// Connexion du bot
client.login(process.env.DISCORD_TOKEN);

// Affichage console
client.on('ready', () => {
  console.log(chalk.greenBright(`✅ Connecté en tant que ${client.user.tag}`));
});
