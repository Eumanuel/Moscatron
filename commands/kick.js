function kick(CMD_NAME, args, message){
    if (CMD_NAME === 'kick') {
        if (!message.member.hasPermission('KICK_MEMBERS'))
            return message.reply('você não tem permissão para isso!')
        if (args.length === 0) return message.channel.send('Uso correto: \`\"/kick id Motivo\"\`')
        const member = message.guild.members.cache.get(args[0]);
        if (member) {
            member
            .kick()
            .then((member) => message.channel.send(`${member} foi expulso!`))
            .catch((err) => message.channel.send('Permissões insuficientes'));
        }else {
            message.channel.send('Usuário não encontrado!');
        }
    }
}

module.exports = kick;