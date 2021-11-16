#!/usr/bin/env node

const config = require('./config')
const error = require('./utils/error')
const fs = require('fs')
const generateCodeReferenceFile = require('./core/generateCodeReferenceFile')
const parsedArgs = require('./core/parseArgs')
const path = require('path')
const { name } = require('../package.json')

module.exports = () => {
  const args = parsedArgs(process.argv.slice(2))

  while (args.length) {
    cmd = Object.keys(args[0])[0]

    switch (cmd) {
      case '-h':
      case '--help':
        require(`./cmds/help`)(args)
        break

      case '-d':
      case '--directory':
        args.findIndex(arg => arg === 'd' || arg === 'directory')
        require(`./cmds/directory`)(args)
        break

      case '-o':
      case '--output':
        args.findIndex(arg => arg === 'o' || arg === 'output')
        require(`./cmds/output`)(args)

        break

      case '-c':
      case '--code':
        args.findIndex(arg => arg === 'c' || arg === 'code')
        require(`./cmds/code`)(args)

        break

      case '-m':
      case '--markdown':
        args.findIndex(arg => arg === 'm' || arg === 'markdown')
        require(`./cmds/markdown`)(args)

        break

      case '-r':
      case '--readme':
        args.findIndex(arg => arg === 'r' || arg === 'readme')
        require(`./cmds/readme`)(args)

        break

      case '-v':
      case '--version':
        require(`./cmds/version`)(args)
        break

      default:
        error(`
ERROR: "${cmd}" is not a valid option!

Use "${name} help" to see all the options.
        `)
        break
    }

    args.shift()
  }

  if (!fs.existsSync(path.join(config.projectDir, config.projectFile))) {
    error(`
ERROR: "${config.projectDir}" doesn't have a "${config.projectFile}" file!
    `)
  }

  config.outputDir = path.join(config.projectDir, config.outputDir)

  generateCodeReferenceFile()
}
