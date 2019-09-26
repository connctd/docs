import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "@emotion/styled"
import {
    Navbar, Logo, NavGroup, MenuGroup, Anchor, MenuArrow, defaultTheme, GlobalStyle,
} from "@connctd/quartz"
import rehypeReact from "rehype-react"
import { Global } from "@emotion/core"
import { ThemeProvider } from "emotion-theming"
import { Sidebar } from "./sidebar"
import Article from "./docs-article"

const docsTheme = defaultTheme

export const pageQuery = graphql`
  query DocsPostQuery($id: String) {
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

export default function PageTemplate({ data: { file }, pageContext: { allDocs } }) {
    const { frontmatter } = file.childMarkdownRemark || file.childMdx
    return (
        <>
        <Global styles={GlobalStyle} />
        <ThemeProvider theme={docsTheme}>
            <>
                <FixedNav>
                    <Navbar>
                        <div className="Items">
                            <Anchor href="/">
                                <Logo fill="#FFFFFF" width={120} />
                            </Anchor>
                        </div>
                        <div className="Items">
                            <NavGroup>
                                <Anchor href="https://devcenter.connctd.io/">Devcenter</Anchor>
                            </NavGroup>
                        </div>
                        <div className="Staples">
                            <NavGroup>
                                <div style={{ width: 170, textAlign: "right" }}>
                                DOCS
                                    <MenuArrow down />
                                </div>
                                <MenuGroup>
                                    <Anchor href="https://docs.connctd.io">API Docs</Anchor>
                                    <Anchor href="https://tutorial.connctd.io">Tutorials</Anchor>
                                </MenuGroup>
                            </NavGroup>
                        </div>
                    </Navbar>
                </FixedNav>
                <Container>
                    <Sidebar links={allDocs} />
                    <Article
                        title={frontmatter.title}
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
