import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { AiOutlineTwitter } from "react-icons/ai";
import { CiLinkedin } from "react-icons/ci";
import { BsTelegram } from "react-icons/bs";
import { BsDiscord } from "react-icons/bs";

import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerCon">
        <div className="footerTop">
          <div className="title">
            <h1>YieldNFT</h1>
          </div>
          <div className="desc">
            Stake and earn the yield on the most liquidity decentralized NFT
            marketplace
          </div>
          <div className="links">
            <ul>
              <li>
                <Link className="navLink" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="navLink" to="/about">
                  About
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
            </ul>
          </div>
          <div className="icons">
            <h1>Newsletter</h1>
            <form action="">
              <input type="text" placeholder="Enter your email" />
              <input type="submit" value="Subscribe" className="btn" />
            </form>
            <div className="social">
              <FaFacebookF />
              <BsInstagram />
              <AiOutlineTwitter />
              <CiLinkedin />
              <BsTelegram />
              <BsDiscord />
            </div>
          </div>
        </div>
        <div className="footerBottom">
          <h1>© 2021 YieldNFT. All rights reserved.</h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
