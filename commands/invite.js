module.exports = {
    name: 'invite',
    description: 'Sends an invite of the server',
    async execute(message, args) {
        const createdInvite = await message.channel.createInvite({ maxAge: 0 });
        message.channel.send(createdInvite.url);
    },
};