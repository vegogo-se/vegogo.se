/**
 * This file exists to be able to run ES6 code.
 * https://github.com/gatsbyjs/gatsby/issues/7810
 */
const path = require(`path`);
const fs = require("fs");

const {
  getPlaceURIFromRelativePath,
  getPlaceDetailsFromGoogle,
} = require("./src/helpers");

// Add google place info for all places.
// Store in JSON-file so we can import in later on.
async function updateGooglePlacesLocalJSONFile(allPlacesData, reporter) {
  let googlePlacesInfo = [];
  console.log("updateGooglePlacesLocalJSONFile start");
  // Use for-in-loop so we can use await.
  for (const idx in allPlacesData.allFile.edges) {
    const { node } = allPlacesData.allFile.edges[idx];
    const { title, placeID } = node.childMarkdownRemark.frontmatter;
    console.log(
      `updateGooglePlacesLocalJSONFile in loop, title: ${title}, placeID: ${placeID}`
    );

    if (!placeID) {
      console.log("Skipping place");
      continue;
    }

    const googleplaceDetails = await getPlaceDetailsFromGoogle(placeID);

    if (googleplaceDetails.status !== "OK") {
      reporter.panicOnBuild(
        `Error while getting information for place from Google. title: ${title}, placeID: ${placeID}`
      );
    }

    googlePlacesInfo.push({
      placeID: placeID,
      title: title,
      dateUpdated: new Date().toJSON(),
      googlePlaceDetails: googleplaceDetails.result,
    });
  }

  const targetFile = `${__dirname}/googlePlacesInfo.json`;
  fs.writeFileSync(targetFile, JSON.stringify(googlePlacesInfo, null, 2));
}

exports.createPages = async ({ actions, graphql, reporter }) => {
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

  // Create text pages.
  result.data.allFile.edges.forEach(({ node }) => {
    createPage({
      path: node.childMarkdownRemark.frontmatter.path,
      component: pageTemplate,
      context: {}, // additional data can be passed via context
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
            relativePath
            childMarkdownRemark {
              frontmatter {
                title
                placeID
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

  // Create JSON file with Google Places information.
  // await updateGooglePlacesLocalJSONFile(resultAllPlaces.data, reporter);

  // Create single pages for all places.
  resultAllPlaces.data.allFile.edges.forEach(({ node }) => {
    const { relativePath } = node;
    console.log(`Create page ${relativePath}`);
    createPage({
      path: getPlaceURIFromRelativePath(relativePath),
      component: placeTemplate,
      context: {
        relativePath,
      }, // additional data can be passed via context
    });
  });
};
