import React from "react";
import { Helmet } from "react-helmet";
import PageContainer from "./PageContainer";
import "./TextPage.scss";

const TextPage = props => {
  const { title, pretitle, heroImg, heroImgWidth, heroImgHeight, html } = props;

  return (
    <PageContainer>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className={`TextPage TextPage-about`}>
        {heroImg && (
          <p>
            <img
              className="TextPage-Image TextPage-Image--hero"
              src={heroImg}
              width={heroImgWidth}
              height={heroImgHeight}
              alt=""
            />
          </p>
        )}
        {pretitle && <div className="TextPage-preHeadline">{pretitle}</div>}
        <h1 className="TextPage-Headline">{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </div>
    </PageContainer>
  );
};

export default TextPage;
