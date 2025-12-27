// Debug component for MetaMask detection
import React, { useState, useEffect } from "react";
import { detectMetaMask } from "../utils/metamask-detection";
import { useMetaMaskForce } from "../hooks/useMetaMaskForce";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AlertCircle, CheckCircle, RefreshCw } from "lucide-react";

export const MetaMaskDebug: React.FC = () => {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { isMetaMaskReady, error, forceMetaMaskConnection } = useMetaMaskForce();

  useEffect(() => {
    const detection = detectMetaMask();
    setDebugInfo(detection.getDebugInfo());
  }, []);

  const refreshDebugInfo = () => {
    const detection = detectMetaMask();
    setDebugInfo(detection.getDebugInfo());
  };

  if (!isVisible) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-50"
      >
        {isMetaMaskReady ? (
          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
        ) : (
          <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
        )}
        Debug MetaMask
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-80 max-h-96 overflow-auto">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex justify-between items-center">
          MetaMask Debug Info
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
          >
            ×
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xs space-y-2">
        <div className="flex gap-2">
          <Button onClick={refreshDebugInfo} size="sm" className="flex-1">
            <RefreshCw className="w-3 h-3 mr-1" />
            Refresh
          </Button>
          <Button onClick={forceMetaMaskConnection} size="sm" className="flex-1" variant="outline">
            Force Connect
          </Button>
        </div>
        
        {/* Status indicators */}
        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
          {isMetaMaskReady ? (
            <CheckCircle className="w-4 h-4 text-green-500" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-500" />
          )}
          <span className="font-medium">
            {isMetaMaskReady ? "MetaMask Ready" : "MetaMask Not Ready"}
          </span>
        </div>

        {error && (
          <div className="p-2 bg-red-50 text-red-700 rounded text-xs">
            {error}
          </div>
        )}
        
        {debugInfo && (
          <div className="space-y-1">
            <div>
              <strong>Has Ethereum:</strong> {debugInfo.hasEthereum ? "✅" : "❌"}
            </div>
            <div>
              <strong>Is MetaMask:</strong> {debugInfo.isMetaMask ? "✅" : "❌"}
            </div>
            <div>
              <strong>MetaMask Installed:</strong> {debugInfo.isMetaMaskInstalled ? "✅" : "❌"}
            </div>
            <div>
              <strong>Has Providers:</strong> {debugInfo.hasProviders ? "✅" : "❌"}
            </div>
            <div>
              <strong>Providers Count:</strong> {debugInfo.providersCount}
            </div>
            <div>
              <strong>Provider Found:</strong> {debugInfo.provider === "Found" ? "✅" : "❌"}
            </div>
            
            {/* Additional debugging info */}
            <div className="pt-2 border-t">
              <strong>Window.ethereum:</strong> {window.ethereum ? "✅" : "❌"}
            </div>
            <div>
              <strong>Ethereum.isMetaMask:</strong> {window.ethereum?.isMetaMask ? "✅" : "❌"}
            </div>
            <div>
              <strong>Page loaded:</strong> {document.readyState === 'complete' ? "✅" : "❌"}
            </div>
            
            <div className="pt-2 border-t">
              <strong>User Agent:</strong>
              <div className="text-xs text-gray-600 break-all">
                {debugInfo.userAgent}
              </div>
            </div>
          </div>
        )}
        
        <div className="pt-2 border-t text-xs text-gray-600">
          <strong>Quick Fixes:</strong>
          <ul className="list-disc list-inside space-y-1 mt-1">
            <li>Click "Force Connect" above</li>
            <li>Refresh the page (Ctrl+F5)</li>
            <li>Disable other wallet extensions</li>
            <li>Try incognito mode</li>
            <li>Check MetaMask is unlocked</li>
            <li>Make sure you're on HTTPS</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};