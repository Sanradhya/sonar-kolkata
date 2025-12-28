import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import logo from "@/assets/logo/logo.png";

interface HeroCardProps {
  onGetStarted: () => void;
}

const HeroCard = ({ onGetStarted }: HeroCardProps) => {
  const { isConnected } = useAccount();

  return (
    <div className="relative w-full text-center space-y-6 animate-fade-in-delay-1 py-8">
      {/* Ambient background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-mustard/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
      </div>

      {/* Logo Badge */}
      <div className="inline-flex items-center justify-center animate-fade-in-delay-2">
        <img 
          src={logo} 
          alt="Sonar Kolkata Logo" 
          className="w-24 h-24 object-contain drop-shadow-lg"
        />
      </div>

      {/* Title - Full Width */}
      <div className="space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none">
          <span 
            className="bg-gradient-to-r from-gold via-white to-gold bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_100%] drop-shadow-sm mr-4 sm:mr-6 md:mr-8"
          >
            শোনার
          </span>
          <span className="font-malinton text-foreground drop-shadow-sm">Kolkata</span>
        </h1>
        <div className="flex items-center justify-center gap-4 max-w-4xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent flex-1"></div>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg font-medium tracking-widest uppercase px-6 whitespace-nowrap">
            POWERED BY{" "}
            <span className="bg-gradient-to-r from-gold via-mustard to-gold bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_100%] font-bold drop-shadow-sm">
              KIWI
            </span>
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent flex-1"></div>
        </div>
      </div>

      {/* Description */}
      <div className="max-w-3xl mx-auto space-y-6">
        <p className="text-foreground/90 text-xl sm:text-2xl leading-relaxed animate-fade-in-delay-3 font-medium text-center">
          <span className="text-gold font-semibold">Listen</span> to the stories of the <span className="text-gold font-semibold">city of joy</span>.
        </p>
        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed text-center">
          Hear the <span className="text-gradient-gold">heritage</span>, feel the <span className="text-gradient-gold">culture</span>, and discover <span className="text-gradient-gold">hidden tales</span>.
        </p>
      </div>

      {/* CTA Button */}
      <div className="pt-8 animate-fade-in-delay-3">
        {isConnected ? (
          <Button 
            variant="gold" 
            size="xl" 
            className="group text-lg px-8 py-4 glossy-button hover:scale-105 transition-all duration-300"
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
                className="group text-lg px-8 py-4 glossy-button hover:scale-105 transition-all duration-300"
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
      
    </div>
  );
};

export default HeroCard;
