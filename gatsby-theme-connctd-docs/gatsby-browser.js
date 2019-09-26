import "./src/styles/global.css"
import "gatsby-prismjs-dracula"
import React from "react"
import Layout from "./src/components/docs-page-layout"

export const wrapPageElement = ({ element, props }) => <Layout {...props}>{element}</Layout>


window.addEventListener("hashchange", () => {
    window.scrollTo(window.scrollX, window.scrollY - 100)
})
