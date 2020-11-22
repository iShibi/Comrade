module.exports = {
    name: 'kick',
    description: 'Kicks the mentioned member',
    execute(message, args) {
        if (message.member.hasPermission('KICK_MEMBERS')) {
            const memberToKick = message.mentions.members.first();
            if (memberToKick) {
                if (memberToKick.kickable) {
                    memberToKick.kick()
                        .then(member => message.channel.send(`Successfully kicked ${memberToKick.user.tag}`))
                        .catch(err => console.log(err));
                } else {
                    message.reply(`I cannot kick ${memberToKick.user.tag}`)
                        .catch(err => console.log(err));
                }
            } else {
                message.channel.send('Mention a member to kick them.')
                    .catch(err => console.log(err));
            }
        } else {
            message.reply('you do not have permissions to kick anyone in this server.')
                .catch(err => console.log(err));
        }
    },
};