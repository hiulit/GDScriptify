const checkArgument = require('../utils/checkArgument')
const config = require('../config')

module.exports = args => {
  checkArgument(args)

  let key = Object.keys(args[0])[0]
  let value = args[0][key]

  config.outputDir = value
}
