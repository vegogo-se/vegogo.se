import { useStaticQuery } from "gatsby";
import { useAllPlacesImages } from "./useAllPlacesImages";

export function useAllPlaces() {
  const allPlaces = useStaticQuery(graphql`
    query Places {
      allFile(
        filter: {
          sourceInstanceName: { eq: "markdown-places" }
          extension: { eq: "md" }
          childMarkdownRemark: { frontmatter: { draft: { ne: true } } }
        }
        sort: { fields: childMarkdownRemark___frontmatter___title }
      ) {
        edges {
          node {
            childMarkdownRemark {
              frontmatter {
                slug
                title
                coordinates
                areas
                address
              }
              excerpt(format: PLAIN, pruneLength: 100)
              html
            }
            dir
          }
        }
      }
    }
  `);

  // Flatten result.
  let flattenedPlaces = allPlaces.allFile.edges.map(({ node }) => {
    const {
      title,
      slug,
      coordinates,
      areas,
      address
    } = node.childMarkdownRemark.frontmatter;

    const { html, excerpt } = node.childMarkdownRemark;
    const { dir } = node;

    return {
      title,
      slug,
      excerpt,
      html,
      coordinates,
      areas,
      address,
      dir
    };
  });

  // Get all images for all places.
  const allPlacesImages = useAllPlacesImages();

  // Append correct images to each place.
  flattenedPlaces = flattenedPlaces.map(place => {
    place.images = allPlacesImages.filter(image => {
      return image.dir === place.dir;
    });

    return place;
  });

  return flattenedPlaces;
}
