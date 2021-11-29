---
title: Introduction
order: 1
---

connctd offers a GraphQL API which makes it rather simple to perform tasks like creating and resolving things or units.
When working with our api we highly recommend using a GraphQL Editor (e.g. integrated in Postman) or alternatively you can use
our [GraphiQL explorer](/graphql/explorer).

## Quick Start

There are numerous tutorials that describe in detail what GraphQL is good for and how it works (see [here](https://graphql.org/learn/)). For this
reason, we will only go into the most important key facts related to our api:
* all GraphQL queries are sent against one single endpoint (https://api.connctd.io/api/v1/query)
* most of the queries against our api need to carry a valid [access token](general/oauth2/#client-credentials-flow) as well as an [external subject id](/glossary/subjects) within the header
* GQL queries are always send via POST method
* the queries themselves are sent as JSON objects but often they are represented in a more abstract way (see examples 1 and 2 below)
* within a GQL query you formulate your desired action (query = request data, mutation = create/update/delete data)
* you also specify which parts of the data you would like to get back as a response

The following example shows a gql query how you would send it via curl.

```graphql
curl --location --request POST 'https://api.connctd.io/api/v1/query' \
--header 'Authorization: Bearer ...token...' \
--header 'X-External-Subject-ID: customer-id-abc123' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"query { things { name } }"}'
```
*Example 1: Query names of all things*

Since this representation is poorly readable we use the more abstracted representation in all our examples like shown below.

```graphql
query {
    things {
        name  
    }
}
```
*Example 2: Query names of all things*

Checkout the [tooling](/graphql/tools) section if you would like to see which tools and libraries may assist you when working with our API.
