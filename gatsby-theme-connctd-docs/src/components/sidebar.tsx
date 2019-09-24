import React from "react"
import styled from "styled-components"

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

interface LinkFragment {
    fields: LinkFields
    frontmatter: LinkFrontmatter
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
`

const pageNode = (node: LinkNode) => node.childMdx || node.childMarkdownRemark

export const Sidebar: React.FC<{links: Link[], }> = ({ links }) => (
    <SidebarContainer>
        <Container>
            {
                links.map((l: Link) => (
                    <h4>
                        <a href={pageNode(l.node).fields.slug}>
                            {pageNode(l.node).frontmatter.title || l.node.id}
                        </a>
                    </h4>
                ))
            }
        </Container>
    </SidebarContainer>
)
