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
    tease = (
      <h1 className="text-5xl leading-tight leading-tight mt-2 mb-8">
        {title}
      </h1>
    );
  }

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

          <>
            <style jsx>{`
              div > :global(p) {
                @apply mt-6 leading-relaxed;
              }
            `}</style>

            <div
              className="mt-4 mb-12 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: html }}
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
                    frameborder="0"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCYCr0ilOmynS4WcS-OSOPTcdDWfDpSMw8&q=place_id:${placeID}`}
                    allowfullscreen
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

                <div className="text-sm">
                  Opening hours:{" "}
                  <pre>
                    {googlePlaceInfo.opening_hours &&
                      JSON.stringify(
                        googlePlaceInfo.opening_hours.weekday_text,
                        null,
                        2
                      )}
                  </pre>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
