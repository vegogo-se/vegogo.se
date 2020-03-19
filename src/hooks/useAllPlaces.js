import { useStaticQuery, graphql } from "gatsby";
import { getPlacePathFromRelativePath } from "../helpers";

export const query = graphql`
  fragment PlaceInformation on File {
    childMarkdownRemark {
      frontmatter {
        title
        placeID
        areas
        images {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      excerpt(format: PLAIN, pruneLength: 100)
      html
    }
    dir
    absolutePath
    relativePath
  }
`;

export const useAllPlaces = () => {
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
            ...PlaceInformation
          }
        }
      }
    }
  `);

  // Flatten result and add more data like permalink.
  let flattenedPlaces = allPlaces.allFile.edges.map(({ node }) => {
    const {
      title,
      areas,
      images,
      placeID
    } = node.childMarkdownRemark.frontmatter;

    const { html, excerpt } = node.childMarkdownRemark;
    const { dir, absolutePath, relativePath } = node;

    return {
      title,
      excerpt,
      html,
      areas,
      placeID,
      dir,
      absolutePath,
      relativePath,
      images,
      path: getPlacePathFromRelativePath(relativePath)
    };
  });

  // Get all images for all places.
  // const allPlacesImages = useAllPlacesImages();

  // // Append correct images to each place.
  // flattenedPlaces = flattenedPlaces.map(place => {
  //   place.frontmatterImages = place.images;
  //   place.images = allPlacesImages.filter(image => {
  //     return image.dir === place.dir;
  //   });

  //   return place;
  // });

  return flattenedPlaces;
};
