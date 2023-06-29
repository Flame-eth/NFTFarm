import React from "react";
import Navbar from "../navbar/Navbar";
import "./Referral.scss";
import { BsPeopleFill, BsQrCode } from "react-icons/bs";
import { usdt } from "../../assets/images";

const Referral = () => {
  return (
    <div className="referral">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="referralCon">
        <div className="header">
          <h1>Referral</h1>
        </div>
        <div className="code">
          {/* <img src="" alt="" /> */}
          <BsQrCode size={150} className="qrcode" />
          <div className="url">
            https://www.nftsmetapool.com/0xdb339be8e04db248...
          </div>
          <div className="copy">Copy</div>
          <div className="desc">
            Invite your friends & family and get profit from referral bonus Each
            member receive a unique referral link to share with friends and
            family and earn bonuses for their pledge output 30.0%, 20.0%, 10.0%
          </div>
        </div>
        <div className="teamSec">
          <h1 style={{borderRight: "1px solid #fff"}} >Team Size</h1>
          <h1>Team Earning</h1>
        </div>
        <div className="population">
          <h1>1st Population</h1>
          <div className="populationCon">
            <div className="income">
              <h2>Income</h2>
              <p>
                0.00
                <img src={usdt} alt="" />
              </p>
            </div>
            <div className="people">
              <h2>People</h2>
              <p>
                0
                <BsPeopleFill size={30} />
              </p>
            </div>
          </div>
        </div>

        <div className="population">
          <h1>2nd Population</h1>
          <div className="populationCon">
            <div className="income">
              <h2>Income</h2>
              <p>
                0.00
                <img src={usdt} alt="" />
              </p>
            </div>
            <div className="people">
              <h2>People</h2>
              <p>
                0
                <BsPeopleFill size={30} />
              </p>
            </div>
          </div>
        </div>

        <div className="population">
          <h1>3rd Population</h1>
          <div className="populationCon">
            <div className="income">
              <h2>Income</h2>
              <p>
                0.00
                <img src={usdt} alt="" />
              </p>
            </div>
            <div className="people">
              <h2>People</h2>
              <p>
                0
                <BsPeopleFill size={30} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referral;
