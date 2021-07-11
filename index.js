require('dotenv').config();

var fs = require('fs');

//Preparar WordList
try {
    var WordList = fs.readFileSync('public/bannedWordlist.txt').toString().split("\n");
    for(i in WordList) {
        WordList[i] = WordList[i].replace(/[^a-zA-Z ]/g, "");
    }
    console.log("WordList carregada com sucesso!");
} catch {
    console.log("Ocorreu um erro ao carregar a Wordlist!");
}

//Preparar Partials (Aceitar o carregamento também de mensagens antigas, e não de apenas as novas)
const { Client, Guild } = require('discord.js');
const client = new Client({
    partials: ['MESSAGE', 'REACTION', 'GUILD_MEMBER', 'CHANNEL', 'USER']
});

//Prefixo do Bot
const PREFIX = "/";

//importar comandos:
const kick = require('./commands/kick');
const ban = require('./commands/ban');
const waitingRoom = require('./commands/waintingRoom'); 
const messageChecker = require('./commands/messageChecker'); 

    //Incializador
client.on('ready', () => {
    console.log(`${client.user.tag} foi logado com sucesso!`)
})

client.on('message', (message, guild) => {
    //Checa se a mensagem foi enviada por ele mesmo.
    if (message.author.tag === client.user.tag) return;

    //MessageChecker
    status = 0;
    messageChecker(message,message,WordList,client,status);

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
    }
    //Commands End.
});

//Checa também se alguma mensagem é editada
client.on('messageUpdate', (oldMessage, newMessage) => {
    console.log(newMessage.content)
    status = 1;
    messageChecker(oldMessage,newMessage,WordList,client,status);
});


client.login(process.env.DISCORDBOT_TOKEN)
//https://discord.com/oauth2/authorize?client_id=718969966074003467&scope=bot
