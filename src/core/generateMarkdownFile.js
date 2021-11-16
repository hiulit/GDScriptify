const config = require('../config')
const fs = require('fs')
const mkdirpSync = require('../utils/mkdirpSync')
const path = require('path')

module.exports = file => {
  let outputString = ''

  outputString += `# ${file.name}\n\n`

  if (config.readme) {
    if (file.godotVersion) {
      outputString += `![Godot v${file.godotVersion}](https://img.shields.io/badge/Godot-v${file.godotVersion}-478cbf?logo=godot-engine&logoColor=white&style=flat-square) `
    }
    if (file.version) {
      outputString += `![release v${file.version}](https://img.shields.io/badge/release-v${file.version}-478cbf?style=flat-square) `
    }
    if (file.license) {
      outputString += `![${file.license} license](https://img.shields.io/badge/license-${file.license}-478cbf?style=flat-square)`
    }

    if (file.godotVersion || file.version || file.license) {
      outputString += '\n\n'
    }
  }

  if (file.description) {
    outputString += `${file.description}\n\n`
  }

  if (file.banner && config.readme) {
    outputString += `![${file.name} banner](${file.banner})\n\n`
  }

  if (file.singleton && !config.readme) {
    outputString += `**Singleton**\n\n`
  }

  if (file.extends && !config.readme) {
    outputString += `**Extends**: \`${file.extends}\`\n\n`
  }

  if (!Object.values(file.sections).every(section => section.length === 0)) {
    outputString += `## Table of contents\n\n`

    for (key in file.sections) {
      const section = file.sections[key]

      if (section.length) {
        outputString += `### ${key[0].toUpperCase() + key.substring(1)}\n\n`

        outputString += `|Name|Type|Default|\n|:-|:-|:-|\n`

        section.forEach(item => {
          // outputString += `- [${item.name}](#${item.name.toLowerCase()})\n`

          if (item.table.length) {
            outputString += `|[${item.name}](#${item.name.toLowerCase()})`
            outputString += `|\`${item.table[0].type}\``
            if (item.table[0].default === '-') {
              outputString += `|${item.table[0].default}`
            } else {
              outputString += `|\`${item.table[0].default}\``
            }
            outputString += `|\n`
          }
        })

        outputString += `\n`
      }
    }
  }

  for (key in file.sections) {
    const section = file.sections[key]

    if (section.length) {
      outputString += `## ${key[0].toUpperCase() + key.substring(1)}\n\n`

      section.forEach(item => {
        outputString += `### ${item.name}\n\n`
        outputString += `\`\`\`gdscript\n${item.code}\n\`\`\`\n\n`
        outputString += `${item.description}\n\n`

        if (item.return_type) {
          outputString += `**Returns**: \`${item.return_type}\`\n\n`
        }

        if (item.table.length) {
          item.table.forEach((row, index) => {
            let tableHeader = '|'
            let tableAlignment = '|'
            let tableBody = '|'

            for (key in row) {
              if (key === 'title') {
                continue
              }

              tableHeader += `${key[0].toUpperCase() + key.substring(1)}|`
              tableAlignment += ':-|'

              if (row[key] === '-') {
                tableBody += `${row[key]}|`
              } else {
                tableBody += `\`${row[key]}\`|`
              }
            }

            if (index === 0) {
              if (row.title) {
                outputString += `#### ${row.title}\n\n`
              }

              outputString += `${tableHeader}\n`
              outputString += `${tableAlignment}\n`
            }

            outputString += `${tableBody}\n`
          })

          outputString += `\n`
        }

        if (item.example) {
          outputString += '**Example**:\n\n'
          outputString += `\`\`\`gdscript\n${item.example}\n\`\`\`\n\n`
        }
      })
    }
  }

  if (config.readme) {
    if (fs.existsSync(path.join(config.projectDir, 'CHANGELOG.md'))) {
      outputString += '## 🗒️ Changelog\n\nSee [CHANGELOG](/CHANGELOG.md).\n\n'
    }

    if (file.author) {
      let authors = file.author.split(',')

      if (authors.length === 1) {
        outputString += `## 👤 Author\n\n- ${file.author}\n\n`
      } else {
        outputString += '## 👥 Authors\n\n'

        for (let index = 0; index < authors.length; index++) {
          const author = authors[index]
          outputString += `- ${author.trim()}\n`
        }
        outputString += '\n'
      }
    }

    if (file.repository) {
      outputString += `## 🤝 Contributing\n\n`
      outputString += `Feel free to:\n\n`
      outputString += `- [Open an issue](${file.repository}/issues) if you find a bug.\n`
      outputString += `- [Create a pull request](${file.repository}/pulls) if you have a new cool feature to add to the project.\n\n`
    }

    if (file.support) {
      outputString += '## 🙌 Supporting this project\n\n'
      outputString +=
        'If you find this project helpful, please consider supporting it through any size donations to help make it better.\n\n'

      Object.entries(file.support).forEach(([key, value]) => {
        switch (key) {
          case 'patreon':
            outputString += `[![Become a patron](https://img.shields.io/badge/Become_a_patron-ff424d?logo=Patreon&style=for-the-badge&logoColor=white)](${value})\n\n`

            break
          case 'ko-fi':
            outputString += `[![Suppor me on Ko-Fi](https://img.shields.io/badge/Support_me_on_Ko--fi-F16061?logo=Ko-fi&style=for-the-badge&logoColor=white)](${value})\n\n`

            break
          case 'buy_me_a_coffee':
            outputString += `[![Buy me a coffee](https://img.shields.io/badge/Buy_me_a_coffee-FFDD00?logo=buy-me-a-coffee&style=for-the-badge&logoColor=black)](${value})\n\n`

            break
          case 'paypal':
            outputString += `[![Donate Paypal](https://img.shields.io/badge/PayPal-00457C?logo=PayPal&style=for-the-badge&label=Donate)](${value})\n\n`

            break
          default:
            break
        }
      })

      outputString += `If you can't, consider sharing it with the world${
        file.repository ? '...' : '.'
      }\n\n`

      if (file.repository) {
        let shareURL = encodeURI(
          `https://twitter.com/intent/tweet?url=${file.repository}&text="${file.name}"\n${file.description}\n\nBy @${file.author}\n\n`
        )
        outputString += `[![Share on Twitter](https://img.shields.io/badge/Share_on_Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](${shareURL})\n\n`
        outputString += `... or giving it a [star](${file.repository}/stargazers).\n\n`
      }

      outputString += 'Thank you very much!\n\n'
    }

    outputString += '## 📝 Licenses\n\n'

    if (fs.existsSync(path.join(config.projectDir, 'LICENSE'))) {
      if (file.license) {
        outputString += `- Source code: [${file.license} License](/LICENSE).\n`
      } else {
        outputString += '- Source code: [LICENSE](/LICENSE).\n'
      }
    }

    outputString += `- Documentation ([GDScriptify](https://github.com/hiulit/GDScriptify)): [MIT License](/LICENSE_GDSCRIPTIFY.txt).\n\n`
  }

  outputString +=
    '---\n\nPowered by [GDScriptify](https://github.com/hiulit/GDScriptify).\n'

  let outputFileName = config.readme
    ? 'README.md'
    : `${file.path
        .split(path.sep)
        .join(path.sep)
        .split(/\s|-/)
        .join('_')
        .replace('.gd', '')}.md`

  if (config.readme) {
    config.outputDir = config.projectDir
  }

  let outputFilePath = path.join(config.outputDir, outputFileName)
  let outputDir = path.dirname(outputFilePath)

  mkdirpSync(outputDir)

  fs.writeFileSync(outputFilePath, outputString)
}
