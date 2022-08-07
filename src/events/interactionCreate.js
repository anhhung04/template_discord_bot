const timers = new Map();
const interactionHandler = require('../interaction_handlers/interaction_handler.js');

module.exports = {
    name: "interactionCreate",
    async execute(interaction){
        let timestamp = interaction.createdTimestamp;
        let time_limit = 0.5*60*1000;
        let last_timestamp = timers.get(interaction.member.id)||0;
        let diff = timestamp - last_timestamp;
        
        if(diff < time_limit){
            let left_sec = Math.floor((time_limit-diff)/1000)
            return interaction.reply(`Please wait ${left_sec} seconds`);
        }

        timers.set(interaction.member.id, Date.now());

        return interactionHandler(interaction);
    }
}