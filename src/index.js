#!/usr/bin/env node
const minimist = require("minimist")

const args = minimist(process.argv.slice(2))

const [command = "help", ...commandArgs] = args._
const { _, ...commandOpts } = args
const isDebug = commandOpts.d || commandOpts.debug

if (isDebug) {
    console.log("command: ", command)
    console.log("args: ", commandArgs)
    console.log("opts: ", commandOpts)
}

try {
    require(`./infrastructure/${command}-command`).execute(
        commandArgs,
        commandOpts
    )
} catch (err) {
    if (isDebug) console.log(err)

    console.log(`Unknown command '${command}'`)
}
