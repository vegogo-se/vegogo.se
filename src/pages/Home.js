import React from "react";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";
import PageContainer from "../components/PageContainer";
import AreaIntro from "../components/AreaIntro";
import PlacesListing from "../components/PlacesListing";
import introTextImage from "../images/vegogo-the-new-guide-to-vegan-eating.svg";
import ImageWithRatio from "../components/ImageWithRatio";
// import { useStaticQuery, graphql } from "gatsby";
import { useAllPlaces } from "../helpers";
import "./Home.scss";

function Home() {
  const allPlaces = useAllPlaces();

  const placeSlugs = allPlaces.map(place => {
    return place.slug;
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
        placeSlugs={placeSlugs}
        title="Platser"
        excerpt="Bra ställen kommer här"
      />
    </PageContainer>
  );
}

export default Home;
