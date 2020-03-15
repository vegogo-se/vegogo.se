







const path = require(`path`);

exports.createPages = async ({         actions, graphql, reporter }) => {
const { createPage } = actions;
const pageTemplate = path.resolve(`src/templates/pageTemplate.js`);
const placeTemplate = path.resolve(`src/templates/placeTemplate.js`);

  // Get paths to all text pages, like "About us", "Contact", etc.
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

  // Handle errors.
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  result.data.allFile.edges.forEach(({ node }) => {
    createPage({
      path: node.childMarkdownRemark.frontmatter.path,
      component: pageTemplate,
      context: {} // additional data can be passed via context
    });
  });

  /**
   * Get places.
   */
  const resultAllPlaces = await graphql(`
    query Places {
      allFile(
        filter: {
          sourceInstanceName: { eq: "markdown-places" }
          extension: { eq: "md" }
          childMarkdownRemark: { frontmatter: { draft: { ne: true } } }
        }
      ) {
        edges {
          node {
            childMarkdownRemark {
              frontmatter {
                slug
              }
            }
          }
        }
      }
    }
  `);

  // Handle errors.
  if (resultAllPlaces.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  resultAllPlaces.data.allFile.edges.forEach(({ node }) => {
    let slug = node.childMarkdownRemark.frontmatter.slug;
    let path = `/place/${slug}`;

    createPage({
      path: path,
      component: placeTemplate,
      context: {
        slug
      } // additional data can be passed via context
    });
  });

  //   let allPlaces = useAllPlaces();
  //   allPlaces.foreach(place => {
  //     console.log("create place", plage);
  //   });
};
