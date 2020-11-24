const Discord = require('discord.js');
const fs = require('fs');
const mongoose = require('mongoose');

// event imports
const ready = require('./events/ready');
const message = require('./events/message');
const roleDelete = require('./events/roleDelete');

mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => console.log('Connected to database.'))
    .catch(err => console.log(err));

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandfiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandfiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// events
ready(client);
message(client);
roleDelete(client);

client.login(process.env.TOKEN);