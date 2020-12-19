exports.run = (client, msg, args, ops, embed) => {

    // console.log(user.tag);
    const sms = embed
        .setTitle('**Beberapa perintah di MewMew Bot 💩**\n')
        .setColor('#40eb34')
        .addFields({
            name: 'Perintah',
            value: '``+musik``\n\n``+cari``\n\n``+antrian``\n\n``+jeda``\n\n``+lanjut``\n\n``+ganti``\n\n``+vol``\n\n``+ping``\n\n``+crot``',
            inline: true
        }, {
            name: 'Deskripsi',
            value: '``+musik`` [Link Youtube] atau ``+musik`` [Judul Lagu]\n\n``+cari`` [Judul Lagu] lalu pilih 1-10\n\nUntuk Melihat lagu yang ada di antrian (playlist)\n\nUntuk menjeda (pause) lagu\n\nUntuk melanjutkan lagu yang dijeda (pause)\n\nUntuk mengganti lagu ke antrian berikutnya\n\nMenambah atau mengurangi volume pilih no 0 - 200\n\nCek Latensi MewMew Bot 💩\n\nMengeluarkan bot dari voice channel',
            inline: true
        })
    msg.channel.send(sms);
}