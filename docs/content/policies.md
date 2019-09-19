# Policies

Whenever a unit or thing is created it belongs to a specific subject and thus can only be seen by that subject. Policies allow a subject to share resources with other subjects. Depending on the policy settings a policy can give e.g. access to a complete thing or only parts and specific actions of a thing like a single sensor reading.

## Model 

```json
{
  "id": "<generated id>",
  "description": "<description of policy>",
  "subjects": ["<subject id>"],
  "resources": ["<resource id>"],
  "actions": ["GET", "UPDATE", "CREATE", "DELETE"],
  "effect": "<allow|deny>"
  "owner": "<who created the policy>"
}

```

On the right hand side you can see the model of a policy on how it is stored within our database.

The **subjects** parameter holds a list of subject ids (represented as plain strings) indicating to which subjects the policy will take effect to. **resources** is a list of resource names and defines to which resources the policy will apply. See the section *Create policy* for a detailed description on to specify resources. The parameter **actions** controls the actions that will be allowed by the subjects on the defined resources. As soon as a policy fits the **effect** finally determines whether the access will be allowed or denied. The effect value *allow* will be used in most cases. Usage of *deny* makes sense if you have defined overlapping policies. In those cases a *deny* policy will always win over an *allow* policy.

## Create policy

Creates a policy that is applied to given subjects as soon as request fits one of given resources.

> **Request:** *Method:* POST *Url:* https://api.connctd.io/api/v1/policies *Content-Type:* application/json *Body:* see below

```json
{
  "description":"Dummy policy",
  "resources":["resource:things:f85eb546-e791-4642-86b1-a981678dcf31", "resource:things:f85eb546-e791-4642-86b1-a981678dcf31:*"],
  "subjects":["122f0260-2506-44b6-8d08-574ad27d7529", "a21f9779-c44e-4e70-9f3c-16e31a93094b"],
  "effect":"allow",
  "actions":["GET"]
}
```

> **Response:** *Code:* 201 *Body:* Id of newly created policy. See example below

```json
{
  "id": "f6088362-a864-4834-89eb-d9e4dafbaefe"
}
```

A **Resources** describes an entity within the connctd platform. Right now we support referencing things (and of course sub elements) and units. A resource can only be referenced from within a policy if the subject creating the policy is also the owner of the resource. Resources have to be declared in the following way: 

`resources:<things|units>:<non-wildcard-id>[:<optional subelements including wildcards]`

Resource definitions not following this pattern will cause Bad Request error response.

Please note that a resource name needs to contain the thing or unit ids - no wildcards are allowed on this level of the resource name.

Examples:

Resourcename | Meaning
---------- | -------
resources:things:123 | Subject can access the top level thing but not sub elements like components or actions
resources:things:123:* | Subject can access all sub elements but not top level thing
resources:things:123:components:lamp:properties:* | Subject can only access all the lamp properties
resources:things:123:components:lamp:properties:on | Subject can only access all the on property of the lamp
resources:things:123:components:*:properties:on | Subject can access all properties with name on
resources:units:123 | Subject can access the unit 123

Required scope: `connctd.policies.admin or connctd.core`

## Retrieve policies

Retrieves a list of all policies the subject has created or the subject is referenced by.

Required scope: `connctd.policies.read or connctd.core`

> **Request:** *Method:* GET *Url:* https://api.connctd.io/api/v1/policies

```json
```

> **Response:** *Code:* 200 *Body:* List of policy references. See example below

```json
[
  {
    "href": "https://api.connctd.io/api/v1/policies/1376f734-dbfc-486d-b264-f62d3ff88579"
  }, ...
]
```

## Retrieve policy

Retrieves a single policy.

Required scope: `connctd.policies.read or connctd.core`

> **Request:** *Method:* GET *Url:* https://api.connctd.io/api/v1/policies/-policyid-

```json
```

> **Response:** *Code:* 200 *Body:* Policy. See example below

```json
{
    "id": "f314ca-208a-4fc3-a4d3-4165ce216641",
    "description": "Dummy Policy",
    "subjects": [
        "342244-89ea-45f5-9447-e5c68f567d2b"
    ],
    "resources": [
        "resources:units:f85eb546-e791-4642-86b1-a981678dcf31"
    ],
    "actions": [
        "GET"
    ],
    "effect": "allow",
    "owner": "342ed912-d8d1-430e-aac1-da2e68f33cb6"
}
```

## Delete policy

Removes a policy.

Required scope: `connctd.policies.admin or connctd.core`

> **Request:** *Method:* DELETE *Url:* https://api.connctd.io/api/v1/policies/-policyid-

```json
```

> **Response:** *Code:* 200 *Body:* Empty body
