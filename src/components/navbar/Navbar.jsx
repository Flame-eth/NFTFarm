import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <div className="navIcon">
          <img src="" alt="" />
          <h1>YeildNFT</h1>
        </div>
        <div className="navLinks">
          <ul>
            <li>
              <Link className="navLink" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="navLink" to="/marketplace">
                Marketplace
              </Link>
            </li>
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
            <li>
              <Link className="navLink" to="/faq">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
