---
layout: post
title: Using launchctl as an anacron replacement
description: "A case study examining launchd and launchctl for running commands on a schedule"
category:
tags: []
---

I have a lot of scripts that automate the boring parts of my life. Recently
an article was posted about one system administrator who automated everything
down to [scripting the coffee maker to produce cups of coffee for him](https://www.jitbit.com/alexblog/249-now-thats-what-i-call-a-hacker/).
I don't go quite that far with my automation, but it inspired me to write about a
lesser known tool in OSX - `launchd` and its interfacing agent: `launchctl`.

You may be familiar with `launchctl` if you've ever run a database or cache server
on a Mac locally. Or, you may know it indirectly through the use of a wrapper
called [lunchy](https://github.com/eddiezane/lunchy), which makes working with
`launchctl` a much more sane experience.

At a high level, `launchctl` aims to make it easy to run daemonized processes
on Mac. It can manage these processes for a user or for the system as a whole.
Many of the services on Mac that you interface with every day are managed by
`launchd` such as Spotlight and AirPlay.

To explore the world of `launchd` and `launchctl`, I'm going to examine a specific
use case I had for using the service: updating [brew](http://brew.sh/). I have
a bad habit of forgetting to update my brew formulas for weeks (sometimes months)
at a time. The reminder usually comes in the form of an error when trying to
install a formula that mysteriously doesn't exist. I thought: "This is a perfect
use case for cron!" and I was probably right except for the minor (read: show-stopping)
issue of being on a laptop.

I needed a way to be able to update my brew formulas automatically in the background
on a rough schedule. If my laptop was off when the update was scheduled to run,
I would expect it to run the next time I turned on my laptop. On a more fine level,
I would like to retry the update if it failed and I would like the output to be
logged to a file in order to check on the status of previous runs. Enter `launchd`.

Every `launchd` service is configured using a plist file. Multiple
options can be specified in the plist file. The documentation for those options
can be found in the man pages (gasp!) under the `launchd.plist` entry. These configuration
files usually live in `~/Library/LaunchAgents`. If your user has no custom services
yet running via `launchd`, you will need to create that folder. A benefit of this
is that files for all of the daemons live in one location, which makes it easy to
organize and keep track of the different services.

Generally, the configuration files are named using a combination of your domain and
the name of the service. I decided to be creative and call this service brewd.
Below is the plist file that satisfied my requirements located at
`~/Library/LaunchAgents/me.jcomo.brewd.plist`.

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple Computer//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>Label</key>
    <string>me.jcomo.brewd</string>
    <key>KeepAlive</key>
    <dict>
      <key>SuccessfulExit</key>
      <false />
    </dict>
    <key>ThrottleInterval</key>
    <integer>60</integer>
    <key>StartCalendarInterval</key>
    <dict>
      <key>Minute</key>
      <integer>0</integer>
      <key>Hour</key>
      <integer>10</integer>
      <key>Weekday</key>
      <integer>2</integer>
    </dict>
    <key>ProgramArguments</key>
    <array>
      <string>/usr/local/bin/brew</string>
      <string>update</string>
    </array>
    <key>StandardOutPath</key>
    <string>/usr/local/var/brewd/output.log</string>
    <key>StandardErrorPath</key>
    <string>/usr/local/var/brewd/error.log</string>
  </dict>
</plist>
{% endhighlight %}

I'm not going to go into too much depth on each of the options since the descriptions
and parameters can all be found in the man page. However, the crucial part in
this file, and the point of this post, is under the key `StartCalendarInterval`.
Here, you can define a cron-like schedule to run the service. According to the docs,

> Unlike cron which skips job invocations when the computer is asleep, launchd will
> start the job the next time the computer wakes up.  If multiple intervals transpire
> before the computer is woken, those events will be coalesced into one event upon wake
> from sleep.

Bingo! The other options in the configuration specify where to direct stderr and
stdout, how often to retry if the program fails, and finally, the actual command
that should be scheduled and run.

The last step is to make `launchd` aware of this configuration. To do that, `launchctl`
must be used to load the plist. This can be done by running
`launchctl load ~/Library/LaunchAgents/me.jcomo.brewd.plist`. If I no longer
want a service to be running, I can simply unload it.

Now my brew formulas will be updated approximately every Monday morning at 10am.
The emphasis is on approximately; this would be a bad replacement for cron for
a task that needed to run on a strict schedule.

There is a lot more depth to `launchd` and it fits more use cases than the one
presented in this post. For more information, I'd encourage exploring the man
pages for both `launchd.plist` and `launchctl` as it was hard to find specific
help online.

Disclaimer: there are likely other solutions to this problem. While `launchd`
and `launchctl` certainly have their quirks, I find them to be a great solution
for running daemon processes on my laptop.
