
# Authentication

To authenticate against our API you need verify your credentials. In return you receive a token identifying you as
the resource owner (user), granting you a certain amount of permissions. Please note: this token does NOT give you the 
privilege to access or work with resources like things, units or connectors since all of them are related to apps 
and not to developer accounts. Instead, this token can be used to access resources like apps (e.g. setup/manage your 
apps). If you would like to know how you can get an app token in order to work with things and units head over to the
oauth2 section.

## Login

> **Request**<br>
> POST https://api.connctd.io/api/v1/auth/login<br>
> *Headers:*<br>
> &nbsp;Content-Type:application/json<br>
> *Body:* see below<br>

```json
{
  "email":"yourmail",
  "password":"yourpassword"
}
```

> **Response**<br>
> *Code:* 200<br>
> *Body:* Token und further information. See example below

```json
{
  "access_token": "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NpZCI6I.....",
  "user_id": "546",
  "user_uuid": "4bbb4e40-99ea-43c6-9447-a4c67f563e1c"
}
```

The response will either have the status code 200 in case of success or 401 in case the 
supplied credentials can't be verified. In error cases a default error object is
returned in the body. This flow is the only way to get a token with the scope connctd.core.

## Logout

> **Request**<br>
> POST *Url:* https://api.connctd.io/api/v1/auth/logout<br>
> *Headers:*<br>
> &nbsp;Content-Type:application/json<br>
> &nbsp;Authorization:YOUR TOKEN<br>
> *Body:* empty<br>

```json
```

> **Response**<br>
> *Code:* 200<br>
> *Body:* Empty

Invalidates the access token. You have to specify your access token within *Authorization* header field.