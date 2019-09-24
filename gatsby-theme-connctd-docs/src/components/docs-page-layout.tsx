import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled, { ThemeProvider } from "styled-components"
import {
    Navbar, Logo, Navgroup, Menugroup, Paper, Anchor, Menuarrow, defaultTheme, GlobalStyle,
} from "@connctd/quartz"
import rehypeReact from "rehype-react"
import { Sidebar } from "./sidebar"

const docsTheme = defaultTheme

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
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
    display: grid;
    grid-template-areas: "sidebar content";
    grid-template-columns: 250px 1fr;
    grid-column-start: auto;
    height: 100%;
`

const Content = styled.article`
    grid-area: content;
    margin: auto;
    max-width: 800px;
    justify-self: start;
    height: 100%;
    padding: 10px 50px;

    p {
        color: #21243d;
    }

    color: #21243d;

    @media screen and (max-width: 1400px) {
        width: 80vw;
    }

    @media screen and (max-width: 600px) {
        width: 100%;
    }
`

export default function PageTemplate({ data: { file }, pageContext: { allDocs } }) {
    const { frontmatter } = file.childMarkdownRemark || file.childMdx
    return (
        <>
        <GlobalStyle />
        <ThemeProvider theme={docsTheme}>
            <>
                <Navbar>
                    <div className="Items">
                        <Anchor href="/">
                            <Logo fill="#FFFFFF" width={120} />
                        </Anchor>
                    </div>
                    <div className="Items">
                        <Navgroup>
                            <Anchor href="https://devcenter.connctd.io/">Devcenter</Anchor>
                        </Navgroup>
                    </div>
                    <div className="Staples">
                        <Navgroup>
                            <div style={{ width: 170, textAlign: "right" }}>
                                DOCS
                                <Menuarrow down />
                            </div>
                            <Menugroup>
                                <Anchor href="https://docs.connctd.io">API Docs</Anchor>
                                <Anchor href="https://tutorial.connctd.io">Tutorials</Anchor>
                            </Menugroup>
                        </Navgroup>
                    </div>
                </Navbar>
                <Container>
                    <Sidebar links={allDocs} />
                    <Content>
                        <h1>{frontmatter.title}</h1>
                        {file.childMdx ? (
                            <MDXRenderer scope={undefined} components={undefined}>
                                {file.childMdx.body}
                            </MDXRenderer>
                        ) : (
                            renderAst(file.childMarkdownRemark.htmlAst)
                        )}
                    </Content>
                </Container>
            </>
        </ThemeProvider>
        </>
    )
}
