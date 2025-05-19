# Bot Discord Professionnel Multi-fonctions

Bienvenue sur le bot Discord professionnel conçu pour les entreprises, communautés ou associations souhaitant une gestion avancée de leur serveur **sans fonctionnalité musicale**.  
Ce bot est structuré de façon modulaire pour faciliter l’ajout ou la modification de commandes et d’événements.

---

## ⚙️ Conception et Architecture

- **Node.js + discord.js v14** : stabilité, sécurité et support des dernières fonctionnalités Discord.
- **Architecture modulaire** : chaque commande et événement est dans son propre fichier (`src/commands/`, `src/events/`).
- **Commandes Slash uniquement** : pour une expérience moderne, sécurisée et intuitive (`/ping`, `/annonce`, etc.).
- **Gestion des permissions** : les commandes sensibles nécessitent des droits spécifiques (admin, modérateur, etc.).
- **Aucune commande musicale** : 100% orienté professionnel, conformité avec les conditions Discord.
- **Chargement dynamique** : toutes les commandes et événements sont chargés automatiquement lors du lancement du bot.
- **Pré-configuré pour l’auto-modération et le support** : suppression de messages, création de tickets, annonces, etc.

---

## 🚀 Installation et lancement

1. **Clonez ce dépôt :**
   ```bash
   git clone <url-du-repo>
   cd bot-discord-professionnel-multifonction
   ```

2. **Installez les dépendances :**
   ```bash
   npm install
   ```

3. **Configurez le token dans `.env` :**
   ```
   DISCORD_TOKEN=VOTRE_TOKEN_BOT_ICI
   ```

4. **Déployez les commandes Slash** (obligatoire après ajout ou modification d'une commande) :
   - Suivez le guide officiel : [docs Discord.js – Déploiement des commandes](https://discordjs.guide/interactions/deploying-commands.html)

5. **Démarrez le bot :**
   ```bash
   npm start
   ```

---

## 📑 Commandes Disponibles et Explications

### `/ping`
- **Description** : Affiche la latence du bot (en ms).
- **Utilité** : Vérifier la réactivité du bot et la connexion avec les serveurs Discord.

### `/annonce [message]`
- **Description** : Permet à un administrateur d’envoyer une annonce dans le salon `#annonces`.
- **Permissions** : **Administrateur** uniquement.
- **Utilité** : Partager des communications officielles ou importantes à tous les membres.

### `/clear [nombre]`
- **Description** : Supprime un nombre donné de messages dans le salon courant (max 100).
- **Permissions** : **Modérer les messages**.
- **Utilité** : Garder les salons propres et supprimer les messages indésirables ou obsolètes.

### `/ticket`
- **Description** : Crée un salon privé de ticket pour l’utilisateur, accessible uniquement par lui et l’équipe du staff.
- **Utilité** : Gérer les demandes de support, les signalements ou demandes privées facilement.

### `/userinfo [utilisateur]`
- **Description** : Affiche des informations détaillées sur un utilisateur (nom, ID, date d’arrivée, avatar).
- **Utilité** : Permet de vérifier un membre, utile pour la modération ou le support.

---

## 🔔 Événements Automatisés

- **Bienvenue** : Chaque nouvel arrivant reçoit un message de bienvenue dans le salon `#général` (configurable).
- **Gestion centralisée des interactions** : Toutes les commandes Slash sont gérées via l’événement `interactionCreate.js`.
- **Logs console** : Toutes les actions critiques sont loguées dans la console pour le monitoring.

---

## 🏗️ Ajouter ou modifier une commande

- Ajoutez un fichier `votrecommande.js` dans `src/commands/` suivant le modèle :
  ```js
  const { SlashCommandBuilder } = require('discord.js');
  module.exports = {
    data: new SlashCommandBuilder()
      .setName('votrecommande')
      .setDescription('Description de la commande'),
    async execute(interaction) {
      // Votre code ici
    }
  };
  ```
- Relancez le bot et déployez à nouveau les commandes Slash.

---

## 🚫 Ce que le bot NE fait PAS

- **Pas de musique, ni de lecture audio** : Totalement professionnel.
- **Pas d’auto-réponses spam** : Les réponses sont réservées aux commandes ou événements utiles.
- **Pas de stockage de données personnelles** : Respecte la vie privée des membres.

---

## 🛡️ Sécurité et bonnes pratiques

- Les commandes sensibles requièrent des permissions élevées.
- Les tickets sont privés et accessibles uniquement au staff et à l’utilisateur concerné.
- Gestion des erreurs centralisée pour éviter les crashs.

---

## 📦 Structure des dossiers

```
src/
│
├── commands/         # Toutes les commandes Slash (1 fichier par commande)
│   ├── ping.js
│   ├── annonce.js
│   ├── clear.js
│   ├── ticket.js
│   └── userinfo.js
│
├── events/           # Tous les événements Discord (guildMemberAdd, ready, etc.)
│   ├── interactionCreate.js
│   ├── ready.js
│   └── guildMemberAdd.js
│
└── index.js          # Point d'entrée principal du bot
```

---

## 💡 Personnalisation & Extensions

- **Nouvelles commandes** : Ajoutez simplement un fichier dans `commands/`.
- **Nouveaux événements** : Idem dans `events/`.
- **Fonctionnalités avancées** : Ajoutez logs avancés, anti-spam, gestion de rôles, réactions automatiques, etc.

---

## 📝 Contribution

Vos suggestions, issues et PR sont les bienvenues pour améliorer ce bot !  
Pour toute question, contactez l’auteur ou ouvrez une issue.

---

# ✅ Prêt à professionnaliser votre serveur Discord !
