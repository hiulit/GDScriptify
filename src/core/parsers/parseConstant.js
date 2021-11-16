const getType = require('../getType')
const regex = require('../regex')

module.exports = (section, line) => {
  section.name = line.match(regex.constant.name).pop()

  let row = {
    name: section.name,
    type: '-',
    default: line.match(regex.default) ? line.match(regex.default).pop() : '-'
  }

  row.type = getType(row.default) || '-'

  section.table.push(row)

  return section
}
