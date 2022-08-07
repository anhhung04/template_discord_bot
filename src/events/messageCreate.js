const timers = new Map();
const prefixes = new Map();
const default_prefix = require('../config.json')["default_prefix"];
const fs = require('node:fs');
const {Collection} = require('discord.js');

const commands = new Collection();
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (let file of commandFiles) {
    if(!file) continue;
	let command = require(`../commands/${file}`);
	commands.set(command.name, command);
}

function check_aliases(commandName){
    let aliasesName;
    
    for(let [name, command] of commands){
        if(command.aliases?.includes(commandName)){
            aliasesName = name;
            break;
        }
    }

    return aliasesName;
}

module.exports = {
    name: "messageCreate",
    async execute(message){
        let timestamp = message.createdTimestamp;
        let time_limit = 0.5*60*1000;
        let last_timestamp = timers.get(interaction.member.id)||0;
        let diff = timestamp - last_timestamp;
        let prefix = prefixes.get(message.guildId)||default_prefix;

        if(!message.content.startsWith(prefix)||message.author.bot) return
        
        if(diff < time_limit){
            let left_sec = Math.floor((time_limit-diff)/1000)
            return message.channel.send(`Please wait ${left_sec} seconds`);
        }

        timers.set(interaction.member.id, Date.now());

        let [commandName, ...args] = message.content.slice(prefix.length).split(/\s+/);
        args = args.join(' ');
        let command = commands.get(commandName);

        if(!command){
            let aliasesCommand = check_aliases(commandName);

            if(!check_aliases)  return message.channel.send('Invalid command!');

            command = commands.get(aliasesCommand);
        }

        return command.execute(message, args);
    }
}