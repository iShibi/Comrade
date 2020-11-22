module.exports = {
    name: 'clear',
    description: 'Deletes a given number of messages',
    execute(message, args) {
        const msgDeleteAmount = args[0];
        if (msgDeleteAmount) {
            if (parseInt(msgDeleteAmount)) {
                message.channel.bulkDelete(parseInt(msgDeleteAmount))
                    .then(deletedMessages => message.channel.send(`Deleted ${deletedMessages.size} messages`));
            } else {
                message.reply('enter a integer number');
            }
        } else {
            message.channel.bulkDelete(100)
                .then(deletedMessages => message.channel.send(`Deleted ${deletedMessages.size} messages`));
        }
    },
};