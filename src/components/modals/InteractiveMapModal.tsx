import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Maximize2 } from "lucide-react";
import MapComponent from "@/components/MapComponent";
import PlaceDetailModal from "@/components/modals/PlaceDetailModal";

interface HeritageSite {
  id: number;
  name: string;
  lat: number;
  lng: number;
  history_details?: string;
}

interface InteractiveMapModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const InteractiveMapModal = ({ open, onOpenChange }: InteractiveMapModalProps) => {
  const [showPlaceModal, setShowPlaceModal] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<{ id: string; name: string } | null>(null);

  const handleLocationSelect = (site: HeritageSite) => {
    setSelectedPlace({ id: site.id.toString(), name: site.name });
    setShowPlaceModal(true);
  };

  const handleBackToMap = () => {
    setShowPlaceModal(false);
    setSelectedPlace(null);
  };

  const handleFullScreen = () => {
    // Close modal and navigate to full map page
    onOpenChange(false);
    window.location.href = '/map';
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="glass-card border-border/30 max-w-4xl max-h-[80vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-center justify-between">
              <DialogTitle className="font-display text-2xl">
                <span className="text-gradient-gold">Explore</span> Kolkata Heritage
              </DialogTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleFullScreen}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onOpenChange(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>

          {/* Map Container */}
          <div className="px-6 pb-6">
            <div className="rounded-xl overflow-hidden border border-border/30 bg-secondary/20">
              <MapComponent 
                center={[22.5726, 88.3639]}
                zoom={13}
                height="60vh"
                width="100%"
                showClustering={true}
                onSiteClick={handleLocationSelect}
              />
            </div>
          </div>

          {/* Instructions */}
          <div className="px-6 pb-6">
            <p className="text-center text-muted-foreground text-sm">
              Click on any heritage site marker to learn more about its history and significance
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Place Detail Modal */}
      {selectedPlace && (
        <PlaceDetailModal
          open={showPlaceModal}
          onOpenChange={setShowPlaceModal}
          place={selectedPlace}
          onBackToMap={handleBackToMap}
        />
      )}
    </>
  );
};

export default InteractiveMapModal;