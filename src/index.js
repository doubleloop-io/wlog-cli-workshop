#!/usr/bin/env node
const minimist = require("minimist")
const {
    makeDisplay
} = require("./infrastructure/adapters/make-console-display")
const {
    makeEntryCatalog
} = require("./infrastructure/adapters/make-nedb-entry-catalog")

const args = minimist(process.argv.slice(2))

const [command = "help", ...commandArgs] = args._
const { _, ...commandOpts } = args
const isDebug = commandOpts.d || commandOpts.debug

if (isDebug) {
    console.log("command: ", command)
    console.log("args: ", commandArgs)
    console.log("opts: ", commandOpts)
}

start()

async function start() {
    const dependencies = {
        entryCatalog: await makeEntryCatalog({ filename: "entries.db" }),
        display: makeDisplay()
    }

    try {
        require(`./infrastructure/${command}-command`).execute(
            commandArgs,
            commandOpts,
            dependencies
        )
    } catch (err) {
        if (isDebug) console.log(err)

        console.log(`Unknown command '${command}'`)
    }
}
