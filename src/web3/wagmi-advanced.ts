// Alternative Wagmi configuration with explicit MetaMask support
import { createConfig, http } from "wagmi";
import { mainnet, polygon, arbitrum, optimism, base, sepolia } from "wagmi/chains";
import { injected, metaMask, walletConnect } from "wagmi/connectors";

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID as string | undefined;

if (!projectId) {
  throw new Error("Missing VITE_WALLETCONNECT_PROJECT_ID in .env");
}

// Advanced configuration with explicit MetaMask connector
export const wagmiAdvancedConfig = createConfig({
  chains: [mainnet, base, polygon, arbitrum, optimism, sepolia],
  connectors: [
    // Injected connector (catches MetaMask and other injected wallets)
    injected({
      target: () => ({
        id: "injected",
        name: "Injected Wallet",
        provider: typeof window !== "undefined" ? window.ethereum : undefined,
      }),
    }),
    // Explicit MetaMask connector
    metaMask({
      dappMetadata: {
        name: "Sonar Kolkata",
        url: typeof window !== "undefined" ? window.location.origin : "https://sonarkolkata.com",
      },
    }),
    // WalletConnect for mobile and other wallets
    walletConnect({
      projectId,
      metadata: {
        name: "Sonar Kolkata",
        description: "Explore Kolkata's heritage sites with Web3 technology",
        url: typeof window !== "undefined" ? window.location.origin : "https://sonarkolkata.com",
        icons: [
          typeof window !== "undefined" 
            ? `${window.location.origin}/favicon.ico`
            : "https://sonarkolkata.com/favicon.ico"
        ],
      },
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [sepolia.id]: http(),
  },
});

// Export both configurations - use advanced if default doesn't work
export { wagmiConfig } from "./wagmi";