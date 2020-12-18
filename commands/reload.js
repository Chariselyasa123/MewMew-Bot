exports.run = (client, msg, args, ops) => {

    if (msg.author.id !== ops.ownerID) return msg.channel.send('Maaf cuman CUPU yang bisa AWokwokawok 😋');

    try {
        delete require.cache[require.resolve(`./${args[0]}`)];
    } catch (e) {
        return msg.channel.send(`Maaf gabisa reload: ${args[0]} 😢`);
    }

    msg.channel.send(`Berhasil Reload: ${args[0]} 🎉`);
}