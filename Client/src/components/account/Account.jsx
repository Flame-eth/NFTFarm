import React from "react";
import "./Account.scss";
import Navbar from "../navbar/Navbar";

const Account = () => {
  return (
    <div className="account">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="accountCon">
        <div className="header">
          <h1>Account</h1>
        </div>
        <div className="balance"></div>
        <div className="stakingRecord"></div>
        <div className="pledgingRecord"></div>
        <div className="changeRecord"></div>
      </div>
    </div>
  );
};

export default Account;
