const config = require('../config')
const error = require('../utils/error')
const fs = require('fs')
const generateLicense = require('./generateLicense')
const generateMarkdownFile = require('./generateMarkdownFile')
const getAllFiles = require('./getAllFiles')
const mkdirpSync = require('../utils/mkdirpSync')
const parseFile = require('./parsers/parseFile')
const path = require('path')

module.exports = () => {
  let projectFile = parseFile(path.join(config.projectDir, config.projectFile))

  let codeReference = {
    name: projectFile.name || null,
    description: projectFile.description || null,
    version: projectFile.version || null,
    godotVersion: projectFile.godotVersion || null,
    author: projectFile.author || null,
    license: projectFile.license || null,
    repository: projectFile.repository || null,
    banner: projectFile.banner || null,
    support: projectFile.support || null,
    singletons: projectFile.singletons || null,
    classes: []
  }

  let files = getAllFiles(config.projectDir)

  if (!files.length) {
    error(`ERROR: No GDScript (.gd) files found in "${config.projectDir}"!`)
  }

  if (files.length === 1 && config.readme) {
    // config.readme = true

    let readmeCodeReference = codeReference
    delete codeReference.classes

    Object.entries(parseFile(files[0])).forEach(([key, value]) => {
      if (key === 'name') {
        readmeCodeReference[key] = readmeCodeReference.name || value
        return
      }

      if (key === 'description') {
        readmeCodeReference[key] = readmeCodeReference.description || value
        return
      }

      readmeCodeReference[key] = value
    })

    codeReference = readmeCodeReference

    if (config.markdown) {
      generateMarkdownFile(readmeCodeReference)
    }
  } else {
    config.readme = false

    for (let index = 0; index < files.length; index++) {
      let file = parseFile(files[index])

      if (Object.values(file.sections).every(section => section.length === 0)) {
        index += 1
        continue
      }

      if (codeReference.singletons) {
        codeReference.singletons.forEach(element => {
          if (file.name === element.name) {
            file.singleton = true
          }
        })
      }

      codeReference.classes.push(file)
    }

    if (config.markdown) {
      if (codeReference.classes.length === 0) {
        error('ERROR: There are no documented files!')
      }

      for (let index = 0; index < codeReference.classes.length; index++) {
        generateMarkdownFile(codeReference.classes[index])
      }
    }
  }

  delete codeReference.singletons

  mkdirpSync(config.outputDir)

  if (config.code) {
    fs.writeFileSync(
      path.join(config.outputDir, `${config.codeReferenceFileName}.json`),
      JSON.stringify(codeReference, null, 2)
    )
  }

  generateLicense()
}
