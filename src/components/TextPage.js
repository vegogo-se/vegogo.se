import React from "react";
import { Helmet } from "react-helmet";
import PageContainer from "./PageContainer";
import Img from "gatsby-image";

function TextPageBodyContent({ html }) {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>

      <style jsx>{`
        div > :global(p) {
          @apply mt-3 leading-normal;
        }
      `}</style>
    </div>
  );
}

const TextPage = props => {
  const { title, pretitle, featuredImage, html } = props;

  return (
    <PageContainer>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div className="text-center max-w-lg m-auto my-10">
        {featuredImage && (
          <Img
            className="max-w-sm m-auto mb-8"
            fluid={featuredImage.childImageSharp.fluid}
          />
        )}

        {pretitle && <div className="text-6xl">{pretitle}</div>}

        <h1 className="text-4xl mb-8 font-bold">{title}</h1>

        <TextPageBodyContent html={html} />
      </div>
    </PageContainer>
  );
};

export default TextPage;
