const { GuildChannelManager } = require("discord.js");

async function messageChecker(message,WordList,client){
    mensagem = message.content;
    for(i in WordList) {
        if (WordList[i].includes(mensagem) == true) {
            message.react('👀')
                .then(client.channels.cache.get('741728887339352128')
                    .send('O usuário <@'+message.author.id+"> enviou a seguinte mensagem suspeita: \n"+mensagem))
        }
    }

}
module.exports = messageChecker;