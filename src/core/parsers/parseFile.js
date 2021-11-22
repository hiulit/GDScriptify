const config = require('../../config')
const fs = require('fs')
const parseConstant = require('./parseConstant')
const parseDocstring = require('./parseDocstring')
const parseEnum = require('./parseEnum')
const parseExample = require('./parseExample')
const parseFunctionAndSignal = require('./parseFunctionAndSignal')
const parseVariable = require('./parseVariable')
const path = require('path')
const regex = require('../regex')
const token = require('../token')

module.exports = filePath => {
  let file = {}
  let lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/)

  switch (path.extname(filePath)) {
    case '.cfg':
      for (let index = 0; index < lines.length; index++) {
        const line = lines[index]

        if (line.lastIndexOf('name', 0) === 0) {
          file.name = line.split('"')[1]
        }

        if (line.lastIndexOf('description', 0) === 0) {
          if (line.slice(-1) !== '"') {
            file.description = `${line}\n`
            let lineIndex = index

            while (lines[lineIndex].slice(-1) !== '"') {
              lineIndex += 1
              file.description += `${lines[lineIndex]}\n`

              continue
            }
            file.description = file.description.match(
              /"([^"\\]*(?:\\.[^"\\]*)*)"/
            )[1]
          } else {
            file.description = line.match(/"([^"\\]*(?:\\.[^"\\]*)*)"/)[1]
          }
        }

        if (line.lastIndexOf('author', 0) === 0) {
          file.author = line.split('"')[1]
        }

        if (line.lastIndexOf('version', 0) === 0) {
          file.version = line.split('"')[1]
        }
      }

      break
    case '.godot':
      for (let index = 0; index < lines.length; index++) {
        const line = lines[index]

        if (line.lastIndexOf('config/name', 0) === 0) {
          file.name = line.split('"')[1]
        }

        if (line.lastIndexOf('config/description', 0) === 0) {
          if (line.slice(-1) !== '"') {
            file.description = `${line}\n`
            let lineIndex = index

            while (lines[lineIndex].slice(-1) !== '"') {
              lineIndex += 1
              file.description += `${lines[lineIndex]}\n`

              continue
            }
            file.description = file.description.match(
              /"([^"\\]*(?:\\.[^"\\]*)*)"/
            )[1]
          } else {
            file.description = line.match(/"([^"\\]*(?:\\.[^"\\]*)*)"/)[1]
          }
        }

        if (line.lastIndexOf('config/version', 0) === 0) {
          file.version = line.split('"')[1]
        }

        if (line.lastIndexOf('config/godot_version', 0) === 0) {
          file.godotVersion = line.split('"')[1]
        }

        if (line.lastIndexOf('config/license', 0) === 0) {
          file.license = line.split('"')[1]
        }

        if (line.lastIndexOf('config/author', 0) === 0) {
          file.author = line.split('"')[1]
        }

        if (line.lastIndexOf('config/repository', 0) === 0) {
          file.repository = line.split('"')[1]
        }

        if (line.lastIndexOf('config/banner', 0) === 0) {
          file.banner = line.split('"')[1]
        }

        if (line.lastIndexOf('config/patreon', 0) === 0) {
          file.support = file.support || {}
          file.support['patreon'] = line.split('"')[1]
        }

        if (line.lastIndexOf('config/ko-fi', 0) === 0) {
          file.support = file.support || {}
          file.support['ko-fi'] = line.split('"')[1]
        }

        if (line.lastIndexOf('config/buy_me_a_coffee', 0) === 0) {
          file.support = file.support || {}
          file.support['buy_me_a_coffee'] = line.split('"')[1]
        }

        if (line.lastIndexOf('config/paypal', 0) === 0) {
          file.support = file.support || {}
          file.support['paypal'] = line.split('"')[1]
        }
        if (line.lastIndexOf('[autoload]', 0) === 0) {
          file.singletons = []
          let lineIndex = index
          lineIndex += 1

          while (lines[lineIndex].charAt(0) !== '[') {
            lineIndex += 1

            if (
              lines[lineIndex].length === 0 ||
              lines[lineIndex].charAt(0) === '['
            ) {
              continue
            }

            let singletonName = lines[lineIndex].split('=')[0].trim()
            let singletonPath = lines[lineIndex]
              .split('=')[1]
              .trim()
              .replace(/\*|"/g, '')

            file.singletons.push({
              name: singletonName,
              path: singletonPath
            })
          }
        }
      }

      break

    case '.gd':
      file = {
        name: null,
        description: null,
        path: `${filePath.replace(config.projectDir + '/', '')}`,
        icon: null,
        tool: false,
        extends: null,
        singleton: false,
        sections: {
          signals: [],
          enums: [],
          constants: [],
          variables: [],
          functions: []
        }
      }

      for (let index = 0; index < lines.length; index++) {
        let section = {
          name: null,
          description: null,
          code: null,
          table: []
        }

        switch (lines[index].split(' ')[0]) {
          case token.tool:
            file.tool = true

            break
          case token.className:
            let properties = lines[index]
              .match(regex.className)
              .pop()
              .split(',')

            file.name = properties[0].trim()

            if (properties[1]) {
              file.icon = properties[1].replace(/"/g, '').trim()
            }

            break
          case token.extends:
            file.extends = lines[index].match(regex.extends).pop()

            break
          case token.docstring:
            if (regex.at.example.test(lines[index])) {
              section.example = parseExample(lines, index)
            }

            section.description = parseDocstring(lines[index])

            let i = 1

            while (lines[index + i].lastIndexOf(token.docstring, 0) === 0) {
              if (lines[index + i].trim() === token.docstring) {
                section.description += '\n\n'
              } else if (
                lines[index + i]
                  .replace(token.docstring, '')
                  .trim()
                  .match(regex.markdown.list)
              ) {
                section.description += '\n'
              } else {
                section.description += ' '
              }

              if (regex.at.example.test(lines[index + i])) {
                section.example = parseExample(lines, index + i)
              }

              section.description += parseDocstring(lines[index + i])

              i++
            }

            if (section.example) {
              section.description = section.description.trim()
            }

            if (lines[index + i].split(' ')[0] === '#') {
              index += i
            }

            let line = lines[index + i]

            section.code = line

            line = line.replace(/#(.*)/, '')

            switch (line.split(/\s|\(/)[0]) {
              case token.className:
                let properties = line
                  .match(regex.className)
                  .pop()
                  .split(',')

                file.name = properties[0].trim()

                if (properties[1]) {
                  file.icon = properties[1].replace(/"/g, '').trim()
                }

                file.description = section.description

                break
              case token.enum:
                section = parseEnum(section, line)

                if (section) {
                  file.sections.enums.push(section)
                }

                break
              case token.constant:
                section = parseConstant(section, line)

                if (section) {
                  file.sections.constants.push(section)
                }

                break
              case token.variable:
              case token.exportVariable:
              case token.onreadyVariable:
                section = parseVariable(section, lines, index + i)

                if (section) {
                  file.sections.variables.push(section)
                }

                break
              case token.function:
              case token.staticFunction:
              case token.signal:
                section = parseFunctionAndSignal(section, line)

                if (section) {
                  if (line.split(' ')[0] === token.signal) {
                    file.sections.signals.push(section)
                  } else {
                    file.sections.functions.push(section)
                  }
                }

                break
            }

            index += i

            break
        }
      }

      if (!file.name) {
        let fileExt = path.extname(filePath)
        let fileName = path.basename(filePath, fileExt)

        //(?=[A-Z])
        file.name = fileName
          .split(/\s|\_|\-/)
          .map(word => {
            return word[0].toUpperCase() + word.substring(1)
          })
          .join(' ')
      }

      break
  }

  return file
}
