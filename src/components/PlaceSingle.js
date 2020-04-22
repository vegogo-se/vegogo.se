import React from "react";
import { usePlace } from "../hooks/usePlace";
import Img from "gatsby-image";

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

  let tease = (
    <div className="">
      {title && (
        <h1 className="leading-tight pb-4 mb-8 border-b border-black">
          {title}
        </h1>
      )}
      {tagline && <h2 className="text-5xl leading-tight">{tagline}</h2>}

      {/* {contentBriefOut} */}
    </div>
  );

  return (
    <article key={path}>
      {/* Output images. */}
      <div
        className="relative block flex overflow-scroll"
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

          <div
            className="mt-4 mb-10 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {googlePlaceInfo && (
            <div className="border-t border-black pt-4">
              <p>
                {/* maps key: 
                AIzaSyCYCr0ilOmynS4WcS-OSOPTcdDWfDpSMw8 */}
                {/* Location: {googlePlaceInfo.geometry.location.lat},
                {googlePlaceInfo.geometry.location.lng}
                <br /> */}
                {googlePlaceInfo.geometry.location.lat && (
                  <iframe
                    className="w-full"
                    width="600"
                    height="450"
                    frameborder="0"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCYCr0ilOmynS4WcS-OSOPTcdDWfDpSMw8&q=place_id:${placeID}`}
                    allowfullscreen
                    title="Place on map"
                  ></iframe>
                )}
                {googlePlaceInfo.vicinity && <p>{googlePlaceInfo.vicinity}</p>}
                {googlePlaceInfo.website && (
                  <p>
                    <a
                      href={googlePlaceInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {googlePlaceInfo.website}
                    </a>
                  </p>
                )}
                {googlePlaceInfo.url && (
                  <p>Google Maps URL: {googlePlaceInfo.url}</p>
                )}
                <br />
                Opening hours:{" "}
              </p>
              <pre>
                {googlePlaceInfo.opening_hours &&
                  JSON.stringify(
                    googlePlaceInfo.opening_hours.weekday_text,
                    null,
                    2
                  )}
              </pre>
            </div>
          )}

          {/* {areas &&
            areas.map((area) => {
              return <p key={area}>Area: {area}</p>;
            })} */}
        </div>
      </div>
    </article>
  );
}
