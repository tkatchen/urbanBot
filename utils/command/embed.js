const Discord = require('discord.js')
class embed {
    constructor () {
        this.embed = new Discord.RichEmbed()
        .setColor(0xff0000)
    }
    setTitle(title) {
        this.embed.setTitle(title)
        return this.embed
    }

    setDescription(desc) {
        this.embed.setDescription(desc)
        return this.embed
    }
    
    setColor(color) {
        this.embed.setColor(color)
        return this.embed
    }

    setTimestamp(date = new Date()) {
        this.embed.setTimestamp(date)
        return this.embed
    }

    setURL(url) {
        this.embed.setURL(url)
        return this.embed
    }

    setAuthor(name = '', icon = '', url = ''){
        this.embed.setAuthor({name, icon, url})
        return this.embed
    }

    addField(name, value, inline = false) {
        this.embed.addField(name, value, inline)
        return this.embed
    }

    addBlankField(inline = false) {
        this.embed.addBlankField(inline)
        return this.embed
    }

    setThumbnail(url) {
        this.embed.setThumbnail(url)
        return this.embed
    }

    setImage(url) {
        this.embed.setImage(url)
        return this.embed
    }

    setFooter(text, icon) {
        this.embed.setFooter(text, icon)
        return this.embed
    }

    attachFile(file) {
        this.embed.attachFile(file)
        return this.embed
    }
}

module.exports = embed