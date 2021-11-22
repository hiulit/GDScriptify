const config = require('../config')
const fs = require('fs')
const path = require('path')

module.exports = files => {
  let outputString = `# Index\n\n`

  for (let index = 0; index < files.length; index++) {
    const file = files[index]
    const filePath = file.path.replace('.gd', '.md')
    const fileName = file.name

    outputString += `- [${fileName}](./${filePath})\n`
  }

  outputString += '\n'

  outputString +=
    '---\n\nPowered by [GDScriptify](https://github.com/hiulit/GDScriptify).\n'

  let outputFilePath = path.join(config.outputDir, 'index.md')

  fs.writeFileSync(outputFilePath, outputString)
}
