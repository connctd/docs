# Scopes

Scopes are attached to access tokens and specify the actions that can be performed on resources.

Scope | Allows requesting entity to...
---------- | -------
connctd.units.read | query units
connctd.units.admin | create, modify and remove units
connctd.things.read | query things
connctd.things.action | create actions requests
connctd.connector | create, read, modify and remove things
connctd.core | Can't be requested by oauth 2 apps. Automatically assigned to user token retrieved via /api/v1/auth/login.
