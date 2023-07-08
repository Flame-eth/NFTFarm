import { Link } from "react-router-dom";
import "./Navbar.scss";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { logo } from "../../assets/images";
import { ConnectWallet } from "@thirdweb-dev/react";
import { Web3Button } from "@web3modal/react";
import { useAccount } from "wagmi";
import newRequest from "../../utils/newRequest";
import axios from "axios";

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);

  // const account = useAccount({
  //   onConnect({ address, connector, isReconnected }) {
  //     console.log("Connected", { address, connector, isReconnected });
  //     const data = newRequest.post("/users/create", { address });
  //     console.log(data);
  //   },
  // });

  const { address, isConnecting, isDisconnected } = useAccount();

  useEffect(() => {
    if (address) {
      // const data = newRequest.post("users/create", { walletID: address });
      // console.log(data.data);
      axios
        .post("http://localhost:3000/api/users/create", { walletID: address })
        .then((res) => {
          console.log(res.data.data);
        });
    }
  }, [address]);

  return (
    <div className="Container">
      <div className="navbar">
        <div className="navContainer">
          <Link className="navIcon">
            <img src={logo} alt="" />
            <h1>
              <div className="navLink" to="/">
                YieldNFT
              </div>
            </h1>
          </Link>
          {/* <ConnectWallet /> */}
          <div className="navLinks">
            <ul>
              <Web3Button icon="hide" label="Connect Wallet" balance="show" />
              <li>
                <Link className="navLink" to="/">
                  Home
                </Link>
              </li>
              {/* <li>
              <Link className="navLink" to="/marketplace">
                Marketplace
              </Link>
            </li> */}
              <li>
                <Link className="navLink" to="/account">
                  Account
                </Link>
              </li>
              <li>
                <Link className="navLink" to="/referral">
                  Referral
                </Link>
              </li>
              {/* <li>
              <Link className="navLink" to="/faq">
                FAQ
              </Link>
            </li> */}
            </ul>
          </div>
          <div className="sidebar">
            <div className="sidebarIcon">
              {sidebar ? (
                <IoClose onClick={() => setSidebar(!sidebar)} />
              ) : (
                <GiHamburgerMenu onClick={() => setSidebar(!sidebar)} />
              )}
            </div>
          </div>
        </div>
      </div>
      {sidebar ? (
        <div className="sideLinks">
          <ul>
            <Web3Button icon="hide" label="Connect Wallet" balance="show" />
            <li>
              <Link className="sideLink" to="/">
                Home
              </Link>
            </li>
            {/* <li>
              <Link className="navLink" to="/marketplace">
                Marketplace
              </Link>
            </li> */}
            <li>
              <Link className="sideLink" to="/account">
                Account
              </Link>
            </li>
            <li>
              <Link className="sideLink" to="/referral">
                Referral
              </Link>
            </li>
            {/* <li>
              <Link className="navLink" to="/faq">
              FAQ
              </Link>
            </li> */}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
