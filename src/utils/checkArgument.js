const error = require('./error')
const { name } = require('../../package.json')

module.exports = args => {
  let opt = Object.keys(args[0])
  let arg = args[0][Object.keys(args[0])]

  if (!arg) {
    error(`
ERROR: "${opt}" is missing an argument!

Try "${name} --help" for more info.
    `)
  }
}
