module.exports = {
    name: 'clear',
    description: 'Deletes a given number of messages',
    execute(message, args) {
        if (args[0]) {
            const msgDeleteAmount = parseInt(args[0]);
            if (msgDeleteAmount) {
                message.channel.bulkDelete(msgDeleteAmount, true)
                    .then(deletedMessages => message.channel.send(`Deleted ${deletedMessages.size} messages`))
                    .catch(err => console.log(err));
            } else {
                message.reply('enter a integer number');
            }
        } else {
            message.channel.bulkDelete(100, true)
                .then(deletedMessages => message.channel.send(`Deleted ${deletedMessages.size} messages`))
                .catch(err => console.log(err));
        }
    },
};