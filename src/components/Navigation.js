import React from "react";
import closeImg from "../images/icon-close.svg";
import { Link } from "gatsby";

let stockholmSubAreas = [
  {
    name: "City",
    to: "/stockholm/city",
  },

  {
    name: "Kungsholmen",
    to: "/stockholm/kungsholmen",
  },

  {
    name: "Old Town",
    to: "/stockholm/gamla-stan",
  },

  {
    name: "Södermalm",
    to: "/stockholm/sodermalm",
  },

  {
    name: "Vasastan",
    to: "/stockholm/vasastan",
  },

  {
    name: "Östermalm",
    to: "/stockholm/ostermalm ",
  },
];

// Opened navigation.
export function Navigation(props) {
  return (
    <nav className="SiteNav bg-vegogo-green absolute inset-0 z-40 hidden">
      <button
        onClick={props.handleNavClose}
        className="SiteHeader-navToggler SiteHeader-navToggler--close"
      >
        <img
          className="SiteHeader-navToggler-img SiteHeader-navToggler-img--close"
          src={closeImg}
          alt="✕"
        />
      </button>

      <ul className="SiteNav-navItems SiteNav-navItems--places">
        <li>
          <Link onClick={props.handleNavClose} to="/">
            A to Ö
          </Link>
        </li>
        <li>
          <Link onClick={props.handleNavClose} to="/nearby">
            Near me
          </Link>
        </li>
        <li>
          <Link onClick={props.handleNavClose} to="/stockholm">
            Stockholm
          </Link>
          <ul className="SiteNav-navItems-subPlaces">
            {stockholmSubAreas.map((subArea) => {
              return (
                <li key={subArea.to}>
                  <Link onClick={props.handleNavClose} to={subArea.to}>
                    {subArea.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>
      </ul>

      <ul className="SiteNav-navItems SiteNav-navItems--site">
        <li>
          <Link exact onClick={props.handleNavClose} to="/page/about">
            About
          </Link>
        </li>
        <li>
          <Link exact onClick={props.handleNavClose} to="/page/contact">
            Contact
          </Link>
        </li>
        <li>
          <Link exact onClick={props.handleNavClose} to="/page/partner">
            Partner
          </Link>
        </li>
        <li>
          <Link exact onClick={props.handleNavClose} to="/page/newsletter">
            Newsletter
          </Link>
        </li>

        <li>
          <Link exact onClick={props.handleNavClose} to="/">
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
}
