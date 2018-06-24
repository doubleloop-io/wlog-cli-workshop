function execute(commandArgs) {
    const [message] = commandArgs
    console.log(`You're a wise man who said '${message}'`)
}

module.exports = { execute }
