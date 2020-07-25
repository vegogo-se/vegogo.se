import React from "react";
import closeImg from "../images/icon-close.svg";
import { Link } from "gatsby";

let stockholmSubAreas = [
  // {
  //   name: "City",
  //   to: "/sweden/stockholm/city",
  // },

  // {
  //   name: "Kungsholmen",
  //   to: "/sweden/stockholm/kungsholmen",
  // },

  {
    name: "Old Town",
    to: "/sweden/stockholm/gamla-stan",
  },

  {
    name: "Södermalm",
    to: "/sweden/stockholm/sodermalm",
  },

  {
    name: "SOFO",
    to: "/sweden/stockholm/sofo",
  },

  // {
  //   name: "Vasastan",
  //   to: "/sweden/stockholm/vasastan",
  // },

  // {
  //   name: "Östermalm",
  //   to: "/sweden/stockholm/ostermalm ",
  // },
];

// Opened navigation.
export function Navigation(props) {
  const { navIsOpen } = props;

  const navClass = navIsOpen ? "block" : "hidden";

  return (
    <nav
      className={`SiteNav bg-vegogo-green fixed overflow-auto inset-0 z-40 p-6 ${navClass}`}
    >
      <button
        onClick={props.handleNavClose}
        className="SiteHeader-navToggler SiteHeader-navToggler--close"
      >
        <img
          className="SiteHeader-navToggler-img SiteHeader-navToggler-img--close"
          src={closeImg}
          alt="✕"
        />
        <span className="sr-only">Close Menu</span>
      </button>

      <ul className="SiteNav-navItems SiteNav-navItems--places">
        <li>
          <Link className="text-4xl" onClick={props.handleNavClose} to="/">
            A to Ö
          </Link>
        </li>
        <li>
          <Link
            className="text-4xl"
            onClick={props.handleNavClose}
            to="/nearby"
          >
            Near me
          </Link>
        </li>
        <li className="">
          <Link
            onClick={props.handleNavClose}
            to="/sweden/stockholm"
            className="text-4xl"
          >
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
        <li className="pt-10">
          <Link
            className="text-4xl"
            onClick={props.handleNavClose}
            to="/page/about"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            className="text-4xl"
            onClick={props.handleNavClose}
            to="/page/contact"
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            className="text-4xl"
            onClick={props.handleNavClose}
            to="/page/partner"
          >
            Partner
          </Link>
        </li>
        <li>
          <Link
            className="text-4xl"
            onClick={props.handleNavClose}
            to="/page/newsletter"
          >
            Newsletter
          </Link>
        </li>

        <li>
          <Link className="text-4xl" onClick={props.handleNavClose} to="/">
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
}
