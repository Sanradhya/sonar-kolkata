import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Maximize2, Settings, MapPin } from "lucide-react";
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

// Mock heritage sites list - in real app, this would come from API
const mockHeritageSites = [
  { id: 1, name: "Victoria Memorial" },
  { id: 2, name: "Howrah Bridge" },
  { id: 3, name: "Indian Museum" },
  { id: 4, name: "Marble Palace" },
  { id: 5, name: "Birla Planetarium" },
  { id: 6, name: "St. Paul's Cathedral" },
  { id: 7, name: "Kalighat Temple" },
  { id: 8, name: "Dakshineswar Temple" },
  { id: 9, name: "Belur Math" },
  { id: 10, name: "Jorasanko Thakur Bari" },
  { id: 11, name: "National Library" },
  { id: 12, name: "Alipore Zoo" },
  { id: 13, name: "Science City" },
  { id: 14, name: "Eco Park" },
  { id: 15, name: "Nicco Park" },
  { id: 16, name: "Fort William" },
  { id: 17, name: "Raj Bhavan" },
  { id: 18, name: "Writers' Building" },
  { id: 19, name: "General Post Office" },
  { id: 20, name: "High Court" },
  { id: 21, name: "Town Hall" },
  { id: 22, name: "Metcalfe Hall" },
  { id: 23, name: "Asiatic Society" },
  { id: 24, name: "St. John's Church" },
  { id: 25, name: "Armenian Church" },
  { id: 26, name: "Nakhoda Mosque" },
  { id: 27, name: "South Park Street Cemetery" },
  { id: 28, name: "New Market" },
  { id: 29, name: "College Street" },
  { id: 30, name: "Park Street" }
];

const InteractiveMapModal = ({ open, onOpenChange }: InteractiveMapModalProps) => {
  const [showPlaceModal, setShowPlaceModal] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<{ 
    id: string; 
    name: string; 
    lat?: number; 
    lng?: number; 
    history_details?: string; 
  } | null>(null);
  const [selectedPreferences, setSelectedPreferences] = useState<number[]>([]);
  const [isFilteredView, setIsFilteredView] = useState(false);
  const [filteredSites, setFilteredSites] = useState<HeritageSite[]>([]);

  // Create full heritage sites with coordinates for filtering
  const fullHeritageSites: HeritageSite[] = [
    { id: 1, name: "Victoria Memorial", lat: 22.5448, lng: 88.3426 },
    { id: 2, name: "Howrah Bridge", lat: 22.5850, lng: 88.3478 },
    { id: 3, name: "Indian Museum", lat: 22.5570, lng: 88.3514 },
    { id: 4, name: "Marble Palace", lat: 22.6231, lng: 88.3616 },
    { id: 5, name: "Birla Planetarium", lat: 22.5513, lng: 88.3478 },
    { id: 6, name: "St. Paul's Cathedral", lat: 22.5466, lng: 88.3473 },
    { id: 7, name: "Kalighat Temple", lat: 22.5185, lng: 88.3427 },
    { id: 8, name: "Dakshineswar Temple", lat: 22.6451, lng: 88.3675 },
    { id: 9, name: "Belur Math", lat: 22.6294, lng: 88.3635 },
    { id: 10, name: "Jorasanko Thakur Bari", lat: 22.5850, lng: 88.3576 },
    { id: 11, name: "National Library", lat: 22.5314, lng: 88.3355 },
    { id: 12, name: "Alipore Zoo", lat: 22.5346, lng: 88.3322 },
    { id: 13, name: "Science City", lat: 22.5744, lng: 88.4155 },
    { id: 14, name: "Eco Park", lat: 22.6269, lng: 88.4497 },
    { id: 15, name: "Nicco Park", lat: 22.6100, lng: 88.4378 },
    { id: 16, name: "Fort William", lat: 22.5656, lng: 88.3427 },
    { id: 17, name: "Raj Bhavan", lat: 22.5516, lng: 88.3444 },
    { id: 18, name: "Writers' Building", lat: 22.5716, lng: 88.3444 },
    { id: 19, name: "General Post Office", lat: 22.5696, lng: 88.3444 },
    { id: 20, name: "High Court", lat: 22.5716, lng: 88.3427 },
    { id: 21, name: "Town Hall", lat: 22.5696, lng: 88.3444 },
    { id: 22, name: "Metcalfe Hall", lat: 22.5716, lng: 88.3444 },
    { id: 23, name: "Asiatic Society", lat: 22.5716, lng: 88.3444 },
    { id: 24, name: "St. John's Church", lat: 22.5716, lng: 88.3444 },
    { id: 25, name: "Armenian Church", lat: 22.5716, lng: 88.3444 },
    { id: 26, name: "Nakhoda Mosque", lat: 22.5716, lng: 88.3444 },
    { id: 27, name: "South Park Street Cemetery", lat: 22.5716, lng: 88.3444 },
    { id: 28, name: "New Market", lat: 22.5716, lng: 88.3444 },
    { id: 29, name: "College Street", lat: 22.5716, lng: 88.3444 },
    { id: 30, name: "Park Street", lat: 22.5716, lng: 88.3444 }
  ];

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

  const handleFullScreen = () => {
    // Close modal and navigate to full map page
    onOpenChange(false);
    window.location.href = '/map';
  };

  const handlePreferenceToggle = (siteId: number) => {
    setSelectedPreferences(prev => 
      prev.includes(siteId) 
        ? prev.filter(id => id !== siteId)
        : [...prev, siteId]
    );
  };

  const handleLetsGo = () => {
    if (selectedPreferences.length > 0) {
      // Filter sites based on selected preferences
      const filtered = fullHeritageSites.filter(site => 
        selectedPreferences.includes(site.id)
      );
      
      console.log("=== FILTERING DEBUG ===");
      console.log("Selected preferences:", selectedPreferences);
      console.log("Full heritage sites:", fullHeritageSites.length);
      console.log("Filtered heritage sites:", filtered);
      console.log("Setting isFilteredView to true");
      
      setFilteredSites(filtered);
      setIsFilteredView(true);
    } else {
      alert("Please select at least one heritage site to continue.");
    }
  };

  const handleBackToPreferences = () => {
    setIsFilteredView(false);
    setFilteredSites([]);
  };

  // Reset state when modal is closed
  useEffect(() => {
    if (!open) {
      setIsFilteredView(false);
      setFilteredSites([]);
      setSelectedPreferences([]);
      setShowPlaceModal(false);
      setSelectedPlace(null);
    }
  }, [open]);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="glass-card border-border/30 max-w-6xl max-h-[85vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-center justify-between">
              <DialogTitle className="font-display text-2xl">
                <span className="text-gradient-gold">Explore</span> Kolkata Heritage
                {isFilteredView && (
                  <span className="text-sm text-gold ml-2">
                    ({filteredSites.length} selected)
                  </span>
                )}
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

          {/* Main Content - Split Layout */}
          <div className="flex px-6 pb-6 gap-6 h-[calc(85vh-120px)]">
            {/* Left Side - Map */}
            <div className="flex-1">
              <div className="rounded-xl overflow-hidden border border-border/30 bg-secondary/20 h-full">
                <MapComponent 
                  key={`map-${isFilteredView}-${filteredSites.length}`}
                  center={[22.5726, 88.3639]}
                  zoom={13}
                  height="100%"
                  width="100%"
                  showClustering={true}
                  onSiteClick={handleLocationSelect}
                  customSites={isFilteredView ? filteredSites : undefined}
                />
              </div>
            </div>

            {/* Right Side - Preferences Panel */}
            <div className="w-80 flex flex-col">
              <div className="glass-card rounded-xl border border-border/30 p-4 h-full flex flex-col">
                {!isFilteredView ? (
                  <>
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-4">
                      <Settings className="w-5 h-5 text-gold" />
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        Add Preferences
                      </h3>
                    </div>

                    {/* Selected Count */}
                    <div className="mb-4 p-3 bg-secondary/40 rounded-lg border border-border/30">
                      <p className="text-sm text-muted-foreground">
                        Selected: <span className="text-gold font-semibold">{selectedPreferences.length}</span> heritage sites
                      </p>
                    </div>

                    {/* Heritage Sites List */}
                    <ScrollArea className="flex-1 pr-2">
                      <div className="space-y-2">
                        {mockHeritageSites.map((site) => (
                          <div
                            key={site.id}
                            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary/40 transition-colors"
                          >
                            <Checkbox
                              id={`site-${site.id}`}
                              checked={selectedPreferences.includes(site.id)}
                              onCheckedChange={() => handlePreferenceToggle(site.id)}
                              className="border-border/50"
                            />
                            <label
                              htmlFor={`site-${site.id}`}
                              className="flex-1 text-sm text-foreground cursor-pointer flex items-center gap-2"
                            >
                              <MapPin className="w-3 h-3 text-gold/60" />
                              {site.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    {/* Let's Go Button */}
                    <div className="mt-4 pt-4 border-t border-border/30">
                      <Button
                        variant="gold"
                        className="w-full"
                        onClick={handleLetsGo}
                        disabled={selectedPreferences.length === 0}
                      >
                        Let's Go ({selectedPreferences.length})
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Filtered View Header */}
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="w-5 h-5 text-gold" />
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        Your Selected Tour
                      </h3>
                    </div>

                    {/* Tour Summary */}
                    <div className="mb-4 p-3 bg-gold/10 rounded-lg border border-gold/30">
                      <p className="text-sm text-foreground">
                        <span className="text-gold font-semibold">{filteredSites.length}</span> heritage sites in your personalized tour
                      </p>
                    </div>

                    {/* Selected Sites List */}
                    <ScrollArea className="flex-1 pr-2">
                      <div className="space-y-2">
                        {filteredSites.map((site, index) => (
                          <div
                            key={site.id}
                            className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/40 border border-border/30"
                          >
                            <div className="w-6 h-6 rounded-full bg-gold text-background text-xs font-bold flex items-center justify-center">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground">{site.name}</p>
                              <p className="text-xs text-muted-foreground">Click on map to explore</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    {/* Back to Preferences Button */}
                    <div className="mt-4 pt-4 border-t border-border/30">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleBackToPreferences}
                      >
                        Back to Preferences
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="px-6 pb-6">
            <p className="text-center text-muted-foreground text-sm">
              {!isFilteredView 
                ? "Select your preferred heritage sites and click \"Let's Go\" to start your personalized tour"
                : "Click on any heritage site marker to learn more about its history and stories"
              }
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