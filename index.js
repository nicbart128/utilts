const config = require('./config.json');
const Discord = require('discord.js');
const bot = new Discord.Client();
const ms = require('ms')
const Fs = require("fs")


bot.on('ready', async () => {
    try {
        let serverIn = bot.guilds.size;
        console.log(bot.user.tag + ' has logged in');

        function pickstatus() {
            let status = [' out for staff apps', ' COVID-19', ' for rule breakers', ' giveaways', ' everything go wrong', ' 2478945 members', ' the world burn', ' NicholasDrout', ' everyone', ' the mods in the closet', 'how to play minecraft', ' #general', ' no', ' YouTube']

            let Status = Math.floor(Math.random() * status.length);

            bot.user.setActivity(status[Status], {
                type: "WATCHING",
            });
        };
        setInterval(pickstatus, 30000)
    } catch (err) {
        console.log(err);
    }
})

bot.on('message', async (message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    var bonk = message.guild.emojis.cache.find(emoji => emoji.name === 'bonk')
    if (message.content.length >= 400) {
        message.delete();
        message.channel.send(`${bonk} ${message.author}, you are not allowed to put spam in the server. Continuing will result into a mute.`)
    }

    function isValidURL(string) {
        var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return (res !== null)
    };
    var testContent = message.content;
    var bonk = message.guild.emojis.cache.find(emoji => emoji.name === 'bonk')
    if (isValidURL(testContent)) {
        message.delete();
        message.channel.send(`${bonk} ${message.author}, You are not allowed to send links to this channel. Continuing will result into a mute.`)

        var reason = ('Warning from Auto Mod | Using Filtered Language')
        var filterEmbed = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setTitle('You have been warned in Nicholas\'s World')
            .setDescription('You received a warning from the moderation system')
            .addField('Reason:', '[AutoMod] Sending Links or invites')
            .addField("Expires", '\', `24h`')
        try {
            message.author.send(filterEmbed)
        } catch (err) {
            console.warn(err)
        }
    }





   

    var prefix = config.prefix;
    if (!message.content.toLowerCase().startsWith(prefix)) return;

    var args = message.content.split(' ')
    var cmd = args.shift().slice(prefix.length).toLowerCase();

    try {
        var file = require(`./commands/${cmd}.js`);
        file.run(bot, message, args)
    } catch (err) {
        console.warn(err);
    }
});

bot.login(config.token)
