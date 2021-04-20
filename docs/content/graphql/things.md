---
title: Things
order: 3
---

Things in our API are abstract representations of specific IoT related devices. They can be created, deleted
and managed with our API. Depending on the requested action the supplied token must have certain scopes.

Available scopes for Things:

* connctd.connector (legacy)
* connctd.things.read

---
> **NOTE 1**
> Have a look on our [GQL key facts section](/graphql/introduction/#quick-start) to get an overview about required headers, methods and endpoints.
---
> **NOTE 2**
> This page only shows the most important queries and mutations. Checkout out our [SDL](/graphql/tools/#sdl]) to get a list of all supported queries

## Resolve

GraphQL allows you to specify the fields you would like to get back. Example 1 shows a query that fetches all fields of all things.

### Example 1
*Query*
```graphql
query {
    things {
        id
        name
        manufacturer
        attributes {
            name
            value
        }
        mainComponentId
        status
        displayType
        components {
            id
            name
            componentType
            capabilities
            properties {
                id
                name
                value
                unit
                type
                propertyType
                lastUpdate
            }
            actions {
                id
                name
                parameters {
                    name
                    type
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
                "id": "85c967f4-2edb-4e0c-887e-2fd7ad5e89dc",
                [...]
            },
            [...]
        ]
    }
}
```


### Constraints

Constraints allow you to search for things with certain criteria. There exist different criteries that can be applied like *thingConstraint, thingAttributeConstraint, thingComponentConstraint, componentPropertyConstraint, componentActionConstraint and propertyAffectedByConstraint*. The following query for example returns all things
that have at least one component which is SWITCHABLE.

### Example 2

*Query*
```graphql
query {
    things(thingComponentConstraint: {capabilities: ["SWITCHABLE"]}) {
        name
    }
}
```

*Response*
```json
{
    "data": {
        "things": [
            {
                "name": "LightTwo"
            },
            [...]
        ]
    }
}
```


Constraints can also be used on sub nodes to remove undesired parts. In example 3 only properties are shown that reflect the ONOFF state of a thing.

### Example 3
*Query*
```graphql
query {
  query {
      things(thingConstraint: {name: "LightTwo"}) {
          name
          components {
              properties(propertyConstraint: {propertyType: "ONOFF"}) {
                  value
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
                                "value": "true"
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
```

## Create

A thing can be created by calling the appropriate createThing mutation (see example 4). Consider using
[variables](/graphql/advanced/#variables) when passing complex parameters.

### Example 4

*Query*
```graphql
mutation {
  createThing(thing: {
              name: "Dummy Light",
              manufacturer: "Dummy manufacturer",
              attributes: [],
              mainComponentId: "lamp",
              status: AVAILABLE,
              displayType: "LAMP",
              components: [
                  {
                      id: "lamp",
                      name: "Lamp",
                      componentType: "LAMP",
                      capabilities: [
                          "SWITCHABLE",
                          "COLORABLE",
                          "DIMMABLE"
                      ],
                      properties: [
                          {
                              id: "on",
                              name: "on",
                              value: "false",
                              unit: "",
                              type: BOOLEAN,
                              propertyType: "ONOFF"
                          }
                      ],
                      actions: [
                          {
                              id: "setOn",
                              name: "setOn",
                              parameters: [
                                  {
                                      name: "on",
                                      type: BOOLEAN
                                  }
                              ]
                          }
                      ]
                  }
              ]
          }
  ) {
      id
      name
  }
}
```

*Response*
```json
{
    "data": {
        "createThing": {
            "id": "a7f72536-920f-4fd9-b6a0-029eb0711048"
        }
    }
}
```

## Delete

Multiple things can be removed by using constraints. The following query will remove
all things with a specific name.

### Example 5

*Query*
```graphql
mutation {
    deleteThings(thingConstraint: { name: "Virtual Light"}, dryRun: true) {
        name
    }
}
```

*Response*
```json
{
    "data": {
        "deleteThings": [
            {
                "name": "Virtual Light"
            }
        ]
    }
}
```

## Trigger Actions
<!-- span class="tag">canary feature</span -->

Trigger actions of things with certain criteria. Example 6 turns on all things that have a SWITCHABLE component.
The component- and actionSelector define which actions will be called of the things that match the constraints. 

### Example 6

*Query*
```graphql
mutation {
    requestThingAction(
        thingConstraints: {
            thingComponentConstraint: {capabilities: ["SWITCHABLE"]}
        },
        componentSelector: {capabilities: ["SWITCHABLE"]},
        actionSelector: {id: "setOn", parameterName: "on", parameterType: BOOLEAN},
        actionParameters: [{name: "on", value: "true"}],
        dryRun:true
    ) {
        targetThing{
            id
            name
            manufacturer
        }
        targetComponent {
            id
            name
        }
        targetAction {
            id
        }
        id
        status
        deadline
        error
    }
}
```

*Response*
```json
{
    "data": {
        "requestThingAction": [
            {
                "targetThing": {
                    "id": "85c967f4-2edb-4e0c-887e-2fd7ad5e89dc",
                    "name": "LightTwo",
                    "manufacturer": "LIFX"
                },
                "targetComponent": {
                    "id": "lamp",
                    "name": "Lamp"
                },
                "targetAction": {
                    "id": "setOn"
                },
                "id": "542cdaab-71fe-40f4-89e2-aeacb3d2bb47",
                "status": "COMPLETED",
                "deadline": "2021-04-20T07:42:06Z",
                "error": null
            },
            [...]
        ]
    }
}
```