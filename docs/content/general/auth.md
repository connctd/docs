---
title: Authorization
order: 2
---

Request against our platform are authorized based on tokens passed inside the request header. If an endpoint requires authorization but no token was specified a `401 - Unauthorized` error is returned. If a token with insufficient privileges is used a `403 - Forbidden` is returned.

Depending on which resource/endpoint is requested a different token needs to be used.

When accessing resources like things or units (via REST or GraphQL API) a service token has to be used which can be retrieved like so: [Client Credentials Flow](https://docs.connctd.io/oauth2/#client-credentials-flow)

If you are developing a connector and try to push things, events or installation/instance updates the appropriate instance and installation tokens have to be used that are exchanged during connector installation/instantiation.

Managing a connector via the GraphQL API requires a developer token, which can be retrieved by logging in to the platform.
You can login in manually by sending a post request containing your username and password to our auth endpoint.

```http
curl --location --request POST 'https://api.connctd.io/api/v1/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
        "email":"-email address-",
        "password":"-password-"
}'
```

Note that this request should never be send over an unencrypted connection since your credentials could potentially be exposed.