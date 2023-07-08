import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, celoAlfajores, mainnet, polygon } from "wagmi/chains";

const chains = [arbitrum, mainnet, polygon, celoAlfajores];
const projectId = "2d4b2b6ec24103bfa7cba5ecb1368e4e";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <WagmiConfig config={wagmiConfig}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WagmiConfig>

    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
  </>
);
