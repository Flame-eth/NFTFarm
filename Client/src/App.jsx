import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.scss";
import Home from "./pages/home/Home";
import { Account, Footer } from "./components";

function App() {
  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
