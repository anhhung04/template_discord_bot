const deploySlashCommand = require('./deploy-slash-command.js');
const guildTestId = "993322665043579032";

deploySlashCommand(guildTestId);

process.stdin.write('node src/index.js');
