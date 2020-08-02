import React, { useState, useEffect } from "react";
import { usePlace } from "../hooks/usePlace";
import Img from "gatsby-image";
import { highlightWords } from "../functions";

/**
 * Return opening hours output.
 *
 * @param object attributes
 */
function PlaceOpeningHours({ googlePlaceInfo }) {
  const isOpenedNow = isPlaceOpenedNow(googlePlaceInfo);
  const openedTexts = {
    OPENED: <p>Open now</p>,
    CLOSED: <p>Opening hours</p>,
  };
  const isOpenedNowText = openedTexts[isOpenedNow];
  const dateNow = new Date().toJSON();
  const [effectDateNow, setEffectDateNow] = useState();
  const [showOpenHours, setShowOpenHours] = useState(false);

  useEffect(() => {
    setEffectDateNow(new Date().toJSON());
  }, []);

  // Bail if no opening_hours.
  if (!googlePlaceInfo?.opening_hours) {
    return null;
  }

  return (
    <div className="text-sm mt-6">
      <button
        className="flex w-full text-left font-semibold"
        onClick={() => {
          setShowOpenHours(!showOpenHours);
        }}
      >
        <div className="flex-1">{isOpenedNowText}</div>
        <span className="flex-none">+</span>
      </button>

      <div>
        dateNow:
        <br />
        {dateNow}
      </div>
      <div>
        setEffectDateNow:
        <br />
        {effectDateNow}
      </div>

      <div className={`${showOpenHours ? "block mt-2" : "hidden"}`}>
        {googlePlaceInfo?.opening_hours?.weekday_text && (
          <ul>
            {googlePlaceInfo?.opening_hours?.weekday_text.map((val, idx) => {
              const classNames =
                idx === new Date().getDay() - 1 ||
                (new Date().getDay() === 0 && idx === 6)
                  ? "font-bold"
                  : "text-gray-600";
              return (
                <li key={val} className={classNames}>
                  {val}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

/**
 * Checks if a place is opened right now.
 *
 * @param Array googlePlaceInfo
 * @return string OPENED or CLOSED (string to make it work for possible future values of "CLOSING_SOON" or similar.)
 */
function isPlaceOpenedNow(googlePlaceInfo) {
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
        vals?.open?.day === currentWeekDayNum ||
        vals?.close?.day === currentWeekDayNum
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
        period?.close?.day === currentWeekDayNum &&
        period?.close?.time >= currentHoursMinutes
      ) {
        isOpenedNow = "OPENED";
      }

      // Check if end day is one day after today and that time exists. It does not
      // matter what the close time is because it's in the future anyway.
      // Check monday if current day is sunday.
      const nextDayNum = currentWeekDayNum > 6 ? 0 : currentWeekDayNum + 1;
      if (period?.close?.day === nextDayNum && period?.close?.time) {
        isOpenedNow = "OPENED";
      }
    }
  });
  return isOpenedNow;
}

export function PlaceSingle(props) {
  const place = usePlace(props.path);

  const {
    title,
    tagline,
    placeID,
    html,
    path,
    googlePlaceInfo,
    images,
  } = place;

  const htmlHighlighted = highlightWords(html);

  let tease;
  if (title && tagline) {
    // Both place title and title exists so make
    // place title a bit smaller and let the tagline be large.
    tease = (
      <>
        <h1 className="leading-tight pb-4 mb-8 border-b border-black">
          {title}
        </h1>
        <h2 className="text-5xl leading-tight">{tagline}</h2>
      </>
    );
  } else if (title) {
    // Only place title so make it large.
    tease = <h1 className="text-5xl leading-tight mt-2 mb-8">{title}</h1>;
  }

  return (
    <article key={path}>
      {/* Output images. */}
      <div
        className="relative flex overflow-scroll"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {images.map((image) => {
          if (!image) {
            return null;
          }

          return (
            <div
              style={{
                paddingBottom: "120%",
                scrollSnapAlign: "center",
                // scrollSnapStop: "always",
              }}
              className="relative w-10/12 flex-grow flex-shrink-0 overflow-hidden bg-pink-100 border-pink-400 border-0"
              key={path + image.childImageSharp.fluid.src}
            >
              <Img
                key={image.childImageSharp.fluid.src}
                fluid={image.childImageSharp.fluid}
                alt={image.name}
                title={image.name}
                style={{ position: "absolute" }}
                className="absolute inset-0 z-10"
              />
            </div>
          );
        })}
      </div>

      <div>
        <div className="p-6">
          {tease}

          <>
            <style jsx>{`
              div > :global(p) {
                @apply mt-6 leading-relaxed;
              }

              div > :global(p mark) {
                padding: 6px 0px 0px 0px;
              }
            `}</style>

            <div
              className="mt-4 mb-12 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: htmlHighlighted }}
            />
          </>

          {/* If place has info like adress, map, opening hours. */}
          {googlePlaceInfo && (
            <>
              <div className="border-t border-b border-black py-6">
                {googlePlaceInfo.vicinity && googlePlaceInfo.url && (
                  <p className="text-sm">
                    {googlePlaceInfo.url && (
                      <a
                        href={googlePlaceInfo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {googlePlaceInfo.vicinity}
                      </a>
                    )}
                  </p>
                )}

                {googlePlaceInfo.geometry.location.lat && (
                  <iframe
                    className="w-full mt-6"
                    width="600"
                    height="250"
                    frameBorder="0"
                    src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GATSBY_GOOGLE_MAPS_PUBLIC_API_KEY}&q=place_id:${placeID}`}
                    allowFullScreen
                    title="Place on map"
                  ></iframe>
                )}

                {googlePlaceInfo.website && (
                  <p className="mt-6 text-sm">
                    <a
                      href={googlePlaceInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {googlePlaceInfo.website}
                    </a>
                  </p>
                )}

                <PlaceOpeningHours googlePlaceInfo={googlePlaceInfo} />
              </div>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
