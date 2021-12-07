---
title: Connectors
order: 1
---

### Connector Publication

Describes a technology and configuration parameters that are required to install and instantiate connectors. Publications can be managed via the [Developer Center](https://devcenter.connctd.io/). Multiple apps can install a published connector.

### Connector Installation

Are used to configure a technology. A connector installation is always based on a referenced connector publication and can only be installed once for a specific app. It acts as a container for multiple connector instances. Connector installations are managed via the [Developer Center](https://devcenter.connctd.io/).

### Connector Instance

Abstracts e.g. devices for a specific end customer. An instance always belongs to a connector installation. Needs to be installed with a service token from within your service. E.g. your end customer request the installation of a specific technology and your service sends the appropriate connector installation request to our platform.

### Signature

Whenever connctd sends a request to your connector, a signature will be send along as a request header. Connectors can use the public publication key presented after connector publication in order to validate the signature. This allows you to verify that connctd is the actual sender of the message and not an attacker. See [connector protocol docs](/connector/connector_protocol/#new-installation) for more information on the signature.

### Installation Token

When creating a [new installation](/connector/connector_protocol/#installation-callback), the connctd platform will respond with a installation token that must be used by the connector to authorize all further request regarding this installation. Note that the communication between a connector and the connctd platform is always using TLS. Therefore the token is never transmitted unencrypted.

### Instance Token

When creating a [new instance](/connector/connector_protocol/#instance-callback), the connctd platform will respond with a instance token that must be used by the connector to authorize all further request regarding this instance. Note that the communication between a connector and the connctd platform is always using TLS. Therefore the token is never transmitted unencrypted.
