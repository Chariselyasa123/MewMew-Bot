exports.run = (client, msg, args, ops) => {

    let ambil = ops.active.get(msg.guild.id);

    if (!ambil) return msg.channel.send('❗ Lagi ga ada musik yang lagi diputar!');

    if (msg.member.voice.channel !== msg.guild.me.voice.channel) return msg.channel.send('❗ Maaf kamu sekarang berada di channel yang berbeda dengan MewMew Bot 💩');

    if (ambil.dispatcher.paused) return msg.channel.send('❗ Musik ini sedang dijeda.');

    ambil.dispatcher.pause();

    msg.channel.send(`✅ Berhasil menjeda lagu: *${ambil.queue[0].judulLagu}*`);

}