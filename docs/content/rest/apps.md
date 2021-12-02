---
title: Apps
order: 1
---

Whenever you would like to build your own application which makes use of things, units or connectors you first need
to register that app at our platform. By registering an app you will get a *client_id* and *client_secret* which can be
used (depending on the used oauth2 flow) to retrieve an access token. This token is required when working with our api as it allows our platform to match your requests to your app. Head over to our [Developer Center](https://devcenter.connctd.io) in order to create your app.

## Register a callback url

> **Request**<br>
> POST https://api.connctd.io/api/v1/actions/callback/register<br>
> *Headers:*<br>
> &nbsp;Content-Type:application/json<br>
> &nbsp;Authorization:APP TOKEN<br>
> *Body:* see below<br>

```json
{
  "CallbackUrl":"https://myservice.example.com/callback"
}
```

> **Response**<br>
> *Code:* 200

This request stores a system wide callback url for all action requests that are related to this app. This is important whenever an app creates things that contain actions. As soon as a user triggers any of these actions by performing an action request the request is forwarded to the given callback url. Please note: if you are using our connector service you have to register your app specific connector callback url with this request. [Here](#get-connector-service-callback-url) you can read how to get one.
<!-- TODO: Write docs on how to get a connector service callback url -->