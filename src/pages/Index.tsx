import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import HeroCard from "@/components/HeroCard";
import BackgroundEffects from "@/components/BackgroundEffects";
import FeaturesSection from "@/components/landing/FeaturesSection";
import WhyUseSection from "@/components/landing/WhyUseSection";
import InfoSection from "@/components/landing/InfoSection";
import Footer from "@/components/landing/Footer";
import PlaceDetailModal from "@/components/modals/PlaceDetailModal";
import InteractiveMapModal from "@/components/modals/InteractiveMapModal";
import folkMusic from "@/assets/music/folk.mp3";

const Index = () => {
  const [showPlaceModal, setShowPlaceModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<{ 
    id: string; 
    name: string; 
    lat?: number; 
    lng?: number; 
    history_details?: string; 
  } | null>(null);
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const audioRef = useRef<HTMLAudioElement>(null);
  
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

  // Background music functionality
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Ensure audio is loaded and ready
    const initializeAudio = async () => {
      try {
        // Load the audio first
        audio.load();
        
        // Wait for it to be ready
        await new Promise((resolve) => {
          if (audio.readyState >= 2) {
            resolve(true);
          } else {
            audio.addEventListener('canplay', () => resolve(true), { once: true });
          }
        });

        // Set volume and unmuted state
        audio.volume = 1;
        audio.muted = false;
        
        // Try to play immediately
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
          console.log("Audio started successfully");
        }
      } catch (error) {
        console.log("Audio autoplay blocked, waiting for user interaction:", error);
        
        // Set up multiple interaction listeners
        const startAudioOnInteraction = async () => {
          try {
            audio.muted = false;
            audio.volume = 1;
            await audio.play();
            setIsPlaying(true);
            console.log("Audio started after user interaction");
            
            // Remove all listeners once audio starts
            document.removeEventListener('click', startAudioOnInteraction);
            document.removeEventListener('touchstart', startAudioOnInteraction);
            document.removeEventListener('keydown', startAudioOnInteraction);
          } catch (e) {
            console.log("Failed to start audio on interaction:", e);
          }
        };

        document.addEventListener('click', startAudioOnInteraction);
        document.addEventListener('touchstart', startAudioOnInteraction);
        document.addEventListener('keydown', startAudioOnInteraction);
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initializeAudio, 100);

    return () => {
      clearTimeout(timer);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  const toggleMute = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      // Unmuting
      audio.muted = false;
      setIsMuted(false);
      
      // Ensure audio plays when unmuting
      try {
        if (audio.paused) {
          await audio.play();
        }
        setIsPlaying(true);
      } catch (error) {
        console.log("Could not start audio on unmute:", error);
      }
    } else {
      // Muting
      audio.muted = true;
      setIsMuted(true);
      // Don't pause, just mute so it keeps playing silently
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Background Music */}
      <audio
        ref={audioRef}
        loop
        autoPlay
        preload="auto"
        muted={false}
        playsInline
      >
        <source src={folkMusic} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Mute Button - Fixed Position */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMute}
        className={`fixed top-20 right-4 z-50 backdrop-blur-sm border border-border/30 transition-colors ${
          isMuted 
            ? "text-muted-foreground hover:text-foreground bg-secondary/60" 
            : "text-gold hover:text-gold/80 bg-gold/10"
        }`}
        title={isMuted ? "Unmute background music" : "Mute background music"}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4" />
        ) : (
          <Volume2 className="w-4 h-4" />
        )}
      </Button>

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
