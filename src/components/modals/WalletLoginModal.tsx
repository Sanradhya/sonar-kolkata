import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wallet, Shield, Sparkles } from "lucide-react";

interface WalletLoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginSuccess: () => void;
}

const wallets = [
  { name: "MetaMask", icon: "🦊" },
  { name: "Coinbase Wallet", icon: "🔵" },
  { name: "WalletConnect", icon: "🔗" },
  { name: "Phantom", icon: "👻" },
];

const WalletLoginModal = ({ open, onOpenChange, onLoginSuccess }: WalletLoginModalProps) => {
  const handleWalletConnect = (walletName: string) => {
    // Simulate wallet connection
    console.log(`Connecting to ${walletName}...`);
    setTimeout(() => {
      onLoginSuccess();
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-border/30 max-w-md">
        <DialogHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gold/20 flex items-center justify-center mb-4">
            <Wallet className="w-8 h-8 text-gold" />
          </div>
          <DialogTitle className="font-display text-2xl">
            <span className="text-gradient-gold">Connect</span> Wallet
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Choose your preferred wallet to continue exploring Kolkata
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          {wallets.map((wallet) => (
            <Button
              key={wallet.name}
              variant="outline"
              className="w-full justify-start gap-4 py-6 bg-secondary/40 border-border/30 hover:border-gold/30 hover:bg-secondary/60"
              onClick={() => handleWalletConnect(wallet.name)}
            >
              <span className="text-2xl">{wallet.icon}</span>
              <span className="font-medium">{wallet.name}</span>
            </Button>
          ))}
        </div>

        <div className="pt-4 border-t border-border/30">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Shield className="w-4 h-4 text-gold" />
            <span>Your data is secure and never shared</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm mt-2">
            <Sparkles className="w-4 h-4 text-gold" />
            <span>Powered by Kiwi authentication</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletLoginModal;
