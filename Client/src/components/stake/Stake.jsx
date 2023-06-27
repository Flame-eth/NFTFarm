import React, { useEffect, useRef, useState } from "react";
import "./Stake.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { stake } from "../../constants/stake";

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
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: noOfSlides.current,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

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
                              <h4>{stake.min} USDT</h4>
                            </div>
                            <div className="priceTag">
                              <h3>MAXIMUM</h3>
                              <h4>{stake.max} USDT</h4>
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
                <div className="imageCon">
                  <img src={stake[stakeID].imgUrl} alt="" />
                </div>
                <div className="content">
                  <h1>{stake[stakeID].title}</h1>
                  <p>{stake[stakeID].desc}</p>
                  <span>{stake[stakeID].percent} % </span>
                  <div className="price">
                    <div className="priceTag">
                      <h3>MINIMUM</h3>
                      <h4>{stake[stakeID].min} USDT</h4>
                    </div>
                    <div className="priceTag">
                      <h3>MAXIMUM</h3>
                      <h4>{stake[stakeID].max} USDT</h4>
                    </div>
                  </div>
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
