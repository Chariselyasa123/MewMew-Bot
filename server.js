console.log('Memuali MewMew Bot! 💩')
const Discord = require('discord.js');
const client = new Discord.Client();
require("dotenv").config();

const PREFIX = '+';
const ownerID = '258950399417909249';

client.on('message', msg => {
    // Ngatur perintah pesan yang masuk
    let args = msg.content.slice(PREFIX.length).trim().split(" ");
    let cmd = args.shift().toLowerCase();

    if (msg.author.bot) return; // Hiraukan user bot
    if (!msg.content.startsWith(PREFIX)) return; // Kalo perintah ga diawali PREFIX '+' ga return apa-apa

    // Handel Perintah
    try {
        // Auto reload
        delete require.cache[require.resolve(`./commands/${cmd}.js`)];

        // Oprtion
        let ops = { ownerID: ownerID }
        let filePerintah = require(`./commands/${cmd}.js`);
        filePerintah.run(client, msg, args, ops);
        
    } catch (e) { // Nangkep error yang ada
        console.log(e);
    }
})

client.on('ready', () => console.log('MewMewbot Online! 🌟'));

client.login(process.env.TOKEN); 