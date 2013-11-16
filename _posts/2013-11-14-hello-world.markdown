---
layout: post_page
title: Hello World
description: ""
category: 
tags: []
---

The classic hello world post. This is just random words and code snippets to
make sure that Jekyll is working correctly on GitHub pages. Below is one of the great features of Jekyll: code highlighting.
There are some quick code samples from a couple different languages in order to
demonstrate the functionality. Soon this post will explain why Hello World is so
widely utilized and why programmers find a little bit of joy in that first
response from a language, framework, application, etc.

{% highlight ruby linenos %}
def show
  @widget = Widget(params[:id])
  respond_to do |format|
    format.html   # show.html.erb
    format.json { render json: @widget }
  end
end
{% endhighlight %}

How about a little bit of python?

{% highlight python linenos %}
if __name__ == '__main__':
  print 'Hello world!'
{% endhighlight %}

C:

{% highlight c linenos %}
#include <stdio.h>

int main(int argc, const char* argv[]) {
  printf("Hello world!\n");

  return 0;
}
{% endhighlight %}
