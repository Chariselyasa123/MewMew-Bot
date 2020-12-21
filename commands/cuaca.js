const axios = require("axios");
require("dotenv").config();

exports.run = (client, msg, args, ops, embed) => {

    // icon = http://openweathermap.org/img/w/[iconcode].png
    // Api = 'https://api.openweathermap.org/data/2.5/weather?q=[kota]&appid=[key]'

    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    function konvertWaktu(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'Septeber', 'October', 'November', 'Desember'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
        return time;
    }

    if (!args[0]) return msg.channel.send('❗ Tambahkan parameter kota ``+cuaca`` ``[kota]``')

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args[0]},id&appid=${process.env.CUACA}&units=metric&lang=id`)
        .then(res => {
            const sms = embed
                .setTitle(`**Cuaca saat ini di ${res.data.name}**`)
                .setColor('#e6e6e6')
                .setFooter('Kalo bingung perintahnya, tinggal ketik *+perintah*')
                .setThumbnail(`https://openweathermap.org/img/w/${res.data.weather[0].icon}.png`)
                .setDescription(`${res.data.weather[0].description.capitalize()}, ${konvertWaktu(res.data.dt)}`)
                .addFields({
                    name: `Suhu Saat ini 🌡 ${Math.round(res.data.main.temp)}${String.fromCharCode(176)}C`,
                    value: `Terasa seperti ${Math.round(res.data.main.feels_like)}${String.fromCharCode(176)}C`,
                    inline: true
                }, {
                    name: `Kelembapan`,
                    value: `${res.data.main.humidity}%`,
                    inline: true
                }, {
                    name: `Tekanan Udara 💨`,
                    value: `${res.data.main.pressure}hPa`,
                    inline: true
                }, {
                    name: `Jarak Pandang 👀`,
                    value: `${res.data.visibility/1000}.0Km`,
                    inline: true
                }, {
                    name: `Angin 🍃`,
                    value: `Kecepatan : *${res.data.wind.speed}m/s*\nDerajat : *${res.data.wind.deg}${String.fromCharCode(176)}*`,
                    inline: true
                }, {
                    name: `Awan di langit ☁`,
                    value: `${res.data.clouds.all}%`,
                    inline: true
                }, {
                    name: `Matahari Terbit 🌄`,
                    value: `${konvertWaktu(res.data.sys.sunrise)}`,
                    inline: true
                }, {
                    name: `Matahari Terbenam 🌆`,
                    value: `${konvertWaktu(res.data.sys.sunset)}`,
                    inline: true
                })

            msg.channel.send(sms)
        })
        .catch(err => {
            console.log('Err:',
                err)
            msg.channel.send('❗ Maaf kota tidak ditemukan. API nya ampas nih 😡')
        })
}