import React, { useEffect, useRef, useState } from "react";
import "./Stake.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import { stake } from "../../constants/stake";
import { AiOutlineClose } from "react-icons/ai";
import { spinner, usdt } from "../../assets/images";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { showToast } from "../../utils/showToast.js";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions.js";
import { abi } from "../../contracts/IERC20.json";

import { ethers } from "ethers";

import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import axios from "axios";

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="next">
        <i className="fa fa-long-arrow-alt-right"></i>
      </button>
    </div>
  );
};
const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="prev">
        <i className="fa fa-long-arrow-alt-left"></i>
      </button>
    </div>
  );
};

const Stake = ({ stakeArray, user, setCurrentUser }) => {
  let walletID = user?.walletID;
  const [showModal, setShowModal] = useState(false);
  const [stakeID, setStakeID] = useState();
  const [loadingState, setLoadingState] = useState(false);
  const lockContract = "0xfb26683d0565C4C7a7c0E2576fb5592597f54BCA";

  const navigate = useNavigate();

  const handleModal = () => {
    setShowModal(!showModal);
    // console.log(stake);
  };
  let noOfSlides = useRef();

  const userWidth = window.innerWidth;
  //   console.log(userWidth);

  if (userWidth >= 1200) {
    noOfSlides.current = 4;
  } else if (userWidth >= 992) {
    noOfSlides.current = 3;
  } else if (userWidth >= 650) {
    noOfSlides.current = 2;
  } else if (userWidth >= 500) {
    noOfSlides.current = 2;
  } else if (userWidth >= 320) {
    noOfSlides.current = 1;
  }

  //   console.log(noOfSlides.current);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: noOfSlides.current,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const [amount, setAmount] = useState();
  const [chainAmount, setChainAmount] = useState();
  const [dailyReturn, setDailyReturn] = useState();

  const handleAmount = (e, percentage) => {
    setAmount(e.target.value);

    setChainAmount(ethers.utils.parseEther(e.target.value.toString()));
    // console.log(chainAmount);

    setDailyReturn(e.target.value * (percentage / 100));
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

  const {
    data: writeData,
    isLoading: isWriteLoading,
    isSuccess: isWriteSuccess,
    write,
  } = useContractWrite({
    address: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
    abi: abi,
    functionName: "transfer",
    args: [lockContract, chainAmount],
    onSettled(data, error) {
      // console.log("Settled", { data, error });

      if (data) {
        const nextProfitTime = new Date();
        nextProfitTime.setHours(nextProfitTime.getHours() + 1);
        axios
          .post(`http://localhost:3000/api/users/staking/new/${walletID}`, {
            walletID: walletID,
            stakingID: stakeID,
            stakingAmount: amount,
            stakingPercentage: stake[stakeID].percent,
            hourlyEarning: dailyReturn / 24,
            dailyEarning: dailyReturn,
            stakingStatus: true,
            nextProfitTime: nextProfitTime,
          })
          .then((res) => {
            axios
              .patch(`http://localhost:3000/api/users/update/${walletID}`, {
                hasStaked: true,
              })
              .then((res) => {
                setCurrentUser(res.data.data);
              });
          });

        setLoadingState(false);
        setShowModal(false);
        showToast("Staked Successfully. Redirecting...", "success");
        setTimeout(() => {
          navigate("/account");
        }, 2500);
      } else {
        setLoadingState(false);
        showToast("Transaction execution failed", "error");
      }
    },
  });

  const handleSubmit = async (e, min, max) => {
    e.preventDefault();
    if (amount < min) {
      // alert("Enter amount greater than minimum");
      showToast("Enter amount greater than minimum", "error");
    } else if (amount > max) {
      // alert("Enter amount less than maximum");
      showToast("Enter amount less than maximum", "error");
    } else {
      if (!user) {
        showToast("Please connect your wallet", "error");
      } else {
        if (user.hasStaked) {
          showToast("You have already staked", "error");
        } else if (user.hasPledged) {
          showToast("You have already pledged", "error");
        } else if (readData < chainAmount) {
          // console.log(chainAmount - readData)
          showToast("You don't have sufficient balance", "error");
        } else {
          setLoadingState(true);
          write();

          // try {
          //   write();
          //   setLoadingState(true);

          //   if (isWriteLoading) {
          //     setLoadingState(true);
          //   } else {
          //     setLoadingState(false);
          //     showToast("Something went wrong", "error");
          //   }

          //   if (isWriteSuccess) {
          //     setLoadingState(false);
          //     setShowModal(false);
          //     showToast("Staked Successfully", "success");
          //   } else {
          //     setLoadingState(false);
          //     setShowModal(false);
          //     showToast("Transaction failed", "error");
          //   }
          // } catch (error) {
          //   setLoadingState(false);
          //   setShowModal(false);
          //   showToast("An error occurred", "error");
          // }
        }
      }
    }
  };

  useEffect(() => {
    if (!showModal) {
      setAmount(0);
      setDailyReturn(0);
    }
  }, [showModal]);
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
            <Link className="Link" to="/marketplace">
              Explore more
            </Link>
          </p>
        </div>
        <div className="stakingCards">
          <Slider {...settings}>
            {stakeArray?.map((stake, index) => {
              const ID = index;
              //   console.log(ID);
              return (
                <>
                  <div className="box" key={index}>
                    <div className="product">
                      <div className="img">
                        <span className="discount">{stake.percent} % </span>
                        <div className="imageCon">
                          <img src={stake.imgUrl} alt="" />
                        </div>
                      </div>
                      <div className="product-details">
                        <h3>{stake.title}</h3>

                        <div className="text">
                          <div className="price">
                            <div className="priceTag">
                              <h3>MINIMUM</h3>
                              <h4>
                                {stake.min}
                                <img src={usdt} alt="" />
                              </h4>
                            </div>
                            <div className="priceTag">
                              <h3>MAXIMUM</h3>
                              <h4>
                                {stake.max}
                                <img src={usdt} alt="" />
                              </h4>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              setStakeID(ID);
                              if (stakeID == index) {
                                setShowModal(!showModal);
                              }
                              // else {
                              //   setShowModal(true);
                              // }
                            }}>
                            <i className="fa fa-plus"></i>
                            <span>Start Using</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </Slider>
          {showModal ? (
            <div className="modal">
              <div className="modalContainer">
                <div className="close" onClick={handleModal}>
                  <AiOutlineClose />
                </div>
                <div className="imageCon">
                  <img src={stakeArray[stakeID].imgUrl} alt="" />
                </div>
                <div className="content">
                  <h1>{stakeArray[stakeID].title}</h1>
                  <p>{stakeArray[stakeID].desc}</p>
                  <span>{stake[stakeID].percent}% DAILY EARNING </span>
                  <div className="price">
                    <div className="priceTag">
                      <h3>Minimum Stake</h3>
                      <h4>
                        {stakeArray[stakeID].min}
                        <img src={usdt} alt="" />
                      </h4>
                    </div>
                    <div className="priceTag">
                      <h3>Maximum Stake</h3>
                      <h4>
                        {stakeArray[stakeID].max}
                        <img src={usdt} alt="" />
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="stakeForm">
                  <form action="">
                    <div className="inputCon">
                      <div className="input">
                        <label htmlFor="">Amount:</label>
                        <input
                          type="number"
                          placeholder="Enter Amount"
                          onChange={(e) =>
                            handleAmount(e, stake[stakeID].percent)
                          }
                        />
                      </div>
                      <div className="input">
                        <label htmlFor="">Daily Return:</label>
                        <input
                          disabled
                          value={dailyReturn}
                          type="number"
                          placeholder="Daily Return"
                        />
                      </div>
                    </div>
                    <button
                      onClick={(e) =>
                        handleSubmit(e, stake[stakeID].min, stake[stakeID].max)
                      }
                      type="submit">
                      Stake
                    </button>
                  </form>
                </div>
                {loadingState ? (
                  <div className="loader">
                    <img src={spinner} alt="" />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Stake);
