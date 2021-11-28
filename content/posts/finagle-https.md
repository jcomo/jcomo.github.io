---
title: Making HTTPS requests with Finagle
date:   2015-05-10T19:50:22Z
---

I am currently maintaining a service at my day job that takes arbitrary events
from mobile games and subsequently validates and processes them so that the
customers who are sending this data to us can then view it with pretty graphs
and other metrics via our dashboard. Our customers can then use this data to
optimize their advertising campaigns and target certain publisher or user groups
that they believe gives them a better return on investment.

Right now, the service is written in Python (using [Flask](http://flask.pocoo.org/))
and has been functioning just fine, but we are rapidly expanding this service
to be able to handle more and more events. Some of those events can require
heavier processing that blocks the request thread, which is not good. I have
been experimenting with Scala and [Finagle](https://twitter.github.io/finagle/)
(a high concurrency RPC framework) as we already use this stack for some of our
more heavily trafficked services.

As I was exploring Finagle, I was running little toy services to make sure that
it would be relatively easy to port everything over if we decided to go down
that route. One of the events that we handle is receipt validation for in app
purchases. For receipts from certain app stores, we need to make an RPC call
to their servers where the response will have the result of the validation.

While trying to implement a basic HTTP service in Finagle, I stumbled into some
difficulty when sending requests over HTTPS. Although Finagle is pretty well
documented in general, I had trouble finding the answer to this issue. Hopefully,
the following explanation will help others get unstuck with this issue in the
future.

## Validating Amazon Receipts

For this example, we're going to take the scenario of validating receipts with
Amazon's [receipt validation service](https://developer.amazon.com/public/apis/earn/in-app-purchasing/docs-v2/verifying-receipts-in-iap-2.0).
All of the specs and seemingly random strings shown in the code examples come
straight from their documentation.

Our API for this service should allow a user to wrap an Amazon receipt inside of
a request and feed it to our client. The service should look something like this.

``` scala
class AmazonReceiptValidationClient(dest: String) extends Service[AmazonReceiptRequest, Response] {
  private val service = Http.newService(dest)

  override def apply(req: AmazonReceiptRequest): Future[Response] = {
    service(req) map { resp =>
      if (resp.getStatus == HttpResponseStatus.OK) resp
      else throw new Exception("Could not validate Amazon receipt")
    }
  }
}

val client = new AmazonReceiptValidationClient("appstore-sdk.amazon.com:443")
```

This is where I started out and originally ran into some trouble. When calling
the service, I would get an error that the connection was reset by peer. In other
words, Amazon had had enough of my HTTP-with-no-TLS BS and refused to
service my request.

The correct implementation for this is actually quite straightforward after
seeing it, but the documentation is not very clear. The private definition
for `service` would change to the following

``` scala
private val service = Http.client.withTls(hostname).newService(s"$hostname:443")
```

And would then be instantiated as

``` scala
val client = new AmazonReceiptValidationClient("appstore-sdk.amazon.com")
```

The `withTls` method returns a client (or service factory, as Finagle calls them)
that will use TLS with requests. You can then create a service using this new
client.

For the sake of completeness, I've included the definition of `AmazonReceipt`
and `AmazonReceiptRequest` below.

``` scala
case class AmazonReceipt(id: String, developerSecret: String, userId: String)

case class AmazonReceiptRequest(receipt: AmazonReceipt) extends RequestProxy {
  override lazy val request = Request(new DefaultHttpRequest(HttpVersion.HTTP_1_1, HttpMethod.GET, servicePath))

  def servicePath =
    s"/version/1.0/verifyReceiptId/developer/${receipt.developerSecret}/user/${receipt.userId}/receiptId/${receipt.id}"
}
```
