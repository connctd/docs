import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const SidebarContainer = styled.div`
    grid-area: sidebar;
    width: 100%;
    background-color: #FAFAFA;
    border-right: 1px solid #C4C4C4;
    height: 100%;
`


interface LinkFields {
    slug: string
}

interface LinkFrontmatter {
    title: string
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
    childMarkdownRemark?: LinkFragment
    childMdx?: LinkFragment
}

interface Link {
    node: LinkNode
}

const Container = styled.div`
    padding: 20px 20px;
    h4 {
        font-weight: normal;
        margin: 8px 0px;
        padding: 0;
        text-transform: uppercase;
        color: #474747;
    }

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
`

const pageNode = (node: LinkNode) => node.childMdx || node.childMarkdownRemark

export const Sidebar: React.FC<{links: Link[], }> = ({ links }) => (
    <SidebarContainer>
        <Container>
            {
                links.map((l: Link) => {
                    const node = pageNode(l.node)
                    return (
                        <div>
                            <h4 key={node.fields.slug}>
                                <Link to={node.fields.slug}>
                                    {node.frontmatter.title || l.node.id}
                                </Link>
                            </h4>
                            {node.headings.length > 0 && (
                                <ul>
                                    {node.headings.map(h => <Link to={`${node.fields.slug}#${h.value.toLowerCase().replace(/ /g, "-")}`}><li>{h.value}</li></Link>)}
                                </ul>
                            )}
                        </div>

                    )
                })
            }
        </Container>
    </SidebarContainer>
)
