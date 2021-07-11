const { GuildChannelManager } = require("discord.js");

function messageRedo(mensagem) {
    msg = mensagem;
    msg = msg.replace('3', 'e');
    msg = msg.replace('4', 'a');
    msg = msg.replace('1', 'i');
    msg = msg.replace('5', 's');
    msg = msg.replace('0', 'o');
    msg = msg.replace('ç', 'c');
    msg = msg.replace(' ', '');
    msg = msg.replace(/\s+/g, '');
    msg = msg.normalize('NFD').replace(/[\u0300-\u036f]/g, "-");
    msg = msg.replace(/[^a-zA-Z ]/g, "");
    return msg;
}

function messageChecker(oldMessage,message,WordList,client,status){
    mensagem = messageRedo(message.content);
    try {
        for(i in WordList) {
            if (msg.toLowerCase().indexOf(String(WordList[i])) >= 0 && status == 0) {
                message.react('👀')
                        .then(client.channels.cache.get('722854837502345226')
                        .send("O usuário <@"+message.author.id+"> enviou a seguinte mensagem suspeita: \n\`"+message.content+"\`\nLink: "+message.url))
                return;
            } else {
                if (msg.toLowerCase().indexOf(String(WordList[i])) >= 0 && status == 1) {
                    try {
                        message.react('👀')
                        .then(client.channels.cache.get('722854837502345226')
                        .send("O usuário <@"+message.author.id+"> editou uma mensagem de: \n\`"+oldMessage.content+"\`\nPara:\n\`"+message.content+"\`\nLink: "+message.url))
                    } catch {
                        message.react('👀')
                        .then(client.channels.cache.get('722854837502345226')
                        .send("Uma mensagem antiga foi editada de: \n\`"+oldMessage.content+"\`\nPara:\n\`"+message.content+"\`\nLink: "+message.url))
                    }
                return;
                }
            }
        }
    } catch{}
}
module.exports = messageChecker;
