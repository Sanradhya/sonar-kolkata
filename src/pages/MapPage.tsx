import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, ArrowLeft } from "lucide-react";
import MapComponent from "@/components/MapComponent";
import PlaceDetailModal from "@/components/modals/PlaceDetailModal";

interface HeritageSite {
  id: number;
  name: string;
  lat: number;
  lng: number;
  history_details?: string;
}

const MapPage = () => {
  const [showPlaceModal, setShowPlaceModal] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<{ 
    id: string; 
    name: string; 
    lat?: number; 
    lng?: number; 
    history_details?: string; 
  } | null>(null);
  const navigate = useNavigate();

  const handleLocationSelect = (site: HeritageSite) => {
    setSelectedPlace({ 
      id: site.id.toString(), 
      name: site.name,
      lat: site.lat,
      lng: site.lng,
      history_details: site.history_details
    });
    setShowPlaceModal(true);
  };

  const handleBackToMap = () => {
    setShowPlaceModal(false);
    setSelectedPlace(null);
  };

  return (
    <div className="relative h-screen w-full">
      {/* Close/Back Button */}
      <div className="absolute top-4 left-4 z-[1000]">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate('/')}
          className="glass-card border-border/30 shadow-lg"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>

      {/* Full-screen Map */}
      <MapComponent 
        center={[22.5726, 88.3639]}
        zoom={13}
        height="100vh"
        width="100%"
        showClustering={true}
        onSiteClick={handleLocationSelect}
      />
      
      {/* Place Detail Modal */}
      {selectedPlace && (
        <PlaceDetailModal
          open={showPlaceModal}
          onOpenChange={setShowPlaceModal}
          place={selectedPlace}
          onBackToMap={handleBackToMap}
        />
      )}
    </div>
  );
};

export default MapPage;