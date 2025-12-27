# MetaMask Detection Troubleshooting Guide

## Common Issues and Solutions

### 1. MetaMask Not Detected on Hosted Site

**Symptoms:**
- MetaMask is installed but RainbowKit doesn't show it as an option
- "No wallet detected" message appears
- Connect button doesn't work

**Solutions:**

#### A. Check MetaMask Installation
```javascript
// Open browser console and run:
console.log(window.ethereum);
console.log(window.ethereum?.isMetaMask);
```

#### B. Refresh and Wait
- Refresh the page (MetaMask injection can be delayed)
- Wait 3-5 seconds after page load
- Try hard refresh (Ctrl+F5 or Cmd+Shift+R)

#### C. Disable Conflicting Extensions
- Disable other wallet extensions (Coinbase Wallet, Phantom, etc.)
- Keep only MetaMask enabled
- Restart browser

#### D. Check MetaMask Settings
1. Open MetaMask
2. Go to Settings → Advanced
3. Enable "Use Phishing Detection" 
4. Make sure "Expose accounts to third-party sites" is enabled

### 2. HTTPS Requirements

**Issue:** MetaMask requires HTTPS on production sites

**Solution:**
- Ensure your deployed site uses HTTPS
- CloudFront automatically provides HTTPS
- Local development (localhost) works with HTTP

### 3. Content Security Policy (CSP)

**Issue:** Strict CSP headers can block MetaMask injection

**Solution:** Add to your HTML head or server headers:
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com;
  connect-src 'self' https://*.infura.io https://*.walletconnect.org wss://*.walletconnect.org;
  img-src 'self' data: https:;
">
```

### 4. Browser-Specific Issues

#### Chrome/Brave
- Check if MetaMask is enabled in Extensions
- Try incognito mode
- Clear browser cache

#### Firefox
- MetaMask might need manual enabling
- Check about:addons

#### Safari
- MetaMask support is limited
- Consider using WalletConnect as fallback

### 5. Mobile Browsers

**Issue:** MetaMask mobile app has different behavior

**Solutions:**
- Use MetaMask mobile browser
- Implement WalletConnect for mobile
- Test on actual devices, not desktop mobile simulation

## Debug Steps

### 1. Use the Debug Component
The app now includes a debug component (bottom-right corner):
- Click "Debug MetaMask" button
- Check all the detection parameters
- Use "Refresh" to re-check

### 2. Browser Console Debugging
```javascript
// Check if MetaMask is available
console.log('Ethereum:', window.ethereum);
console.log('Is MetaMask:', window.ethereum?.isMetaMask);
console.log('Providers:', window.ethereum?.providers);

// Wait for MetaMask injection
setTimeout(() => {
  console.log('After delay - Ethereum:', window.ethereum);
}, 2000);
```

### 3. Network Tab
- Open DevTools → Network tab
- Look for failed requests to wallet providers
- Check for CORS errors

## Updated Configuration

I've updated your Wagmi configuration to:
1. Explicitly include MetaMask connector
2. Add proper metadata
3. Include fallback connectors
4. Improve detection timing

## Testing Checklist

After deploying the fixes:

- [ ] Test on Chrome with MetaMask
- [ ] Test on Firefox with MetaMask  
- [ ] Test in incognito mode
- [ ] Test with other wallets disabled
- [ ] Test on mobile (MetaMask app browser)
- [ ] Check browser console for errors
- [ ] Use the debug component to verify detection

## Production Deployment Notes

When deploying to production:

1. **Remove Debug Component:**
   ```typescript
   // Remove this line from App.tsx
   <MetaMaskDebug />
   ```

2. **Verify HTTPS:**
   - Ensure CloudFront serves over HTTPS
   - Check SSL certificate is valid

3. **Test Cross-Browser:**
   - Chrome, Firefox, Safari, Edge
   - Mobile browsers

4. **Monitor Errors:**
   - Set up error tracking (Sentry, LogRocket)
   - Monitor wallet connection success rates

## Alternative Solutions

If MetaMask detection continues to fail:

### 1. WalletConnect Fallback
```typescript
// Users can always use WalletConnect
// Works with MetaMask mobile app
```

### 2. Manual Connection
```typescript
// Add a "Connect MetaMask" button that directly calls:
if (window.ethereum) {
  await window.ethereum.request({ method: 'eth_requestAccounts' });
}
```

### 3. Deep Links
```typescript
// For mobile, use MetaMask deep links:
const metamaskUrl = `https://metamask.app.link/dapp/${window.location.host}`;
```

## Common Error Messages

### "No Ethereum provider found"
- MetaMask not installed or not injected yet
- Try waiting or refreshing

### "User rejected the request"
- User clicked "Cancel" in MetaMask
- Normal behavior, not an error

### "Chain not supported"
- User is on wrong network
- RainbowKit will show network switch button

### "Already processing eth_requestAccounts"
- Multiple connection attempts
- Wait for current attempt to complete

## Support Resources

- [MetaMask Developer Docs](https://docs.metamask.io/)
- [RainbowKit Troubleshooting](https://www.rainbowkit.com/docs/troubleshooting)
- [Wagmi Documentation](https://wagmi.sh/)

Remember: The debug component will help you identify exactly what's happening with MetaMask detection on your hosted site!