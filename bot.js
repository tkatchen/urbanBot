const Discord = require('discord.js')
const bot = new Discord.Client()

const config = require('./config.json')

const CommandClass = require('./utils/command/command.js').Command
const command = new CommandClass(bot)

bot.on('ready', () => {
    bot.user.setPresence({game: {name : config.prefix+'help'}})
    console.log('online!')
})

bot.on('message', msg => {
    if(msg.content[0] != config.prefix) return
    if(msg.author.bot) return
    if(msg.channel.type === "dm") return
    try{
        command.execute(msg)
    } catch(e) {
        msg.channel.send('The command broke with the erorr: `'+e+'`')
    }
})

bot.login(config.token)