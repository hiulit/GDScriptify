const fs = require('fs')

module.exports = dirPath => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, {
      recursive: true
    })
  }
}
