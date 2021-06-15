async function ban(CMD_NAME, args, message){
    if (CMD_NAME === 'ban') {
        if (!message.member.hasPermission('BAN_MEMBERS'))
            return message.reply('você não tem permissão para isso!')
        if (args.length === 0) return message.channel.send('Uso correto: \`\"/ban id Motivo\"\`')
        try {
            const user = await message.guild.members.ban(args[0]);
            message.channel.send('<@'+args[0]+'> foi banido!')
        } catch (err) {
            message.reply('Um erro de \''+err.DiscordAPIError+'\' ocorreu.');
            message.channel.send('Ai <@256441563687682049>, te vira meu bruxo, loguei o erro pra ti.');
            console.log(err);
        }
    }
}

module.exports = ban;