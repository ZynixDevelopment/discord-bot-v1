const chalk = require('chalk');
module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(chalk.cyanBright(`Bot prêt - ${client.user.tag}`));
  }
};
