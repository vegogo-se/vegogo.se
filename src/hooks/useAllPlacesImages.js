import { useStaticQuery, graphql } from "gatsby";

export function useAllPlacesImages() {
  // Get all images for all places.
  // Use the results with the image API.
  let allPlacesImages = useStaticQuery(graphql`
    query PlacesImages {
      allFile(
        filter: {
          sourceInstanceName: { eq: "markdown-places" }
          extension: { in: ["jpg", "jpeg", "png", "gif"] }
        }
      ) {
        edges {
          node {
            relativePath
            name
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);

  // Flatten.
  allPlacesImages = allPlacesImages.allFile.edges.map(image => image.node);

  return allPlacesImages;
}
