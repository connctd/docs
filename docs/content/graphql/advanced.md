---
title: Advanced
order: 7
---


## Aliases

Aliases allow you to structure your data the way you need it. Example 1 shows how properties that reflect the ONOFF state are grouped into a field that is called "onProps". The field "colorProps" will hold properties that reflect the color state of a thing.

### Example 1
*Query*
```graphql
query {
    things(thingConstraint: {name: "LightTwo"}) {
        name
        components {
            onProps: properties(propertyConstraint: {propertyType: "ONOFF"}) {
                value
            }
            colorProps: properties(propertyConstraint: {propertyType: "COLOR"}) {
                value
            }
        }
    }
}
```

*Response*
```json
{
    "data": {
        "things": [
            {
                "name": "LightTwo",
                "components": [
                    {
                        "onProps": [
                            {
                                "value": "true"
                            }
                        ],
                        "colorProps": [
                            {
                                "value": "231.000000:0.580000:0.950000"
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
```

## Variables

You can define and use variables inside your mutations and queries. Example 2 shows how thing is created from a variable. Down below you will also
find the equivalent query in curl.

### Example 2
*Query*
```graphql
mutation thingCreation($mylight: NewThing!) {
    createThing(thing: $mylight) {
        id
    }
}
```

*Equivalent query*
```
curl --location --request POST 'https://api.connctd.io/api/v1/query' \
--header 'Authorization: Bearer ...' \
--header 'X-External-Subject-ID: ...' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"mutation thingCreation($mything: NewThing!) {\n    createThing(thing: $mything) {\n        id\n    }\n}\n","variables":{"light":{"name":"My thing","manufacturer":"Dummy Manufacturer", ...}}}'
```