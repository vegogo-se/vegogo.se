import React from "react";
import { getPlacesMatchingPlacePaths } from "../helpers";
import { useAllPlaces } from "../hooks/useAllPlaces";
import { PlaceOverview } from "./PlaceOverview";

/**
 * Renders places with places with paths passed as placePaths.
 *
 * @param props.placePaths Array with paths of places to show in the listing
 * @param props.title string Title to show large above the listing
 * @param props.excerpt string Introtext
 */
function PlacesListing(props) {
  let { placePaths, title, excerpt } = props;

  const allPlaces = useAllPlaces();
  const selectedPlaces = getPlacesMatchingPlacePaths(allPlaces, placePaths);

  let placesItems;

  if (selectedPlaces) {
    placesItems = selectedPlaces.map((place) => {
      let { path } = place;

      return (
        <li key={path} className="w-1/2 lg:w-1/4">
          <PlaceOverview path={path} />
        </li>
      );
    });

    placesItems = <ul className="flex flex-wrap">{placesItems}</ul>;
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
