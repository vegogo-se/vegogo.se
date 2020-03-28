import React from "react";
import { getPlacesMatchingPlacePaths } from "../helpers";
import { useAllPlaces } from "../hooks/useAllPlaces";
import { PlaceOverview } from "./PlaceOverview";

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
        <li key={path} className="w-1/2">
          <PlaceOverview path={path} />
        </li>
      );
    });

    placesItems = <ul className="flex">{placesItems}</ul>;
  }

  return (
    <>
      {title && <h2>{title}</h2>}
      {excerpt && <div>{excerpt}</div>}
      {placesItems}
    </>
  );
}

export default PlacesListing;
