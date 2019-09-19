const path = require("path")

const gatsbyRemarkPlugins = [
    "gatsby-remark-autolink-headers",
    {
        resolve: "gatsby-remark-copy-linked-files",
        options: {
            ignoreFileExtensions: [],
        },
    },
    "gatsby-remark-prismjs-title",
    {
        resolve: "gatsby-remark-prismjs",
        options: {
            showLineNumbers: true,
        },
    },
]

module.exports = {
    plugins: [
        "gatsby-plugin-typescript",
        "gatsby-plugin-styled-components",
        {
            resolve: "gatsby-transformer-remark",
            options: {
                plugins: gatsbyRemarkPlugins,
            },
        },
        // Add support for *.mdx files in gatsby
        "gatsby-plugin-mdx",
        // Add a collection called "docs" that looks
        // for files in content/
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "docs",
                path: path.resolve("content"),
            },
        },
    ],
}
