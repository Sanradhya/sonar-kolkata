// MetaMask detection utility
export const detectMetaMask = () => {
  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    const { ethereum } = window as any;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  // Check if we're in a browser environment
  const isBrowser = typeof window !== "undefined";

  // Wait for MetaMask to be injected (sometimes it takes a moment)
  const waitForMetaMask = (timeout = 3000): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!isBrowser) {
        resolve(false);
        return;
      }

      if (isMetaMaskInstalled()) {
        resolve(true);
        return;
      }

      let attempts = 0;
      const maxAttempts = timeout / 100;

      const checkInterval = setInterval(() => {
        attempts++;
        
        if (isMetaMaskInstalled()) {
          clearInterval(checkInterval);
          resolve(true);
        } else if (attempts >= maxAttempts) {
          clearInterval(checkInterval);
          resolve(false);
        }
      }, 100);
    });
  };

  // Get MetaMask provider
  const getMetaMaskProvider = () => {
    if (!isBrowser) return null;
    
    const { ethereum } = window as any;
    
    if (ethereum?.providers?.length) {
      // Multiple providers - find MetaMask
      return ethereum.providers.find((provider: any) => provider.isMetaMask);
    }
    
    // Single provider
    return ethereum?.isMetaMask ? ethereum : null;
  };

  // Debug information
  const getDebugInfo = () => {
    if (!isBrowser) {
      return { error: "Not in browser environment" };
    }

    const { ethereum } = window as any;
    
    return {
      hasEthereum: !!ethereum,
      isMetaMask: ethereum?.isMetaMask,
      hasProviders: !!ethereum?.providers,
      providersCount: ethereum?.providers?.length || 0,
      userAgent: navigator.userAgent,
      isMetaMaskInstalled: isMetaMaskInstalled(),
      provider: getMetaMaskProvider() ? "Found" : "Not found"
    };
  };

  return {
    isMetaMaskInstalled,
    waitForMetaMask,
    getMetaMaskProvider,
    getDebugInfo,
    isBrowser
  };
};

// Hook for React components
export const useMetaMaskDetection = () => {
  const [isDetected, setIsDetected] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [debugInfo, setDebugInfo] = React.useState<any>(null);

  React.useEffect(() => {
    const detection = detectMetaMask();
    
    setDebugInfo(detection.getDebugInfo());
    
    detection.waitForMetaMask().then((detected) => {
      setIsDetected(detected);
      setIsLoading(false);
    });
  }, []);

  return { isDetected, isLoading, debugInfo };
};

import React from "react";