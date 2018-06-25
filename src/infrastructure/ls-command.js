const { listEntries } = require("../core/entry-controller")

function execute(commandArgs, commandOpts, deps) {
    listEntries(deps)
}

module.exports = { execute }
