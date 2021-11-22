# GDScriptify

![release v1.0.0](https://img.shields.io/badge/release-v1.0.0-478cbf?style=flat-square) ![MIT license](https://img.shields.io/badge/license-MIT-478cbf?style=flat-square)

A magical documentation tool for GDScript.

![GDScriptify banner](/gdscriptify-banner.jpg)

## Introduction

GDScriptify is an API documentation generator tool for GDScript that converts comments you write alongside the code into Markdown documentation files.

It's great for documenting Godot plugins or frameworks. Even for just small one-script projects.

## Table of contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
- [Documentation](#documentation)
- [Getting started](#getting-started)
- [Examples](#examples)

## Prerequisites

- [Node.js](https://nodejs.org) installed on your computer.

## Installation

```bash
npm install gdscriptify -g
```

## Usage

```bash
gdscriptify [options]
```

## Options

- `-h, --help`: Show help menu.
- `-d, --directory path`: Path from which to generate the documentation.
  - It can be an absolute path.
  - It can be a relative path (has to start with `./`).
  - It must contain a `project.godot` file.
  - Default: `./`.
- `-o, --ouput path`: Path to store the documentation.
  - It must be a relative path to `--directory`.
  - Default: `docs`.
- `-c, --code {true|false}`: Generate a "Code Reference" JSON file to `--output`.
  - Default: `false`.
- `-m, --markdown {true|false}`: Generate Markdown files to `--output`.
  - Default: `true`.
- `-r, --readme false`: Prevent generating a `README` file.
  - Only has effect when there's 1 GDScript file.
  - Default: `true`.
- `-v, --version`: Show package version.

## Documentation

- [How to document GDScript files](/docs/how-to-document-gdscript-files.md).
- [Generate a README file](/docs/generate-a-readme-file.md).

## Getting started

First of all, you have to [document the GDScript files](/docs/how-to-document-gdscript-files.md).

Once that's done:

- Open a Terminal.
- Go to your Godot's project folder.
- Run `gdscriptify`.

```bash
cd /path/to/your/godot/project
gdscriptify
```

Or, if you don't want to have to go the folder, you can run `gdscriptify` with `-d [path]` from anywhere.

```bash
gdscriptify -d /path/to/your/godot/project
```

Assuming GDScriptify's default values are being used, a `docs` folder will be created in the root of your Godot's project (where `project.godot` or `plugin.cfg` is located) with the documentation files.

```
project
├── another_awesome_script.gd
├── awesome_script.gd
├── docs
│   ├── another_awesome_script.md
│   └── awesome_script.md
├── icon.png
└── project.godot
```

If there's **only 1 GDScript file** in the project, GDScriptify will create a `README.md` file in the root of your Godot's project.

```
project
├── awesome_script.gd
├── icon.png
├── project.godot
└── README.md
```

Check out the documentation on [generating a README file](/docs/generate-a-readme-file.md) to learn how to make it look better.

If you don't want that one file to be converted into a README file, run:

```
gdscriptify -r false
```

## Examples

- [Godot 3 2D Day/Night Cycle](https://github.com/hiulit/Godot-3-2D-Day-Night-Cycle/tree/master/docs/src) - Documentation.
- [Godot 3 2D Draw Sprite](https://github.com/hiulit/Godot-3-2D-Draw-Sprite) - README.
- [Godot 3 2D Fake Confetti Particles](https://github.com/hiulit/Godot-3-2D-Fake-Confetti-Particles) - README.
- [Godot 3 2D Fake Snow Particles](https://github.com/hiulit/Godot-3-2D-Fake-Snow-Particles) - README.

## 🗒️ Changelog

See [CHANGELOG](/CHANGELOG.md).

## 👤 Author

- hiulit

## 🤝 Contributing

Feel free to:

- [Open an issue](https://github.com/hiulit/GDScriptify/issues) if you find a bug.
- [Create a pull request](https://github.com/hiulit/GDScriptify/pulls) if you have a new cool feature to add to the project.

## 🙌 Supporting this project

If you find this project helpful, please consider supporting it through any size donations to help make it better.

[![Become a patron](https://img.shields.io/badge/Become_a_patron-ff424d?logo=Patreon&style=for-the-badge&logoColor=white)](https://www.patreon.com/hiulit)

[![Suppor me on Ko-Fi](https://img.shields.io/badge/Support_me_on_Ko--fi-F16061?logo=Ko-fi&style=for-the-badge&logoColor=white)](https://ko-fi.com/F2F7136ND)

[![Buy me a coffee](https://img.shields.io/badge/Buy_me_a_coffee-FFDD00?logo=buy-me-a-coffee&style=for-the-badge&logoColor=black)](https://www.buymeacoffee.com/hiulit)

[![Donate Paypal](https://img.shields.io/badge/PayPal-00457C?logo=PayPal&style=for-the-badge&label=Donate)](https://www.paypal.com/paypalme/hiulit)

If you can't, consider sharing it with the world...

[![](https://img.shields.io/badge/Share_on_Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fhiulit%2FGDScriptify&text=%22Godot+3+2D+Day%2FNight+Cycle%22%0D%0AA+2D+%E2%98%80%EF%B8%8F+Day+%2F+%F0%9F%8C%94+Night+cycle+using+CanvasModulate+and+a+moon+light+effect+using+Light2D+by+%40hiulit)

... or giving it a [star](https://github.com/hiulit/GDScriptify/stargazers).

## 👏 Credits

Thanks to:

- **Andrea Calabró** - For creating the Godot logo.
- [Twemoji](https://twemoji.twitter.com/) - For the emojis.

## 📝 Licenses

- Source code: [MIT License](/LICENSE).
- Godot logo: [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).
- Emojis: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
