/**
 * Misc helper functions.
 */
// import { useStaticQuery } from "gatsby";
import orderByDistance from "geolib/es/orderByDistance";
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
  // TODO: move this key to .env?
  const googleMapsAPiKey = "AIzaSyArzTadmFlWv6x_03WFYPL9kZ-RaUsFnRs";

  var requestParams = {
    key: googleMapsAPiKey,
    placeid: placeId,
    fields:
      "opening_hours,website,address_component,geometry,name,url,vicinity",
  };

  const requestUri = `${baseUri}?${querystring.stringify(
    requestParams
  )}&language=en-GB`;
  const result = await fetch(requestUri);
  const resultData = await result.json();

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
    lower: true,
  });

  // Make lowercase.
  relativePath = relativePath.toLowerCase();

  return relativePath;
}

/**
 * Create array with only the slugs of each place.
 *
 * Example return:
 * ["/sweden/stockholm/babylon", "/sweden/stockholm/bliss-cafe", … ]
 */
export function getPlacePaths(places) {
  const placePaths = places.map((place) => {
    return place.path;
  });

  return placePaths;
}

/**
 * Sort array of objects based on another array.
 * Function from https://gist.github.com/ecarter/1423674
 */
function mapOrder(array, order, key) {
  array.sort(function (a, b) {
    var A = a[key],
      B = b[key];

    if (order.indexOf(A) > order.indexOf(B)) {
      return 1;
    } else {
      return -1;
    }
  });

  return array;
}

/**
 * Get places that matches the places in placePaths
 *
 * @param {*} allPlaces
 * @param {*} placePaths Array with paths to places to keep.
 */
export function getPlacesMatchingPlacePaths(allPlaces, placePaths) {
  let selectedPlaces = allPlaces.filter((place) => {
    return placePaths.includes(place.path);
  });

  // Set correct order of items.
  selectedPlaces = mapOrder(selectedPlaces, placePaths, "path");

  return selectedPlaces;
}

/**
 * Get information from the path of an area or place.
 * Place URL "/sweden/stockholm/mahalo" will return
 * {
 *   country: sweden
 *   city: stockholm
 *   placeOrArea: mahalo
 * }
 */
export function getInfoFromPath(path) {
  // Remove any first slash.
  path = path.replace(/^\//, "");

  // Split on slash, "/".
  const pathParts = path.split("/");

  return {
    country: pathParts[0],
    city: pathParts[1],
    placeOrArea: pathParts[2],
  };
}

export function getNearestPlacesFromLocation(options) {
  const { lat = 59.323611, lng = 18.074444, places = [] } = options;
  // console.log(`Finding places near lat ${lat}, lng ${lng}`);

  // Make data format that fits the orderByDistance function.
  let placesFormatted = places.filter((place) => {
    return place && place.googlePlaceInfo && place.googlePlaceInfo.geometry;
  });

  placesFormatted = placesFormatted.map((place) => {
    place.latitude = place.googlePlaceInfo.geometry.location.lat;
    place.longitude = place.googlePlaceInfo.geometry.location.lng;
    return place;
  });

  // https://www.npmjs.com/package/geolib#orderbydistancepoint-arrayofpoints
  const placesByDistance = orderByDistance(
    {
      latitude: lat,
      longitude: lng,
    },
    placesFormatted
  );

  return placesByDistance;
}

/**
 * Checks if a place is opened right now.
 *
 * @param Array googlePlaceInfo
 * @return string OPENED or CLOSED (string to make it work for possible future values of "CLOSING_SOON" or similar.)
 */
export function isPlaceOpenedNow(googlePlaceInfo) {
  // Current day of week, 0 = sunday, 1 = monday.
  let isOpenedNow = "CLOSED";

  // Bail if no data to work with.
  if (
    !googlePlaceInfo ||
    !googlePlaceInfo.opening_hours ||
    !googlePlaceInfo.opening_hours.periods
  ) {
    return isOpenedNow;
  }

  const currentDate = new Date();
  const currentWeekDayNum = currentDate.getDay();
  const currentHoursMinutes = `${currentDate.getHours()}${currentDate.getMinutes()}`;
  // periods[] is an array of opening periods covering seven days, starting from Sunday, in chronological order.
  // Can be multiple entries for a single day, see this example: https://stackoverflow.com/questions/48461740/using-functional-programming-to-parse-opening-hours-from-google-places-api
  // https://developers.google.com/places/web-service/details#PlaceDetailsResults

  // Keep periods that contains the current day is open or close date.
  const todayOpeningHoursPeriods = googlePlaceInfo.opening_hours.periods.filter(
    (vals) => {
      return (
        (vals && vals.open && vals.open.day === currentWeekDayNum) ||
        (vals && vals.close && vals.close.day === currentWeekDayNum)
      );
    }
  );

  todayOpeningHoursPeriods.forEach((period) => {
    // Start day is today and start time is passed.
    if (
      period.open.day === currentWeekDayNum &&
      period.open.time <= currentHoursMinutes
    ) {
      // Check if end day and time is today and not passed.
      if (
        period &&
        period.close &&
        period.close.day === currentWeekDayNum &&
        period &&
        period.close &&
        period.close.time >= currentHoursMinutes
      ) {
        isOpenedNow = "OPENED";
      }

      // Check if end day is one day after today and that time exists. It does not
      // matter what the close time is because it's in the future anyway.
      // Check monday if current day is sunday.
      const nextDayNum = currentWeekDayNum > 6 ? 0 : currentWeekDayNum + 1;
      if (
        period &&
        period.close &&
        period.close.day === nextDayNum &&
        period &&
        period.close &&
        period.close.time
      ) {
        isOpenedNow = "OPENED";
      }
    }
  });

  return isOpenedNow;
}
