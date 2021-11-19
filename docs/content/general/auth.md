---
title: Authorization
order: 2
---

Request against our platform are authorized based on tokens passed inside the request header. If an endpoint requires authorization but no token was specified a `401 - Unauthorized` error is returned. If a token with insufficient privileges is used a `403 - Forbidden` is returned.

Depending on which resource/endpoint is requested a different token needs to be used.

When accessing resources like things or units (via rest or gql api) a service token has to be used which can be retrieved like so: [Client Credentials Flow](https://docs.connctd.io/oauth2/#client-credentials-flow)

If you are developing a connector and try to push things, events or installation/instance updates the appropriate instance and installation tokens have to be used that are exchanged during connector installation/instantiation.
