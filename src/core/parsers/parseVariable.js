const getType = require('../getType')
const regex = require('../regex')
const token = require('../token')

module.exports = (section, lines, index) => {
  let line = lines[index]

  if (line.match(/^export/)) {
    section.exported = true
  }

  if (line.match(/^onready/)) {
    section.onready = true
  }

  section.name = line.match(regex.variable.name).pop()

  let row = {
    name: section.name,
    type: '-',
    default: line.match(regex.default) ? line.match(regex.default).pop() : '-'
  }

  if (line.match(regex.parameters)) {
    row.type = line
      .match(regex.parameters)[1]
      .trim()
      .split(',')[0]
  } else if (line.match(regex.type)) {
    row.type = line.match(regex.type)[1].trim()
  } else if (line.match(regex.inferredType)) {
    let inferredType = line.match(regex.inferredType)[1].trim()
    row.type = getType(inferredType)
  } else {
    row.type = getType(row.default)
  }

  if (!/^[a-zA-Z_]+/.test(row.default)) {
    let variableType
    let startToken
    let endToken
    let sliceNumber

    switch (row.type) {
      case 'Array':
        variableType = 'Array'
        startToken = token.array.start
        endToken = token.array.end
        sliceNumber = -1

        break

      case 'Dictionary':
        variableType = 'Dictionary'
        startToken = token.dictionary.start
        endToken = token.dictionary.end
        sliceNumber = -1

        break
      default:
        break
    }

    if (row.type === variableType && line.slice(sliceNumber) !== endToken) {
      let lineIndex = index

      while (lines[lineIndex].slice(sliceNumber) !== endToken) {
        lineIndex += 1
        row.default += `${lines[lineIndex].trim()}`
        continue
      }

      section.code = section.code.replace(startToken, row.default)
    }
  }

  if (line.match(regex.variable.setget)) {
    let setget = line.match(regex.variable.setget)[1].trim()

    let setter = setget.split(',')[0]
    if (setter) {
      setter = setter.trim()
      row.setter = setter
    }

    let getter = setget.split(',')[1]
    if (getter) {
      getter = getter.trim()
      row.getter = getter
    }
  }

  section.table.push(row)

  return section
}
