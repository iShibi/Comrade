const { MessageEmbed } = require("discord.js");
const RoleEmoji = require("../schemas/roleEmoji");

module.exports = {
    name: 'role',
    description: 'Sends an embed for adding role using reactions',
    async execute(message, args) {
        const roleEmbed = new MessageEmbed()
            .setColor('RED')
            .setAuthor('Select a reaction to get the role it represents:');

        const guildRolesCollection = message.guild.roles.cache.sort((roleA, roleB) => roleA.position - roleB.position);

        RoleEmoji.find({}, async (err, res) => {
            if (err) {
                console.log(err);
            } else if (res) {
                if (res.length) {
                    res.forEach(emoji => {
                        const role = guildRolesCollection.find(role => role.id === emoji.id);
                        roleEmbed.addField(role.name, emoji.character, true);
                    });

                    const sentRoleEmbed = await message.channel.send(roleEmbed);

                    res.forEach(emoji => {
                        sentRoleEmbed.react(emoji.character);
                    });

                    const filter = (reaction, user) => !user.bot;
                    const collector = sentRoleEmbed.createReactionCollector(filter);

                    collector.on('collect', async (reaction, user) => {
                        const member = await message.guild.members.fetch(user);
                        const emojiDoc = res.find(doc => doc.character === reaction.emoji.name);
                        const role = message.guild.roles.cache.find(r => r.id === emojiDoc.id);
                        if (role) {
                            if (!member.roles.cache.has(role.id)) {
                                member.roles.add(role);
                            } else {
                                reaction.users.remove(member.id);
                            }
                        } else {
                            reaction.remove();
                        }
                    });
                } else {
                    message.channel.send('This server has no public roles, contact the staff to get a role.');
                }
            }
        });
    }
}