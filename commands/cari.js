const search = require('yt-search');

exports.run = (client, msg, args, ops) => {

    search(args.join(' '), (err, res) => {
        if (err) {
            console.log(err);
            return msg.channel.send('❗ Maaf terjadi kesalahan.');
        }

        let videos = res.videos.slice(0, 10);

        let resp = '';
        for (var i in videos) {
            resp += `**[${parseInt(i)+1}]** \`${videos[i].title}\`\n`;
        }

        resp += `\n**Pilih nomer antara \`1-${videos.length}\``;

        msg.channel.send(resp);

        const filter = m => !isNaN(m.content) && m.content < videos.length + 1 && m.content > 0;
        const colektor = msg.channel.createMessageCollector(filter);

        colektor.videos = videos;
        colektor.on('collect', m => {
            let commandFile = require(`./musik`);
            commandFile.run(client, msg, [videos[parseInt(m.content) - 1].url], ops);
            if (m.hasOwnProperty('author')) colektor.stop()
        });
        // console.log(client.MessageCollector)

        // console.log(colektor.videos)
    });
}