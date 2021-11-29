---
title: History
order: 4
---

## Resolve

At connctd the historic values are conceptionally directly attached to the things.
This is very useful since all relevant semantic details are part of a thing and it allows you do queries like "give me all historic values of all door sensors".
In [example 1](#example-1) you can see a query that fetches the historic values of all properties that reflect an ONOFF state.
As you can see you are able to limit the amount of values returned by specifying filters in the history node.

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

## Filter

Constraints allow you to search for specific things, components and properties.
In addition historic values can also be filtered directly using an filter argument on the history field: `where: { value: { filterName: filterValue } }`.
Currently we support the following filter:

- _and: [ValueFilter!] (compose a filter with multiple conditions using an AND operator)
- _or: [ValueFilter!] (compose a filter with multiple conditions using an OR operator)
- _eq: HistoricComponentPropertyValue
- _neq: HistoricComponentPropertyValue
- _gt: HistoricComponentPropertyValue
- _gte: HistoricComponentPropertyValue
- _lt: HistoricComponentPropertyValue
- _lte: HistoricComponentPropertyValue
- _in: [HistoricComponentPropertyValue!]
- _is: Boolean
- _isNot: Boolean
- _like: String (see [PostgreSQL Documentation](https://www.postgresql.org/docs/11/functions-matching.html#FUNCTIONS-LIKE))

A HistoricComponentPropertyValue can be either a String or a Number, depending on the property data type.
In [Example 2](#example-2) you can see a query that selects only values that are less than 100.
[Example 3](#example-3) shows a query with a complex filter using the _or operator.

### Example 2

```graphql
query GetPropertyHistory($thingId: ID!, $componentId: String!, $propertyId: String!, $from: Time!, $to: Time!) {
    things(thingConstraint: {id: $thingId}, thingComponentConstraint: {id: $componentId}, componentPropertyConstraint: {id: $propertyId}) {
        components {
            properties(propertyConstraint: {id: $propertyId}) {
                name
                value
                history(from: $from, to: $to, where: { value: {_lt: 100}}) {
                    edges {
                        node {
                            value
                            timestamp
                        }
                    }
                }
            }
        }
    }
}
```

### Example 3

```graphql
query GetPropertyHistory($thingId: ID!, $componentId: String!, $propertyId: String!, $from: Time!, $to: Time!) {
    things(thingConstraint: {id: $thingId}, thingComponentConstraint: {id: $componentId}, componentPropertyConstraint: {id: $propertyId}) {
        components {
            properties(propertyConstraint: {id: $propertyId}) {
                name
                value
                history(from: $from, to: $to, where: { value: { _or: [ { _like: "Foo%" }, {_eq: "Bar"} ] } }) {
                    edges {
                        node {
                            value
                            timestamp
                        }
                    }
                }
            }
        }
    }
}
```

## Aggregations

Besides the historic values, it is also possible to query aggregations on historic data.
Currently the following aggregations are supported:

- sum: Float
- count: Int
- avg: Float
- max: Float
- min: Float

[Example 4](#example-4) shows a query that selects only values that are less than 100 and also queries the count of the values as well as the maximum, minimum and average value.

### Example 4

```graphql
query GetPropertyHistory($thingId: ID!, $componentId: String!, $propertyId: String!, $from: Time!, $to: Time!) {
    things(thingConstraint: {id: $thingId}, thingComponentConstraint: {id: $componentId}, componentPropertyConstraint: {id: $propertyId}) {
        components {
            properties(propertyConstraint: {id: $propertyId}) {
                name
                value
                history(from: $from, to: $to, where: { value: {_lt: 100}}) {
                    aggregate {
                        count
                        min
                        max
                        avg
                    }
                    edges {
                        node {
                            value
                            timestamp
                        }
                    }
                }
            }
        }
    }
}
```

## Time buckets

Historic values can be aggregated by arbitrarily sized time periods by using an optional timeBucket argument.
The timeBucket argument takes one mandatory parameter and two optional parameters.
The mandatory width parameter specifies the size of each bucket.
The optional offset sets a offset for each bucket and aggregate specifies the aggregation function to use.
The aggregate can be one of SUM, COUNT, AVG, MAX, MIN.
Aggregation defaults to AVG.
For more information on the input format for the time bucket interval width take a look at the [PostgreSQL documentation](https://www.postgresql.org/docs/11/datatype-datetime.html#DATATYPE-INTERVAL-INPUT).
Note that the time bucket interval only supports seconds, minutes, hours, days and weeks but not months and years.

[Example 5](#example-5) shows an query that returns the average of all 5 minutes long periods, offset by 2.5 minutes.

### Example 5

```graphql
query GetPropertyHistory($thingId: ID!, $from: Time!, $to: Time!) {
    things(thingConstraint: {id: $thingId}) {
        components {
            properties {
                name
                value
                history(from: $from, to: $to, timeBucket: { width: "5minutes", offset: "2.5minutes", aggregate: AVG}) {
                    edges {
                        node {
                            value
                            timestamp
                        }
                    }
                }
            }
        }
    }
}
```