import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import Img from "gatsby-image";
import PageContainer from "../components/PageContainer";
// import { PlaceSingle } from "../components/PlaceSingle";
import { getPlaceURIFromRelativePath } from "../helpers";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
  pageContext,
}) {
  const { file } = data;
  const { childMarkdownRemark, relativePath } = file; // data.markdownRemark holds your post data
  const { frontmatter } = childMarkdownRemark;
  const { title, images } = frontmatter;
  const path = getPlaceURIFromRelativePath(relativePath);

  return (
    <PageContainer>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      {images &&
        images.map((image) => {
          if (!image) {
            return null;
          }

          return (
            <div key={image.childImageSharp.fluid.src}>
              <Img
                key={image.childImageSharp.fluid.src}
                fluid={image.childImageSharp.fluid}
                alt={image.name}
                title={image.name}
                xstyle={{ position: "absolute" }}
                xclassName="absolute inset-0 z-10"
              />
            </div>
          );
        })}

      <h1>{title}</h1>
      {/* <PlaceSingle path={path} /> */}
    </PageContainer>
  );
}

// Query for a single place with slug $slug.
export const pageQuery = graphql`
  query($relativePath: String!) {
    file(
      sourceInstanceName: { eq: "markdown-areas" }
      extension: { eq: "md" }
      relativePath: { eq: $relativePath }
      childMarkdownRemark: { frontmatter: { draft: { ne: true } } }
    ) {
      childMarkdownRemark {
        frontmatter {
          title
          images {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        html
      }
      relativePath
    }
  }
`;
