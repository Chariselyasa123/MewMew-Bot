const ytdl = require('ytdl-core');
const Discord = require('discord.js');

exports.run = async (client, msg, args, ops) => {

    const embed = new Discord.MessageEmbed();
    // Cek ada di voice chat atau engga
    if (!msg.member.voice.channel) return msg.channel.send('❗ Tolong masuk voice 🎧 channel dulu dong KK!');

    if (!args[0]) return msg.channel.send('❗ Kasih link dong kk, baru mulai musiknya');

    let validasi = await ytdl.validateURL(args[0]);

    if (!validasi) {
        let commandFile = require('./jjasdwheu123hasduhwuhierhgbhisdbfksadfikegldsfeuyjhj');
        return commandFile.run(client, msg, args, ops);
    }

    // if (!validasi) return msg.channel.send('❗ Kasih link yang bener Woi!! 😠');
    msg.channel.send(`Mencari musik 🔎`)

    let info = await ytdl.getInfo(args[0]);

    let data = ops.active.get(msg.guild.id) || {};

    if (!data.connection) data.connection = await msg.member.voice.channel.join();
    if (!data.queue) data.queue = [];
    data.guildID = msg.guild.id;

    // Nambahin queue (Antrian lagu)
    data.queue.push({
        judulLagu: info.videoDetails.title,
        lamaLagu: info.videoDetails.lengthSeconds,
        requester: msg.author.tag,
        usernameRequester: msg.member.displayName,
        fotoRequester: msg.author.displayAvatarURL(),
        url: args[0],
        pemberitahuan: msg.channel.id,
        thumbnails: info.videoDetails.thumbnails[2].url,
        kategori: info.videoDetails.category
    })

    if (!data.dispatcher) mainkan(client, ops, data, embed, info);
    else {
        const menit = Math.floor(info.videoDetails.lengthSeconds / 60);
        const detik = info.videoDetails.lengthSeconds - menit * 60;
        let totalMenit = data.queue.reduce((a, b) => a + parseInt(b.lamaLagu), 0);
        const total = totalMenit - parseInt(info.videoDetails.lengthSeconds);
        const newMenit = Math.floor(total / 60);
        const newDetik = total - newMenit * 60;
        const sms = embed
            .setAuthor('Ditambahkan kedalam antrian', `${msg.author.avatarURL()}`)
            .setDescription(`[${info.videoDetails.title}](${args[0]})`)
            .setThumbnail(`${info.videoDetails.thumbnails[3].url}`)
            .addFields({
                name: 'Channel',
                value: `${info.videoDetails.ownerChannelName}`,
                inline: true
            }, {
                name: 'Durasi Lagu',
                value: `${menit}:${detik}`,
                inline: true
            }, {
                name: 'Estimasi lagu dimulai',
                value: `${newMenit}:${newDetik}`,
                inline: true
            }, {
                name: 'Posisi dalam antrian',
                value: `${data.queue.length-1}`
            })
        msg.channel.send(sms);
    }

    ops.active.set(msg.guild.id, data);
}

// Definisikan fungsi +musik
async function mainkan(client, ops, data, embed, info) {

    const menit = Math.floor(data.queue[0].lamaLagu / 60);
    const detik = data.queue[0].lamaLagu - menit * 60;
    const sms = embed
        .setTitle(`${data.queue[0].judulLagu}`)
        .setThumbnail(`${data.queue[0].thumbnails}`)
        .setDescription(`Panjang lagu ${menit}:${detik} \`${data.queue[0].kategori}\``)
    // Pesan sedang diputar
    client.channels.cache.get(data.queue[0].pemberitahuan).send(sms);

    // Update data
    data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, {
        filter: 'audioonly'
    }));
    data.dispatcher.guildID = data.guildID;

    data.dispatcher.on('finish', () => {
        selesai(client, ops, data.dispatcher, embed, info);
    })

}

function selesai(client, ops, dispatcher, embed, info) {
    let ambil = ops.active.get(dispatcher.guildID);
    // let info = await ytdl.getInfo(args[0]);

    ambil.queue.shift();

    if (ambil.queue.length > 0) {
        ops.active.set(dispatcher.guildID, ambil);

        mainkan(client, ops, ambil, embed, info);
    } else {
        ops.active.delete(dispatcher.guildID);

        let vc = client.guilds.cache.get(dispatcher.guildID).me.voice.channel;
        if (vc) vc.leave();
    }
}