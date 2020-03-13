import React from "react";
// import { Link } from "react-router-dom";
import Place from "./Place";
//import Loading from "./Loading";
import "./PlacesListing.scss";
//import { useStaticQuery, graphql } from "gatsby";
import { useAllPlaces } from "../helpers";

/**
 * Renders places with passed places.
 */
function PlacesListing(props) {
  let { title, excerpt, placeSlugs, showDivider = true } = props;

  // Get names of each place from their slugs.
  console.log("placeSlugs", placeSlugs);

  const allPlaces = useAllPlaces();

  const selectedPlaces = allPlaces.allFile.edges.filter(({ node }) => {
    return placeSlugs.includes(node.childMarkdownRemark.frontmatter.slug);
  });

  let placesItems;

  // Create alphanum char listing.
  if (selectedPlaces) {
    let prevPlaceFirstChar;

    placesItems = selectedPlaces.map(({ node }) => {
      let { slug, title } = node.childMarkdownRemark.frontmatter;
      let charDivider;
      let placeFirstChar = title.charAt(0);

      if (!prevPlaceFirstChar || prevPlaceFirstChar !== placeFirstChar) {
        charDivider = (
          <li className="PlacesListing-charDivider" key={placeFirstChar}>
            {placeFirstChar}
          </li>
        );
        prevPlaceFirstChar = placeFirstChar;
      }

      let fragmentKey = `${placeFirstChar}/${slug}`;

      return (
        <React.Fragment key={fragmentKey}>
          {showDivider && charDivider}
          <li key={slug} className="PlacesListing-placeItem">
            <Place slug={slug} />
          </li>
        </React.Fragment>
      );
    });

    placesItems = <ul className="PlacesListing-placeItems">{placesItems}</ul>;
  }

  /*
    let navbar = (
      <div className="PlacesListing-NavBar">
        <ul className="PlacesListing-NavBar-items">
          <li className="PlacesListing-NavBar-item">
            <Link className="PlacesListing-NavBar-itemLink" to="/">
              A to Ö
            </Link>
          </li>
          <li className="PlacesListing-NavBar-item">
            <Link className="PlacesListing-NavBar-itemLink" to="/nearby">
              Near me
            </Link>
          </li>
        </ul>
      </div>
    );
    */

  return (
    <div className="PlacesListing">
      {title && <h2>{title}</h2>}
      {excerpt && <div>{excerpt}</div>}
      {placesItems}
    </div>
  );
}

export default PlacesListing;
