import React from "react";
import { getNearestPlacesFromLocation } from "../helpers";
import PlacesListing from "./PlacesListing";

/**
 * Show places nearby another place.
 *
 * @param Props place, places
 */
export function PlacesNearby(props) {
  const { place, places } = props;
  const { googlePlaceInfo } = place;

  // Remove the place we are getting places nearby for.
  const placesWithoutPlace = places.filter(
    (placesPlace) => placesPlace.path !== place.path
  );

  // Sort places by distance.
  let nearestPlaces = getNearestPlacesFromLocation({
    places: placesWithoutPlace,
    lat: googlePlaceInfo?.geometry?.location?.lat,
    lng: googlePlaceInfo?.geometry?.location?.lng,
  });

  // Show only the first n.
  nearestPlaces = nearestPlaces.slice(0, 6);

  const placePaths = nearestPlaces.map((place) => place.path);

  return (
    <PlacesListing
      placePaths={placePaths}
      title="More near by"
      excerpt={`Here are some more nice vegan places close to ${place.title}.`}
    />
  );
}
