import React from "react";
import { Helmet } from "react-helmet";
import PageContainer from "../components/PageContainer";

/**
 * Template for a regular text page, i.e. /page/about
 */
export default function Template({ data }) {
  const title = `Places near your current location`;

  return (
    <PageContainer>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div>
        <div className="flex justify-center">
          <div className="text-center max-w-lg mx-6 my-10">
            <h1></h1>
            <h1 className="text-4xl mb-8 font-bold">{title}</h1>

            <p>Great copy here.</p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
