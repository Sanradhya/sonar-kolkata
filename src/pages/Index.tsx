import { useState, useEffect, useRef } from "react";
import { useAccount } from "wagmi";
import Navbar from "@/components/Navbar";
import HeroCard from "@/components/HeroCard";
import BackgroundEffects from "@/components/BackgroundEffects";
import FeaturesSection from "@/components/landing/FeaturesSection";
import WhyUseSection from "@/components/landing/WhyUseSection";
import InfoSection from "@/components/landing/InfoSection";
import Footer from "@/components/landing/Footer";
import PlaceDetailModal from "@/components/modals/PlaceDetailModal";
import InteractiveMapModal from "@/components/modals/InteractiveMapModal";

const Index = () => {
  const [showPlaceModal, setShowPlaceModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<{ 
    id: string; 
    name: string; 
    lat?: number; 
    lng?: number; 
    history_details?: string; 
  } | null>(null);
  const { isConnected } = useAccount();
  
  // Track if user has manually closed the modal to prevent auto-reopening
  const hasManuallyClosedModal = useRef(false);
  const previousConnectionStatus = useRef(isConnected);

  const handleGetStarted = () => {
    hasManuallyClosedModal.current = false; // Reset flag when user explicitly wants to start
    setShowMapModal(true);
  };

  const handleBackToMap = () => {
    setShowPlaceModal(false);
    setShowMapModal(true);
  };

  const handleMapModalClose = (open: boolean) => {
    setShowMapModal(open);
    if (!open) {
      hasManuallyClosedModal.current = true; // User manually closed the modal
    }
  };

  // Auto-open map modal when user connects wallet (but only once)
  useEffect(() => {
    // Only auto-open if:
    // 1. User just connected (wasn't connected before)
    // 2. User hasn't manually closed the modal
    // 3. No other modals are open
    if (
      isConnected && 
      !previousConnectionStatus.current && 
      !hasManuallyClosedModal.current && 
      !showMapModal && 
      !showPlaceModal
    ) {
      setShowMapModal(true);
    }
    
    // Update previous connection status
    previousConnectionStatus.current = isConnected;
  }, [isConnected, showMapModal, showPlaceModal]);

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
      <InteractiveMapModal
        open={showMapModal}
        onOpenChange={handleMapModalClose}
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
