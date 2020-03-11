import React from "react";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";
import PageContainer from "../components/PageContainer";
import AreaIntro from "../components/AreaIntro";
import PlacesListing from "../components/PlacesListing";
import introTextImage from "../images/vegogo-the-new-guide-to-vegan-eating.svg";
import ImageWithRatio from "../components/ImageWithRatio";
import { useStaticQuery, graphql } from "gatsby";
// import { API_URL } from "../api-config";
import "./Home.scss";

function Home() {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     isLoading: false,
  //     places: []
  //   };
  // }

  // componentDidMount() {
  //   this.getPlaces();
  // }

  // getPlaces() {
  //   let placesApiUrl = `${API_URL}/place/list`;

  //   this.setState({ isLoadig: true });

  //   fetch(placesApiUrl)
  //     .then(data => {
  //       return data.json();
  //     })
  //     .then(data => {
  //       this.setState({ places: data.places, isLoading: false });
  //     });
  // }

  const data = useStaticQuery(graphql`
    # Get all places from folder markdown-places that are not drafts.
    query Places {
      allFile(
        filter: {
          sourceInstanceName: { eq: "markdown-places" }
          extension: { eq: "md" }
          childMarkdownRemark: { frontmatter: { draft: { ne: true } } }
        }
      ) {
        edges {
          node {
            childMarkdownRemark {
              frontmatter {
                path
                title
                coordinates
                areas
                address
                path
              }
              excerpt(format: PLAIN, pruneLength: 100)
              html
            }
            dir
            absolutePath
            name
          }
        }
      }
    }
  `);

  // Cleanup places graphql result.
  const places = data.allFile.edges.map(({ node }) => {
    const {
      title,
      path,
      coordinates,
      areas,
      address
    } = node.childMarkdownRemark.frontmatter;

    const { html, excerpt } = node.childMarkdownRemark;
    const { dir } = node;

    return {
      title,
      path,
      excerpt,
      html,
      coordinates,
      areas,
      address,
      dir
    };
  });

  return (
    <PageContainer>
      <Helmet>
        <title>Vegogo - the new guide to vegan eating</title>
      </Helmet>

      <p className="Start-intro">
        <Link to="/page/about" title="Read more about Vegogo">
          <ImageWithRatio
            className="Start-introText"
            src={introTextImage}
            alt="The new guide to vegan eating"
            width="249"
            height="79"
          />
        </Link>
      </p>

      <AreaIntro slug="stockholm" />

      <PlacesListing
        places={places}
        title="Platser"
        excerpt="Bra ställen kommer här"
      />
    </PageContainer>
  );
}

export default Home;
