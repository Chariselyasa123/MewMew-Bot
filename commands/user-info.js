exports.run = async (client, msg, args, ops, embed) => {

    const member = msg.mentions.members.first() || msg.member;
    const date = member.user.createdAt.toString().split(' ');
    const dateRaw = member.user.createdAt;
    const status = member.user.presence.status;
    const userBadge = member.user.flags.toArray();
    const join = member.joinedAt.toString().split(' ');
    const joinRaw = member.joinedAt;
    const now = new Date();

    // Fungsi membandingkan tahun lalu dan sekarang sehingga dapat perbedaan-nya
    function diff_tahun(dt2, dt1) {
        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= (60 * 60 * 24);
        if (Math.abs(Math.round(diff / 365.25)) == 0 || Math.abs(Math.round(diff / 365.25)) == 1) {
            return `${Math.abs(Math.round(diff / 30.4167))} Bulan`;
        } else if (Math.abs(Math.round(diff / 30.4167)) == 0 || Math.abs(Math.round(diff / 30.4167)) == 1) {
            return `${Math.abs(Math.round(diff / 1))} Hari`;
        } else {
            return `${Math.abs(Math.round(diff / 365.25))} Tahun`;
        }
    }

    function lagiApa(s) {
        if (s == 'online') {
            return 'Online 🟢'
        } else if (s == 'offline') {
            return 'Offline 🔴'
        } else if (s == 'idle') {
            return 'Coli 💦💦'
        } else if (s == 'dnd') {
            return 'Berak 💩'
        } else {
            return 'Udah ded ☠'
        }

    }


    const users = embed
        .setTitle(`**Info Akun** -- ${lagiApa(status)}`)
        .setColor('943100')
        .setThumbnail(msg.guild.iconURL({
            dynamic: true,
            size: 512
        }))
        .setFooter('Kalo bingung perintahnya, tinggal ketik *+perintah*')
        .setAuthor(member.user.tag, client.guilds.resolve(msg.guild.id).members.resolve(member.user.id).user.avatarURL())
        .addField('Dibuat pada ⏳', `${date[0]}, ${date[2]} ${date[1]} ${date[3]} \n *${diff_tahun(now, dateRaw)} yang lalu*`, true)
        .addField('Role 👮‍♂️', member.roles.cache.map(r => `${r.name}`), true)
        .addField('Lagi apa ❔', member.user.presence.activities.map(e => `${e.type} : ${e.name} \n ${e.details} di ${e.state}`).length === 0 ? 'Ga lagi apa-apa' : member.user.presence.activities.map(e => `${e.type} : ${e.name}`), true)
        .addField('Info Lainya', [
            `**>User ID:** ${member.user.id}`,
            `**>Foto Profil:** [Link Foto](${member.user.displayAvatarURL({ dynamic: true })})`,
            `**>Badge Discord:** ${userBadge.length ? userBadge.map(f => f[f]).join(', ') : 'Ga punya badge'}`,
            `**>Tanggal Gabung Server:** ${join[0]}, ${join[2]} ${join[1]} ${join[3]} *${diff_tahun(now, joinRaw)} yang lalu*`,
            `**>Asal:** ${date[7]} 🏳`
        ])

    msg.channel.send(users);
    console.log(join)
}