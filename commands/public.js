const RoleEmoji = require("../schemas/roleEmoji");

module.exports = {
    name: 'public',
    description: 'Makes a role public by assigning an emoji to it. Public roles show up in the role embed.',
    usage: '!public <role-id> <emoji>',
    execute(message, args) {
        const roleId = args[0];
        const emoji = args[1];
        if (roleId) {
            const role = message.guild.roles.cache.get(roleId);
            if (role) {
                if (emoji) {
                    const newRoleEmojiDoc = new RoleEmoji({
                        id: role.id,
                        character: emoji,
                    });
                    newRoleEmojiDoc.save()
                        .then(savedDoc => message.channel.send(`Made the **${role.name}** role public and assigned it the emoji: ${emoji}`))
                        .catch(err => console.log(err));
                } else {
                    return message.reply('You did not mention an emoji to assign this role to.');
                }
            } else {
                return message.reply('Enter a valid guild role id.');
            }
        } else {
            return message.reply('You did not mention the role id.');
        }
    },
};