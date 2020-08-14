import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import PageContainer from "../components/PageContainer";
import VegogoButton from "../components/VegogoButton";
import PlacesListing from "../components/PlacesListing";
import { getNearestPlacesFromLocation } from "../helpers";
import { useAllPlaces } from "../hooks/useAllPlaces";

/**
 * Template for a regular text page, i.e. /page/about
 */
export default function Template({ data }) {
  const allPlaces = useAllPlaces();
  const title = `Places near your current location`;
  const [isLocating, setIsLocating] = useState(false);
  const [isLocatingError, setIsLocatingError] = useState(false);
  const [gotLocation, setGotLocation] = useState(false);
  const [
    currentGeolocationPosition,
    setCurrentGeolocationPosition,
  ] = useState();
  const [nearbyPlacesPaths, setNearbyPlacesPaths] = useState([]);

  const onGetGeolocationSuccess = (position) => {
    console.log("onGetGeolocationSuccess", position);
    setIsLocating(false);
    setIsLocatingError(false);
    setCurrentGeolocationPosition(position);
    setGotLocation(true);
  };

  const onGetGeolocationError = (err) => {
    console.log("onGetGeolocationError", err);
    setIsLocating(false);
    setIsLocatingError(true);
    setGotLocation(false);
    setCurrentGeolocationPosition();
  };

  const handleShowPlacesButton = (e) => {
    console.log("click btn", e, this);
    setIsLocating(true);
    setIsLocatingError(false);
    navigator.geolocation.getCurrentPosition(
      onGetGeolocationSuccess,
      onGetGeolocationError
    );
  };

  /**
   * Update places when we got location.
   */
  useEffect(() => {
    // Bail if no location yet.
    if (!gotLocation) {
      return;
    }

    // Sort places by nearbyness.
    let nearestPlaces = getNearestPlacesFromLocation({
      places: allPlaces,
      lat: currentGeolocationPosition?.coords?.latitude,
      lng: currentGeolocationPosition?.coords?.longitude,
    });

    const placePaths = nearestPlaces.map((place) => place.path);
    console.log("placePaths", placePaths);
    setNearbyPlacesPaths(placePaths);
  }, [currentGeolocationPosition, gotLocation]);

  return (
    <PageContainer>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div>
        <div className="flex justify-center">
          <div className="text-center max-w-lg mx-6 my-10">
            <h1></h1>
            <h1 className="text-4xl mb-8 font-bold">{title}</h1>

            <p>
              To be able to show places near you we will need to get your
              current location.
            </p>

            <VegogoButton onClick={handleShowPlacesButton}>
              Cool, show great vegan places near me
            </VegogoButton>

            {currentGeolocationPosition && (
              <p>
                Aktuell plats är lat{" "}
                {currentGeolocationPosition.coords.latitude}, lng{" "}
                {currentGeolocationPosition.coords.longitude}
              </p>
            )}

            {isLocating && <p>Uppdaterar din position...</p>}

            {isLocatingError && (
              <p>Äsch då, det gick inte att hämta din position...</p>
            )}

            {gotLocation && (
              <PlacesListing
                placePaths={nearbyPlacesPaths}
                title="Places near you"
              />
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
