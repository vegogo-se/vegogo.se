import { useStaticQuery } from "gatsby";

export function useAllPlacesImages() {
  // Get all images for all places.
  // Use the results with the image API.
  const allPlacesImages = useStaticQuery(graphql`
    query PlacesImages {
      allFile(
        filter: {
          sourceInstanceName: { eq: "markdown-places" }
          extension: { in: ["jpg", "jpeg"] }
        }
      ) {
        edges {
          node {
            absolutePath
            dir
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

  return allPlacesImages;
}
