import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import PageContainer from "../components/PageContainer";
import Place from "../components/Place";
import Img from "gatsby-image";
import { getPlacePathFromRelativePath } from "../helpers";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
  pageContext
}) {
  const { file } = data;
  const { childMarkdownRemark, relativePath } = file; // data.markdownRemark holds your post data
  const { frontmatter, html } = childMarkdownRemark;
  const { title, areas, images } = frontmatter;
  const path = getPlacePathFromRelativePath(relativePath);

  return (
    <PageContainer>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div dangerouslySetInnerHTML={{ __html: html }} />
      <h1>{title}</h1>
      {areas.map(area => {
        return <p key={area}>Area: {area}</p>;
      })}
      {images.map(image => {
        return (
          <Img
            key={image.childImageSharp.fluid.src}
            fluid={image.childImageSharp.fluid}
          />
        );
      })}
      <Place path={path} />
    </PageContainer>
  );
}

// Query for a single place with slug $slug.
export const pageQuery = graphql`
  query($relativePath: String!) {
    file(
      sourceInstanceName: { eq: "markdown-places" }
      extension: { eq: "md" }
      relativePath: { eq: $relativePath }
      childMarkdownRemark: { frontmatter: { draft: { ne: true } } }
    ) {
      ...PlaceInformation
    }
  }
`;
