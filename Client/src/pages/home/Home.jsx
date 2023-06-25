import React, { useEffect, useState } from "react";
import { AboutUs, Hero, Stake } from "../../components";
import { BestSeller } from "../../components";

import RingLoader from "react-spinners/RingLoader";
import "./Home.scss";
import { stake } from "../../constants/stake";

const Home = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);
  return (
    <div>
      {loading ? (
        <div className="centered-spinner">
          <RingLoader
            color={"#ffa503"}
            loading={loading}
            size={60}
            speedMultiplier={1}
          />
        </div>
      ) : (
        <div className="home">
          <Hero />
          <BestSeller />
          <AboutUs />
          <Stake stakeArray={stake} />
        </div>
      )}
    </div>
  );
};

export default Home;
