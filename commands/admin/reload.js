const Command = require('../../utils/command/commandBuilder.js')
module.exports = new Command({
    alias : ['reload'],
    desc : 'Reloads a command after change has been made',
    usage : 'reload [command]',
    example : 'reload ping',
    admin : true,
    execute : function(params) {
        const {commandList, commands} = require('../../utils/command/command.js')
        for(i in commandList) {
            if(commandList[i].includes(params.args[0])) var type = i
        }
        if(!type) return params.msg.channel.send('Invalid Command')

        delete require.cache[require.resolve(`../${type}/${params.args[0]}.js`)]

        try {
            var command = require(`../${type}/${params.args[0]}.js`);

            var alias = command.alias

            for(var i=0;i<alias.length;i++) {
                commands[alias[i]] = command
            }

            params.msg.channel.send('Successfuly Reloaded ' +params.args[0])
        } catch(e) {
            params.msg.channel.send(e.toString().split('\n')[0])
        }
    }
})