// Simple MetaMask debug component that won't break the site
import React, { useState } from "react";
import { Button } from "./ui/button";

export const SimpleMetaMaskDebug: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  const checkMetaMask = () => {
    const info = {
      hasEthereum: !!window.ethereum,
      isMetaMask: window.ethereum?.isMetaMask,
      userAgent: navigator.userAgent,
      timestamp: new Date().toLocaleTimeString(),
    };
    setDebugInfo(info);
  };

  if (!isVisible) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setIsVisible(true);
          checkMetaMask();
        }}
        className="fixed bottom-4 right-4 z-50 text-xs"
      >
        MetaMask Status
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white border rounded-lg shadow-lg p-4 max-w-xs">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-sm">MetaMask Status</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(false)}
          className="h-6 w-6 p-0"
        >
          ×
        </Button>
      </div>
      
      <div className="space-y-1 text-xs">
        <Button onClick={checkMetaMask} size="sm" className="w-full mb-2">
          Refresh
        </Button>
        
        {debugInfo && (
          <>
            <div>
              <strong>Ethereum:</strong> {debugInfo.hasEthereum ? "✅" : "❌"}
            </div>
            <div>
              <strong>MetaMask:</strong> {debugInfo.isMetaMask ? "✅" : "❌"}
            </div>
            <div>
              <strong>Updated:</strong> {debugInfo.timestamp}
            </div>
          </>
        )}
        
        <div className="pt-2 border-t text-xs text-gray-600">
          <strong>Tips:</strong>
          <ul className="list-disc list-inside mt-1">
            <li>Refresh page if MetaMask not detected</li>
            <li>Make sure MetaMask is unlocked</li>
            <li>Try disabling other wallet extensions</li>
          </ul>
        </div>
      </div>
    </div>
  );
};