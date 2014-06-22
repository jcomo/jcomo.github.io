---
layout: post
title: "Easy Scala Integration with Sublime Text 2"
date:   2014-06-21 19:50:22
categories: scala sublime text repl tools
---

Recently I have been learning Scala. My company uses it for exposed services. We have a high demand for scalability and Scala has apparently served us well so far.

I decided to try my hand and see what all of the fuss was about so I enrolled in the [Coursera Functional Programming course](https://www.coursera.org/course/progfun) taught by Martin Odersky, the creator of the Scala language. I'm about halfway through the course at the moment and I highly recommend it to anyone hoping to learn about functional programming in general, Scala specifically, or both.

If I am forced to break my rhythm while programming it bothers me to no end. While I am originally a vim user (and still am for the most part), I have grown to love [Sublime Text](http://www.sublimetext.com/2) due to some of the features it comes with out of the box and its ability to be extended without having to learn an entirely new language like in vim.

When I am writing a quick script, I can run it from within Sublime using the keyboard shortcut `⌘B` for "build" and get quick feedback and continue programming. I tried this same build command while editing a Scala file and absolutely nothing in the editor reacted. How unfortunate.

### Scala Build Support

If you are like me and want a quick way to run your Scala code and see the output, the steps below will explain how to set up Sublime Text 2 to do so.

1. Navigate to Tools &rarr; Build System &rarr; New Build System...
1. In the editor, enter the following and save it as `Scala.sublime-build`

{% highlight json %}
{
  "cmd": ["scala", "$file"],
  "path": "$PATH:/usr/local/bin",
  "file_regex": "^(.+):(\\d+): .+: (.+)",
  "selector": "source.scala"
}
{% endhighlight %}

A couple things to note here. The `cmd` option is specified as an array representing the command you would type into a shell. In this case, it would be something like `scala path/to/file`. The `$file` variable takes care of expanding the current file's path.

My scala installation is located in `/usr/local/bin`, which isn't part of the path provided by Sublime, so I added it to the build config. The `selector` option lets Sublime recognize which files should use this configuration. *This option only works if your build system is set to Automatic*.

Finally, and this is my favorite part, the `file_regex` option takes the error output from scala and interprets it within Sublime. The regex here will recognize error messages and allow you to cycle through them within the editor. Pretty slick.

You can read more about the build options in the Sublime docs [here](http://docs.sublimetext.info/en/latest/reference/build_systems.html).

### Keybindings

Let's create some better keybindings for cycling through errors so that we can make good use of the functionality. This step is optional but I highly recommend it if you are using a Mac; hitting any of the function keys is a pain.

1. Navigate to Sublime Text 2 &rarr; Preferences &rarr; Key Bindings - User
2. Enter these keybindings in. You can specify any keys here; these are the ones I use.

{% highlight json %}
[
  // any additional keybindings above

  { "keys": ["ctrl+r"], "command": "next_result" },
  { "keys": ["shift+ctrl+r"], "command": "prev_result" }
]
{% endhighlight %}

### Hello, world!

Let's create a new file and write a simple hello world program to test out our new simple IDE.

{% highlight scala %}
object TestBuild {
  def main(args: Array[String]) {
    println("Hello, world!")
  }
}
{% endhighlight %}

Run this with `⌘B` and you should see the output. Now how about errors? We can introduce some intentional bugs and see how to work with them from within the editor.

{% highlight scala %}
object TestBuild {
  def getInt: Int = 5: Long
  def fn {
    val x = 6
    x = 7
  }
  def main(args: Array[String]) {
    println("Hello, world!")
  }
}
{% endhighlight %}

Build this again and now some errors will pop up in the console. Pressing `ctrl+R` and `shift+ctrl+R` will cycle through them right within the editor.

I know there are some other helpful Sublime packages for Scala but for a minimalist like myself, I quite like this solution since I don't need any heavy lifting done for me just yet.