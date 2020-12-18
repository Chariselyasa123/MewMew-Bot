console.log('Starting MewMew Bot! 💩');

require("dotenv").config();

const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const client = new Discord.Client();
client.login(process.env.TOKEN);
var musik = {};

const PREFIX = '!';

client.on('ready', () => {
    console.log('MewMew Telah Online 👌')
});

client.on('message', async msg => {

    let argument = msg.content.substring(PREFIX.length).split(" ");

    switch (argument[0]) {
        case 'musik':

            function mulai(conn, msg) {
                var msk = musik[msg.guild.id];

                msk.dispatcher = conn.play(ytdl(msk.antrian[0], { filter: 'audioonly' }));

                msk.antrian.shift();

                msk.dispatcher.on("finish", () => {
                    msk.antrian[0] ? mulai(conn, msg) : conn.disconnect()
                })
            }

            if (!argument[1]) {
                msg.channel.send("Isi Judul Lagunya KK");
                return;
            }

            // Musik cuman ke setel di channel pengirim, kalo engga abaikan sadja
            if (!msg.guild) return;

            // Cuman bakal masuk ke channel pengirim pesan sadja
            if (msg.member.voice.channel) {
                const connection = await msg.member.voice.channel.join();
                return;
            } else {
                msg.reply('Join ke voice channel dulu dong Kakak!');
            }

            if (!musik[msg.guild.id]) musik[msg.guild.id] = {
                antrian: []
            }

            var msk = musik[msg.guild.id];

            msk.antrian.push(argument[1]);

            if(!msg.guild.voice.connection) msg.member.voice.channel.join().then(conn => {
                mulai(conn, msg);
            })

            break;
    }
});
