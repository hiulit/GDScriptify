const regex = require('../regex')
const token = require('../token')

module.exports = line => {
  let docstring = line.replace(token.docstring, '').trim()

  if (regex.at.example.test(docstring)) {
    let example = docstring.match(regex.at.example)
    docstring = docstring.replace(example[0], '')
  }

  if (regex.at.linkName.test(docstring)) {
    let link = docstring.match(regex.at.linkName)
    docstring = docstring.replace(link[0], `[${link[1]}](#${link[1]})`)
  }

  if (regex.at.linkImg.test(docstring)) {
    let image = docstring.match(regex.at.linkImg)
    docstring = docstring.replace(image[0], `![](${image[1]})`)
  }

  return docstring
}
