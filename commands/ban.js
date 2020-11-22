module.exports = {
    name: 'ban',
    description: 'Bans the mentioned member',
    execute(message, args) {
        if (message.member.hasPermission('BAN_MEMBERS')) {
            const memberToBan = message.mentions.members.first();
            if (memberToBan) {
                if (memberToBan.bannable) {
                    memberToBan.ban()
                        .then(member => message.channel.send(`Successfully banned ${memberToBan.user.tag}`))
                        .catch(err => console.log(err));
                } else {
                    message.reply(`I cannot ban ${memberToBan.user.tag}`)
                        .catch(err => console.log(err));
                }
            } else {
                message.channel.send('Mention a member to ban them.')
                    .catch(err => console.log(err));
            }
        } else {
            message.reply('you do not have permissions to ban anyone in this server.')
                .catch(err => console.log(err));
        }
    },
};