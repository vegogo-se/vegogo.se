import React, { Component } from "react";
import { Link } from "gatsby";
import logoImg from "../images/vegogo-logo.svg";
import iconInstagram from "../images/icon-instagram.svg";
import iconFacebook from "../images/icon-facebook.svg";

class SiteFooter extends Component {
  render() {
    return (
      <React.Fragment>
        <style jsx>{`
          p {
            @apply mt-6;
          }
        `}</style>

        <footer className="bg-vegogo-yellow text-center py-16">
          <p>
            <img src={logoImg} alt="Vegogo logo" className="m-auto w-64" />
          </p>

          <h1 className="font-headline text-center text-4xl py-16 px-1">
            The
            <br />
            new guide
            <br />
            to vegan
            <br /> eating
          </h1>

          <p className="text-3xl pb-12">
            curated for you with
            <span className="text-red-800 ml-2">❤️</span>
          </p>

          <p>
            Contact us at
            <br />
            <a href="mailto:hello@vegogo.se">hello@vegogo.se</a>
          </p>

          <p>
            Illustrations by
            <br />
            <a href="http://www.christineroesch.de/">Christine Rösch</a>
          </p>

          <p>© vegogo 2018</p>
        </footer>
      </React.Fragment>
    );
  }
}

export default SiteFooter;
