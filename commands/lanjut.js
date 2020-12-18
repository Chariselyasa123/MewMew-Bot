exports.run = async (client, msg, args, ops) => {

    let ambil = ops.active.get(msg.guild.id);

    if (!ambil) return msg.channel.send('❗ Lagi ga ada musik yang lagi diputar!');

    if (msg.member.voice.channel !== msg.guild.me.voice.channel) return msg.channel.send('❗ Maaf kamu sekarang berada di channel yang berbeda dengan MewMew Bot 💩');

    if (!ambil.dispatcher.paused) return msg.channel.send('❗ Musik ini tidak sedang dijeda.');

    ambil.dispatcher.resume();

    msg.channel.send(`✅ Berhasil melanjutkan lagu: *${ambil.queue[0].judulLagu}*`);

}