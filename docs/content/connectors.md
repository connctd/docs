# Connectors

There are two ways on how things can be added to an external subjects thing list: You can either [register](#register-an-app) and write your own app and use the [create thing](#create-thing) endpoint and/or you can make use of so called connectors.
Basically a connector can be understood as a piece of code which connects a remote technology and takes care of transforming foreign domain entities into things. Since remote technologies often require different configurations and connectors probably need to run for a couple of users (external subjects) we have split up the concept of a connector into two separate entities:

* **Connector Instance** Can be seen as a preconfiguration for each connector client. As a developer, you can create for each technology exactly one connector instance. This connector instance can have a configuration depending on the requirements of the specific technology. For example if you would like to make use of our OpenWeatherMap connector you need to pass a so called AppKey when creating the connector instance. Otherwise the instance creation will fail. This AppKey can be retrieved when registering at openweathermap.com. As soon as you have created the connector instance you can then create as many connector clients as you wish. The created connector clients will then make use of the previously created connector instance.

* **Connector Client** A connector client is the actual running piece of code which for example polls a remote api and abstracts the results into things. You can not create connector clients for a "technology X" if there does not exist the corresponding connector instance for "technology X". Just as a side note: In contrast to a connector instance which runs only for a specific developer account the creation of a connector client will only succeed if you pass the header field "X-External-Subject-Id". This parameter is internally required by the connector client in order to assign the generated things to the appropriate external subject thing list. 

## Retrieve connector descriptions

> **Request**<br>
> GET https://api.connctd.io/api/v1/connectors/descriptions<br>
> *Headers:* none<br>
> *Body:* empty<br>

```json
```

> **Response**<br>
> *Code:* 200<br>
> *Body:* List of connector descriptions. See example below

```json
{
	"id": 2,
	"type_id": "netatmo",
	"name": "Netatmo",
	"description": "",
	"logo": "",
	"sample_instance_configuration": {
		"connector_type_id": "netatmo",
		"configuration": {
			"client_id": "abc",
			"client_secret": "def",
			"origin_callback_uri": "http://localhost:9999/callback"
		}
	},
	"sample_client_configuration": {
		"connector_type_id": "netatmo"
	}
}
```

This endpoint returns a list of all available connectors including their connector type_ids as well as sample client and instance configurations.

Required scope: none

## Create connector instance

> **Request**<br>
> POST https://api.connctd.io/api/v1/connectors/instances<br>
> *Headers:*<br>
> &nbsp;Content-Type:application/json<br>
> &nbsp;Authorization:YOUR TOKEN<br>
> *Body:* see below<br>

```json
{
	"connector_type_id": "netatmo",
	"configuration": {
		"client_id": "...",
		"client_secret": "...",
		"origin_callback_uri": "http://...."
	}
}
```

> **Response**<br>
> *Code:* 201<br>
> *Body:* Id of newly created instance. See example below

```json
{
	"id": "1d79b399-c3e1-4706-b4c5-f36826430233"
}
```

Creates a new connector instance. Please note: the value of the configuration field depends on the connector type (technology). You can only create one instance per connector_type_id. Otherwise 409 (conflict) is returned.  

Required scope: `connctd.connector`

## Retrieve connector instances

> **Request**<br>
> GET https://api.connctd.io/api/v1/connectors/instances<br>
> *Headers:*<br>
> &nbsp;Authorization:YOUR TOKEN<br>
> *Body:* empty<br>

```json
```

> **Response**<br>
> *Code:* 200<br>
> *Body:* List of instances. See example below

```json
[
	{
		"href": "https://api.connctd.io/api/v1/connectors/instances/1d79b399-c3e1-4706-b4c5-f36826430233"
	}
]
```

Retrieves a list of links to all connector instances.  

Required scope: `connctd.connector`


## Retrieve connector instance

> **Request**<br>
> GET https://api.connctd.io/api/v1/connectors/instances/-instanceId-<br>
> *Headers:*<br>
> &nbsp;Authorization:YOUR TOKEN<br>
> *Body:* empty<br>

```json
```

> **Response**<br>
> *Code:* 200<br>
> *Body:* Specific instance. See example below

```json
{
	"id": "1d79b399-c3e1-4706-b4c5-f36826430233",
	"clients": [
		{
			"href": "https://api.connctd.io/api/v1/connectors/clients/d202e1a7-20a2-4581-9630-551dbe39d888"
		}
	],
	"connector": {
		"href": "https://api.connctd.io/api/v1/connectors/descriptions/2"
	},
}
```

Fetches a specific instance. The json object holds a reference to the connector description as well as a list of all clients that are using this instance 

Required scope: `connctd.connector`

## Delete connector instance

> **Request**<br>
> DELETE https://api.connctd.io/api/v1/connectors/instances/-instanceId-<br>
> *Headers:*<br>
> &nbsp;Authorization:YOUR TOKEN<br>
> *Body:* empty<br>

```json
```

> **Response**<br>
> *Code:* 204<br>
> *Body:* empty

Removes a connector instance. A connector instance can only be removed if all clients that are attached to it are removed. Otherwise a 409 is returend.

Required scope: `connctd.connector`

## Create connector client

> **Request**<br>
> POST https://api.connctd.io/api/v1/connectors/clients<br>
> *Headers:*<br>
> &nbsp;Content-Type:application/json<br>
> &nbsp;Authorization:YOUR TOKEN<br>
> &nbsp;X-External-Subject-Id:SUBJECT_ID<br>
> *Body:* see below<br>

```json
{
	"connector_type_id": "netatmo",
	"configuration": {
		"anyField":"abc"
	}
}
```

> **Response**<br>
> *Code:* 201 OR 303<br>
> *Body:* Id of newly created client or redirect having location header. See example below

```json
{
	"client_id": "d202e1a7-20a2-4581-9630-551dbe39d888"
}
```

Creates a new connector client. Again the configuration of the client depends on the requirements of the connector. The response status code can be either 201 or 303 (redirect) and depends on the connector type. In both cases the connector client was created. If a 303 is returned the browser of the client needs to be redirected to the location which is mentioned within the location-header-field of the response. A 409 is returned if a client for given X-External-Subject-Id & connector_type_id was already created. A 400 is returned if there exists no appropriate connector instance.   

Required scope: `connctd.connector`

## Retrieve connector clients

> **Request**<br>
> GET https://api.connctd.io/api/v1/connectors/clients<br>
> *Headers:*<br>
> &nbsp;Authorization:YOUR TOKEN<br>
> &nbsp;X-External-Subject-Id:SUBJECT_ID<br>
> *Body:* empty<br>

```json
```

> **Response**<br>
> *Code:* 200<br>
> *Body:* List of clients. See example below

```json
[
	{
		"href": "https://api.connctd.io/api/v1/connectors/clients/d202e1a7-20a2-4581-9630-551dbe39d888"
	}
]
```

Retrieves a list of links to all connector clients that belong to given X-External-Subject-Id.  

Required scope: `connctd.connector`


## Retrieve connector client

> **Request**<br>
> GET https://api.connctd.io/api/v1/connectors/clients/-clientId-<br>
> *Headers:*<br>
> &nbsp;Authorization:YOUR TOKEN<br>
> &nbsp;X-External-Subject-Id:SUBJECT_ID<br>
> *Body:* empty<br>

```json
```

> **Response**<br>
> *Code:* 200<br>
> *Body:* Specific client. See example below

```json
{
	"id": "d202e1a7-20a2-4581-9630-551dbe39d888",
	"instance": {
		"href": "https://api.connctd.io/api/v1/connectors/instances/1d79b399-c3e1-4706-b4c5-f36826430233"
	},
	"connector": {
		"href": "https://api.connctd.io/api/v1/connectors/descriptions/2"
	},
	"mappings": [
		{
			"connector_thing_id": "abc",
			"thing_id": "56ed33d9-bd1a-4650-9264-d996132098de"
		}
	],
	"status": "STARTED" 
}
```

Fetches a specific client for a given X-External-Subject-Id. The json object holds references to the connector description and corresponding connector instance. Within the mappings field a list of key values pairs is stored. It shows which things were create by the given client and to which id they are mapped internally.

Status might be Starting, Started or Error  

Required scope: `connctd.connector`

## Delete connector client

> **Request**<br>
> DELETE https://api.connctd.io/api/v1/connectors/clients/-clientId-<br>
> *Headers:*<br>
> &nbsp;Authorization:YOUR TOKEN<br>
> &nbsp;X-External-Subject-Id:SUBJECT_ID<br>
> *Body:* empty<br>

```json
```

> **Response**<br>
> *Code:* 204<br>
> *Body:* empty

Removes a connector client. Removing a connector client will also lead to the removal of the corresponding things that were created by this connector client.

If the removal of the corresponding things fails a 500 is returned and the connector client remains active. Try to remove the client again if that happens.

Required scope: `connctd.connector`

## Get connector service callback url

> **Request**<br>
> GET https://api.connctd.io/api/v1/connectors/callbackurl
> *Headers:*<br>
> &nbsp;Authorization:YOUR TOKEN<br>
> *Body:* empty<br>


```json
```

> **Response**<br>
> *Code:* 200<br>
> *Body:* Callback url

```json
{
    "href": "https://api.connctd.io/api/v1/connectors/actions/1eb8b9f..."
}
```

Connector clients might create things with actions. If you are trying to trigger such an action it will fail unless you have provided a callback url to our backend. The callback url tells our backend to which endpoint it has to route the action request since only the thing creating service or app knows how to handle the action request. Since the connector service has created the thing you have to register the callback url you get from the request shown on the right hand side. [Here](#register-a-callback-url) you can read how to register the callback url.


