const regex = {
  at: {
    example: /@example\s{([^}]+)}/,
    linkImg: /@link_img\s{([^}]+)}/,
    linkName: /@link_name\s{([^}]+)}/
  },
  class: {
    name: /class\s(\w+)/
  },
  className: /class_name\s(.*)/,
  constant: {
    name: /const\s(\w+)/
  },
  default: /(?<==[\s|\S]).*?(?=\ssetget|$)/,
  enum: {
    name: /enum\s(\w+)/,
    values: /\{([^\}]+)\}/
  },
  extends: /extends\s(.*)/,
  function: {
    name: /func\s(\w+)/,
    typed: {
      parameters: {
        inferredTypeName: /(\w+[\s|\S]):/
      },
      returnType: /->(.*):/
    },
    static: /^static/
  },
  inferredType: /:=([\s|\S]*)/,
  markdown: {
    list: /^(\-|\*|\+|\d+\.)/
  },
  parameters: /\(([^\)]+)\)/,
  signal: {
    name: /signal\s(\w+)/
  },
  type: /:([\s|\S][^\s]+)/,
  variable: {
    name: /var\s(\w+)/,
    setget: /setget(.*)/
  }
}

module.exports = regex
