const ytdl = require('ytdl-core');

exports.run = async (client, msg, args, ops) => {

    // Cek ada di voice chat atau engga
    if (!msg.member.voice.channel) return msg.channel.send('❗ Tolong masuk voice 🎧 channel dulu dong KK!');

    if (!args[0]) return msg.channel.send('❗ Kasih link dong kk, baru mulai musiknya');

    let validasi = await ytdl.validateURL(args[0]);

    if (!validasi) return msg.channel.send('❗ Kasih link yang bener Woi!! 😠');

    let info = await ytdl.getInfo(args[0]);

    let data = ops.active.get(msg.guild.id) || {};

    if (!data.connection) data.connection = await msg.member.voice.channel.join();
    if (!data.queue) data.queue = [];
    data.guildID = msg.guild.id;

    // Nambahin queue (Antrian lagu)
    data.queue.push({
        judulLagu: info.videoDetails.title,
        requester: msg.author.tag,
        url: args[0],
        pemberitahuan: msg.channel.id
    })

    if (!data.dispatcher) mainkan(client, ops, data);
    else {
        msg.channel.send(`Menambahkan Lagu Kedalam Antrian 🎶: ${info.videoDetails.title} 🌳 Diminta Oleh 👦: ${msg.author.username}`);
    }

    ops.active.set(msg.guild.id, data);
}

// Definisikan fungsi +musik
async function mainkan(client, ops, data) {

    // Pesan sedang diputar
    client.channels.cache.get(data.queue[0].pemberitahuan).send(`Yang Sedang Diputar ▶: ${data.queue[0].judulLagu} 🌳 Diminta Oleh 👦: ${data.queue[0].requester}`);

    // Update data
    data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, {
        filter: 'audioonly'
    }));
    data.dispatcher.guildID = data.guildID;

    data.dispatcher.on('finish', () => {
        selesai(client, ops, data.dispatcher);
    })
}

function selesai(client, ops, dispatcher) {
    let ambil = ops.active.get(dispatcher.guildID);

    ambil.queue.shift();

    if (ambil.queue.length > 0) {
        ops.active.set(dispatcher.guildID, ambil);

        mainkan(client, ops, ambil);
    } else {
        ops.active.delete(dispatcher.guildID);

        let vc = client.guilds.cache.get(dispatcher.guildID).me.voice.channel;
        if (vc) vc.leave();
    }
}