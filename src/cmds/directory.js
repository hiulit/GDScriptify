const checkArgument = require('../utils/checkArgument')
const config = require('../config')
const error = require('../utils/error')
const fs = require('fs')
const path = require('path')

module.exports = args => {
  checkArgument(args)

  let key = Object.keys(args[0])[0]
  let value = args[0][key]

  if (value.split(path.sep)[0] === '.') {
    value = path.join(
      process.cwd(),
      value
        .split(path.sep)
        .slice(1)
        .join(path.sep)
    )
  }

  if (!fs.existsSync(value)) {
    error(`
ERROR: "${value}" doesn't exist!
    `)
  }

  config.projectDir = value
}
