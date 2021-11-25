---
title: Connectors
order: 1
---

### Connector Publication

Describes a technology and configuration parameters that are required to install and instantiate connectors. Publications can only be created with developer access tokens. Connector publication can be created via our API or in the [Developer Center](https://devcenter.connctd.io/). Multiple apps can install a published connector.

### Connector Installation

Can be used to configure a technology. A connector installation needs to be installed by using a service access token which means it is bound to a service / app. A connector installation always belongs to a connector publication. It acts as a container for multiple connector instances. One app can't have multiple installations for one specific publication. Connectors can be installed via our API or in the [Developer Center](https://devcenter.connctd.io/).

<!-- TODO: Proof read the rest of the glossary below -->
### Connector Instance

Abstracts e.g. devices for a specific end customer. An instance always belongs to a connector installation. Needs to be installed with a service token from within your service. E.g. your endcustomer clicks on a button in your UI "Install TechXYZ" and you send the appropriate connector installation request to our platform.

### Signature

Whenever connctd sends a request to your connector we are also calculating a signature and send it within the request header. Use the publication key (base64 decode it first) you have seen when you created your connector in order to validate the signature. This allows you to verify that connctd is the acutal sender of the message and not an attacker.

### Installation Token

### Instance Token