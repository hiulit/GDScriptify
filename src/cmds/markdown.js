const checkArgument = require('../utils/checkArgument')
const config = require('../config')
const error = require('../utils/error')
const { name } = require('../../package.json')

module.exports = args => {
  checkArgument(args)

  let key = Object.keys(args[0])[0]
  let value = args[0][key]

  if (value === 'true') {
    value = true
  } else if (value === 'false') {
    value = false
  } else {
    error(`
ERROR: "${value}" is not a valid argument for "${key}"!

Try "${name} --help" for more info.
    `)
  }

  config.markdown = value
}
