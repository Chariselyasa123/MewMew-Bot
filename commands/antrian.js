exports.run = (client, msg, args, ops, embed) => {

    let ambil = ops.active.get(msg.guild.id);

    if (!ambil) return msg.channel.send('❗ Lagi ga ada musik yang lagi diputar!');

    let antrian = ambil.queue;
    let sedangDiputar = antrian[0];
    let totalMenit = antrian.reduce((a, b) => a + parseInt(b.lamaLagu), 0);
    const menit = Math.floor(sedangDiputar.lamaLagu / 60);
    const detik = sedangDiputar.lamaLagu - menit * 60;
    const newMenit = Math.floor(totalMenit / 60);
    const newDetik = totalMenit - newMenit * 60;



    const sms = embed
        .setTitle(`Antrian Lagu ${msg.guild.name}`)
        .setDescription(`${antrian.length-1} Lagu dalam antrian | Panjang \`${newMenit}:${newDetik}\``)
        .setColor('#fbff1f')
        .addField(`__Sedang Diputar:__`, `[${sedangDiputar.judulLagu}](${sedangDiputar.url}) | \`${menit}:${detik} Diminta Oleh: ${sedangDiputar.usernameRequester} (${sedangDiputar.requester})\`\n\n__**Akan Diputar:**__`)
        .setFooter(`Halaman`, `${msg.author.avatarURL()}`)
    var i = 1;
    antrian.forEach((val, index) => {
        const menite = Math.floor(val.lamaLagu / 60);
        const detike = val.lamaLagu - menite * 60;
        if (index < 1) return `asdasdas`
        embed.addField(`\u200b`, `\`${i}\` [${val.judulLagu}](${val.url}) | \`${menite}:${detike} Diminta Oleh: ${val.usernameRequester} (${val.requester})\``)
        i++
    })
    let resp = `__**Sedang Diputar**__\n**${sedangDiputar.judulLagu}** ▶ -- **Diminta Oleh:** *🎵${sedangDiputar.requester}🎵*\n\n__**⭐ANTRIAN⭐**__\n`;

    for (var i = 1; i < antrian.length; i++) {
        resp += `${i}. **${antrian[i].judulLagu}** ▶ -- **Diminta Oleh:** *🎵${antrian[i].requester}🎵*\n`;
    }
    msg.channel.send(sms);

}