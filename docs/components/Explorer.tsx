/* eslint-disable */
import React, { Component } from "react"
import GraphiQL from "graphiql"
import GraphiQLExplorer from "graphiql-explorer"
import {
    buildClientSchema, getIntrospectionQuery, parse, GraphQLSchema,
} from "graphql"

import { makeDefaultArg, getDefaultScalarArgValue } from "./CustomArgs"

import "graphiql/graphiql.css"

function fetcher(params: Record<string, any>): Record<string, any> {
    return fetch("https://api.connctd.io/api/v1/query", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(params),
    })
        .then(response => response.json())
        .catch(response => response.text())
}

const DEFAULT_QUERY = `# shift-option/alt-click on a query below to jump to it in the explorer
# option/alt-click on a field in the explorer to select all subfields
query myApps {
  apps {
    id
    name
    scopes
  }
}`

type State = {
    schema?: GraphQLSchema
    query: string
    explorerIsOpen: boolean
};

class App extends Component<{}, State> {
    _graphiql: any;
    state = { schema: null, query: DEFAULT_QUERY, explorerIsOpen: true };

    componentDidMount() {
        fetcher({
            query: getIntrospectionQuery(),
        }).then((result) => {
            const editor = this._graphiql.getQueryEditor()
            editor.setOption("extraKeys", {
                ...(editor.options.extraKeys || {}),
                "Shift-Alt-LeftClick": this._handleInspectOperation,
            })

            this.setState({ schema: buildClientSchema(result.data) })
        })
    }

    _handleInspectOperation = (
        cm: any,
        mousePos: { line: number, ch: number, },
    ) => {
        const parsedQuery = parse(this.state.query || "")

        if (!parsedQuery) {
            console.error("Couldn't parse query document")
            return null
        }

        const token = cm.getTokenAt(mousePos)
        const start = { line: mousePos.line, ch: token.start }
        const end = { line: mousePos.line, ch: token.end }
        const relevantMousePos = {
            start: cm.indexFromPos(start),
            end: cm.indexFromPos(end),
        }

        const position = relevantMousePos

        const def = parsedQuery.definitions.find((definition) => {
            if (!definition.loc) {
                console.log("Missing location information for definition")
                return false
            }

            const { start, end } = definition.loc
            return start <= position.start && end >= position.end
        })

        if (!def) {
            console.error(
                "Unable to find definition corresponding to mouse position",
            )
            return null
        }

        const operationKind = def.kind === "OperationDefinition"
            ? def.operation
            : def.kind === "FragmentDefinition"
                ? "fragment"
                : "unknown"

        const operationName = def.kind === "OperationDefinition" && !!def.name
            ? def.name.value
            : def.kind === "FragmentDefinition" && !!def.name
                ? def.name.value
                : "unknown"

        const selector = `.graphiql-explorer-root #${operationKind}-${operationName}`

        const el = document.querySelector(selector)
        el && el.scrollIntoView()
    };

    _handleEditQuery = (query: string): void => this.setState({ query });

    _handleToggleExplorer = () => {
        this.setState({ explorerIsOpen: !this.state.explorerIsOpen })
    };

    render() {
        const { query, schema } = this.state
        return (
            <div className="graphiql-container">
                <GraphiQLExplorer
                    schema={schema}
                    query={query}
                    onEdit={this._handleEditQuery}
                    onRunOperation={operationName => this._graphiql.handleRunQuery(operationName)
                    }
                    explorerIsOpen={this.state.explorerIsOpen}
                    onToggleExplorer={this._handleToggleExplorer}
                    getDefaultScalarArgValue={getDefaultScalarArgValue}
                    makeDefaultArg={makeDefaultArg}
                />
                <GraphiQL
                    ref={ref => (this._graphiql = ref)}
                    fetcher={fetcher}
                    schema={schema}
                    query={query}
                    onEditQuery={this._handleEditQuery}
                >
                    <GraphiQL.Toolbar>
                        <GraphiQL.Button
                            onClick={() => this._graphiql.handlePrettifyQuery()}
                            label="Prettify"
                            title="Prettify Query (Shift-Ctrl-P)"
                        />
                        <GraphiQL.Button
                            onClick={() => this._graphiql.handleToggleHistory()}
                            label="History"
                            title="Show History"
                        />
                        <GraphiQL.Button
                            onClick={this._handleToggleExplorer}
                            label="Explorer"
                            title="Toggle Explorer"
                        />
                    </GraphiQL.Toolbar>
                </GraphiQL>
            </div>
        )
    }
}

export default App
