import React, { useEffect, useRef, useState } from "react";
import "./Stake.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { stake } from "../../constants/stake";
import { AiOutlineClose } from "react-icons/ai";
import { usdt } from "../../assets/images";

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

const Stake = ({ stakeArray }) => {
  const [showModal, setShowModal] = useState(false);
  const [stakeID, setStakeID] = useState();

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
  const [dailyReturn, setDailyReturn] = useState();

  const handleAmount = (e, percentage) => {
    setAmount(e.target.value);
    setDailyReturn((e.target.value * percentage) / 100);
  };

  const handleSubmit = (e, min, max) => {
    e.preventDefault();
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
                    <button onClick={(e) => handleSubmit} type="submit">
                      Stake
                    </button>
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

export default Stake;
