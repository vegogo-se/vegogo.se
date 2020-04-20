import React from "react";
import { usePlace } from "../hooks/usePlace";
import Img from "gatsby-image";

export function PlaceSingle(props) {
  const place = usePlace(props.path);
  const { title, excerpt, html, path, googlePlaceInfo, areas, images } = place;

  /**
   * Tease is the title and some sneak peek of the contents, like food types.
   */
  let contentBriefOut = (
    <>
      {excerpt && excerpt && (
        <div className="">
          <div dangerouslySetInnerHTML={{ __html: excerpt }} />
        </div>
      )}
    </>
  );

  let tease = (
    <div className="">
      <h1 className="text-5xl leading-tight">{title}</h1>
      {contentBriefOut}
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
                paddingBottom: "144%",
                scrollSnapAlign: "center",
                scrollSnapStop: "always",
              }}
              className="relative w-11/12 flex-grow flex-shrink-0 overflow-hidden bg-pink-100 border-pink-400 border-0"
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
        <div className="p-4">
          {tease}

          {googlePlaceInfo && (
            <>
              <p>
                Location: {googlePlaceInfo.geometry.location.lat},
                {googlePlaceInfo.geometry.location.lng}
                <br />
                Vicinity: {googlePlaceInfo.vicinity}
                <br />
                Website: {googlePlaceInfo.website}
                <br />
                Google Maps URL: {googlePlaceInfo.url}
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
            </>
          )}

          {areas &&
            areas.map((area) => {
              return <p key={area}>Area: {area}</p>;
            })}
        </div>

        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </article>
  );
}
