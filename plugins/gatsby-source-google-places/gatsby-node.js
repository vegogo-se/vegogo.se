const fetch = require("node-fetch");
const queryString = require("query-string");
const { useStaticQuery, graphql } = require("gatsby");

exports.sourceNodes = (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions;

  // Gatsby adds a configOption that's not needed for this plugin, delete it
  // delete configOptions.plugins;
  // console.log("configOptions.plugins", configOptions.plugins);

  // const allPlaces = graphql`
  //   query Places {
  //     allFile(
  //       filter: {
  //         sourceInstanceName: { eq: "markdown-places" }
  //         extension: { eq: "md" }
  //         childMarkdownRemark: { frontmatter: { draft: { ne: true } } }
  //       }
  //       sort: { fields: childMarkdownRemark___frontmatter___title }
  //     ) {
  //       edges {
  //         node {
  //           relativePath
  //         }
  //       }
  //     }
  //   }
  // `;
  // console.log("allPlaces", allPlaces);

  // plugin code goes here...
  console.log("Testing my plugin", configOptions);

  return;
};
