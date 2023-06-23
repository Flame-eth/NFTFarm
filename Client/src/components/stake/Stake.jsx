import React from "react";
import "./Stake.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { stake } from "../../constants/stake";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

const Stake = () => {
  return (
    <div className="stake">
      <div className="stakeContainer">
        <h1>Get Started With Staking </h1>
        <div className="stakingDesc">
          <p>
            In the automated markers(AMM) pool, anyone can add liquidity to any
            NFT transaction in order to earn interest from market making
          </p>
          <p>
            <Link to="/marketplace">Explore more</Link>
          </p>
        </div>
        <div className="stackingCards"></div>
      </div>
    </div>
  );
};

export default Stake;
