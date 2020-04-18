import React from "react";
import { usePlace } from "../hooks/usePlace";
import Img from "gatsby-image";
import { Link } from "gatsby";

export function PlaceOverview(props) {
  const place = usePlace(props.path);
  const { title, path } = place;
  const firstImage = place.images ? place.images[0] : null;

  return (
    <article
      key={path}
      className="relative block text-center"
      style={{ paddingBottom: "144%" }}
    >
      <Link to={path} className="block">
        <div className="absolute inset-x-0 pt-24 z-20">
          <h2 className="bg-white mx-4 py-1 px-4 text-2xl">{title}</h2>
        </div>
        {firstImage && (
          <Img
            fluid={firstImage.childImageSharp.fluid}
            alt={firstImage.name}
            title={firstImage.name}
            style={{ position: "absolute" }}
            className="absolute inset-0 z-10"
          />
        )}
      </Link>
    </article>
  );
}
