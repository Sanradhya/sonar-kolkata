import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Star, ArrowLeft, ExternalLink } from "lucide-react";

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
  if (!place) return null;

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
      <DialogContent className="glass-card border-border/30 max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader className="pb-2">
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
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left - Image and Name */}
          <div className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden border border-border/30">
              {details.image ? (
                <img
                  src={details.image}
                  alt={details.name}
                  className="w-full h-full object-cover"
                />
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
