import React from "react";
import { Helmet } from "react-helmet";
import PageContainer from "./PageContainer";
import textpages from "../data/textpages";
import "./TextPage.scss";

const TextPage = ({ location }) => {
  let { pathname } = location;
  var slug = pathname
    .split("/")
    .filter(val => val)
    .pop();

  if (!textpages[slug]) {
    return "Text not found";
  }

  const text = textpages[slug];
  let heroImg = text.heroImg;
  let preTitle = text.preTitle;

  return (
    <PageContainer>
      <Helmet>
        <title>{text.title}</title>
      </Helmet>
      <div className={`TextPage TextPage-about`}>
        {heroImg && (
          <p>
            <img
              className="TextPage-Image TextPage-Image--hero"
              src={heroImg.src}
              width={heroImg.width}
              height={heroImg.height}
              alt=""
            />
          </p>
        )}
        {text.preTitle && (
          <div className="TextPage-preHeadline">{preTitle}</div>
        )}
        <h1 className="TextPage-Headline">{text.title}</h1>
        {text.body}
      </div>
    </PageContainer>
  );
};

export default TextPage;
