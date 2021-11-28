---
title: "Easy Scala Integration with Sublime Text 2"
date:   2014-06-21T19:50:22Z
---

EDIT: This may still work with Sublime Text, but I highly recommend using a capable IDE to write Scala code. [IntelliJ](https://www.jetbrains.com/idea/) is my personal choice.

This post details steps to writing and compiling Scala code from within Sublime Text 2. It includes a walkthrough on how to configure the build system to support Scala and also provides some additional information about configuring keybindings to further ease the workflow.

By the end, you should be able to build Scala code using `⌘B` for "build" - the same way other scripts can be run from within the editor.

### Scala Build Support

Here is how you would run Scala code and see the output without having to leave the editor. We create a new build system to specify Scala configuration.

1. Navigate to Tools &rarr; Build System &rarr; New Build System...
1. In the editor, enter the following and save it as `Scala.sublime-build`

``` javascript
{
  "cmd": ["scala", "$file"],
  "path": "$PATH:/usr/local/bin",
  "file_regex": "^(.+):(\\d+): .+: (.+)",
  "selector": "source.scala"
}
```

`cmd` is specified as an array representing the command you would type into a shell. In this case, it would be something like `scala path/to/file`. The `$file` variable takes care of expanding the current file's path.

`path` specifies the path of the Scala installation. Mine is at `/usr/local/bin`. Note that is concatentated with the path instead of overwriting it (prepending or appending to the existing path is use-case specific).

`selector` tells the editor which files should use this configuration. *Note that this option only works if your build system is set to Automatic*.

`file_regex` allows you to capture messages from stdout of the Scala executable and display them within the editor. This particular regex will recognize compilation errors, allowing you to cycle through them easily.

You can read more about the build options in the Sublime docs [here](http://docs.sublimetext.info/en/latest/reference/build_systems.html).

### Keybindings

Optionally, create keybindings for cycling through messages from the plugin when a results window is displayed in the editor.

1. Navigate to Sublime Text 2 &rarr; Preferences &rarr; Key Bindings - User
2. Enter these keybindings in. You can specify any keys here; these are the ones I use.

``` javascript
[
  ...
  { "keys": ["ctrl+r"], "command": "next_result" },
  { "keys": ["shift+ctrl+r"], "command": "prev_result" },
  ...
]
```

### Hello, world!

Let's create a new file and write a simple hello world program to test out our new simple IDE.

``` scala
object TestBuild {
  def main(args: Array[String]) {
    println("Hello, world!")
  }
}
```

Run this with `⌘B` and you should see the output. Now how about errors? Modify the code slightly to include a compilation error and then build again to see errors in the console. `ctrl+R` and `shift+ctrl+R` (the keybindings configured in the previous section) can be used to cycle through errors.
