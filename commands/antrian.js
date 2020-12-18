exports.run = async (client, msg, args, ops) => {

    let ambil = ops.active.get(msg.guild.id);

    if (!ambil) return msg.channel.send('❗ Lagi ga ada musik yang lagi diputar!');

    let antrian = ambil.queue;
    let sedangDiputar = antrian[0];

    let resp = `__**Sedang Diputar**__\n**${sedangDiputar.judulLagu}** ▶ -- **Diminta Oleh:** *🎵${sedangDiputar.requester}🎵*\n\n__**⭐ANTRIAN⭐**__\n`;

    for (var i = 1; i < antrian.length; i++) {
        resp += `${i}. **${antrian[i].judulLagu}** ▶ -- **Diminta Oleh:** *🎵${antrian[i].requester}🎵*\n`;
    }
    msg.channel.send(resp);

}