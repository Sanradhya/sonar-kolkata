import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface HeroCardProps {
  onGetStarted: () => void;
}

const HeroCard = ({ onGetStarted }: HeroCardProps) => {
  const { isConnected } = useAccount();

  return (
    <div className="relative w-full max-w-lg mx-auto animate-fade-in-delay-1">
      {/* Ambient glow behind card */}
      <div className="absolute -inset-4 bg-gradient-to-r from-mustard/20 via-gold/10 to-mustard/20 rounded-3xl blur-3xl opacity-60 animate-pulse-soft" />
      
      {/* Main glassmorphic card */}
      <div className="relative glass-card rounded-2xl p-8 sm:p-10 shadow-card border border-border/30 overflow-hidden">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 gold-gradient opacity-10 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-mustard/20 blur-2xl" />
        
        {/* Content */}
        <div className="relative z-10 text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/60 border border-border/40 animate-fade-in-delay-2">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
              Discover Kolkata
            </span>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="text-gradient-gold">Sonar</span>{" "}
              <span className="text-foreground">Kolkata</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base font-medium tracking-wide">
              Powered by <span className="text-gold font-semibold">Kiwi</span>
            </p>
          </div>

          {/* Description */}
          <p className="text-foreground/80 text-base sm:text-lg leading-relaxed max-w-md mx-auto animate-fade-in-delay-3">
            Experience the city of joy through a new lens. Explore heritage, culture, and hidden gems.
          </p>

          {/* CTA Button */}
          <div className="pt-4 animate-fade-in-delay-3">
            {isConnected ? (
              <Button 
                variant="gold" 
                size="xl" 
                className="group"
                onClick={onGetStarted}
              >
                Get Started
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            ) : (
              <ConnectButton.Custom>
                {({ openConnectModal }) => (
                  <Button 
                    variant="gold" 
                    size="xl" 
                    className="group"
                    onClick={openConnectModal}
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                )}
              </ConnectButton.Custom>
            )}
          </div>

          {/* Trust indicators */}
          <div className="pt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground animate-fade-in-delay-3">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Always Available
            </span>
            <span className="w-px h-3 bg-border" />
            <span>Free to Explore</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
