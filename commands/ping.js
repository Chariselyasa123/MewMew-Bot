exports.run = (client, msg, args) => {

    msg.reply('Manghitung ping... ➕').then(res => {
        const ping = res.createdTimestamp - msg.createdTimestamp

        msg.reply(`MewMew bot 💩 Ping : ${ping}, API Ping : ${client.ws.ping}`);
    });
}