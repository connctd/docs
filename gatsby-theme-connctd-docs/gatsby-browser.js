import "./src/styles/global.css"
import "gatsby-prismjs-dracula"
import React from "react"
import Layout from "./src/components/docs-page-layout"
import "whatwg-fetch"

export const wrapPageElement = ({ element, props }) => <Layout {...props}>{element}</Layout>
