const config = require('../config')
const fs = require('fs')
const getAllFiles = require('./getAllFiles')
const path = require('path')

module.exports = files => {
  let outputString = `# Index\n\n`

  for (let index = 0; index < files.length; index++) {
    const file = files[index]
    const filePath = file.path.replace('.gd', '.md')
    const fileName = file.name

    outputString += `- [${fileName}](./${filePath})\n`
  }

  let outputFilePath = path.join(config.outputDir, 'index.md')

  fs.writeFileSync(outputFilePath, outputString)
}
