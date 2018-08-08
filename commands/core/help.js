const Command = require('../../utils/command/commandBuilder.js')
const config = require('../../config.json')
module.exports = new Command({
    alias : ['help', 'commands'],
    desc : 'Lists the commands or returns a detailed description',
    usage : 'help {command}',
    example : 'help ping',
    admin : false,
    execute : function(params) {
        if(params.args[0]) {
            specific(params)
        } else {
            display(params)
        }
    }
})

function display(params) {
    const {commandList} = require('../../utils/Command/Command.js')
    const embed = new params.embed()
    .setTitle('Commands')
    .setFooter(`Use '${config.prefix}help command' to get more info on a command`)
    .addField('Core', commandList['core'].join('\n'), true)
    if(config.admins.includes(params.msg.author.id)) embed.addField('Admin', commandList['admin'].join('\n'))
    params.msg.channel.send({embed})
}

function specific(params) {
    if(!params.commands[params.args[0]]) return display(params)
    if(params.commands[params.args[0]].admin && !config.admins.includes(params.msg.author.id)) return params.msg.channel.send('Woah, tis an admin command')
    const embed = new params.embed()
    .setTitle(`Detailed help for the ${params.aliasToCommand[params.args[0]]} command`)
    .setDescription(params.commands[params.args[0]].desc)
    .addField('Aliases', params.commands[params.args[0]].alias.join(', '))
    .addField('Usage', config.prefix+params.commands[params.args[0]].usage)
    .addField('Example', config.prefix+params.commands[params.args[0]].example)
    if(params.commands[params.args[0]].admin) embed.setFooter('Admin only command')
    params.msg.channel.send({embed})
}