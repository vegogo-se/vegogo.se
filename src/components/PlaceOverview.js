import React from "react";
import { usePlace } from "../hooks/usePlace";
import Img from "gatsby-image";
import { Link } from "gatsby";

export function PlaceOverview(props) {
  const place = usePlace(props.path);
  const { title, path } = place;
  const firstImage = place.images ? place.images[0] : null;

  return (
    <article key={path}>
      <Link to={path} className="relative bg-pink">
        <h2>{title}</h2>
        {firstImage && (
          <Img
            fluid={firstImage.childImageSharp.fluid}
            alt={firstImage.name}
            title={firstImage.name}
          />
        )}
      </Link>
    </article>
  );
}
