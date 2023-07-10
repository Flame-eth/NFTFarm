import React, { useEffect, useRef, useState } from "react";
import "./Pledge.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";

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

const Pledge = ({ pledgeArray, user, setCurrentUser }) => {
  let walletID = user?.walletID;
  const [showModal, setShowModal] = useState(false);
  const [pledgeID, setPledgeID] = useState();
  const [loadingState, setLoadingState] = useState(false);
  const lockContract = "0xfb26683d0565C4C7a7c0E2576fb5592597f54BCA";

  const navigate = useNavigate();

  const handleModal = () => {
    setShowModal(!showModal);
    // console.log(pledge);
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

  return (
    <div className="pledge">
      <div className="pledgeContainer">
        <h1>Get Started With Pledging </h1>
        <div className="pledgingDesc">
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
        <div className="pledgingCards">
          <Slider {...settings}>
            {pledgeArray?.map((pledge, index) => {
              const ID = index;
              //   console.log(ID);
              return (
                <>
                  <div className="box" key={index}>
                    <div className="product">
                      <div className="img">
                        <span className="discount">{pledge.percent} % </span>
                        <div className="imageCon">
                          <img src={pledge.imgUrl} alt="" />
                        </div>
                      </div>
                      <div className="product-details">
                        <h3>{pledge.title}</h3>
                        <div className="pledgeHistory">
                          <div className="record">
                            <h2>Pledge Duration</h2>
                            <h3>{pledge.days} days</h3>
                          </div>
                          <div className="record">
                            <h2>Total People</h2>
                            <h3>{pledge.people}</h3>
                          </div>
                        </div>

                        <div className="text">
                          <div className="price">
                            <div className="priceTag">
                              <h3>MINIMUM</h3>
                              <h4>
                                {pledge.min}
                                <img src={usdt} alt="" />
                              </h4>
                            </div>
                            <div className="priceTag">
                              <h3>MAXIMUM</h3>
                              <h4>
                                {pledge.max}
                                <img src={usdt} alt="" />
                              </h4>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              setPledgeID(ID);
                              if (pledgeID == index) {
                                setShowModal(!showModal);
                              } else {
                                setShowModal(true);
                              }
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
                  <img src={pledgeArray[pledgeID].imgUrl} alt="" />
                </div>
                <div className="content">
                  <h1>{pledgeArray[pledgeID].title}</h1>
                  <p>{pledgeArray[pledgeID].desc}</p>
                  <span>{pledgeArray[pledgeID].percent}% DAILY EARNING </span>
                  <div className="price">
                    <div className="priceTag">
                      <h3>Minimum pledge</h3>
                      <h4>
                        {pledgeArray[pledgeID].min}
                        <img src={usdt} alt="" />
                      </h4>
                    </div>
                    <div className="priceTag">
                      <h3>Maximum pledge</h3>
                      <h4>
                        {pledgeArray[pledgeID].max}
                        <img src={usdt} alt="" />
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="pledgeForm">
                  <form action="">
                    <div className="inputCon">
                      <div className="input">
                        <label htmlFor="">Amount:</label>
                        <input type="number" placeholder="Enter Amount" />
                      </div>
                      <div className="input">
                        <label htmlFor="">Total Return:</label>
                        <input
                          disabled
                          type="number"
                          placeholder="Total Return"
                        />
                      </div>
                    </div>
                    <button type="submit">Pledge</button>
                  </form>
                </div>
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

export default connect(mapDispatchToProps, mapStateToProps)(Pledge);
