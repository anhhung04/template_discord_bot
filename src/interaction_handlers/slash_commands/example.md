const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
                .setName('name')
                .setDescription('description'),
    async execute(interaction){
        ...
    }
}