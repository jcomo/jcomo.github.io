---
title: Immutable Containers Using Python Metaclasses
date:   2015-01-03T19:50:22Z
---

I have found python to be one of the easiest languages to pick up, and I think there are many people out there who could corroborate that. That alone is a big reason that it is used for teaching. However, under the hood there are a lot of features in the language where the implementation details can be downright scary to the newcomer and even to the moderately experienced pythonista: metaclasses, dunder methods (eg. `__init__`), and perhaps even decorators depending on the complexity of the function wrapper.

At the moment I put myself into that moderately experienced bucket. I'm pretty comfortable overall but I haven't had a chance to explore the more advanced areas of the language. Metaclasses are the first topic I wanted to dive into.

## Meta what?
By definition, metaclasses are classes that describe and instantiate other classes. Cue the head exploding gif. It sounds pretty convoluted but in reality it's not. In python everything is an object. When you write a class definition, you are essentially defining the properties that each instance of the class will have. Similarly, with metaclasses you are defining the properties that each *class* will have.

## Metaclass uses
Metaclasses are commonly used as class factories and as ways to add functionality to a class itself. Frameworks make use of this (eg. Django) and some libraries also use them. One example of a library is Mongokit.

In Django, metaclasses are used to add information to the user created classes such as permissions and the corresponding database table name. Mongokit uses metaclasses to allow for validation on custom types.

## How do they work?
The definition of a class will typically be something like this:

``` python
class Container(object):
    name = 'default'
```

where `object` is the superclass. We can create basic objects using the `object()` callable, so can we do something to dynamically create basic classes? You bet. This is where the `type` function comes into play. It either takes one argument or three arguments, but we care about the three argument version (docs [here](https://docs.python.org/2/library/functions.html#type)).

We can create the same Container class dynamically with a call to the `type` builtin.

``` python
Container = type('Container', (object,), dict(name='default'))
```

The first argument is the name of the class as a string. The second is a tuple containing all base classes (evaluated left to right). Finally, the third argument is dictionary of the properties to set on the class. In this example, the sole item in the dictionary is a static string but by passing in functions, you can provide methods to each instance of the class that will be created. After all, calling `obj.method()` is nearly equivalent to `obj['method']()` because of the way python implements it objects, so passing a dictionary makes sense.

Since everything is an object, by subclassing `type` we've created a metaclass. To use a metaclass, you can either specify it using the `__metaclass__` property of a class

``` python
class Container(object):
    __metaclass__ = ContainerMeta

    name = 'default'
```

*or* you can use it to create classes dynamically (and override the initializers in the metaclass in the same way you would for an object).

``` python
Container = ContainerMeta('Container', (object,), dict(name='default'))
```

## Creating an immutable container library
The easiest way I learn is by example, and with something like metaclasses, it really makes sense to write code that uses them. I wasn't getting much just by reading about them.

I settled on writing an immutable container library using metaclasses. I will walk through a watered-down version to demonstrate the use of metaclasses but the full library can be found on [Github](https://github.com/jcomo/immut).

We're going for a simple API that looks like this `ImmutableContainer(container_name, *attributes)` where `container_name` is a string that would be the class name and each `attribute` is a string that will end up being a read-only property. The function call will return a **class** where the specified attributes can be instantiated but never modified.

``` python
RequestModel = ImmutableContainer('RequestModel', 'version', 'user')

u = User('Jonathan')
request = RequestModel(user=u, version=2)

request.version  # returns 2
request.version = 3  # we want this to raise an AttributeError
```

This looks like a job for metaclasses! We can define an `ImmutableContainerType` that will create container classes and replace the `setattr` method with one that will raise exceptions for the attributes that should be immutable.

``` python
class ImmutableContainerType(type):
    def __init__(cls, name, bases, dct):
        super(ImmutableContainerType, cls).__init__(name, bases, dct)
        attributes = dct.get('attributes', [])
        cls.__setattr__ = cls.__class__.get_setattr(attributes)

    @classmethod
    def get_setattr(mcs, attributes):
        def setter(self, name, value):
            if name in attributes:
                raise AttributeError("Property {} is immutable".format(name))
            super(self.__class__, self).__setattr__(name, value)
        return setter
```

Since this metaclass subclasses `type` we can create an instance of it (a class) and the `__init__` method will be called.

``` python
RequestModel = ImmutableContainerType('RequestModel', (object,),
                                       dict(attributes=['version', 'user']))
```

Well, that works. But it doesn't quite fit the API we're looking for. A little wrapper will fix that.

``` python
def make_container(container_name, *attributes):
    return ImmutableContainerType(container_name, (object,),
                                  dict(attributes=attributes))

ImmutableContainer = make_container
```

Much better.


## Concluding thoughts
Could I have made the immutable container library without using metaclasses? Absolutely. The API may have ended up looking a bit different but it could definitely be done without using metaclasses.

For most things, using metaclasses will be overkill. While they are extremely powerful, they can make the code harder to reason about. I've found that the best place to use them are in frameworks but they also tend to pop up in some libraries.
