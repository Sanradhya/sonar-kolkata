import Navbar from "@/components/Navbar";
import HeroCard from "@/components/HeroCard";
import BackgroundEffects from "@/components/BackgroundEffects";

const Index = () => {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background layers */}
      <BackgroundEffects />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 pt-16">
        <HeroCard />
      </div>
      
      {/* Floating decorative elements */}
      <div className="fixed bottom-8 left-8 text-muted-foreground/30 text-xs font-mono hidden lg:block animate-fade-in-delay-3">
        <span>© 2025 Sonar Kolkata</span>
      </div>
    </main>
  );
};

export default Index;
