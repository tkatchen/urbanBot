class CommandBuilder {
    constructor(args) {
        this.alias = args.alias
        this.desc = args.desc
        this.usage = args.usage
        this.example = args.example
        this.execute = args.execute
        this.admin = args.admin
    }

    execute(params) {
        this.execute(params)
    }
}

module.exports = CommandBuilder