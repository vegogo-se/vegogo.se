import React, { useState } from "react";
import { Link } from "gatsby";
import { Navigation } from "./Navigation";
import iconNav from "../images/icon-nav.svg";
import iconSearch from "../images/icon-search.svg";
import iconLocation from "../images/icon-location.svg";
import logoVegogoSthlm from "../images/logo-vegogo-sthlm.svg";

const iconHeight = "h-6";
const iconHeightSecondary = "h-7";

const SiteHeader = (props) => {
  const [navIsOpen, setNavIsOpen] = useState(false);

  const handleNavClose = () => {
    setNavIsOpen(false);
  };

  return (
    <React.Fragment>
      <header className="sticky top-0 bg-white z-30 SiteHeader">
        <style jsx>{`
          .SiteHeader {
            background: rgba(255, 255, 255, 0.9);
          }
          .SiteHeader__iconBox {
            width: 3.25rem;
          }
        `}</style>

        <div className="flex items-start px-6 py-4">
          <button
            onClick={() => {
              setNavIsOpen(!navIsOpen);
            }}
            className="absolute top-0 left-0 p-6"
          >
            <img src={iconNav} alt="" className={`${iconHeight}`} />
            <span className="sr-only">Show Menu</span>
          </button>

          <Link to="/" className="mx-auto h-14 ">
            <img src={logoVegogoSthlm} alt="" className="logo" />
          </Link>

          <div className="absolute top-0 right-0 pr-4">
            <Link to="/search" className="inline-block px-2 py-6">
              <img
                src={iconSearch}
                alt=""
                className={`${iconHeightSecondary}`}
              />
              <span className="sr-only">Search places</span>
            </Link>

            <Link to="/nearby" className="inline-block px-2 py-6">
              <img
                src={iconLocation}
                alt=""
                className={`${iconHeightSecondary}`}
              />
              <span className="sr-only">View places nearby</span>
            </Link>
          </div>
        </div>
      </header>
      <Navigation navIsOpen={navIsOpen} handleNavClose={handleNavClose} />
    </React.Fragment>
  );
};

// class SiteHeader extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       navOpen: false
//     };

//     this.handleNavToggleClick = this.handleNavToggleClick.bind(this);
//   }

//   handleNavToggleClick(e) {
//     this.setState({ navOpen: !this.state.navOpen });
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <header className="SiteHeader">
//           <h1 className="SiteHeader-title">
//             <Link to="/" className="SiteHeader-titleLink">
//               <img src={logoImg} alt="Vegogo" className="SiteHeader-logo" />
//             </Link>
//           </h1>

//           {/* <p className="SiteHeader-tagline">The new guide* to vegan eating *curated for you with &lt;3</p> */}

//           <div>
//             <Link
//               className="SiteHeader-nearMeLink"
//               to="/nearby"
//               title="Show great vegan places near you"
//             >
//               <img src={locationImg} alt="Location icon" />
//             </Link>

//             <button
//               onClick={this.handleNavToggleClick}
//               className="SiteHeader-navToggler"
//             >
//               {!this.state.navOpen && "Menu"}
//             </button>
//           </div>
//         </header>

//         {this.state.navOpen && (
//           <Navigation handleNavClose={this.handleNavToggleClick} />
//         )}
//       </React.Fragment>
//     );
//   }
// }

export default SiteHeader;
