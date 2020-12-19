const ytdl = require('ytdl-core');

exports.run = async (client, msg, args, ops) => {

    if (msg.member.voice.channel) {
        const connection = await msg.member.voice.channel.join();
        const dispatcher = connection.play(ytdl('https://www.youtube.com/watch?v=MaarHQs9Lic', {
            filter: 'audioonly'
        }));
        dispatcher.on('finish', () => {
            msg.guild.me.voice.channel.leave();
        });
    } else {
        msg.reply('❗ Masuk channel dulu woi!');
    }
}