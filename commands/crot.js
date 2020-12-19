exports.run = (client, msg, args, ops) => {

    if (!msg.member.voice.channel) return msg.channel.send('❗ Masuk ke voice channel dulu KK!')

    if (!msg.guild.me.voice.channel) return msg.channel.send('❗ Maaf MewMew Bot 💩 lagi ga di dalem voice channel nih');

    if (msg.member.voice.channel !== msg.guild.me.voice.channel) return msg.channel.send('❗ Maaf kamu sekarang berada di channel yang berbeda dengan MewMew Bot 💩');

    msg.guild.me.voice.channel.leave();

    msg.channel.send('Keluar Channel....')

}