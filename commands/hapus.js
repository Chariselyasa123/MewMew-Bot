exports.run = (client, msg, args, ops) => {

    let ambil = ops.active.get(msg.guild.id);

    if (!args[0]) return msg.channel.send('❗ Masukkan antrian nomer berapa yang ingin dihapus. Cek \`+antrian\`');

    if (!ambil) return msg.channel.send('❗ Lagi ga ada musik yang lagi diputar!');

    let antrian = ambil.queue;

    if (msg.member.voice.channel !== msg.guild.me.voice.channel) return msg.channel.send('❗ Maaf kamu sekarang berada di channel yang berbeda dengan MewMew Bot 💩');

    if (args[0] == 0) return msg.channel.send('❗ Tidak ada antrian 0!. Cek \`+antrian\`');

    if (!antrian[args[0]]) return msg.channel.send(`❗ Tidak ada antrian ke ${args[0]}!. Cek \`+antrian\``);

    antrian.splice(args[0], 1);

    msg.channel.send(`✅ Berhasil menghapus lagu dari antrian`);

}