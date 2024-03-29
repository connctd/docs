const path = require("path")

const gatsbyRemarkPlugins = [
    {
        resolve: "gatsby-remark-autolink-headers",
        options: {
            offsetY: 70,
        },
    },
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
            // Class prefix for <pre> tags containing syntax highlighting;
            // defaults to 'language-' (eg <pre class="language-js">).
            // If your site loads Prism into the browser at runtime,
            // (eg for use with libraries like react-live),
            // you may use this to prevent Prism from re-processing syntax.
            // This is an uncommon use-case though;
            // If you're unsure, it's best to use the default value.
            classPrefix: "language-",
            // This is used to allow setting a language for inline code
            // (i.e. single backticks) by creating a separator.
            // This separator is a string and will do no white-space
            // stripping.
            // A suggested value for English speakers is the non-ascii
            // character '›'.
            inlineCodeMarker: null,
            // This lets you set up language aliases.  For example,
            // setting this to '{ sh: "bash" }' will let you use
            // the language "sh" which will highlight using the
            // bash highlighter.
            aliases: {},
            // This toggles the display of line numbers globally alongside the code.
            // To use it, add the following line in src/layouts/index.js
            // right after importing the prism color scheme:
            //  `require("prismjs/plugins/line-numbers/prism-line-numbers.css");`
            // Defaults to false.
            // If you wish to only show line numbers on certain code blocks,
            // leave false and use the {numberLines: true} syntax below
            showLineNumbers: true,
            // If setting this to true, the parser won't handle and highlight inline
            // code used in markdown i.e. single backtick code like `this`.
            noInlineHighlight: false,
            // This adds a new language definition to Prism or extend an already
            // existing language definition. More details on this option can be
            // found under the header "Add new language definition or extend an
            // existing language" below.
            languageExtensions: [
                {
                    language: "superscript",
                    extend: "javascript",
                    definition: {
                        superscript_types: /(SuperType)/,
                    },
                    insertBefore: {
                        function: {
                            superscript_keywords: /(superif|superelse)/,
                        },
                    },
                },
            ],
            // Customize the prompt used in shell output
            // Values below are default
            prompt: {
                user: "root",
                host: "connctd.io",
                global: false,
            },
        },
    },
]

module.exports = {
    siteMetadata: {
        title: "connctd Docs | IoT Service Creation Simplified",
        titleTemplate: "%s | connctd IoT Service Creation Simplified",
        description:
          "Powerful domain agnostic semantic abstraction for IoT. The scalable and robust platform for the Internet of Things.",
        url: "https://docs.connctd.io",
        twitterUsername: "@connctd",
    },
    plugins: [
        "gatsby-plugin-manifest",
        "gatsby-plugin-offline",
        "gatsby-plugin-typescript",
        "gatsby-plugin-emotion",
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
        {
            resolve: "gatsby-plugin-sentry",
            options: {
                dsn: "https://d74f87b542f2444481b9b750f07dfa8a@o475728.ingest.sentry.io/5514094",
                environment: process.env.NODE_ENV,
                enabled: (process.env.NODE_ENV === "production"),
            },
        },
        {
            resolve: "gatsby-plugin-google-analytics",
            options: {
                trackingId: "UA-70924307-3",
                head: false,
                anonymize: true,
                respectDNT: true,
            },
        },
    ],
}
