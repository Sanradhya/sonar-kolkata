// src/web3/wagmi.ts
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, polygon, arbitrum, optimism, base, sepolia } from "wagmi/chains";

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID as string | undefined;

if (!projectId) {
  throw new Error("Missing VITE_WALLETCONNECT_PROJECT_ID in .env");
}

export const wagmiConfig = getDefaultConfig({
  appName: "Sonar Kolkata",
  projectId,
  chains: [mainnet, base, polygon, arbitrum, optimism, sepolia],
  ssr: false, // Vite SPA
});