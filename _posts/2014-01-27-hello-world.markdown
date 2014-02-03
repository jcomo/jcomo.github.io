---
layout: post
title: "Hello World"
date: 2014-01-27 00:22:10
description: ""
category: 
tags: []
---

This is a test post. Some nice syntax highlighting to go along with it.

{% highlight python %}
class User(db.Model):
	id = db.Column(db.Integer, primary_key = True)
	username = db.Column(db.String(10), index = True, unique = True)
	passhash = db.Column(db.String(72))	
	posts = db.relationship('Post', backref = 'author', lazy = 'dynamic')

	@classmethod
	def by_username(cls, u):
		return cls.query.filter_by(username = u).first()

	@classmethod
	def register(cls, username, password, fullname='', role=ROLE_USER):
		h = encrypt.make_passhash(username, password)
		return cls(username=username, passhash=h, fullname=fullname, role=role)

	@classmethod
	def login(cls, username, password):
		u = cls.by_username(username)
		if u and encrypt.valid_password(username, password, u.passhash):
			return u
	
	def __repr__(self):
		return '<User %r>' % (self.username)
{% endhighlight %}