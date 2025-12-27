import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Star, ArrowLeft, ExternalLink, Volume2, VolumeX } from "lucide-react";
import { PixelImage } from "@/components/ui/pixel-image";

// Import all available place images
import victoriaMemorial from "@/assets/places/victoria-memorial.jpg";
import howrahBridge from "@/assets/places/howrah.jpg";
import kalighatTemple from "@/assets/places/kalighat.jpg";
import collegeStreet from "@/assets/places/college_st.jpg";
import parkStreet from "@/assets/places/park_st.jpg";
import dakshineswarTemple from "@/assets/places/dakshineswar.jpg";
import belurMath from "@/assets/places/belur_math.jpg";
import birlaPlanetarium from "@/assets/places/birla_planet.jpg";
import edenGardens from "@/assets/places/eden_gardens.jpg";
import indianMuseum from "@/assets/places/indian_museum.jpg";
import jorasankoThakurBari from "@/assets/places/jorasanko.jpg";
import marblePalace from "@/assets/places/marble_palace.jpg";
import motherHouse from "@/assets/places/mother_house.jpg";
import princepGhat from "@/assets/places/princep_ghat.jpg";
import scienceCity from "@/assets/places/science_city.jpg";
import stPaulsCathedral from "@/assets/places/st_pauls.jpg";

// Import background music
import monsoonRaga from "@/assets/music/MonsoonRaga.mp3";

// Image mapping based on place names
const getPlaceImage = (placeName: string): string | null => {
  const normalizedName = placeName.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  const imageMap: Record<string, string> = {
    // Exact matches from the place names
    'victoriamemorial': victoriaMemorial,
    'howrahbridge': howrahBridge,
    'indianmuseum': indianMuseum,
    'marblepalace': marblePalace,
    'birlaplanetarium': birlaPlanetarium,
    'stpaulscathedral': stPaulsCathedral,
    'kalighattemple': kalighatTemple,
    'dakshineswartemple': dakshineswarTemple,
    'belurmath': belurMath,
    'jorasankothakurbari': jorasankoThakurBari,
    'sciencecity': scienceCity,
    'collegestreet': collegeStreet,
    'parkstreet': parkStreet,
    'edengardens': edenGardens,
    'princepghat': princepGhat,
    'motherhouse': motherHouse,
    
    // Alternative variations
    'kalighat': kalighatTemple,
    'dakshineswar': dakshineswarTemple,
    'jorasanko': jorasankoThakurBari,
    'stpauls': stPaulsCathedral,
    'birla': birlaPlanetarium,
    'planetarium': birlaPlanetarium,
    'howrah': howrahBridge,
    'victoria': victoriaMemorial,
    'indian': indianMuseum,
    'museum': indianMuseum,
    'marble': marblePalace,
    'palace': marblePalace,
    'belur': belurMath,
    'math': belurMath,
    'science': scienceCity,
    'city': scienceCity,
    'college': collegeStreet,
    'street': collegeStreet,
    'park': parkStreet,
    'eden': edenGardens,
    'gardens': edenGardens,
    'princep': princepGhat,
    'ghat': princepGhat,
    'mother': motherHouse,
    'house': motherHouse
  };
  
  return imageMap[normalizedName] || null;
};

interface PlaceDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBackToMap: () => void;
  place: {
    id: string;
    name: string;
    lat?: number;
    lng?: number;
    history_details?: string;
  } | null;
}

const PlaceDetailModal = ({ open, onOpenChange, onBackToMap, place }: PlaceDetailModalProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [needsUserInteraction, setNeedsUserInteraction] = useState(false);
  const [showPixelEffect, setShowPixelEffect] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  if (!place) return null;

  // Handle background music
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => {
      setAudioError(false);
      // Try to play as soon as audio can play
      if (open && !isMuted) {
        audio.play().catch(error => {
          console.log("Audio play failed on canplay:", error);
          setNeedsUserInteraction(true);
        });
      }
    };

    const handleError = () => {
      setAudioError(true);
      console.error("Error loading background music");
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setNeedsUserInteraction(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleLoadedData = () => {
      // Try to play when data is loaded
      if (open && !isMuted && audio.paused) {
        audio.play().catch(error => {
          console.log("Audio play failed on loadeddata:", error);
          setNeedsUserInteraction(true);
        });
      }
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('error', handleError);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    if (open) {
      // Reset audio state
      audio.currentTime = 0;
      
      // Multiple attempts to start audio
      const startAudio = async () => {
        try {
          // Load the audio first
          audio.load();
          
          // Wait a bit for loading
          await new Promise(resolve => setTimeout(resolve, 100));
          
          // Try to play
          await audio.play();
          setIsPlaying(true);
          setNeedsUserInteraction(false);
        } catch (error) {
          console.log("Initial audio play failed:", error);
          setNeedsUserInteraction(true);
          setIsPlaying(false);
        }
      };

      startAudio();
    } else {
      // Stop playing when modal closes
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      setNeedsUserInteraction(false);
    }

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [open, isMuted]);

  // Handle mute state changes
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = isMuted;
    }
  }, [isMuted]);

  // Handle mute/unmute and play/pause
  const toggleMute = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      // Unmuting
      setIsMuted(false);
      if (audio.paused) {
        try {
          await audio.play();
        } catch (error) {
          console.log("Could not start audio on unmute:", error);
        }
      }
    } else {
      // Muting
      setIsMuted(true);
    }
  };

  // Handle click anywhere in modal to start audio if needed
  const handleModalClick = (e: React.MouseEvent) => {
    const audio = audioRef.current;
    if (audio && (needsUserInteraction || audio.paused) && open) {
      // Don't interfere with button clicks
      if ((e.target as HTMLElement).closest('button')) {
        return;
      }
      
      audio.play().catch(error => {
        console.log("Could not start audio on user interaction:", error);
      });
    }
  };

  // Also try to start audio when the modal content is first rendered
  useEffect(() => {
    if (open) {
      // Small delay before triggering pixel effect for better UX
      const pixelTimer = setTimeout(() => {
        setShowPixelEffect(true);
      }, 200);
      
      // Small delay to ensure modal is fully rendered
      const audioTimer = setTimeout(() => {
        const audio = audioRef.current;
        if (audio && audio.paused && !isMuted) {
          audio.play().catch(error => {
            console.log("Delayed audio start failed:", error);
          });
        }
      }, 100);

      return () => {
        clearTimeout(pixelTimer);
        clearTimeout(audioTimer);
      };
    } else {
      // Reset pixel effect when modal closes
      setShowPixelEffect(false);
    }
  }, [open, isMuted]);

  // Get the appropriate image for this place
  const placeImage = getPlaceImage(place.name);
  
  // Debug log to see what's being matched
  console.log(`Place: "${place.name}" -> Normalized: "${place.name.toLowerCase().replace(/[^a-z0-9]/g, '')}" -> Image: ${placeImage ? 'Found' : 'Not found'}`);

  // Use the actual place data instead of hardcoded details
  const details = {
    image: placeImage,
    name: place.name,
    description: place.history_details || "Discover the rich history and cultural significance of this heritage site in Kolkata. Each location tells a unique story of the city's past, present, and future.",
    timing: "Please check local timings",
    rating: 4.5, // Default rating
    location: place.lat && place.lng ? `${place.lat.toFixed(4)}, ${place.lng.toFixed(4)}` : "Kolkata, West Bengal"
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="glass-card border-border/30 max-w-3xl max-h-[85vh] overflow-y-auto"
        onClick={handleModalClick}
      >
        {/* Background Music */}
        <audio
          ref={audioRef}
          loop
          preload="auto"
          muted={isMuted}
        >
          <source src={monsoonRaga} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        <DialogHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBackToMap}
                className="hover:bg-secondary/60"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <DialogTitle className="font-display text-xl text-foreground">
                Place Details
              </DialogTitle>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Music Status Indicator */}
              {needsUserInteraction && !isPlaying && (
                <div className="flex items-center gap-1 text-muted-foreground text-xs">
                  <span>Click to play music</span>
                </div>
              )}
              {isPlaying && !isMuted && (
                <div className="flex items-center gap-1 text-gold/60 text-xs">
                  <div className="w-2 h-2 bg-gold/60 rounded-full animate-pulse"></div>
                  <span>Playing</span>
                </div>
              )}
              
              {/* Mute Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className={`hover:bg-secondary/60 transition-colors ${
                  isMuted 
                    ? "text-muted-foreground hover:text-foreground" 
                    : "text-gold hover:text-gold/80"
                }`}
                title={isMuted ? "Unmute background music" : "Mute background music"}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left - Image and Name */}
          <div className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden border border-border/30 relative bg-secondary/10">
              {details.image ? (
                showPixelEffect ? (
                  <div className="w-full h-full">
                    <PixelImage
                      src={details.image}
                      grid="6x4"
                      grayscaleAnimation={true}
                      pixelFadeInDuration={600}
                      maxAnimationDelay={800}
                      colorRevealDelay={900}
                    />
                  </div>
                ) : (
                  <div className="w-full h-full bg-secondary/20 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <MapPin className="w-8 h-8 mx-auto mb-2 opacity-40" />
                      <p className="text-sm">Loading...</p>
                    </div>
                  </div>
                )
              ) : (
                <div className="w-full h-full bg-black flex items-center justify-center">
                  <div className="text-center text-white/60">
                    <MapPin className="w-12 h-12 mx-auto mb-2 opacity-40" />
                    <p className="text-sm">No image available</p>
                  </div>
                </div>
              )}
            </div>
            <h2 className="font-display text-2xl font-bold text-gradient-gold">
              {details.name}
            </h2>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 text-gold" />
              <span className="text-sm">{details.location}</span>
            </div>
          </div>

          {/* Right - Description */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-gold fill-gold" />
                <span className="font-semibold text-foreground">{details.rating}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{details.timing}</span>
              </div>
            </div>

            <div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                About
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {details.description}
              </p>
            </div>

            <div className="pt-4 flex gap-3">
              <Button variant="gold" className="flex-1">
                Get Directions
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="bg-secondary/40 border-border/30">
                Save
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlaceDetailModal;
