const requreDir = require('require-dir')
const commandFiles = requreDir('../../Commands', {recurse:true})
var commandList = {}
for(i in commandFiles) {
    commandList[i] = []
    for(j in commandFiles[i]) {
        commandList[i].push(j)
    }
}
const CommandBuilder = require('./CommandBuilder.js')

const {prefix} = require('../../config.json')

const embed = require('./embed.js')

var commands = {}
var aliasToCommand = {}
const talked = new Set()
class Command {
    constructor(bot) {
        for(var key in commandFiles) {
            if(commandFiles[key] instanceof CommandBuilder) {
                addCommand(commandFiles[key])
            } else {
                for(var key2 in commandFiles[key]) {
                    if(commandFiles[key][key2] instanceof CommandBuilder) {
                        addCommand(commandFiles[key][key2])
                    }
                }
            }
        }
    }
    
    execute(msg) {
        if(talked.has(msg.author.id)) return msg.channel.send('Please wait between messages')
        var args = msg.content.split(' ').slice(1)
        var command = msg.content.split(' ')[0].slice(prefix.length).toLowerCase()
        var param  = defineParam(msg, command, args, this.client)
        if(!commands[command]) return
        if(commands[command].admin && msg.author.id != '212026264742002688') return msg.channel.send('❌ You\'re Missing Permissions')  
        commands[command].execute(param)
        talked.add(msg.author.id)
        setTimeout(() => {
            talked.delete(msg.author.id)
        }, 500)
    }
}

function addCommand(command) {
    var alias = command.alias
    for(var i=0;i<alias.length;i++) {
        commands[alias[i]] = command
        aliasToCommand[alias[i]] = alias[0]
    }
}

function defineParam (msg, command, args, bot){
    var param = {
        "msg":msg,
		"args":args,
		"command":command,
        "bot":bot,
        "commands":commands,
        "aliasToCommand":aliasToCommand,
        "embed":embed,
    }
    return param
}

module.exports = {
    Command,
    commandList,
    commands
};
