const axios = require("axios");

exports.run = (client, msg, args, ops, embed) => {

    // https://api.opendota.com/api/heroStats

    function capitalizeKata(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    if (!args[0]) return msg.channel.send('❗ Tambahkan parameter hero ``+dota-hero`` ``[hero]``')

    axios.get('https://api.opendota.com/api/heroStats')
        .then(res => {
            const hero = res.data.find(e => e.localized_name == capitalizeKata(`${args[0]}`));
            const sms = embed
                .setTitle(`Deskripsi Hero Dota 2 ${hero.localized_name}`)
                .setColor('#381e1c')
                .setFooter('Kalo bingung perintahnya, tinggal ketik *+perintah*')
                .setThumbnail(`https://api.opendota.com${hero.img}`)
                .setDescription(`*${hero.roles}*`)
                .addField('Info Hero', [
                    `**>Attribut Utama:** ${hero.primary_attr}`,
                    `**>Tipe Serangan:** ${hero.attack_type}`,
                    `**>Hp Awal:** ${hero.base_health}`,
                    `**>Hp Regen Awal:** ${hero.base_health_regen}`,
                    `**>Hp Awal:** ${hero.base_health}`,
                    `**>Hp Awal:** ${hero.base_health}`,
                    `**>Hp Awal:** ${hero.base_health}`,
                    `**>Hp Awal:** ${hero.base_health}`,
                    `**>Hp Awal:** ${hero.base_health}`,
                    `**>Hp Awal:** ${hero.base_health}`,
                    `**>Hp Awal:** ${hero.base_health}`,
                    `**>Hp Awal:** ${hero.base_health}`,
                    `**>Hp Awal:** ${hero.base_health}`,
                    `**>Hp Awal:** ${hero.base_health}`,
                    `**>Hp Awal:** ${hero.base_health}`,
                    `**>Hp Awal:** ${hero.base_health}`,
                ])

            msg.channel.send(sms)
        })
        .catch(err => {
            console.log(err)
        })

}