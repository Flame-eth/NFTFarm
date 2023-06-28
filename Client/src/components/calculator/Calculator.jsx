import React, { useState } from "react";
import "./Calculator.scss";

const YieldCalculator = () => {
  const [amountInvested, setAmountInvested] = useState("");
  const [duration, setDuration] = useState("");
  const [yieldPercentage, setYieldPercentage] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const yieldAmount = (amountInvested * duration * yieldPercentage) / 100;
    setResult(yieldAmount.toFixed(2));
  };

  return (
    <div className="yield-calculator">
      <form onSubmit={handleSubmit}>
        <label>
          Amount Invested:
          <input
            type="number"
            value={amountInvested}
            onChange={(e) => setAmountInvested(e.target.value)}
          />
        </label>
        <br />
        <label>
          Duration (in years):
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </label>
        <br />
        <label>
          Yield Percentage:
          <input
            type="number"
            value={yieldPercentage}
            onChange={(e) => setYieldPercentage(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Calculate</button>
      </form>
      <br />
      <label>
        Result:
        <input type="text" value={result} readOnly />
      </label>
    </div>
  );
};

export default YieldCalculator;
