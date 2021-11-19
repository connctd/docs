---
title: Units
order: 5
---

A unit is a primitive container that gives developers the possibility to group things and to put them into a context. Since a unit can reference other units (children and parents) even complex structures of the real world can be modeled like for example a city with it's streets and buildings.

Available scopes for Units:

* connctd.units.read
* connctd.units.admin

---
> **NOTE 1**
> Have a look on our [GQL key facts section](/graphql/introduction/#quick-start) to get an overview about required headers, methods and endpoints.
---
> **NOTE 2**
> This page only shows the most important queries and mutations. Checkout out our [SDL](/graphql/tools/#sdl]) to get a list of all supported queries

## Resolve

By using gql you can not just query units but also things that are located inside units which is very powerful. Example 1 shows a query that fetches
all fields of all units. Inside the query properties of all things are resolved as well as the names of
all children and their children.

### Example 1
*Query*
```graphql
query {
    query {
        units {
            id
            name
            type
            properties {
                name
                value
            }
            things {
                name
                components {
                    name
                    properties {
                        value
                    }
                }
            }
            children {
                name
                children {
                    name
                }
            }
            parents {
                name
            }
        }
    }
}
```

*Response*
```json
{
    "data": {
        "units": [
            {
                "id": "07420a29-068c-4712-9d0d-a5260a293c51",
                "name": "My Kitchen",
                "type": "ROOM",
                "properties": [
                    {
                        "name": "myprop",
                        "value": {
                            "foo": 123,
                            "hello": "world"
                        }
                    }
                ],
                "things": [
                    {
                        "name": "Test Thing",
                        "components": [
                            {
                                "name": "dummy lamp",
                                "properties": [
                                    {
                                        "value": "true"
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "children": [],
                "parents": []
            }
        ]
    }
}
```

### Constraints

Constraints allow you to search for units with certain criteria.
There exist different criteria that can be applied like *unitConstraint, unitPropertyConstraint, unitSubjectConstraint, unitChildConstraint, unitParentConstraint and unitThingConstraints*.
The following query returns all units that have at least on thing that is SWITCHABLE.

### Example 2

*Query*
```graphql
query {
    units(unitThingConstraints: {thingComponentConstraint: {capabilities: ["SWITCHABLE"]}}) {
        id
    }
}
```

*Response*
```json
{
    "data": {
        "units": [
            {
                "id": "07420a29-068c-4712-9d0d-a5260a293c51"
            }
        ]
    }
}
```

## Create

A unit can be created by calling the appropriate createUnit mutation.
Example 4 shows the minimal configuration of a unit.
Consider using [variables](/graphql/advanced/#variables) when passing complex objects.

### Example 3

*Query*
```graphql
mutation {
    createUnit(unit: {
        name: "Kitchen"
        type: "ROOM"
    }) {
        id
    }
}
```

*Response*
```json
{
    "data": {
        "createUnit": {
            "id": "86e1e67a-671c-4e8a-ac5c-c68c4296cc1f"
        }
    }
}
```

The following mutation also adds properties and a child relation to the unit during creation.

### Example 4

*Query*
```graphql
mutation {
    createUnit(unit: {
        name: "My Kitchen",
        type: "ROOM",
        properties: [
            {
                name: "myprop",
                value: {
                    hello: "world",
                    foo: 123
                }
            }
        ],
        things: [
            { id: "2ae97b1a-7bd1-438d-a511-c996dce0a0d0" }
        ],
        children: [
            { id: "68fb5494-fc59-4ecf-ba5f-b69338152295" }
        ]
    }) {
        id
    }
}
```

## Delete

Multiple units can be removed by using constraints. The following query will remove
all units with a specific type.

### Example 5

*Query*
```graphql
mutation {
    deleteUnits(unitConstraint: {type: "ROOM"}, dryRun: false) {
        id
    }
}
```

*Response*
```json
{
    "data": {
        "deleteUnits": [
            {
                "id": "52cbb28f-8271-49ee-8732-8b33feeefa06"
            },
            {
                "id": "7587affd-c288-4d44-ad71-318aecf18e84"
            }
        ]
    }
}
```
