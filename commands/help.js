const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'help',
    description: 'Sends an embed containing all the bot commands',
    execute(message, args) {
        const helpEmbed = new MessageEmbed();
        helpEmbed.setColor('BLUE');

        if (!args.length) {
            helpEmbed.setTitle('Help');
            helpEmbed.addField('Here is a list of all commands:', message.client.commands.map(command => command.name).join(', '));
            helpEmbed.setDescription('You can send \`!help <command name>\` to get info on a specific command.');

            return message.author.send(helpEmbed)
                .then(msg => {
                    if (msg.channel.type === 'dm' && message.guild) {
                        message.reply('I have sent you a DM.');
                    }
                })
                .catch(err => {
                    message.reply('Open your DMs so that I can send help.');
                });
        }
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName);

        if (!command) {
            return message.reply('That is not a valid command!');
        }

        helpEmbed.setTitle(`Name: ${command.name}`);
        if (command.description) helpEmbed.addField('**Description:**', command.description);

        return message.channel.send(helpEmbed);
    },
};