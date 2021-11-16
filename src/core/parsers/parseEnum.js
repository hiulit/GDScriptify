const getType = require('../getType')
const regex = require('../regex')

module.exports = (section, line) => {
  section.name = line.match(regex.enum.name)
    ? line.match(regex.enum.name).pop()
    : '-'

  if (section.name === '-') {
    return
  }

  if (regex.enum.values.test(line)) {
    line
      .match(regex.enum.values)[1]
      .trim()
      .split(/,[\s\S]/)
      .forEach(value => {
        let row = {
          title: 'Values',
          name: value.trim().split('=')[0],
          type: '-',
          default: regex.default.test(value)
            ? value.match(regex.default).pop()
            : '-'
        }

        row.type = getType(row.default) || '-'

        section.table.push(row)
      })
  }

  return section
}
