import React, { useState } from "react";
import "./Account.scss";
import Navbar from "../navbar/Navbar";
import { usdt } from "../../assets/images";
import { CgSandClock } from "react-icons/cg";

const Account = () => {
  const [WithdrawAmount, setWithdrawAmount] = useState("");
  return (
    <div className="account">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="accountCon">
        <div className="header">
          <h1>Account</h1>
        </div>
        <div className="balance">
          <h1>
            0.00
            <span>
              <img src={usdt} alt="" />
            </span>
          </h1>
          <h1>ACCOUNT BALANCE</h1>
          <p>
            <CgSandClock size={24} />
            <span>NEXT INCOME IN</span>
            00:00:00
          </p>
          <form action="">
            <input
              type="number"
              value={WithdrawAmount}
              placeholder="0.00"
              onChange={(e) => setWithdrawAmount(e.target.value)}
            />

            <button type="submit">Withdraw</button>
          </form>
        </div>
        <div className="stakingRecord">
          <h1>NFT Staking Income</h1>
          <div className="stakingRecordCon">
            <div className="section">
              <h2>On-chain Balance</h2>
              <p>0.00</p>
            </div>
            <div className="section">
              <h2>Current Yield Percentage</h2>
              <p>0%</p>
            </div>
            <div className="section">
              <h2>Today&apos;s Income</h2>
              <p>
                0
                <img src={usdt} alt="" />
              </p>
            </div>
            <div className="section">
              <h2>Cumulative Income</h2>
              <p>
                0
                <img src={usdt} alt="" />
              </p>
            </div>
          </div>
        </div>
        <div className="pledgingRecord">
          <h1>NFT Pledging Income</h1>
          <div className="pledgingRecordCon">
            <div className="section">
              <h2>Current Pledge</h2>
              <p>
                0
                <img src={usdt} alt="" />
              </p>
            </div>
            <div className="section">
              <h2>Current Income</h2>
              <p>
                0
                <img src={usdt} alt="" />
              </p>
            </div>
            <div className="section">
              <h2>Cumulative Pledge</h2>
              <p>
                0
                <img src={usdt} alt="" />
              </p>
            </div>
            <div className="section">
              <h2>Cumulative Income</h2>
              <p>
                0
                <img src={usdt} alt="" />
              </p>
            </div>
          </div>
        </div>
        <div className="changeRecord"></div>
      </div>
    </div>
  );
};

export default Account;
