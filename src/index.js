#!/usr/bin/env node
const minimist = require("minimist")

const args = minimist(process.argv.slice(2))

const [command, ...commandArgs] = args._
const { _, ...commandOpts } = args

console.log("command: ", command)
console.log("args: ", commandArgs)
console.log("opts: ", commandOpts)
