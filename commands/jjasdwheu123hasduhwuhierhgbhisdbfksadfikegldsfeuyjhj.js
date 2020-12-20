const search = require('yt-search');

exports.run = (client, msg, args, ops) => {

    search(args.join(' '), (err, res) => {
        if (err) {
            console.log(err);
            return msg.channel.send('❗ Maaf terjadi kesalahan.');
        }

        let videos = res.videos.slice(0, 1);

        let commandFile = require(`./musik`);
        commandFile.run(client, msg, [videos[0].url], ops);
    });
}