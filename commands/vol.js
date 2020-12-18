exports.run = async (client, msg, args, ops) => {

    function volume(args) {
        if (args <= 200 && args >= 100) {
            return '🔊'
        }
        if (args <= 100 && args >= 40) {
            return '🔉'
        }
        if (args <= 40 && args >= 1) {
            return '🔈'
        }
        if (args <= 1 && args >= 0) {
            return '🔇'
        }
    }

    let ambil = ops.active.get(msg.guild.id);

    if (!ambil) return msg.channel.send('❗ Lagi ga ada musik yang lagi diputar!');

    if (msg.member.voice.channel !== msg.guild.me.voice.channel) return msg.channel.send('❗ Maaf kamu sekarang berada di channel yang berbeda dengan MewMew Bot 💩');

    if (isNaN(args[0]) || args[0] > 200 || args[0] < 0) return msg.channel.send('❗ **Masukkan angka antara 0-200**');

    ambil.dispatcher.setVolume(args[0] / 100);

    msg.channel.send(`✅ Berhasil mengatur volume dari lagu : *${ambil.queue[0].judulLagu}*  ->  ${args[0]} ${volume(args[0])}`);
}