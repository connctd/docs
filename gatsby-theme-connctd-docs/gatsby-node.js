const { createFilePath } = require("gatsby-source-filesystem")
const dlv = require("dlv")

exports.onCreateNode = ({ node, actions, getNode }) => {
    // We only want to operate on `Mdx` nodes. If we had content from a
    // remote CMS we could also check to see if the parent node was a
    // `File` node here
    if (["MarkdownRemark", "Mdx"].includes(node.internal.type)) {
        const slug = createFilePath({
            node,
            getNode,
        })
        actions.createNodeField({
            name: "slug",
            node,
            value: slug,
        })
    }
}

const pageFragment = `
  internal {
    type
  }
  fields {
    slug
  }
  frontmatter {
    title
    order
    legacy
  }
  headings(depth: h2) {
    value
  }
`

function getPageFromEdge(node) {
    return node.childMarkdownRemark || node.childMdx
}

exports.createPages = async ({ graphql, actions, reporter }) => {
    // Destructure the createPage function from the actions object
    const { createPage } = actions
    const result = await graphql(`
    query {
      allFile(filter: {extension: {in: ["md", "mdx"]}}) {
        edges {
          node {
            id
            relativePath
            relativeDirectory
            childMarkdownRemark {
              ${pageFragment}
            }
            childMdx {
              ${pageFragment}
            }
          }
        }
      }
    }
  `)
    if (result.errors) {
        reporter.panicOnBuild("🚨  ERROR: Loading \"createPages\" query")
    }
    // Create blog post pages.
    const posts = result.data.allFile.edges
    // We'll call `createPage` for each result

    const allDocs = [...posts]
    allDocs.sort((a, b) => {
        const orderA = Number.isInteger(dlv(getPageFromEdge(a.node), "frontmatter.order"))
            ? dlv(getPageFromEdge(a.node), "frontmatter.order") : 2
        const orderB = Number.isInteger(dlv(getPageFromEdge(b.node), "frontmatter.order"))
            ? dlv(getPageFromEdge(b.node), "frontmatter.order") : 2
        return orderA - orderB
    })

    posts.forEach(({ node }, index) => {
        const { fields } = getPageFromEdge(node)
        createPage({
            // This is the slug we created before
            // (or `node.frontmatter.slug`)
            path: fields.slug,
            // This component will wrap our MDX content
            component: require.resolve("./src/components/docs-page-layout.tsx"),
            // We can use the values in this context in
            // our page layout component
            context: {
                id: node.id,
                allDocs,
                githubUrl: `https://github.com/connctd/docs/edit/master/docs/content/${node.relativePath}`,
            },
        })
    })
}
