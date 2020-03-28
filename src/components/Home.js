import React from "react";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";
import PageContainer from "./PageContainer";
import PlacesListing from "./PlacesListing";
import introTextImage from "../images/vegogo-the-new-guide-to-vegan-eating.svg";
import ImageWithRatio from "./ImageWithRatio";
import { useAllPlaces } from "../hooks/useAllPlaces";
import { getPlacePaths } from "../helpers";
import "./Home.scss";

function Home() {
  const allPlaces = useAllPlaces();
  const placePaths = getPlacePaths(allPlaces);

  return (
    <PageContainer>
      <Helmet>
        <title>Vegogo - the new guide to vegan eating</title>
      </Helmet>

      <p className="Start-intro">
        <Link to="/page/about" title="Read more about Vegogo">
          <ImageWithRatio
            className="Start-introText"
            src={introTextImage}
            alt="The new guide to vegan eating"
            width="249"
            height="79"
          />
        </Link>
      </p>

      <PlacesListing
        title="Platser"
        excerpt="Bra ställen kommer här"
        placePaths={placePaths}
      />
    </PageContainer>
  );
}

export default Home;
