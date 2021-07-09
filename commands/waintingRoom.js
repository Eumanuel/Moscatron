const { GuildChannelManager } = require("discord.js");
const ytdl = require('ytdl-core');

async function waitingRoom(CMD_NAME, message, args){
    if (!message.guild) return;

    if (CMD_NAME === 'play') {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            // Apenas tenta entrar no canal de voz se quem deu o comando está em um canal de voz
            if (message.member.voice.channel) {
                const connection = await message.member.voice.channel.join();
                const dispatcher = connection.play(ytdl(args[0], { filter: 'audioonly' }));
                dispatcher.setVolume(args[1]/100);
                //const dispatcher = connection.play('./public/Girl-from-Petaluma.mp3');
            } else {
                message.reply('Você precisa estar em um canal de voz primeiro!');
            }
        } else {
            message.reply(' ?')
        }
    }

    if (CMD_NAME === 'leave') {
        await message.member.voice.channel.leave();
    }

    if (CMD_NAME === 'create') {
        const espera = await message.guild.channels.create('Sala de Espera', {
            type: 'voice',
            parent: '740385901485490289',
            position: 2
        });
        const { id } = espera;
        const connection = await espera.join();
        const dispatcher = connection.play('./public/elevator.mp3', {
            volume: 0.4,
          });
        dispatcher.setVolume(0.1);
    }
}
module.exports = waitingRoom;