import React from "react"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import { Themeable, Pill } from "@connctd/quartz"



interface Category {
    displayName: string
    directory: string
}

// maybe we can make this at some point configurable
let categories: Category[] = [
    {displayName: "General", directory: "general"},
    {displayName: "GraphQL", directory: "graphql"},
    {displayName: "Rest", directory: "rest"},
    {displayName: "Glossary", directory: "glossary"},
]

const SidebarContainer = styled.div`
    position: fixed;
    overflow: auto;
    height: calc(100vh - 50px);
    top: 50px;
    width: 250px;
    background-color: #FAFAFA;
    border-right: 1px solid #C4C4C4;
`

interface LinkFields {
    slug: string
}

interface LinkFrontmatter {
    title: string
    order: number
    legacy: boolean
}

interface LinkHeading {
    value: string
}

interface LinkFragment {
    fields: LinkFields
    frontmatter: LinkFrontmatter
    headings: LinkHeading[]
}

interface LinkNode {
    id: string
    relativepath: string
    relativeDirectory: string
    childMarkdownRemark?: LinkFragment
    childMdx?: LinkFragment
}

interface SideBarLink {
    node: LinkNode
}

const Container = styled.div<Themeable>`
    padding: 20px 20px 100px 20px;
    h4 {
        margin: 8px 0px;
        padding: 0;
        color: #21243d;
        letter-spacing: 0.04em;
    }
    color: #474747;

    ul {
        list-style: none;
        margin: 0;
        padding: 0px 10px;
        line-height: 1.2;
        li {
            padding: 0;
            margin: 10px 0 0 0;
        }
    }

    hr {
        border: 0px;

    }
`

const CategoryHeading = styled.h2<Themeable>`
    margin-bottom: 8px;
    border-bottom: 1px solid ${props => props.theme.light50};
`

const CategoryLinks = styled.div<Themeable>`
    padding-left: 16px;
`

const Hint = styled.span<Themeable>`
    border: 1px dashed ${props => props.theme.light50};
    background-color: #fffbde;
    font-size: x-small;
    color: gray;
    padding: 2px 4px 2px 4px;
    border-radius: 4px;
`

const pageNode = (node: LinkNode) => node.childMdx || node.childMarkdownRemark

export const Sidebar: React.FC<{links: SideBarLink[]}> = ({ links }) => {

    const renderLinks = (links) => {
        return links.map((l: SideBarLink) => {
            const node = pageNode(l.node)
            return (
                <div key={node.fields.slug}>
                    <h4>
                        <Link to={node.fields.slug}>
                            {node.frontmatter.title || l.node.id} {node.frontmatter.legacy && <Hint>Legacy</Hint>}
                        </Link>
                    </h4>
                    {node.headings.length > 0 && (
                        <>
                            <ul>
                                {node.headings.map(h => <Link to={`${node.fields.slug}#${h.value.toLowerCase().replace(/ /g, "-")}`} key={h.value}><li>{h.value}</li></Link>)}
                            </ul>
                            <hr />
                        </>
                    )}
                </div>

            )
        })
    }

    

    return (<SidebarContainer>
        <Container>
            { categories.map(category => {
                return (
                    <div>
                        <CategoryHeading>{category.displayName}</CategoryHeading>
                        <CategoryLinks>
                            { renderLinks(links.filter(link =>  link.node.relativeDirectory == category.directory)) }
                        </CategoryLinks>
                    </div>
                )
            }) }
            
        </Container>
    </SidebarContainer>);
}
