const musicPlayer = require("../features/musicPlayer");

module.exports = {
    name: 'music',
    description: 'Search and Plays music for you',
    async execute(message, args) {
        message.channel.send('What song you wanna listen?');
        const filter = m => m.author.id === message.author.id || m.author.id === message.client.user.id && m.embeds.length === 0;
        const messageCollector = await message.channel.createMessageCollector(filter, { idle: 10000 });

        messageCollector.on('collect', (msg) => {
            if (messageCollector.collected.size === 2) {
                message.channel.send('Searching...');
                musicPlayer(msg);
            }
        });

        messageCollector.on('end', (collected) => {
            message.delete();
            message.channel.bulkDelete(collected);
        });
    },
};