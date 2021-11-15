# How to document GDScript files

## Table of contents

- [Docstrings](#docstrings)
- [Special tokens](#special-tokens)

## Docstrings

Docstrings are lines starting with a double hash sign (`##`).

You can document variables, functions, etc. using docstrings above their definitions.

```gdscript
## If `true`, particles are being emitted.
export (bool) var emitting = false setget _set_emitting
```

You can use [Markdown](https://daringfireball.net/projects/markdown/syntax) to write docstrings.

```gdscript
## The type of particles:
## - `0 (Square)`.
## - `1 (Circle)`.
export (int, "Square", "Circle") var type = 0
```

## Special tokens

There are some special words, that start with `@` and accept an argument between curly braces (`{}`), which perform different tasks:

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

