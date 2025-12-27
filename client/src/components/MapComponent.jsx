import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster'; // New Import
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// 1. Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// 2. Dynamic Heritage Icons - Gold for discovered, Red for undiscovered
const getCustomIcon = (isUnlocked) => {
  const color = isUnlocked ? '#FFD700' : '#A52A2A'; // Gold for discovered, Red for undiscovered
  return L.divIcon({
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.5);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10],
    className: 'heritage-marker'
  });
};

const MapComponent = ({ 
  center = [22.5726, 88.3639], // Default to Kolkata
  zoom = 13,
  height = '100vh',
  width = '100%',
  showClustering = true,
  onSiteClick = null,
  customSites = null
}) => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [narratingSites, setNarratingSites] = useState(new Set());
  const [unlockedHistory, setUnlockedHistory] = useState([]);
  const [heritageUnlocked, setHeritageUnlocked] = useState([]);
  
  const kolkataPosition = center;

  const handleNarrate = async (siteName, siteId) => {
    setNarratingSites(prev => new Set(prev).add(siteId));
    
    try {
      const response = await fetch('http://localhost:5678/webhook-test/narrate-heritage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          site_name: siteName
        })
      });
      
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      await audio.play();
      
      // Clean up the object URL after playing
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
      };
    } catch (error) {
      console.error('Error narrating story:', error);
    } finally {
      setNarratingSites(prev => {
        const newSet = new Set(prev);
        newSet.delete(siteId);
        return newSet;
      });
    }
  };

  useEffect(() => {
    const fetchSites = async () => {
      try {
        // Use custom sites if provided, otherwise fetch from API
        if (customSites) {
          setSites(customSites);
          setLoading(false);
          return;
        }
        
        // Pointing to your Requestly Bridge
        const response = await fetch('https://api.sonarkolkata.com/heritage-sites');
        const data = await response.json();
        setSites(data); // This now sets all 50 sites from Requestly
      } catch (error) {
        console.error('Error fetching sites:', error);
        // Fallback to mock data if API fails
        const mockSites = [
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
          { id: 21, name: "Rashtrapati Bhavan", lat: 22.5696, lng: 88.3427 },
          { id: 22, name: "Town Hall", lat: 22.5696, lng: 88.3444 },
          { id: 23, name: "Metcalfe Hall", lat: 22.5716, lng: 88.3444 },
          { id: 24, name: "Asiatic Society", lat: 22.5716, lng: 88.3444 },
          { id: 25, name: "St. John's Church", lat: 22.5716, lng: 88.3444 },
          { id: 26, name: "St. James' Church", lat: 22.5716, lng: 88.3444 },
          { id: 27, name: "Armenian Church", lat: 22.5716, lng: 88.3444 },
          { id: 28, name: "Portuguese Church", lat: 22.5716, lng: 88.3444 },
          { id: 29, name: "Nakhoda Mosque", lat: 22.5716, lng: 88.3444 },
          { id: 30, name: "Tipu Sultan Mosque", lat: 22.5716, lng: 88.3444 },
          { id: 31, name: "Beth El Synagogue", lat: 22.5716, lng: 88.3444 },
          { id: 32, name: "Maghen David Synagogue", lat: 22.5716, lng: 88.3444 },
          { id: 33, name: "Pareshnath Temple", lat: 22.5716, lng: 88.3444 },
          { id: 34, name: "Chinese Temple", lat: 22.5716, lng: 88.3444 },
          { id: 35, name: "Jain Temple", lat: 22.5716, lng: 88.3444 },
          { id: 36, name: "Parsi Fire Temple", lat: 22.5716, lng: 88.3444 },
          { id: 37, name: "South Park Street Cemetery", lat: 22.5716, lng: 88.3444 },
          { id: 38, name: "North Park Street Cemetery", lat: 22.5716, lng: 88.3444 },
          { id: 39, name: "Burrabazar", lat: 22.5716, lng: 88.3444 },
          { id: 40, name: "New Market", lat: 22.5716, lng: 88.3444 },
          { id: 41, name: "College Street", lat: 22.5716, lng: 88.3444 },
          { id: 42, name: "Bow Barracks", lat: 22.5716, lng: 88.3444 },
          { id: 43, name: "Chinatown", lat: 22.5716, lng: 88.3444 },
          { id: 44, name: "Black Town", lat: 22.5716, lng: 88.3444 },
          { id: 45, name: "White Town", lat: 22.5716, lng: 88.3444 },
          { id: 46, name: "Dalhousie Square", lat: 22.5716, lng: 88.3444 },
          { id: 47, name: "Lal Dighi", lat: 22.5716, lng: 88.3444 },
          { id: 48, name: "Maidan", lat: 22.5716, lng: 88.3444 },
          { id: 49, name: "Race Course", lat: 22.5716, lng: 88.3444 },
          { id: 50, name: "Royal Calcutta Turf Club", lat: 22.5716, lng: 88.3444 },
        ];
        setSites(mockSites);
      } finally {
        setLoading(false);
      }
    };

    fetchSites();
  }, [customSites]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#FFFDD0]">
        <div className="text-[#A52A2A] text-xl font-serif">Discovering Kolkata's Stories...</div>
      </div>
    );
  }

  return (
    <MapContainer
      center={kolkataPosition}
      zoom={zoom}
      style={{ height: height, width: width }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Group the markers into clusters if clustering is enabled */}
      {showClustering ? (
        <MarkerClusterGroup chunkedLoading>
          {sites.map((site) => {
            const isUnlocked = unlockedHistory.includes(site.id);
            return (
              <Marker 
                key={site.id} 
                position={[site.lat, site.lng]} 
                icon={getCustomIcon(isUnlocked)}
                eventHandlers={{
                  click: async () => {
                    if (onSiteClick) {
                      onSiteClick(site);
                    } else {
                      // Default behavior
                      try {
                        console.log(`Fetching narration for: ${site.name}`);
                        const response = await fetch('http://localhost:5678/webhook-test/narrate-heritage', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            name: site.name
                          })
                        });
                        
                        const responseData = await response.json();
                        console.log('n8n response:', responseData);
                      } catch (error) {
                        console.error('Error fetching narration:', error);
                      }
                    }
                  }
                }}
              >
                <Popup>
                  <div className="text-center p-2">
                    <h3 className="font-bold text-[#A52A2A] text-lg">{site.name}</h3>
                    <p className="text-xs text-gray-500 italic mb-2">Heritage Hub</p>
                    <button 
                      className="bg-[#A52A2A] text-white px-3 py-1 rounded-full text-xs hover:opacity-80 transition-all"
                      onClick={async () => {
                        try {
                          const response = await fetch('http://localhost:5678/webhook-test/narrate-heritage', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ site_name: site.name, full_history: site.history_details })
                          });

                          const data = await response.blob();
                          const audioUrl = URL.createObjectURL(data);
                          const audio = new Audio(audioUrl);

                          audio.play().then(() => {
                            setUnlockedHistory(prev => [...prev, site.id]);
                          }).catch(e => console.error("Playback failed:", e));
                          audio.onended = () => {
                            URL.revokeObjectURL(audioUrl);
                          };

                        } catch (error) {
                          console.error('Narration Error:', error);
                          alert('The city is quiet right now... check if n8n is running!');
                        }
                      }}
                    >
                      Hear the Story
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      ) : (
        // Render markers without clustering
        sites.map((site) => {
          const isUnlocked = unlockedHistory.includes(site.id);
          return (
            <Marker 
              key={site.id} 
              position={[site.lat, site.lng]} 
              icon={getCustomIcon(isUnlocked)}
              eventHandlers={{
                click: async () => {
                  if (onSiteClick) {
                    onSiteClick(site);
                  } else {
                    // Default behavior
                    try {
                      console.log(`Fetching narration for: ${site.name}`);
                      const response = await fetch('http://localhost:5678/webhook-test/narrate-heritage', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          name: site.name
                        })
                      });
                      
                      const responseData = await response.json();
                      console.log('n8n response:', responseData);
                    } catch (error) {
                      console.error('Error fetching narration:', error);
                    }
                  }
                }
              }}
            >
              <Popup>
                <div className="text-center p-2">
                  <h3 className="font-bold text-[#A52A2A] text-lg">{site.name}</h3>
                  <p className="text-xs text-gray-500 italic mb-2">Heritage Hub</p>
                  <button 
                    className="bg-[#A52A2A] text-white px-3 py-1 rounded-full text-xs hover:opacity-80 transition-all"
                    onClick={async () => {
                      try {
                        const response = await fetch('http://localhost:5678/webhook-test/narrate-heritage', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ site_name: site.name, full_history: site.history_details })
                        });

                        const data = await response.blob();
                        const audioUrl = URL.createObjectURL(data);
                        const audio = new Audio(audioUrl);

                        audio.play().then(() => {
                          setUnlockedHistory(prev => [...prev, site.id]);
                        }).catch(e => console.error("Playback failed:", e));
                        audio.onended = () => {
                          URL.revokeObjectURL(audioUrl);
                        };

                      } catch (error) {
                        console.error('Narration Error:', error);
                        alert('The city is quiet right now... check if n8n is running!');
                      }
                    }}
                  >
                    Hear the Story
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })
      )}
    </MapContainer>
  );
};

export default MapComponent;
