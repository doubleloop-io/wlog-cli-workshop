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

if (command === "echo") {
    require("./infrastructure/echo-command").execute(commandArgs, commandOpts)
} else if (command === "help") {
    require("./infrastructure/help-command").execute(commandArgs, commandOpts)
} else {
    console.log(`Unknown command '${command}'`)
}
