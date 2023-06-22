import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.scss";
import Home from "./pages/home/Home";

function App() {
  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
