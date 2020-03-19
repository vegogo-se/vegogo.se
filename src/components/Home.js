import React from "react";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";
import PageContainer from "./PageContainer";
import AreaIntro from "./AreaIntro";
import PlacesListing from "./PlacesListing";
import introTextImage from "../images/vegogo-the-new-guide-to-vegan-eating.svg";
import ImageWithRatio from "./ImageWithRatio";
// import { useStaticQuery, graphql } from "gatsby";
import { useAllPlaces } from "../hooks/useAllPlaces";
import "./Home.scss";

function Home() {
  const allPlaces = useAllPlaces();
  // console.log('allPlaces', allPlaces)

  // Create array with only the slugs of each place.
  const placePaths = allPlaces.map(place => {
    return place.path;
  });

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

      <AreaIntro slug="stockholm" />

      <PlacesListing
        placePaths={placePaths}
        title="Platser"
        excerpt="Bra ställen kommer här"
      />
    </PageContainer>
  );
}

export default Home;
