const { name, description } = require('../../package.json')

function underline (string) {
  let dashes = ''
  for (let index = 0; index < string.length; index++) {
    dashes += '-'
  }
  return `${string}\n${dashes}`
}

const menus = {
  main: `
${underline(name)}
${description}

Usage: ${name} [options]

-h, --help                    Show help menu.
-d, --directory path          Path from which to generate the documentation.
                                It can be absolute.
                                It can be relative (has to start with "./").
                                It must contain a "project.godot" file.
                                Default: "./".
-o, --ouput path              Path to store the documentation.
                                It must relative to "--directory".
                                Default: "docs".
-c, --code {true|false}       Generate a "Code Reference" JSON file to "--output".
                                Default: "false".
-m, --markdown {true|false}   Generate Markdown files to "--output".
                                Default: "true".
-r, --readme false            Prevent generating a "README" file.
                                Only has effect when there's 1 GDScript file.
                                Default: "true".
-v, --version                 Show package version.
  `
}

module.exports = args => {
  // Remove?
  const subCmd =
    args[0].help && args.length > 1
      ? Object.keys(args[1])
      : Object.keys(args[0])

  console.log(menus[subCmd] || menus.main)

  process.exit(0)
}
