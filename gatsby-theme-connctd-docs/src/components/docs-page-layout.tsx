import React, { memo, useReducer } from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "@emotion/styled"
import {
    Navbar, Logo, NavGroup, MenuGroup, MenuArrow, defaultTheme, GlobalStyle,
} from "@connctd/quartz"
import rehypeReact from "rehype-react"
import { Global } from "@emotion/core"
import { ThemeProvider } from "emotion-theming"
import { OutboundLink } from "gatsby-plugin-google-analytics"
import { Sidebar } from "./sidebar"
import Article from "./docs-article"
import SEO from "./seo"
import Profile from "./profile"


const docsTheme = defaultTheme

export const pageQuery = graphql`
  query DocsPostQuery($id: String) {
    site {
      siteMetadata {
        title
        description
        titleTemplate
      }
    }
    file(id: {eq: $id}) {
      childMarkdownRemark {
        frontmatter {
          title
        }
        htmlAst
      }
      childMdx {
        frontmatter {
          title
        }
        body
      }
    }
  }
`

/* eslint-disable-next-line */
const renderAst = new rehypeReact({
    createElement: React.createElement,
}).Compiler

const Container = styled.div`
    height: 100%;
`

const FixedNav = styled.div`
    position: fixed;
    top: 0px;
    width: 100%;
    z-index: 100;
`

export interface Store {
    profile: {
        email?: string
        image?: string
        fetched: boolean
        pending: boolean
        isLoggedIn: boolean
    }
}

const initialState: Store = {
    profile: {
        email: undefined,
        image: undefined,
        fetched: false,
        pending: false,
        isLoggedIn: false,
    },
}

export const actions = {
    FETCH_PROFILE: "FETCH_PROFILE",
    SET_PROFILE: "SET_PROFILE",
    NOT_LOGGED_IN: "NOT_LOGGED_IN",
}

function reducer(state, action) {
    switch (action.type) {
        case actions.FETCH_PROFILE:
            return {
                profile: {
                    ...state.profile,
                    fetched: false,
                    pending: true,
                },
            }
        case actions.SET_PROFILE:
            return {
                profile: {
                    fetched: true,
                    email: action.payload.email,
                    image: action.payload.image,
                    isLoggedIn: true,
                    pending: false,
                },
            }
        case actions.NOT_LOGGED_IN:
            return {
                profile: {
                    fetched: true,
                    isLoggedIn: false,
                    email: undefined,
                    image: undefined,
                    pending: false,
                },
            }
        default:
            throw new Error(`Could not dispatch ${JSON.stringify(action)}. That action is not defined.`)
    }
}


export default function PageTemplate({
    data: { file, site: { siteMetadata } },
    pageContext: { allDocs, githubUrl },
}) {
    const { frontmatter } = file.childMarkdownRemark || file.childMdx
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <>
            <SEO
                title={frontmatter.title}
                description={frontmatter.description || siteMetadata.description}
                siteName={siteMetadata.title}
                twitterHandle={siteMetadata.twitterHandle}
                titleTemplate={siteMetadata.titleTemplate}
            />
            <Global styles={GlobalStyle} />
            <ThemeProvider theme={docsTheme}>
                <>
                    <FixedNav>
                        <Navbar>
                            <div className="Items">
                                <Link to="/">
                                    <Logo fill="#FFFFFF" width={120} />
                                </Link>
                            </div>
                            <div className="Items">
                                <NavGroup>
                                    <OutboundLink href="https://devcenter.connctd.io/?utm_source=docs">Devcenter</OutboundLink>
                                </NavGroup>
                            </div>
                            <div className="Staples">
                                <NavGroup>
                                    <div style={{ width: 170, textAlign: "right" }}>
                                DOCS
                                        <MenuArrow down />
                                    </div>
                                    <MenuGroup>
                                        <Link to="/">API Docs</Link>
                                        <OutboundLink href="https://tutorial.connctd.io/?utm_source=docs">Tutorials</OutboundLink>
                                    </MenuGroup>
                                </NavGroup>
                                <Profile state={state} dispatch={dispatch} />
                            </div>
                        </Navbar>
                    </FixedNav>
                    <Container>
                        <Sidebar links={allDocs} />
                        <Article
                            title={frontmatter.title}
                            githubUrl={githubUrl}
                        >
                            {file.childMdx ? (
                                <MDXRenderer scope={undefined} components={undefined}>
                                    {file.childMdx.body}
                                </MDXRenderer>
                            ) : (
                                renderAst(file.childMarkdownRemark.htmlAst)
                            )}
                        </Article>
                    </Container>
                </>
            </ThemeProvider>
        </>
    )
}
