import React from "react";
import classnames from "classnames";
import { useAllPlaces } from "../hooks/useAllPlaces";
import Img from "gatsby-image";
import { Link } from "gatsby";
import "./PlacesListing.scss";

function Place(props) {
  const { slug } = props;
  const allPlaces = useAllPlaces();

  const place = allPlaces.find(place => {
    return place.slug === slug;
  });

  const { title, excerpt } = place;

  let placeClassNames = classnames({
    PlaceItem: true
  });

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

  const firstImage = place.images ? place.images[0] : null;

  return (
    <article key={slug} className={placeClassNames}>
      <div className="PlaceItem-content">
        <Link to={slug}>
          {tease}
          {firstImage && (
            <Img
              fluid={firstImage.childImageSharp.fluid}
              alt={firstImage.name}
              title={firstImage.name}
            />
          )}
        </Link>
      </div>
    </article>
  );
}

export default Place;
