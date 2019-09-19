const path = require("path")

module.exports = {
    plugins: [
      "gatsby-plugin-typescript",
      "gatsby-plugin-styled-components",
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
