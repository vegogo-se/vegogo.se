const path = require(`path`);

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const pageTemplate = path.resolve(`src/templates/pageTemplate.js`);

  const result = await graphql(`
    {
      allFile(
        filter: {
          internal: { mediaType: { eq: "text/markdown" } }
          sourceInstanceName: { eq: "markdown-pages" }
        }
      ) {
        edges {
          node {
            childMarkdownRemark {
              frontmatter {
                path
              }
            }
          }
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  result.data.allFile.edges.forEach(({ node }) => {
    console.log(
      "create path with path",
      ":" + node.childMarkdownRemark.frontmatter.path + ":"
    );

    // SKip nodes with no path, ie. not pages, will be filtered out when I figure our how...
    if (!node.childMarkdownRemark.frontmatter.path) {
      return;
    }

    createPage({
      path: node.childMarkdownRemark.frontmatter.path,
      component: pageTemplate,
      context: {} // additional data can be passed via context
    });
  });
};
