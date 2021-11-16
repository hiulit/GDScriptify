const regex = require('../regex')
const token = require('../token')

module.exports = (lines, index) => {
  let exampleString

  let varString = `var ${lines[index].match(regex.at.example)[1]}`
  let varRegex = new RegExp(varString)

  lines.forEach((line, index) => {
    if (varRegex.test(line)) {
      exampleString = lines[index]

      let endToken
      let sliceToken

      if (line.slice(-2) === token.poolArray.start) {
        endToken = token.poolArray.end
        sliceToken = -2
      } else if (line.slice(-1) === token.array.start) {
        endToken = token.array.end
        sliceToken = -1
      } else if (line.slice(-1) === token.dictionary.start) {
        endToken = token.dictionary.end
        sliceToken = -1
      }

      if (endToken) {
        let lineIndex = index

        while (lines[lineIndex].slice(sliceToken) !== endToken) {
          lineIndex += 1
          exampleString += `\n${lines[lineIndex].replace(/\t/, '  ')}`
        }
      }
    }
  })

  return exampleString
}
