module.exports = string => {
  if (/^[A-Z]/.test(string) && !/\+|\-|\*|\//.test(string)) {
    if (string === 'true' || string === 'false') {
      return 'bool'
    }

    return string.match(/^(\w+)/).pop()
  } else if (/^-?[0-9]/.test(string)) {
    if (
      string
        .match(/^(.*)/)
        .pop()
        .includes('.')
    ) {
      return 'float'
    }

    return 'int'
  } else if (/^\[/.test(string)) {
    return 'Array'
  } else if (/^\{/.test(string)) {
    return 'Dictionary'
  } else if (/^\"/.test(string)) {
    return 'String'
  }
}
