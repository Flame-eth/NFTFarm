import { Link } from "react-router-dom";
import "./Navbar.scss";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  return (
    <div className="Container">
      <div className="navbar">
        <div className="navContainer">
          <div className="navIcon">
            <img src="" alt="" />
            <h1>
              <Link className="navLink" to="/">
                YieldNFT
              </Link>
            </h1>
          </div>
          <div className="navLinks">
            <ul>
              <li>
                <Link className="navLink" to="/">
                  Home
                </Link>
              </li>
              {/* <li>
              <Link className="navLink" to="/marketplace">
                Marketplace
              </Link>
            </li> */}
              <li>
                <Link className="navLink" to="/account">
                  Account
                </Link>
              </li>
              <li>
                <Link className="navLink" to="/referral">
                  Referral
                </Link>
              </li>
              {/* <li>
              <Link className="navLink" to="/faq">
                FAQ
              </Link>
            </li> */}
            </ul>
          </div>
          <div className="sidebar">
            <div className="sidebarIcon">
              {sidebar ? (
                <IoClose onClick={() => setSidebar(!sidebar)} />
              ) : (
                <GiHamburgerMenu onClick={() => setSidebar(!sidebar)} />
              )}
            </div>
          </div>
        </div>
      </div>
      {sidebar ? (
        <div className="sideLinks">
          <ul>
            <li>
              <Link className="sideLink" to="/">
                Home
              </Link>
            </li>
            {/* <li>
              <Link className="navLink" to="/marketplace">
                Marketplace
              </Link>
            </li> */}
            <li>
              <Link className="sideLink" to="/account">
                Account
              </Link>
            </li>
            <li>
              <Link className="sideLink" to="/referral">
                Referral
              </Link>
            </li>
            {/* <li>
              <Link className="navLink" to="/faq">
              FAQ
              </Link>
            </li> */}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
