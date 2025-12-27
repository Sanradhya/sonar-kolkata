// Simplified RainbowKit configuration to fix loading issues
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, arbitrum, optimism, base, sepolia } from 'wagmi/chains';

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID as string;

if (!projectId) {
  throw new Error("Missing VITE_WALLETCONNECT_PROJECT_ID in .env");
}

// Use the default configuration which should include MetaMask automatically
export const wagmiConfigCustom = getDefaultConfig({
  appName: 'Sonar Kolkata',
  projectId,
  chains: [mainnet, base, polygon, arbitrum, optimism, sepolia],
  ssr: false,
});