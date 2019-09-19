# Errors

The connctd.io API uses the following error codes:


Error Code | Meaning
---------- | -------
400 | Bad Request -- Your request sucks
401 | Unauthorized -- Your token or credentials can't be verified
403 | Forbidden -- The provided token does not have sufficient permissions for the requested action
404 | Not Found -- The specified Unit or Thing could not be found
409 | Conflict -- Resource already exists or conflicts with another resource
500 | Internal Server Error -- We had a problem with our server. Try again later.
503 | Service Unavailable -- We're temporarily offline for maintenance. Please try again later.

> Error response object

```json
{
  "status": "404",
  "error": "THING_DOESNT_EXIST",
  "description": "The requested Thing doesn't exist",
  "more_info": "https://docs.connctd.io/errors/thing_doesnt_exist"
}
```
