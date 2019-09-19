import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled, { ThemeProvider } from "styled-components"
import {
    Navbar, Logo, Navgroup, Menugroup, Paper, Anchor, Menuarrow, defaultTheme, GlobalStyle,
} from "@connctd/quartz"
import rehypeReact from "rehype-react"

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
    background-color: #FAFAFA;
    min-height: 100%;
`

const Content = styled.div`
    padding-top: 10px;
    max-width: 1200px;
    margin: auto;

    @media screen and (max-width: 1400px) {
        width: 80vw;
    }

    @media screen and (max-width: 600px) {
        width: 100%;
    }
`

export default function PageTemplate({ data: { file } }) {
    const { frontmatter } = file.childMarkdownRemark || file.childMdx
    return (
        <>
        <GlobalStyle />
        <ThemeProvider theme={docsTheme}>
            <Container>
                <Navbar>
                    <div className="Items">
                        <Anchor href="/">
                            <Logo fill="#FFFFFF" width={120} />
                        </Anchor>
                    </div>
                    <div className="Items">
                        <Navgroup>
                            <Anchor href="https://devcenter.connctd.io/">Apps</Anchor>
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
                <Content>
                    <Paper>
                        <h1>{frontmatter.title}</h1>
                        {file.childMdx ? (
                            <MDXRenderer scope={undefined} components={undefined}>
                                {file.childMdx.body}
                            </MDXRenderer>
                        ) : (
                            renderAst(file.childMarkdownRemark.htmlAst)
                        )}
                    </Paper>
                </Content>
            </Container>
        </ThemeProvider>
        </>
    )
}
