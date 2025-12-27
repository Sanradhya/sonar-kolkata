// Force MetaMask detection hook
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useMetaMaskForce = () => {
  const [isMetaMaskReady, setIsMetaMaskReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkMetaMask = async () => {
      try {
        // Wait for page to fully load
        await new Promise(resolve => {
          if (document.readyState === 'complete') {
            resolve(true);
          } else {
            window.addEventListener('load', () => resolve(true));
          }
        });

        // Check multiple times with delays
        for (let i = 0; i < 10; i++) {
          if (window.ethereum?.isMetaMask) {
            console.log('MetaMask detected on attempt', i + 1);
            setIsMetaMaskReady(true);
            return;
          }
          
          // Wait before next check
          await new Promise(resolve => setTimeout(resolve, 500));
        }

        // If still not found, try to trigger MetaMask
        if (window.ethereum) {
          console.log('Ethereum found but not MetaMask, trying to connect...');
          try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            setIsMetaMaskReady(true);
          } catch (err) {
            console.log('User rejected connection');
            setError('User rejected MetaMask connection');
          }
        } else {
          setError('MetaMask not installed');
        }
      } catch (err) {
        console.error('Error checking MetaMask:', err);
        setError('Error detecting MetaMask');
      }
    };

    checkMetaMask();
  }, []);

  const forceMetaMaskConnection = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsMetaMaskReady(true);
        setError(null);
      } else {
        setError('MetaMask not installed');
      }
    } catch (err) {
      setError('Failed to connect to MetaMask');
    }
  };

  return {
    isMetaMaskReady,
    error,
    forceMetaMaskConnection,
  };
};