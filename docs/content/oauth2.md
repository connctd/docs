# OAuth 2.0

The connctd platform acts as a oauth2 provider implementing all flows described in
[rfc6749](https://tools.ietf.org/html/rfc6749#section-4) except the "Resource Owner Password Credentials Grant". If you
are planning to develop an app which makes use of e.g. things and units, we highly recommend the
"Clients Credentials Flow". This flow will generate a token which ensures that all things and units your 
app creates will exclusively belong to your app. If you are planning to develop a more advanced app that needs to
access things and units that are managed by another app, you need to make use of the
"Authorization Code Grant Flow" as the access to foreign app resources requires the permission of the foreign app
owner.

## Client Credentials Flow

Retrieves a token which can be used to manage things, units and connectors. See [rfc6749](https://tools.ietf.org/html/rfc6749#section-4.4)
for request details.

> **Request**<br>
> POST https://api.connctd.io/oauth2/token<br>
> *Headers:*<br>
> &nbsp;Content-Type:application/x-www-form-urlencoded<br>
> &nbsp;Authorization:Basic base64_encode(YOUR_CLIENT_ID_id:YOUR_CLIENT_SECRET)<br>
> *Body:* see below<br>

```bash
grant_type=client_credentials&scope=connctd.connector+connctd.units.admin+connctd.things.read+connctd.units.read+connctd.things.action
```

> **Response**<br>
> *Code:* 200

```json
{
    "access_token": "vha....",
    "expires_in": 3599,
    "scope": "connctd.connector connctd.units.admin connctd.things.read connctd.units.read connctd.things.action",
    "token_type": "bearer"
}
```

## Authorization Code Grant Flow & Implicit Grant Flow

As already mentioned in the introduction adding this flow to your app only makes sense if your app would like to access
 resources of foreign apps. Details of the flow and how to set each parameter can be found [here](https://tools.ietf.org/html/rfc6749#section-4.1).

> **Request**<br>
> GET https://api.connctd.io/oauth2/auth?state=abcdefghiklmnop
> &client_id=1bd2f1a3-e72d-4606-b82b-86d1054f3bd4
> &redirect_uri=https%3A%2F%2Fabc%2Fauth%2Fcallback
> &response_type=code&scope=connctd.units.read+connctd.things.read+connctd.connector+offline

> **Response**<br>
> *Code:* 301

### Redirecting resource owner

> **Request**<br>
> GET https://YOURREDIRECTIONURL/...?code=qq1YnxN....
> &scope=connctd.things.read%20connctd.connector%20offline
> &state=abcdefghijklmnoaasa

> **Request**<br>
> GET https://YOURREDIRECTIONURL/...?https://tutorial.connctd.io/callback?error=invalid_scope
> &error_description=The+requested+scope+is+invalid%2C+unknown%2C+or+malformed
> &state=abcdefghijklmnoaasa
```json
```

This request needs to be called by the developer of the app to which resources you would like to get access to. The
request will redirect the developer to connctds consent screen. After he has logged in he is asked weather your app is
allowed to act with the given permissions (your scopes) AND he needs to select one of his apps from a list which defines
 o which app resources your app will get access to. This app selection is quite uncommon for this type of flow but it is
necessary as things and units are not attached to developer accounts but instead to apps (because one
developer account may have multiple apps).

As soon as the developer accepts, the browser gets redirected to the redirection url (which points to your app backend).
It also might happen that he rejects or an error occurs. Depending on the case one of the following redirects will take place:

<aside class="notice">
  In case you would like to use the Implicit Grant Flow just replace the response_type=code with response_type=token in the request on right hand side.
</aside>

### Requesting a token

If the requested scopes were granted the redirect uri gets called containing an auth code. Use that one to perform the
request on the right hand side

> **Request**<br>
> POST https://api.connctd.io/oauth2/token<br>
> *Headers:*<br>
> &nbsp;Content-Type:application/x-www-form-urlencoded<br>
> &nbsp;Authorization:Basic base64_encode(YOUR_CLIENT_ID_id:YOUR_CLIENT_SECRET)<br>
> *Body:* see below<br>

```bash
grant_type=authorization_code&code=-auth code from reply of prev request-&
redirect_uri=http%3A%2F%2Fabc.com%%2Fauth%2Fcallback&client_id=1bd2f1a3-e72d-4606-b82b-86d1054f3bd4
```

> **Response**<br>
> *Code:* 200

```json
{
    "access_token":"...",
    "refresh_token":"...",
    "scope":"...",
}
```
