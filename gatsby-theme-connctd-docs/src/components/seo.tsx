import React from "react"
import Helmet from "react-helmet"
import { withPrefix } from "gatsby"

interface SEOProps {
    title: string
    description: string
    siteName: string
    twitterHandle: string
    titleTemplate: string
}

export default function SEO({
    title, description, siteName, twitterHandle, titleTemplate,
}: SEOProps) {
    const seoTitle = titleTemplate.replace("%s", title)
    return (
        <Helmet>
            <title>{seoTitle}</title>
            <meta name="description" content={description} />
            <link rel="icon" href={withPrefix("/favicon.ico")} />
            <meta property="og:title" content={seoTitle} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:description" content={description} />
            <meta name="twitter:card" content="summary_large_image" />
            {twitterHandle && (
                <meta name="twitter:site" content={`@${twitterHandle}`} />
            )}
            <meta name="twitter:title" content={seoTitle} />
            <meta name="twitter:description" content={description} />
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css"
            />
        </Helmet>
    )
}
