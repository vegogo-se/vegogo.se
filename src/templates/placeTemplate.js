import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import PageContainer from "../components/PageContainer";
import Place from "../components/Place";
import Img from "gatsby-image";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
  pageContext
}) {
  const { file } = data;
  const { childMarkdownRemark } = file; // data.markdownRemark holds your post data
  const { frontmatter, html, excerpt } = childMarkdownRemark;
  const { slug, title, areas, images } = frontmatter;

  return (
    <PageContainer>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div dangerouslySetInnerHTML={{ __html: html }} />
      <h1>{title}</h1>
      {areas.map(area => {
        return <p>Area: {area}</p>;
      })}
      {images.map(image => {
        return <Img fluid={image.childImageSharp.fluid} />;
      })}
      <Place slug={slug} />
    </PageContainer>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    file(
      sourceInstanceName: { eq: "markdown-places" }
      extension: { eq: "md" }
      childMarkdownRemark: {
        frontmatter: { draft: { ne: true }, slug: { eq: $slug } }
      }
    ) {
      ...PlaceInformation
    }
  }
`;
