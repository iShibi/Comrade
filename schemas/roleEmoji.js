const { model, Schema } = require('mongoose');

const roleEmojiSchema = new Schema({
    id: String,
    character: String,
});

const RoleEmoji = model('role-emoji', roleEmojiSchema);
module.exports = RoleEmoji;