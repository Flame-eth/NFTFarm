import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.scss";
import Home from "./pages/home/Home";
import { Account, Footer } from "./components";
import AccountPage from "./pages/accountPage/AccountPage";
import ReferralPage from "./pages/referralPage/ReferralPage";

function App() {
  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/referral" element={<ReferralPage />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
