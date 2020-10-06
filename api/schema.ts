import { NowRequest, NowResponse } from "@vercel/node"

import axios, { AxiosResponse } from "axios"

const { buildClientSchema, printSchema } = require("graphql")

const introspectionQuery = "    query IntrospectionQuery {      __schema {        queryType { name }        mutationType { name }        subscriptionType { name }        types {          ...FullType        }        directives {          name          description          locations          args {            ...InputValue          }        }      }    }    fragment FullType on __Type {      kind      name      description      fields(includeDeprecated: true) {        name        description        args {          ...InputValue        }        type {          ...TypeRef        }        isDeprecated        deprecationReason      }      inputFields {        ...InputValue      }      interfaces {        ...TypeRef      }      enumValues(includeDeprecated: true) {        name        description        isDeprecated        deprecationReason      }      possibleTypes {        ...TypeRef      }    }    fragment InputValue on __InputValue {      name      description      type { ...TypeRef }      defaultValue    }    fragment TypeRef on __Type {      kind      name      ofType {        kind        name        ofType {          kind          name          ofType {            kind            name            ofType {              kind              name              ofType {                kind                name                ofType {                  kind                  name                  ofType {                    kind                    name                  }                }              }            }          }        }      }    }"


module.exports.default = (req: NowRequest, res: NowResponse) => {
    axios.get("https://docs.connctd.io/api/querykey").then((keyRes: AxiosResponse<{status: string, key: string, }>) => {
        axios.post("https://api.connctd.io/api/v1/query", {
            query: introspectionQuery,
        }, {
            headers: {
                "content-type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${keyRes.data.key}`,
            },
        }).then((schemaRes: AxiosResponse<{data: any, }>) => {
            const introspectionSchemaResult = schemaRes.data.data
            const graphqlSchemaObj = buildClientSchema(introspectionSchemaResult)
            const sdlString = printSchema(graphqlSchemaObj)

            res.setHeader("s-maxage", 86400)
            res.setHeader("Content-Type", "text/plain")
            res.setHeader("Content-Disposition", "attachment; filename=\"connctd.sdl\"")
            res.send(sdlString)
        }).catch((e) => {
            console.error(e)
            res.status(500)
        })
    }).catch((e) => {
        console.error(e)
        res.status(500)
    })
}
