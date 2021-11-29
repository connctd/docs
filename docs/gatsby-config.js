module.exports = {
    plugins: [
        {
            resolve: "gatsby-plugin-catch-links",
            options: {
                excludePattern: /api/,
            },
        },
        "gatsby-plugin-typescript",
        { resolve: "gatsby-theme-connctd-docs", options: {} },
    ],
}
