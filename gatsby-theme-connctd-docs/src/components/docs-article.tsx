import React from "react"
import styled from "styled-components"

const Content = styled.article`
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
