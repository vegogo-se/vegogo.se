import React from "react";
import { PlaceOverview } from "./PlaceOverview";
import { useAllPlaces } from "../hooks/useAllPlaces";
import { getPlacesMatchingPlacePaths } from "../helpers";
import "./PlacesListing.scss";

/**
 * Renders places with places with paths passed as placePaths.
 */
function PlacesListing(props) {
  let { title, excerpt, placePaths } = props;

  const allPlaces = useAllPlaces();
  const selectedPlaces = getPlacesMatchingPlacePaths(allPlaces, placePaths);

  let placesItems;

  if (selectedPlaces) {
    placesItems = selectedPlaces.map(place => {
      let { path } = place;

      return (
        <React.Fragment key={path}>
          <li key={path} className="PlacesListing-placeItem">
            <PlaceOverview path={path} />
          </li>
        </React.Fragment>
      );
    });

    placesItems = <ul className="PlacesListing-placeItems">{placesItems}</ul>;
  }

  return (
    <div className="PlacesListing">
      {title && <h2>{title}</h2>}
      {excerpt && <div>{excerpt}</div>}
      {placesItems}
    </div>
  );
}

export default PlacesListing;
