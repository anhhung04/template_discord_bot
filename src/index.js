const fs = require('node:fs');
require('dotenv').config();
const mongoose = require('mongoose');
const urlDB = process.env.urlDB||require('./config.json')["urlDB"];
const TOKEN = process.env.TOKEN||require('./config.json')["TOKEN"];
const {Client, GatewayIntentBits} = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent
    ]
});

const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
for (let file of eventFiles) {
    if(!file) continue;
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

mongoose.connect(urlDB).then(()=> console.log(`Connected to database! ${urlDB}`)).catch(err => console.log(err));
client.login(TOKEN); 
