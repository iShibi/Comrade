const RoleEmoji = require("../schemas/roleEmoji")

module.exports = (client) => {
    client.on('roleDelete', (role) => {
        // delete the role from the role-emojis collection in databse
        RoleEmoji.deleteOne({ id: role.id }, (err) => {
            console.log(err);
        });
    });
}