const regex = {
  hyphen: /^-.+/
}

module.exports = args => {
  let parsedArgs = []

  for (let index = 0; index < args.length; index++) {
    let arg = args[index]
    if (regex.hyphen.test(arg)) {
      arg = arg.match(/(.*)/)[1]

      nextArg = args[index + 1]

      if (nextArg) {
        if (regex.hyphen.test(nextArg)) {
          parsedArgs.push({ [arg]: null })
        } else {
          nextArg = nextArg.match(/(.*)/)[1]
          parsedArgs.push({ [arg]: nextArg })
        }
        continue
      } else {
        parsedArgs.push({ [arg]: null })
      }
    }
  }

  return parsedArgs
}
