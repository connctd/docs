---
title: Connector
order: 2
---

A connector is a piece of code that runs externally and connects foreign technologies to the connctd platform.
Connectors are responsible for creating things and executing actions related to the things to update their state.
Connectors can be used in apps and installed via the [Developer Center](https://devcenter.connctd.io/).
To use a connector, two steps must be taken.
First the app owner must install the connector and provide a basic configuration if expected by the connector.
Second the app has to create an instance which is used for one end customer.
Note, that connectors only have access to things they have created and they do not have a concept of end customers.
Instead they work with instance tokens, that do not reflect to which end customer it belongs to.
Figure 1 gives an overview of the connector architecture.

![Overview of the connector architecture](/images/AbstractView.png "Overview of the connector architecture")<br>
*Figure 1: Overview of the connector architecture*

## Using an existing connector

Connectors can be installed via the [Connector Store](https://devcenter.connctd.io/connectors/store) in the [Developer Center](https://devcenter.connctd.io/).
First select the app in the sidebar for which you would like to install a connector.
Then choose the connector you want to install in the Connector Store, click the install button and provide the required information.
Depending on the connector additional steps may be necessary.
It is in the responsibility of the connector to give further instructions.

Installations can not be instantiated via the Developer Center because instantiations are typically needed for each user of the app and may need interaction from the end user.
Instead apps can instantiate connector installations programmatically by sending the following GraphQL query to our API:

```graphql
# GQL Query against https://api.connctd.io/api/v1/query
mutation InstantiateConnector($installationId: ID!) {
    instantiateConnector(installationId: $installationId, configuration: [
        {
            configurationParameterId: "instantiationParamOneId",
            value: "StringTypeHelloWorld"
        },
        {
            configurationParameterId: "instantiationParameterTwoId",
            value: "123"
        },
    ]) 
    {
        id
        installation {
            id
        }
        state
        stateDetails
    }
}
```

You can find the connector installation ID in the Developer Center in the detail view of your [installed connectors](https://devcenter.connctd.io/connectors).
The specific configuration depends on the connector, but it generally requires a list of GraphQL input objects of the following type:

```graphql
input ConfigurationParameterValueInput {
	configurationParameterId: ID!
	value: String!
}
```

### Removing a connector installation

Connector installations can be removed in the detail view of your [installed connectors](https://devcenter.connctd.io/connectors) by clicking the Delete button.
Note that this will also delete the created instantiations which means that you will loose access to the created things.
This will also affect the end users of your app.

## Writing your own connector

To use the connctd platform with a technology that is not supported via the Connector Store, you must implement a new connector and publish it to the Connector Store.
Note that new connectors publication can be public, hidden or private.
A public connector is visible to and can be used by all users of the connctd platform.
A private connector on the contrary can only be used by the account that created the connector publication.
A hidden connector is not visible in the connector store, but can be used by anyone who knows the connector ID.
Therefore you do not have to make your own connectors publicly available.

A connector consists of two parts: A connector service reachable via HTTPS that implements the [connector protocol](/connector/connector_protocol) described below and a connector publication that is created in the [Developer Center](https://devcenter.connctd.io/).
The publication tells the connctd platform about callback URLs specified in the protocol, defines the necessary steps to install and instantiate the connector and optionally adds some meta data, that is used in the Connector Store.

The easiest way to implement a connector is to use the provided [connector SDK](https://github.com/connctd/connector-go), but you can also implement a connector from scratch using any language you want.
A detailed description of the protocol can be found in the [connector protocol documentation](/connector/connector_protocol).
