import { useState } from "react";

import "./App.scss";
import Home from "./pages/home/Home";
import { Account, Footer } from "./components";
import AccountPage from "./pages/accountPage/AccountPage";
import ReferralPage from "./pages/referralPage/ReferralPage";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

function App() {
  window.scrollTo(0, 0);

  const Layout = () => {
    return (
      <div className="app">
        <Outlet />
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/account",
          element: <AccountPage />,
        },
        {
          path: "/referral",
          element: <ReferralPage />,
        },
        {
          path: "/:referral_id",
          element: <Home />,
        },
        {
          path: "/home",
          element: <Home />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
