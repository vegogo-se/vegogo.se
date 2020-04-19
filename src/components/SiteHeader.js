import React, { useState } from "react";
import { Link } from "gatsby";
import iconNav from "../images/icon-nav.svg";
import iconSearch from "../images/icon-search.svg";
import iconLocation from "../images/icon-location.svg";
import logoVegogoSthlm from "../images/logo-vegogo-sthlm.svg";

const iconHeight = "h-6";

const SiteHeader = (props) => {
  return (
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
        <div className="flex-none SiteHeader__iconBox">
          <button>
            <img src={iconNav} alt="" className={`${iconHeight}`} />
            <span className="sr-only">Menu</span>
          </button>
        </div>
        <div className="flex-auto flex">
          <Link to="/" className="mx-auto h-14 ">
            <img src={logoVegogoSthlm} alt="" className="logo" />
          </Link>
        </div>
        <div className="flex-none SiteHeader__iconBox flex items-end content-end justify-between w-10">
          <div>
            <Link to="/search">
              <img src={iconSearch} alt="" className={`${iconHeight}`} />
              <span className="sr-only">Search places</span>
            </Link>
          </div>
          <div>
            <Link to="/nearby">
              <img src={iconLocation} alt="" className={`${iconHeight}`} />
              <span className="sr-only">View places nearby</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
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
