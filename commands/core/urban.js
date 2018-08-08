const Command = require('../../utils/command/commandBuilder.js')
const request = require('request')

module.exports = new Command({
    alias : ['urban'],
    desc : 'Searched the urban dictionary',
    usage : 'urban [word]',
    example : 'urban fml',
    admin : false,
    execute : function(params) {
        var word = params.args.join(' ')
        if(!word) return params.msg.channel.send('Please send a word')
        request(`http://api.urbandictionary.com/v0/define?term=${word}`, function(error, body) {
            var result = JSON.parse(body.body).list[0]
            if(!result) return params.msg.channel.send('Invalid word, please retry.')
            const embed = new params.embed()
            .setTitle(`${result.word} - ${result.permalink}`)
            .setDescription(result.definition)
            .addField('Example: ', result.example)
            .setFooter(`${result.author} - ${new Date(result.written_on)}`)
            params.msg.channel.send({embed})
        })
    }
})