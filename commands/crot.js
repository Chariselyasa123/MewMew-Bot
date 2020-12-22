exports.run = (client, msg, args, ops) => {

    let ambil = ops.active.get(msg.guild.id);

    if (!ambil) return msg.channel.send('❗ Lagi ga ada musik yang lagi diputar!');

    if (!msg.member.voice.channel) return msg.channel.send('❗ Masuk ke voice channel dulu KK!')

    if (!msg.guild.me.voice.channel) return msg.channel.send('❗ Maaf MewMew Bot 💩 lagi ga di dalem voice channel nih');

    if (msg.member.voice.channel !== msg.guild.me.voice.channel) return msg.channel.send('❗ Maaf kamu sekarang berada di channel yang berbeda dengan MewMew Bot 💩');

    if (ambil.queue) ambil.queue = [];

    ops.active.set(msg.guild.id, ambil);

    ambil.dispatcher.emit('finish');
    msg.guild.me.voice.channel.leave();

    msg.channel.send('Keluar Channel.... 🏃‍♂️');

}