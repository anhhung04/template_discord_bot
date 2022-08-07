const deploySlashCommand = require('./deploy-slash-command.js');
const guildTestId = "";

deploySlashCommand(guildTestId);

process.stdin.write('node src/index.js');
