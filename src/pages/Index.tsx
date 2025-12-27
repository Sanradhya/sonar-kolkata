import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroCard from "@/components/HeroCard";
import BackgroundEffects from "@/components/BackgroundEffects";
import FeaturesSection from "@/components/landing/FeaturesSection";
import WhyUseSection from "@/components/landing/WhyUseSection";
import InfoSection from "@/components/landing/InfoSection";
import Footer from "@/components/landing/Footer";
import WalletLoginModal from "@/components/modals/WalletLoginModal";
import PlaceDetailModal from "@/components/modals/PlaceDetailModal";
import InteractiveMapModal from "@/components/modals/InteractiveMapModal";

const Index = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPlaceModal, setShowPlaceModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<{ 
    id: string; 
    name: string; 
    lat?: number; 
    lng?: number; 
    history_details?: string; 
  } | null>(null);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setShowLoginModal(true);
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setShowMapModal(true);
  };

  const handleBackToMap = () => {
    setShowPlaceModal(false);
    setShowMapModal(true);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Background layers */}
      <BackgroundEffects />
      
      {/* Navigation */}
      <Navbar onMapClick={() => setShowMapModal(true)} />
      
      {/* Hero Section */}
      <section className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 pt-16">
        <HeroCard onGetStarted={handleGetStarted} />
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Why Use Section */}
      <WhyUseSection />

      {/* Info Section */}
      <InfoSection />

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <WalletLoginModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        onLoginSuccess={handleLoginSuccess}
      />
      
      <InteractiveMapModal
        open={showMapModal}
        onOpenChange={setShowMapModal}
      />
      
      <PlaceDetailModal
        open={showPlaceModal}
        onOpenChange={setShowPlaceModal}
        onBackToMap={handleBackToMap}
        place={selectedPlace}
      />
    </main>
  );
};

export default Index;
