import React, { useEffect, useState } from "react";
import "./Account.scss";
import Navbar from "../navbar/Navbar";
import { usdt } from "../../assets/images";
import { CgSandClock } from "react-icons/cg";
import { connect } from "react-redux";
import { showToast } from "../../utils/showToast";
import { useAccount, useContractRead } from "wagmi";
import axios from "axios";
import { setCurrentUser } from "../../redux/user/user.actions";
import { abi } from "../../contracts/IERC20.json";
import { ethers } from "ethers";

const Account = ({ user, setCurrentUser }) => {
  const { address, isConnecting, isDisconnected } = useAccount();
  // console.log(user.stakingRecord);

  useEffect(() => {
    if (address) {
      // const data = newRequest.post("users/create", { walletID: address });
      // console.log(data.data);
      axios
        .post("http://localhost:3000/api/users/create", { walletID: address })
        .then((res) => {
          // console.log(res.data.data);
          setCurrentUser(res.data.data);
        });
    }
  }, [address, setCurrentUser]);

  useEffect(() => {
    console.log(user);
    if (!user) {
      showToast("Wallet must be connected to view account records", "warning");
    }
    if (user?.stakingRecord.length == 0 && user?.pledgingRecord.length == 0) {
      showToast("You have no staking or pledging record", "warning");
    }
  }, []);

  const [WithdrawAmount, setWithdrawAmount] = useState("");
  let walletID = user?.walletID;

  const {
    data: readData,
    isError: isReadError,
    isLoading: isReadLoading,
  } = useContractRead({
    address: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
    abi: abi,
    functionName: "balanceOf",
    args: [walletID],
  });
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
            {user ? user.balance : "0.00"}
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
              <p>
                {readData
                  ? ethers.utils.formatEther(readData).toString().slice(0, 5)
                  : "0"}
                <img src={usdt} alt="" />
              </p>
            </div>
            {user.stakingRecord.length > 0 ? (
              <>
                <div className="section">
                  <h2>Current Yield Percentage</h2>
                  <p>
                    {
                      user.stakingRecord[user.stakingRecord.length - 1]
                        .stakingPercentage
                    }{" "}
                    %
                  </p>
                </div>
                <div className="section">
                  <h2>Daily Income</h2>
                  <p>
                    {
                      user.stakingRecord[user.stakingRecord.length - 1]
                        .dailyEarning
                    }
                    <img src={usdt} alt="" />
                  </p>
                </div>
                <div className="section">
                  <h2>Cumulative Income</h2>
                  <p>
                    {user.totalStakingIncome}
                    <img src={usdt} alt="" />
                  </p>
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
        <div className="pledgingRecord">
          <h1>NFT Pledging Income</h1>
          <div className="pledgingRecordCon">
            {user.pledgingRecord.length > 0 ? (
              <>
                <div className="section">
                  <h2>Current Pledge</h2>
                  <p>
                    {
                      user.pledgingRecord[user.pledgingRecord.length - 1]
                    }
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
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
        <div className="changeRecord"></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
