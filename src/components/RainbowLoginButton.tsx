// src/components/RainbowLoginButton.tsx
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { LogIn } from "lucide-react";
import { Button } from "./ui/button";

export default function RainbowLoginButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        if (!ready) {
          return (
            <Button 
              variant="gold" 
              size="sm" 
              className="flex items-center gap-2 ml-2" 
              disabled
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Login</span>
            </Button>
          );
        }

        if (!connected) {
          return (
            <Button
              variant="gold"
              size="sm"
              className="flex items-center gap-2 ml-2"
              onClick={openConnectModal}
              type="button"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Login</span>
            </Button>
          );
        }

        if (chain?.unsupported) {
          return (
            <Button
              variant="gold"
              size="sm"
              className="flex items-center gap-2 ml-2"
              onClick={openChainModal}
              type="button"
            >
              <span className="hidden sm:inline">Wrong network</span>
              <span className="sm:hidden">Network</span>
            </Button>
          );
        }

        // Connected state: show a clean "account" button
        return (
          <Button
            variant="gold"
            size="sm"
            className="flex items-center gap-2 ml-2"
            onClick={openAccountModal}
            type="button"
            title={account?.address}
          >
            <span className="hidden sm:inline">{account?.displayName}</span>
            <span className="sm:hidden">Wallet</span>
          </Button>
        );
      }}
    </ConnectButton.Custom>
  );
}