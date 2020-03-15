import React from "react";
import { Helmet } from "react-helmet";
import PageContainer from "./PageContainer";
import Img from "gatsby-image";
import "./TextPage.scss";

const TextPage = props => {
  const { title, pretitle, featuredImage, html } = props;

  return (
    <PageContainer>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className={`TextPage TextPage-about`}>
        {featuredImage && (
          <Img
            fluid={featuredImage.childImageSharp.fluid}
            className="TextPage-Image TextPage-Image--hero"
          />
        )}
        {pretitle && <div className="TextPage-preHeadline">{pretitle}</div>}
        <h1 className="TextPage-Headline">{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </div>
    </PageContainer>
  );
};

export default TextPage;
