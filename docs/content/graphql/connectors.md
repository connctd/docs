---
title: Connectors
order: 6
---

A connector is a piece of code that runs externally and connects foreign technologies to the connctd platform.
Connectors are responsible for creating things and executing actions related to the things to update their state.
Connectors can be used in apps and managed via the [Developer Center](https://devcenter.connctd.io/).
For a deeper understanding of the connector concept and how to implement connectors, take a look at the [connector documentation](/connector/connectors/).
Here we will focus on how connectors can be managed and used via our GraphQL API.
Most of this API endpoints are meant to be used via the [Developer Center](https://devcenter.connctd.io) but if you prefer you can use the API directly which may become handy during connector development.

## Resolve

The GraphQL API provides queries to resolve connector publications as well as installations and instantiations belonging to a publication.

### Resolve Publications

Example 1 shows a query that retrieves a list of all connector publication created by the current account.
A developer token is necessary to execute this query.
See [Authorization](/general/auth/) on how to retrieve one.
Note however, that this request is usually done via the [Developer Center](https://devcenter.connctd.io/connectors) and doesn't need to be performed manually.

### Example 1
*Query*
```graphql
query {
    connectorPublications {
        id
        name
        logoUrl
        homeUrl
        description
        requirements
        tags
        active
        mode
        installationCallbackUrl
        instanceCallbackUrl
        actionCallbackUrl
        configurationParameters {
            id
            name
            required
            description
            valueType
            displayType
            validationExpression
        }
        customerConfigurationParameters {
            id
            name
            required
            description
            valueType
            displayType
            validationExpression
        }
    }
}
```

*Response*
```json
{
    "data": {
        "connectorPublications": [
            {
                "id": "-publication id-",
                "name": "",
                "logoUrl": "",
                "homeUrl": "",
                "description": "",
                "requirements": "",
                "tags": [],
                "active": -boolean-,
                "mode": "-PRIVATE or PUBLIC or UNLISTED-",
                "installationCallbackUrl": "",
                "instanceCallbackUrl": "",
                "configurationParameters": [
                    {
                        "id": "",
                        "name": "",
                        "required": -boolean-,
                        "description": "",
                        "valueType": "-STRING or NUMBER or BOOLEAN",
                        "displayType": "",
                        "validationExpression": ""
                    }
                ],
                "customerConfigurationParameters": []
            },
        ]
    }
}
```

### Resolve Installations

Using a developer token, you can query all connector installations for a given service.
Note that this query requires one arguments, the app ID (also known as client ID), which is returned after creating a new app.

### Example 2
*Query*
```graphql
query {
    connectorInstallations(appId: "-app ID-") {
        id
        connector {
            id
            name
            owner
            logoUrl
            description
            requirements
            tags
            mode
            state
            active
            configurationParameters {
                id
                name
            }
            customerConfigurationParameters {
                id
                name
            }
        }
        state
        stateDetails
    }
}
```

*Response*
```json
{
    "data": {
        "connectorInstallations": [
            {
                "id": "-installation ID-",
                "connector": {
                    "id": "-connector ID-",
                    "name": "",
                    "owner": "-user ID of the creator of this connector-",
                    "logoUrl": "",
                    "description": "",
                    "requirements": "",
                    "tags": [
                    ],
                    "mode": "PRIVATE",
                    "state": "PUBLISHED",
                    "active": true,
                    "configurationParameters": [
                    ],
                    "customerConfigurationParameters": []
                },
                "state": "COMPLETE",
                "stateDetails": null
            }
        ]
    }
}
```

### Resolve Instantiations

Using a service token, you can query all instantiations for this service.

### Example 3
*Query*
```graphql
query {
    connectorInstantiations {
        id
        installation {
            id
        }
        state
        stateDetails
        furtherStep {
            type
            content
        }
    }
}
```

*Response*
```json
{
    "data": {
        "connectorInstantiations": [
            {
                "id": "-instance ID-",
                "installation": {
                    "id": "-installation id-"
                },
                "state": "COMPLETE",
                "stateDetails": null,
                "furtherStep": null
            }
        ]
    }
}
```

## Create

The GraphQL API provides endpoints to publish new connectors and to install and instantiate them.

### Publish Connector

You can publish a new connector using a developer token.
This mutation requires a connector publication input.
It will return the specified fields of the newly published connector.
For more information on connector publications take a look at the [documentation](/connector/connectors/).

### Example 3
*Query*
```graphql
mutation {
    publishConnector(connector: {
        name: "My test connector"
        logoUrl: "https://anyurl.com",
        homeUrl: "https://anyurl.com",
        description: "-required description-",
        requirements: "-string-",
        mode: PUBLIC | PRIVATE | UNLISTED,
        tags: ["-string-"],
        configurationParameters: [
            {
                id: "-configuration parameter ID-",
                name: "-display name-",
                required: true,
                description: "-description-",
                valueType: STRING | NUMBER | BOOLEAN,
                displayType: PLAIN | PASSWORD,
                validationExpression: ""
            }
        ],
        customerConfigurationParameters: [
            {
                id: "-customer configuration parameter ID-",
                name: "-display name-",
                required: false,
                description: "",
                valueType: STRING | NUMBER | BOOLEAN,
                displayType: PLAIN | PASSWORD,
                validationExpression: ""
            }
        ],
        installationCallbackUrl: "-required installation callback using HTTPS-",
        instanceCallbackUrl: "-required instantiation callback using HTTPS-",
        actionCallbackUrl: "-required action callback using HTTPS-"
    }) {
        id
        name
        owner
        logoUrl
        homeUrl
        description
        requirements
        mode
        active
        tags
        configurationParameters {
            id
            name
            required
            description
            valueType
            displayType
            validationExpression
        }
        customerConfigurationParameters {
            id
            name
            required
            description
            valueType
            displayType
            validationExpression
        }
        installationCallbackUrl
        instanceCallbackUrl
        actionCallbackUrl
        publicKey
    }
}
```

### Install Connector

Using a developer token publications can be installed via the following mutation.
The mutation has three required arguments: the ID of the app for which you want the connector install the connector, the ID of the connector you want to install and the configuration parameters defined by the connector.
If the connector does not require any configuration parameters, you can send an empty array.

Note that connector installations may require additional steps and are primarily done via the [Developer Center](https://devcenter.connctd.io/), where you will be guided through the installations.
However using the API may be useful during connector development.

### Example 4
*Query*
```graphql
mutation {
    installConnector(
        appId: "-app ID-",
        connectorId: "-connector ID-", 
        configuration: [
            {
                configurationParameterId: "-configuration paramter ID-",
                value: "-parameter value-"
            }
        ]
    ) {
        id
        connector {
            id
        }
        state
        stateDetails
    }
}
```

### Instantiate Connector

Using a service token, connectors can be instantiated with the following mutation.
It requires two arguments: the ID of the installation you would like to instantiate and the customer configuration parameters defined by the connector.
If the connector does not require any configuration parameters, you can send an empty array.

### Example 5
*Query*
```graphql
mutation InstantiateConnector {
    instantiateConnector(
        installationId: "-installation ID-", 
        configuration: [
            {
                configurationParameterId: "-parameter ID-",
                value: "-parameter value-"
            }
        ]
    ) {
        id
        installation {
            id
        }
        state
        stateDetails
    }
}
```

## Delete

The GraphQL API provides endpoints to delete connector publications, installations and instances.

### Delete Connector Publications

Using a developer token, connector publications can be removed with the following mutation.
It requires the ID of the connector you want to remove as an argument and returns the specified fields of the removed publication.

### Example 6
*Query*
```graphql
mutation {
    removeConnector(
        connectorId: "-connector ID-"
    ) {
        id
        state
    }
}
```

### Delete Connector Installations

Installation can be removed using a developer token with the following mutation.
It requires two arguments, the ID of the installation you wish to remove and a flag, specifying whether existing instances should also be removed.
If the flag is set to false and the installation has existing instances, nothing will be removed and the mutation returns the affected installation as well a list of affected instances.
If the flag is set to true, the existing instances will be removed alongside with the installation.
Note that removing a installation with existing instances may affect the end users of the service the installation belongs to.

### Example 7
*Query*
```graphql
mutation {
    removeInstallation(
        installationId: "-installation ID-",
        removeInstances: false
    ) {
      affectedInstallation {
          id
          state
      }
      affectedInstances {
          id
          state
      }
    }
}
```

### Delete Connector Instances

Instances can be removed using a service token with the following mutation.
It requires the ID of the instance you would like to remove.

### Example 8
*Query*
```graphql
mutation {
    removeInstance(
        instanceId: "-instance ID-"
    ) {
        id
        installation {
            id
        }
        state
        stateDetails
    }
}
```