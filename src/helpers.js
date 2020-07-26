/**
 * Misc helper functions.
 */
// import { useStaticQuery } from "gatsby";
const fetch = require(`node-fetch`);
const querystring = require("querystring");
const slugify = require("slugify");

/**
 * Return formatted homepage.
 * @return object
 */
export function cleanupHomepage(homepage) {
  let homepagePresentation = null;
  let homepageWithProtocol = null;

  if (!homepage) {
    return {
      homepagePresentation,
      homepageWithProtocol,
    };
  }
  // Remove any http or https. And some other cleaning to make URL presentable.
  homepagePresentation = homepage.replace(/^https?:\/\//i, "");
  homepagePresentation = homepagePresentation.replace(/^www\./i, "");
  homepagePresentation = homepagePresentation.replace(/\/$/i, "");

  // Add http if missing.
  homepageWithProtocol = homepage;
  if (!homepageWithProtocol.match(/^https?:\/\//i)) {
    homepageWithProtocol = `http://${homepageWithProtocol}`;
  }

  return {
    homepagePresentation,
    homepageWithProtocol,
  };
}

export function getAreaPermalink(area) {
  console.log("getAreaPermalink for area", area);
  return `/area/${area.slug}`;
}

/**
 * Get opening hours, phone number, and website for a placeId from Google.
 *
 * Docs:
 * https://developers.google.com/places/web-service/details
 *
 * @param string PlaceID
 * @return Promise Promise with place details when settled.
 */
export async function getPlaceDetailsFromGoogle(placeId) {
  const baseUri = "https://maps.googleapis.com/maps/api/place/details/json";
  // Key locked by IP because referer does not work.
  const googleMapsAPiKey = "AIzaSyArzTadmFlWv6x_03WFYPL9kZ-RaUsFnRs";

  var requestParams = {
    key: googleMapsAPiKey,
    placeid: placeId,
    fields:
      "opening_hours,website,address_component,geometry,name,url,vicinity",
  };

  const requestUri = `${baseUri}?${querystring.stringify(requestParams)}`;
  const result = await fetch(requestUri);
  const resultData = await result.json();

  // console.log("requestUri:", requestUri);
  // console.log("resultData", resultData);

  // return new Promise(resolve => {
  //   // https://developers.google.com/maps/documentation/javascript/places
  //   service.getDetails(request, res => {
  //     resolve(res);
  //   });
  // });
  return resultData;
}

/**
 * Generate URI for a place based on it's relativePath
 * relativePath:
 * 'sweden/stockholm/example-place/index.md',
 * <country>/<city>/<place>
 *
 * @param string relativePath Path like 'sweden/stockholm/example-place/index.md'
 *               or '"/sweden/stockholm/index.md"'
 * @return string Place URI like /sweden/stockholm/example-place/
 */
export function getPlaceURIFromRelativePath(relativePath) {
  // Remove any first slash /.
  relativePath = relativePath.replace(/^\//, "");

  // Remove any last /index.md
  relativePath = relativePath.replace(/\/index.md$/, "");

  // Add slash first.
  relativePath = `/${relativePath}`;

  // Spaces to dashes " " -> "-" and "åäö" -> "aao" etc.
  relativePath = slugify(relativePath, {
    // Allow "/" so we don't have to do more work on the URLs..
    remove: /[^\w\s$*_+~.()'"!\-:@/]/g,
  });

  // Make lowercase.
  relativePath = relativePath.toLowerCase();

  return relativePath;
}

// Create array with only the slugs of each place.
export function getPlacePaths(places) {
  const placePaths = places.map((place) => {
    return place.path;
  });

  return placePaths;
}

// Get names of each place from their paths.
export function getPlacesMatchingPlacePaths(allPlaces, placePaths) {
  const selectedPlaces = allPlaces.filter((place) => {
    return placePaths.includes(place.path);
  });

  return selectedPlaces;
}
