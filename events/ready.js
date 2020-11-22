module.exports = (client) => {
    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}`);
        client.user.setPresence({ status: 'online', activity: { name: 'your cmds', type: 'LISTENING' } })
            .catch(err => console.log(err));
    });
}