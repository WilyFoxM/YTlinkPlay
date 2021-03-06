const Discord = require('discord.js');
const ytdl = require('discord-ytdl-core');
const express = require('express');
const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => res.send('Working...'));

const bot = new Discord.Client();

let token = process.env.TOKEN;
let prefix = '*';

bot.on('message', async message =>{
    if(message.content.startsWith(prefix + 'play')) {
        play(message.content.split(' ')[1], message);
        return;
    }
});

let play = async (url, message) => {
    await message.member.voice.channel.join().then(connection => {
        let stream = ytdl(url, {
            filter: "audioonly",
            opusEncoded: true,
            encoderArgs: ['-af', 'bass=g=10,dynaudnorm=f=200']
        });
        connection.play(stream, {
            type: "opus"
        })
        .on('finish', (e) => {
            message.member.voice.channel.leave();
        })
    });
}

app.listen(port, () => bot.login(token));
