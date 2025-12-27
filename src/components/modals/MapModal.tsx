import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MapPin, Navigation } from "lucide-react";

interface MapLocation {
  id: string;
  name: string;
  x: number;
  y: number;
}

interface MapModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLocationSelect: (location: MapLocation) => void;
}

const locations: MapLocation[] = [
  { id: "victoria", name: "Victoria Memorial", x: 45, y: 55 },
  { id: "howrah", name: "Howrah Bridge", x: 30, y: 25 },
  { id: "kalighat", name: "Kalighat Temple", x: 55, y: 70 },
  { id: "college-street", name: "College Street", x: 40, y: 35 },
  { id: "park-street", name: "Park Street", x: 50, y: 45 },
  { id: "dakshineswar", name: "Dakshineswar Temple", x: 20, y: 15 },
];

const MapModal = ({ open, onOpenChange, onLocationSelect }: MapModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-border/30 max-w-2xl">
        <DialogHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gold/20 flex items-center justify-center mb-4">
            <Navigation className="w-8 h-8 text-gold" />
          </div>
          <DialogTitle className="font-display text-2xl">
            <span className="text-gradient-gold">Explore</span> Kolkata
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Click on any location to discover its story
          </DialogDescription>
        </DialogHeader>

        {/* Interactive Map */}
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-secondary/40 border border-border/30">
          {/* Map Background - stylized */}
          <div className="absolute inset-0 bg-gradient-to-br from-brown-deep via-secondary to-brown-warm opacity-80" />
          
          {/* Stylized map lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gold" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Hooghly River */}
          <div className="absolute left-[15%] top-0 bottom-0 w-[8%] bg-gold/10 blur-sm transform -skew-x-6" />

          {/* Location markers */}
          {locations.map((location) => (
            <button
              key={location.id}
              onClick={() => onLocationSelect(location)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${location.x}%`, top: `${location.y}%` }}
            >
              <div className="relative">
                {/* Pulse effect */}
                <div className="absolute inset-0 w-8 h-8 bg-gold/40 rounded-full animate-ping" />
                {/* Marker */}
                <div className="relative w-8 h-8 bg-gold rounded-full flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                  <MapPin className="w-4 h-4 text-primary-foreground" />
                </div>
                {/* Label */}
                <div className="absolute left-1/2 transform -translate-x-1/2 top-10 whitespace-nowrap">
                  <span className="text-xs text-foreground bg-background/80 px-2 py-1 rounded-md border border-border/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    {location.name}
                  </span>
                </div>
              </div>
            </button>
          ))}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 glass-card rounded-lg px-3 py-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gold rounded-full" />
              <span>Heritage Sites</span>
            </div>
          </div>
        </div>

        <p className="text-center text-muted-foreground text-sm mt-2">
          Tap on any marker to learn more about the location
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default MapModal;
