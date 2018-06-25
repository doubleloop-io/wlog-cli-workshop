const { addEntry } = require("../core/entry-controller")
const { execute: listCommand } = require("./ls-command")

function execute(commandArgs, commandOpts, deps) {
    const entry = {
        title: commandArgs[0]
    }

    addEntry(deps, entry)

    if (commandOpts.l) listCommand([], {}, deps)
}

module.exports = { execute }
