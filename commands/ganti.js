exports.run = async (client, msg, args, ops) => {

    let ambil = ops.active.get(msg.guild.id);

    if (!ambil) return msg.channel.send('❗ Lagi ga ada musik yang lagi diputar!');

    if (msg.member.voice.channel !== msg.guild.me.voice.channel) return msg.channel.send('❗ Maaf kamu sekarang berada di channel yang berbeda dengan MewMew Bot 💩');

    let hitungUser = msg.member.voice.channel.members.size;

    let dibutuhkan = Math.ceil(hitungUser / 2);

    if (!ambil.queue[0].voteSkips) ambil.queue[0].voteSkips = [];

    if (ambil.queue[0].voteSkips.includes(msg.member.id)) return msg.channel.send(`❗ Maaf, anda telah memilih untuk mengganti lagu! ${ambil.queue[0].voteSkips.length}/${dibutuhkan} dibutuhkan`);

    ambil.queue[0].voteSkips.push(msg.member.id);

    ops.active.set(msg.guild.id, ambil);

    if (ambil.queue[0].voteSkips.length >= dibutuhkan) {
        msg.channel.send('✅ Berhasil mengganti lagu!');
        return ambil.dispatcher.emit('finish');
    }

    msg.channel.send(`Berhasil memilih lewati lagu, ${ambil.queue[0].voteSkips.length}/${dibutuhkan} dibutuhkan ⛏`);

}