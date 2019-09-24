import React from "react"
import styled from "styled-components"
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


    @media screen and (max-width: 1400px) {
        width: 80vw;
    }

    @media screen and (max-width: 600px) {
        width: 100%;
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
`

const Title = styled.h1`
    margin-bottom: 0px;
`

interface ArticleProps {
    title: string
    children: React.ReactNode
}

export const Article: React.FC<ArticleProps> = ({ title, children }) => (
    <Content>
        <Title>{title}</Title>
        <hr />
        {children}
    </Content>
)

export default Article
