import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Star, ArrowLeft, ExternalLink } from "lucide-react";
import victoriaMemorial from "@/assets/places/victoria-memorial.jpg";

interface PlaceDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBack: () => void;
  place: {
    id: string;
    name: string;
  } | null;
}

const placeDetails: Record<string, { 
  image: string; 
  name: string; 
  description: string; 
  timing: string; 
  rating: number;
  location: string;
}> = {
  victoria: {
    image: victoriaMemorial,
    name: "Victoria Memorial",
    description: "The Victoria Memorial is a large marble building in Kolkata, dedicated to the memory of Queen Victoria. It was built between 1906 and 1921 and is now a museum and tourist destination. The memorial lies on the Maidan and is one of the most famous monuments in Kolkata. The building is made of white Makrana marble and combines British and Mughal architecture. The surrounding gardens, designed by Lord Redesdale and David Prain, span 64 acres and feature beautiful lawns, ornamental pools, and a variety of trees.",
    timing: "10:00 AM - 5:00 PM (Closed on Mondays)",
    rating: 4.8,
    location: "Queen's Way, Maidan, Kolkata"
  },
  howrah: {
    image: victoriaMemorial,
    name: "Howrah Bridge",
    description: "Howrah Bridge is a cantilever bridge with a suspended span over the Hooghly River in West Bengal. It was commissioned in 1943 and is one of the busiest cantilever bridges in the world, carrying a daily traffic of approximately 100,000 vehicles and countless pedestrians. The bridge is an engineering marvel and an iconic symbol of Kolkata's heritage.",
    timing: "Open 24 hours",
    rating: 4.7,
    location: "Howrah, Kolkata"
  },
  kalighat: {
    image: victoriaMemorial,
    name: "Kalighat Temple",
    description: "Kalighat Kali Temple is one of the 51 Shakti Peethas of India, dedicated to the Hindu goddess Kali. The present temple was built in 1809 and is one of the most famous temples in Kolkata. The temple attracts thousands of devotees daily and holds special significance during the festivals of Kali Puja and Durga Puja.",
    timing: "5:00 AM - 2:00 PM, 5:00 PM - 10:30 PM",
    rating: 4.5,
    location: "Kalighat, Kolkata"
  },
  "college-street": {
    image: victoriaMemorial,
    name: "College Street",
    description: "College Street, known as Boi Para (Book Town) in Bengali, is one of the largest book markets in the world. Home to historic institutions like Presidency University and Sanskrit College, the street is the intellectual heart of Kolkata. The iconic Indian Coffee House here has been a meeting point for intellectuals, poets, and revolutionaries since 1876.",
    timing: "10:00 AM - 8:00 PM",
    rating: 4.6,
    location: "College Street, Kolkata"
  },
  "park-street": {
    image: victoriaMemorial,
    name: "Park Street",
    description: "Park Street is an iconic boulevard in Kolkata known for its restaurants, cafes, and nightlife. Once called the 'Street That Never Sleeps', it hosts some of the city's oldest and most famous eateries including Flurys, Mocambo, and Peter Cat. The street comes alive during Christmas and New Year celebrations.",
    timing: "Open 24 hours",
    rating: 4.7,
    location: "Park Street, Kolkata"
  },
  dakshineswar: {
    image: victoriaMemorial,
    name: "Dakshineswar Temple",
    description: "Dakshineswar Kali Temple is a Hindu temple located on the eastern bank of the Hooghly River. The temple was built in 1855 by Rani Rashmoni and is famous for its association with the mystic Ramakrishna Paramahamsa. The temple complex includes twelve identical Shiva temples and a Radha-Krishna temple.",
    timing: "6:00 AM - 12:30 PM, 3:00 PM - 8:30 PM",
    rating: 4.8,
    location: "Dakshineswar, Kolkata"
  }
};

const PlaceDetailModal = ({ open, onOpenChange, onBack, place }: PlaceDetailModalProps) => {
  if (!place) return null;

  const details = placeDetails[place.id] || placeDetails.victoria;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-border/30 max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader className="pb-2">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
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
              <img
                src={details.image}
                alt={details.name}
                className="w-full h-full object-cover"
              />
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
