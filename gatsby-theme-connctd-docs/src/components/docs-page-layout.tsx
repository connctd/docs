import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "@emotion/styled"
import {
    Navbar, Logo, NavGroup, MenuGroup, Anchor, MenuArrow, defaultTheme, GlobalStyle,
} from "@connctd/quartz"
import rehypeReact from "rehype-react"
import { Global } from "@emotion/core"
import { ThemeProvider } from "emotion-theming"
import { OutboundLink } from "gatsby-plugin-google-analytics"
import { Sidebar } from "./sidebar"
import Article from "./docs-article"
import SEO from "./seo"


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

export default function PageTemplate({
    data: { file, site: { siteMetadata } },
    pageContext: { allDocs },
}) {
    const { frontmatter } = file.childMarkdownRemark || file.childMdx
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
                                <OutboundLink href="https://devcenter.connctd.io/">Devcenter</OutboundLink>
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
                                    <OutboundLink href="https://tutorial.connctd.io">Tutorials</OutboundLink>
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
