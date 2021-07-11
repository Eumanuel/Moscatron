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
    console.log(msg);
    return msg;
}

function messageChecker(message,WordList,client){
    mensagem = String(messageRedo(message.content));
     for(i in WordList) {
        mensagem = message.content;
        palavraAtual = WordList[i];
        console.log(msg.toLowerCase().indexOf(WordList[i])+ " " +WordList[i]);
        

        if (msg.toLowerCase().indexOf(String(palavraAtual)) >= 0) {
            message.react('👀')
                .then(client.channels.cache.get('722854837502345226')
                    .send('O usuário <@'+message.author.id+"> enviou a seguinte mensagem suspeita: \n"+mensagem))
            return;
        }
    }

}
module.exports = messageChecker;