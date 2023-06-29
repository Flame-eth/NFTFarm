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
              placeholder="0.00000000"
              onChange={(e) => setWithdrawAmount(e.target.value)}
            />

            <button type="submit">Withdraw</button>
          </form>
        </div>
        <div className="stakingRecord"></div>
        <div className="pledgingRecord"></div>
        <div className="changeRecord"></div>
      </div>
    </div>
  );
};

export default Account;
