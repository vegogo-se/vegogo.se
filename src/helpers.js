/**
 * Misc helper functions.
 */
// import { useStaticQuery } from "gatsby";
const fetch = require(`node-fetch`);
const querystring = require("querystring");

// import { GOOGLE_MAPS_API_KEY } from "./api-config";

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
      homepageWithProtocol
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
    homepageWithProtocol
  };
}

export function getAreaPermalink(area) {
  console.log("getAreaPermalink for area", area);
  return `/area/${area.slug}`;
}

/**
 * Get opening hours, phone number, and website for a placeId from Google.
 *
 * @return Promise
 */
export async function getPlaceDetailsFromGoogle(
  placeId = "ChIJwXlpyed3X0YRnArSXmAPX-U"
) {
  const baseUri = "https://maps.googleapis.com/maps/api/place/details/json";
  const googleMapsAPiKey = "AIzaSyCYCr0ilOmynS4WcS-OSOPTcdDWfDpSMw8";

  var requestParams = {
    key: googleMapsAPiKey,
    placeId: placeId,
    fields: [
      "opening_hours",
      "formatted_phone_number",
      "international_phone_number",
      "website"
    ]
  };

  const requestUri = `${baseUri}?${querystring.stringify(requestParams)}`;
  const result = await fetch(requestUri);
  const resultData = await result.json();
  console.log("resultData", resultData);

  // return new Promise(resolve => {
  //   // https://developers.google.com/maps/documentation/javascript/places
  //   service.getDetails(request, res => {
  //     resolve(res);
  //   });
  // });
}

// relativePath:
// 'sweden/stockholm/example-place/index.md',
// <country>/<city>/<place>
export function getPlacePathFromRelativePath(relativePath) {
  // Keep whole path but last part with filename.
  return (
    "/" +
    relativePath
      .split("/")
      .splice(0, 3)
      .join("/")
  );
}
