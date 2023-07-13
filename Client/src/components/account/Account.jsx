import React, { useEffect, useRef, useState } from "react";
import "./Account.scss";
import Navbar from "../navbar/Navbar";
import { usdt } from "../../assets/images";
import { CgSandClock } from "react-icons/cg";
import { connect } from "react-redux";
import { showToast } from "../../utils/showToast";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import axios from "axios";
import { setCurrentUser } from "../../redux/user/user.actions";
import { abi } from "../../contracts/IERC20.json";
import { abi as lockAbi } from "../../contracts/YieldNftTokenLock.json";
import { ethers } from "ethers";

const Account = ({ user, setCurrentUser }) => {
  // console.log("user", user);
  const { address, isConnecting, isDisconnected } = useAccount();

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  // console.log(user.stakingRecord);

  // useEffect(() => {
  //   if (address) {
  //     // const data = newRequest.post("users/create", { walletID: address });
  //     // console.log(data.data);
  //     axios
  //       .post("http://localhost:3000/api/users/create", { walletID: address })
  //       .then((res) => {
  //         // console.log(res.data.data);
  //         setCurrentUser(res.data.data);
  //       });
  //   }
  // }, [address, setCurrentUser]);

  useEffect(() => {
    console.log(user);
    if (user === null) {
      // console.log(user);
      // showToast("Wallet must be connected to view account records", "warning");
    }
    if (user?.stakingRecord.length == 0 && user?.pledgingRecord.length == 0) {
      showToast("You have no staking or pledging record", "warning");
    }
  }, []);

  setTimeout(() => {
    // console.log(user);
  }, 5000);
  let walletID = user?.walletID;
  const [WithdrawAmount, setWithdrawAmount] = useState("");
  const [chainAmount, setChainAmount] = useState(0);
  // console.log(chainAmount);
  const {
    data: writeData,
    isLoading: isWriteLoading,
    isSuccess: isWriteSuccess,
    write,
  } = useContractWrite({
    address: "0xfb26683d0565C4C7a7c0E2576fb5592597f54BCA",
    abi: lockAbi,
    functionName: "withdrawLock",
    args: [walletID, chainAmount, "withdrawal"],
    onSettled(data, error) {
      // console.log("Settled", { data, error });

      if (data) {
        console.log(data);
        axios
          .patch(`http://localhost:3000/api/users/update/${walletID}`, {
            balance: user.balance - WithdrawAmount,
            hasStaked: false,
            hasPledged: false,
          })
          .then((res) => {
            // console.log(res.data.data);
            setCurrentUser(res.data.data);
          });
        showToast("Withdraw successful", "success");
      } else {
        console.error(error);
        showToast(
          "Withdraw failed, ensure you have sufficient balance!",
          "error"
        );
      }
    },
  });

  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (WithdrawAmount === "") {
      showToast("Please enter an amount", "warning");
    } else if (WithdrawAmount > user.balance) {
      showToast("Insufficient balance", "warning");
    } else {
      write();
    }
  };

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

  useEffect(() => {}, [user]);
  const updateTimer = (remainingTime) => {
    const calculatedHours = String(
      Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    ).padStart(2, "0");
    const calculatedMinutes = String(
      Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))
    ).padStart(2, "0");
    const calculatedSeconds = String(
      Math.floor((remainingTime % (1000 * 60)) / 1000)
    ).padStart(2, "0");

    if (calculatedSeconds === "00") {
      // Reload the page to fetch the updated timer
      // window.location.reload();
      axios
        .post("http://localhost:3000/api/users/create", { walletID: address })
        .then((res) => {
          // console.log(res.data.data);
          setCurrentUser(res.data.data);
        });
    }

    setHours(calculatedHours);

    setMinutes(calculatedMinutes);
    setSeconds(calculatedSeconds);
  };

  // const countdownTimer = (nextProfitTime) => {
  //   const profitTime = new Date(nextProfitTime.current).getTime();
  //   // Get the current time
  //   const currentTime = new Date().getTime();
  //   // console.log(currentTime, profitTime);

  //   // Calculate the time remaining until nextProfitTime
  //   const timeRemaining = profitTime - currentTime;
  //   // console.log(timeRemaining);

  //   // Update the timer every second
  //   updateTimer(timeRemaining);

  //   // Display the remaining time
  //   // console.log(`Next profit in: ${hours}h ${minutes}m ${seconds}s`);

  //   // Update the countdown every second
  //   if (timeRemaining > 0) {
  //     setTimeout(() => {
  //       countdownTimer(nextProfitTime);
  //     }, 1000);
  //   } else {
  //     // console.log("Next profit time reached!");
  //     // Perform any desired action when the next profit time is reached
  //   }
  // };

  useEffect(() => {
    let ProfitTime;
    if (user?.hasStaked) {
      ProfitTime =
        user.stakingRecord[user.stakingRecord.length - 1].nextProfitTime;
    }

    if (user?.hasPledged) {
      ProfitTime =
        user.pledgingRecord[user.pledgingRecord.length - 1].nextProfitTime;
    }
    // Calculate the remaining time and update the timer
    const calculateRemainingTime = () => {
      const nextProfitTime = new Date(ProfitTime).getTime();
      const currentTime = new Date().getTime();
      const remainingTime = nextProfitTime - currentTime;

      if (remainingTime <= 0) {
        // Stop the timer and reload the page
        clearInterval(interval);
        axios
          .post("http://localhost:3000/api/users/create", { walletID: address })
          .then((res) => {
            // console.log(res.data.data);
            setCurrentUser(res.data.data);
          });

        return;
      }

      updateTimer(remainingTime);
    };

    // Calculate the remaining time immediately
    calculateRemainingTime();

    // Update the remaining time every second
    const interval = setInterval(() => {
      calculateRemainingTime();
    }, 1000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, [user]);

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
            {user?.hasStaked || user?.hasPledged
              ? `${hours}:${minutes}:${seconds}`
              : "00:00:00"}
          </p>
          <form action="">
            <input
              type="number"
              value={WithdrawAmount}
              placeholder="0.00"
              onChange={(e) => {
                setWithdrawAmount(e.target.value);
                setChainAmount(ethers.utils.parseEther(e.target.value));
              }}
            />

            <button onClick={(e) => handleWithdraw(e)} type="submit">
              Withdraw
            </button>
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
            {user?.stakingRecord.length > 0 ? (
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
            {user?.pledgingRecord.length > 0 ? (
              <>
                <div className="section">
                  <h2>Current Pledge</h2>
                  <p>
                    {
                      user.pledgingRecord[user.pledgingRecord.length - 1]
                        .pledgeAmount
                    }
                    <img src={usdt} alt="" />
                  </p>
                </div>
                <div className="section">
                  <h2>Current Income</h2>
                  <p>
                    {
                      user.pledgingRecord[user.pledgingRecord.length - 1]
                        .amountEarned
                    }
                    <img src={usdt} alt="" />
                  </p>
                </div>
                <div className="section">
                  <h2>Cumulative Pledge</h2>
                  <p>
                    {user.totalPledge}
                    <img src={usdt} alt="" />
                  </p>
                </div>
                <div className="section">
                  <h2>Cumulative Pledge Income</h2>
                  <p>
                    {user.totalPledgeIncome}
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
