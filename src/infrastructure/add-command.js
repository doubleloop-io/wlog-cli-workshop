const { addEntry } = require("../core/entry-controller")
const { execute: listCommand } = require("./ls-command")
const bdate = require("../core/bdate")

function execute(commandArgs, commandOpts, deps) {
    const entry = {
        title: commandArgs[0],
        date: bdate.parse(commandArgs[1])
    }

    addEntry(deps, entry)

    if (commandOpts.l) listCommand([], {}, deps)
}

module.exports = { execute }
