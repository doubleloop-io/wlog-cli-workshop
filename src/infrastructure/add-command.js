const { addEntry } = require("../core/entry-controller")

function execute(commandArgs, commandOpts, deps) {
    const entry = {
        title: commandArgs[0]
    }

    addEntry(deps, entry)
}

module.exports = { execute }
