# How to document GDScript files


## Table of contents

- [Docstrings](#docstrings)
- [Tags](#tags)

## Docstrings

GDScriptify docstrings must be placed right above the code being documented.

Each docstring must start with a double hash sign (`##`) in order to be recognized by the GDScriptify parser.

You can use [Markdown](https://daringfireball.net/projects/markdown/syntax) to write docstrings.

```gdscript
## If `true`, particles are being emitted.
export (bool) var emitting = false setget _set_emitting
## The type of particles:
## - `0 (Square)`.
## - `1 (Circle)`.
export (int, "Square", "Circle") var type = 0
```

## Tags

Tags always begin with an at sign (`@`) and accept an argument enclosed in curly braces (`{` and `}`).

GDScriptify supports different kinds of tags:

- [@example](#example)
- [@link_img](#link_img)
- [@link_name](#link_name)

### `@example`

```
@example {name}
```

Prints the variable or function's code of the given name under an "Example" section.

### `@link_img`

```
@link_img {path/to/the/image.ext}
```

Prints an image. The path must be relative to the file.

### `@link_name`

```
@link_name {name}
```

Generates an anchor link to the variable or function's section of the given name.
