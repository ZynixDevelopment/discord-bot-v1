import 'dotenv/config';
import chalk from 'chalk';
import { Client, GatewayIntentBits, Collection, Partials } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Nécessaire pour __dirname en ESModule
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  const { default: command } = await import(`file://${filePath}`);
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  }
}

// Gestionnaire d'événements
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const module = await import(`file://${filePath}`);

  if (!module.default) {
    console.warn(chalk.yellow(`⚠️ Le fichier ${file} dans events n'exporte pas par défaut.`));
    continue;
  }

  const event = module.default;

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
