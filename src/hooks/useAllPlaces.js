import { useStaticQuery, graphql } from "gatsby";
import { getPlaceURIFromRelativePath } from "../helpers";
import googlePlacesInfo from "../../googlePlacesInfo.json";

/**
 * Return place details for a single place or false if not info found.
 *
 * @param string placeID
 * @return object Google Place info
 */
const getGooglePlaceDetailsForPlace = placeID => {
  if (!placeID) {
    return false;
  }

  const googlePlace = googlePlacesInfo.find(googlePlaceInfo => {
    return googlePlaceInfo.placeID === placeID;
  });

  if (!googlePlace) {
    return false;
  }

  return googlePlace.googlePlaceDetails;
};

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
    const { relativePath } = node;
    const path = getPlaceURIFromRelativePath(relativePath);
    const googlePlaceInfo = getGooglePlaceDetailsForPlace(placeID);

    return {
      title,
      excerpt,
      html,
      areas,
      placeID,
      relativePath,
      images,
      path,
      googlePlaceInfo
    };
  });

  return flattenedPlaces;
};
