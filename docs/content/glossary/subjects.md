---
title: External Subjects
order: 1
---
By using connctd, a service developer can in theory create unlimited resources like things or units for his or her end customers. To avoid that service developers need to maintain a "customer-to-resource"-relationship in their services we decided to introduce the concept of the so called "External-Subject-ID". It can be passed within the request headers and allows our backend to filter/assign resources that belong to a specific end customer. That external subject id can be any arbitrary string and is freely chosen by the service developer.

The following example shows the usage of the external subject id:
```graphql
curl --location --request POST 'https://api.connctd.io/api/v1/query' \
--header 'Authorization: Bearer ...token...' \
--header 'X-External-Subject-ID: default' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"query {...}'
```
