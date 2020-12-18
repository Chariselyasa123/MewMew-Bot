console.log('Starting MewMew Bot! 💩');

require("dotenv").config();

const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.TOKEN);

client.on('ready', () => {
    console.log('Success 👌')
});

client.on('message', msg => {
    // console.log(msg)
    if (msg.content == '!samlekom') {
        msg.channel.send('Kumsalam')
    }
});
