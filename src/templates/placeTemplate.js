import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import PageContainer from "../components/PageContainer";
import { PlaceSingle } from "../components/PlaceSingle";
import { getPlaceURIFromRelativePath } from "../helpers";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
  pageContext
}) {
  const { file } = data;
  const { childMarkdownRemark, relativePath } = file; // data.markdownRemark holds your post data
  const { frontmatter } = childMarkdownRemark;
  const { title } = frontmatter;
  const path = getPlaceURIFromRelativePath(relativePath);

  return (
    <PageContainer>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <PlaceSingle path={path} />
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
