import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import Img from "gatsby-image";
import PageContainer from "../components/PageContainer";
// import { PlaceSingle } from "../components/PlaceSingle";
import { getPlaceURIFromRelativePath, getInfoFromPath } from "../helpers";
import PlacesListing from "../components/PlacesListing";
import { useAllPlaces } from "../hooks/useAllPlaces";
const slugify = require("slugify");

/**
 * List places for an area.
 */
function AreaPlacesListing(props) {
  const { path } = props;
  const areaPathInfo = getInfoFromPath(path);

  // Find the places matching country + city + place
  const allPlaces = useAllPlaces();
  const areaPlaces = allPlaces.filter((place) => {
    // Keep only matching places.
    let keepPlace = true;

    // Don't keep place if city of place is not same city as area.
    if (areaPathInfo.city !== place.pathInfo.city) {
      keepPlace = false;
    }

    // Don't keep place if country of place is not same country as area contry.
    if (areaPathInfo.country !== place.pathInfo.country) {
      keepPlace = false;
    }

    // If areaPathInfo.placeOrArea exists then area shown is an area of a city, so show only places for that area.
    // If areaPathInfo.placeOrArea does not exist it's only a city, so show all places for that city.
    if (areaPathInfo.placeOrArea) {
      // Make areas slugified to test.
      const slugifiedAreas =
        place.areas && place.areas.map((val) => slugify(val, { lower: true }));
      if (slugifiedAreas && slugifiedAreas.includes(areaPathInfo.placeOrArea)) {
        // Keep
      } else {
        keepPlace = false;
      }
      console.groupEnd();
    }

    return keepPlace;
  });

  const areaPlacesPaths = areaPlaces.map((place) => place.path);

  /* 
  Path examples:
  /sweden/stockholm
  /sweden/stockholm/sodermalm
  country + city + area
  so find places with that country
  
  1. hämta ut alla platser som matchar land + stad + ev. area
  2. skapa array med alla sökvägar till ställena, t.ex. ["/sweden/stockholm/babylon"]
  3. <PlacesListing placePaths={placePaths} />
  */

  return <PlacesListing placePaths={areaPlacesPaths} />;
}

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
  pageContext,
}) {
  const { file } = data;
  const { childMarkdownRemark, relativePath } = file; // data.markdownRemark holds your post data
  const { frontmatter, html } = childMarkdownRemark;
  const { title, images } = frontmatter;
  const path = getPlaceURIFromRelativePath(relativePath);
  console.log("childMarkdownRemark", childMarkdownRemark);

  return (
    <PageContainer>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      {images &&
        images.map((image) => {
          if (!image) {
            return null;
          }

          return (
            <div key={image.childImageSharp.fluid.src}>
              <Img
                key={image.childImageSharp.fluid.src}
                fluid={image.childImageSharp.fluid}
                alt={image.name}
                title={image.name}
                className="w-2/3 mx-auto"
              />
            </div>
          );
        })}

      <h1 className="text-center text-4xl">{title}</h1>

      <div
        className="mt-4 mb-16 text-center"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <AreaPlacesListing path={path} />
    </PageContainer>
  );
}

// Query for a single place with slug $slug.
export const pageQuery = graphql`
  query($relativePath: String!) {
    file(
      sourceInstanceName: { eq: "markdown-areas" }
      extension: { eq: "md" }
      relativePath: { eq: $relativePath }
      childMarkdownRemark: { frontmatter: { draft: { ne: true } } }
    ) {
      childMarkdownRemark {
        frontmatter {
          title
          images {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        html
      }
      relativePath
    }
  }
`;
