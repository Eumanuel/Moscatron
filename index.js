require('dotenv').config();

const { Client, Guild } = require('discord.js');
const client = new Client({
    partials: ['MESSAGE', 'REACTION']
});
const PREFIX = "/";

//importar comandos:
const kick = require('./commands/kick');
const ban = require('./commands/ban');
const waitingRoom = require('./commands/waintingRoom'); 

    //Incializador
client.on('ready', () => {
    console.log(`${client.user.tag} foi logado com sucesso!`)
})
client.on('message', (message, guild) => {
    //Checa se a mensagem foi enviada por ele mesmo.
    if (message.author.tag === client.user.tag) return;

    //Command Hadler
    if (message.content.startsWith(PREFIX)) {
        //CommandHanlder Setup Start
        const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
        //CommandHandler Setup Finished

        //Commands:
            //Moderation Commands:
        kick(CMD_NAME, args, message);
        ban(CMD_NAME, args, message);

            //Waiting Room Commands:
        waitingRoom(CMD_NAME, message, args);


        //Commands End.
    }
});

client.login(process.env.DISCORDBOT_TOKEN)
//https://discord.com/oauth2/authorize?client_id=718969966074003467&scope=bot