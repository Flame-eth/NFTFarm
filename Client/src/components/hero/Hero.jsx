import React from "react";
import { Navbar } from "..";
import "./Hero.scss";

const Hero = () => {
  return (
    <div className="hero">
      <div className="heroContainer">
        <div className="heroBg">
          <div className="heroNavbar">
            <Navbar />
          </div>
          <div className="heroContent">
            <div className="heroTitle">
              <span> Stake and earn</span> the yield on the most liquidity
              decentralized NFT marketplace
            </div>
            <div className="heroButton">
              <h1>Explore</h1>
            </div>
            <div className="heroButton">
              <h1>White Paper</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
