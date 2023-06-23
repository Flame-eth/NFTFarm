import React, { useEffect, useState } from "react";
import { Hero } from "../../components";
import BestSeller from "../../components/bestSeller/BestSeller";
import RingLoader from "react-spinners/RingLoader";
import "./Home.scss";

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
        <div>
          <Hero />
          <BestSeller />
        </div>
      )}
    </div>
  );
};

export default Home;
