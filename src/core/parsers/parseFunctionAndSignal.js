const getType = require('../getType')
const regex = require('../regex')
const token = require('../token')

module.exports = (section, line) => {
  if (line.split(' ')[0] === token.signal) {
    section.name = line.match(regex.signal.name).pop()
  } else {
    section.name = line.match(regex.function.name).pop()
    section.code = line.slice(0, -1)

    if (line.match(/^static/)) {
      section.static = true
    }
  }

  if (line.match(regex.function.typed.returnType)) {
    section.return_type = line.match(regex.function.typed.returnType)[1].trim()
  }

  if (line.match(regex.parameters)) {
    line
      .match(regex.parameters)[1]
      .trim()
      .split(/,[\s|\S]/)
      .forEach(param => {
        let row = {
          title: 'Parameters',
          name: param.trim(),
          type: '-',
          default: param.match(regex.default)
            ? param.match(regex.default).pop()
            : '-'
        }

        if (regex.type.test(param)) {
          row.type = param.match(regex.type)[1].trim()
          row.name = param.split(':')[0]
        } else if (regex.inferredType.test(param)) {
          let inferredType = param.match(regex.inferredType)[1].trim()
          row.type = getType(inferredType)
          row.name = param
            .match(regex.function.typed.parameters.inferredTypeName)[1]
            .trim()
        } else {
          row.name = param.split('=')[0]
        }

        section.table.push(row)
      })
  }

  return section
}
