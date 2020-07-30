import React, { Component } from "react";
import { Helmet } from "react-helmet";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import NewsletterSignup from "../components/NewsletterSignup";

class PageContainer extends Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <body className="font-sans font-semibold text-lg" />
        </Helmet>

        <SiteHeader />

        <main className="mx-auto">{this.props.children}</main>

        <NewsletterSignup />
        <SiteFooter />
      </React.Fragment>
    );
  }
}

export default PageContainer;
