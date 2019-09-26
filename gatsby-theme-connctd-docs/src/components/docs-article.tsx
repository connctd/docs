import React from "react"
import styled from "@emotion/styled"
import { QuartzTheme } from "@connctd/quartz"

const Content = styled.article<{theme?: QuartzTheme, }>`
    grid-area: content;
    margin: auto;
    max-width: 800px;
    justify-self: start;
    height: 100%;
    padding: 10px 50px;
    line-height: 1.45;
    color: #21243d;

    h1 {
        font-size: 2.6em;
    }

    li {
        line-height: 1.5;
        margin-bottom: 10px;
    }

    p {
        color: #21243d;
    }

    hr {
        border: 0px;
        border-top: 1px solid ${props => props.theme.light50};
    }

    a {
        color: ${props => props.theme.secondary};
        text-decoration-style: text-decoration-skip;
        text-decoration: underline;
    }

    ul {
        li {
            &::marker {
                color: rgb(35, 54, 89);
            }
        }
        background-color: #F9F9F9;
        list-style-position: outside;
        padding: 2em;
        padding-left: 3.5rem;
        border-radius: 5px;
        box-shadow: inset 0 0 0 1px rgba(148,151,155,0.2);
    }

    .gatsby-highlight {
        border: 4px;
        padding: 10px;
        border-radius: 4px;
    }

    .gatsby-code-button {
        background-color: ${props => props.theme.secondary};
        color: white;
        border-radius: 0 4px 0 0;
        font-size: 12px;
    }

    .gatsby-code-title {
        margin-top: 25px;
        padding: 7px 12px;
        margin-bottom: -25px;
        text-align: left;
        font-family: 'Hind';
        font-style: none;
        color: white;
        letter-spacing: 0.01em;
        border-radius: 4px 4px 0 0;
    }

    blockquote {
        background-color: #F9F9F9;
        margin: 0;
        padding: 10px 2em;
        border-radius: 5px;
        box-shadow: inset 0 0 0 1px rgba(148,151,155,0.2);
    }
`

const Title = styled.h1`
    margin-bottom: 0px;
`

interface ArticleProps {
    title: string
    children: React.ReactNode
}

const Container = styled.div`
    width: calc(100% - 250px);
    margin-left: 250px;
    margin-top: 50px;
`

export const Article: React.FC<ArticleProps> = ({ title, children }) => (
    <Container>
        <Content>
            <Title>{title}</Title>
            <hr />
            {children}
        </Content>
    </Container>
)

export default Article
