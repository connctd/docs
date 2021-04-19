---
title: History
order: 4
---

## Resolve

At connctd the historic values are conceptionally directly attached to the things. This is very usefule since all relevant semantic details are
part of a thing and it allows you do queries like "give me all historic values of all door sensors". In example 4 you can see a query that fetches
the historic values of all properties that reflect an ONOFF state. As you can see you are able to limit the amount of values returned
by specifying filters in the history node.

### Example 1

*Query*
```graphql
query {
    things(thingConstraint: {name: "LightTwo"}) {
        name
        components {
            properties(propertyConstraint: {propertyType: "ONOFF"}) {
                history(from: "2020-04-02T08:13:45.598302Z", to: "2020-04-06T12:15:53.690549Z", first: 5, after: "DRaIn0==") {
                    edges {
                        cursor
                        node {
                            timestamp
                            value
                        }
                    }
                }
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
                        "properties": [
                            {
                                "history": {
                                    "edges": [
                                        {
                                            "cursor": "eyJ0aW1lIjoiMjAyMC0wNC0wMlQwODoxMzo1NS41MTI1MDRaIn0=",
                                            "node": {
                                                "timestamp": "2020-04-02T08:13:55.512504Z",
                                                "value": false
                                            }
                                        },
                                        [...]
                                    ]
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
```
