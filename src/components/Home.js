import { Link } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";
import { getPlacePaths } from "../helpers";
import { useAllPlaces } from "../hooks/useAllPlaces";
import PageContainer from "./PageContainer";
import PlacesListing from "./PlacesListing";

function Home() {
  const allPlaces = useAllPlaces();
  const placePaths = getPlacePaths(allPlaces);

  return (
    <PageContainer>
      <Helmet>
        <title>Vegogo - the new guide to vegan eating</title>
      </Helmet>

      <h1 className="font-headline font-normal text-center text-6xl py-8 px-1">
        <Link to="/page/about" title="Read more about Vegogo">
          The
          <br />
          new guide
          <br /> to vegan
          <br /> eating
        </Link>
      </h1>

      <PlacesListing placePaths={placePaths} />

      <style jsx>{``}</style>
    </PageContainer>
  );
}

export default Home;
