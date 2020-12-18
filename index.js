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

client.on('message', msg => {

    let argument = msg.content.substring(PREFIX.length).split(" ");

    switch (argument[0]) {
        case 'musik':

            function mulai(conn, msg) {
                var msk = musik[msg.guild.id];

                msk.dispatcher = conn.play(ytdl(msk.queue[0], { filter: 'audioonly' }));
                
                msk.queue.shift();

                msk.dispatcher.on("end", () => {
                    if (msk.queue[0]) {
                        play(conn, msg);
                    } else {
                        conn.disconnect();
                    }
                });
            }

            if (!argument[1]) {
                msg.channel.send("Isi Judul Lagunya KK");
                return;
            }

            // Musik cuman ke setel di channel pengirim, kalo engga abaikan sadja
            if (!msg.guild) return;

            // Cuman bakal masuk ke channel pengirim pesan sadja
            if (!msg.member.voice.channel) {
                msg.reply('Join ke voice 🎧 channel dulu dong Kakak! 🦍');
                return;
            }

            if (!musik[msg.guild.id]) musik[msg.guild.id] = {
                queue: []
            }

            var msk = musik[msg.guild.id];

            msk.queue.push(argument[1]);

            if(!msg.guild.voiceConnection) msg.member.voice.channel.join().then(conn => {
                mulai(conn, msg);
            })

            break;
    }
});
