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
        <div className="PlaceItem-textcontent PlaceItem-textcontent--brief">
          <div dangerouslySetInnerHTML={{ __html: excerpt }} />
        </div>
      )}
    </>
  );

  let tease = (
    <div className="PlaceItem-head">
      <h1 className="PlaceItem-name">{title}</h1>
      {contentBriefOut}
    </div>
  );

  return (
    <article key={path}>
      <div className="PlaceItem-content">
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
            <pre>{JSON.stringify(googlePlaceInfo.opening_hours.weekday_text, null, 2)}</pre>
          </>
        )}

        {areas &&
          areas.map(area => {
            return <p key={area}>Area: {area}</p>;
          })}

        {images.map(image => {
          return (
            <Img
              key={image.childImageSharp.fluid.src}
              fluid={image.childImageSharp.fluid}
              alt={image.name}
              title={image.name}
            />
          );
        })}

        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </article>
  );
}
