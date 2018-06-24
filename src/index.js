#!/usr/bin/env node
const minimist = require("minimist")

const args = minimist(process.argv.slice(2))

const [command, ...commandArgs] = args._
const { _, ...commandOpts } = args

console.log("command: ", command)
console.log("args: ", commandArgs)
console.log("opts: ", commandOpts)

if (command == "echo") {
    const [message] = commandArgs
    console.log(`You're a wise man who said '${message}'`)
} else {
    console.log(`Unknown command '${command}'`)
}
