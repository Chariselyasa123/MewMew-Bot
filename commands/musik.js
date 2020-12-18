const ytdl = require('ytdl-core');

exports.run = async (client, msg, args, ops) => {

    // Cek ada di voice chat atau engga
    if (!msg.member.voice.channel) return msg.channel.send('❗ Tolong masuk voice 🎧 channel dulu dong KK!');

    if (msg.guild.me.voice.channel) return msg.channel.send('❗ Maap, botnya udh masuk ke yang lain!');

    if (!args[0]) return msg.channel.send('❗ Kasih link dong kk, baru mulai musiknya');

    let validasi = await ytdl.validateURL(args[0]);

    if(!validasi) return msg.channel.send('❗ Kasih link yang bener Woi!! 😠');

    let info = await ytdl.getInfo(args[0]);

    let koneksi = await msg.member.voice.channel.join();

    // Puter lagu gan!
    let musiks = await koneksi.play(ytdl(args[0], { filter: 'audioonly' }));

    // Now playing
    msg.channel.send(`Yang sedang diputar ▶ : ${info.title}`);
}