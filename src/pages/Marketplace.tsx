import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, MapPin, Shield, Coins, Globe, Camera, Save, CheckCircle, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import BackgroundEffects from "@/components/BackgroundEffects";
import { getContract } from "@/web3/contract";
import SuccessModal from "@/components/modals/SuccessModal";

interface NewPlace {
  name: string;
  latitude: string;
  longitude: string;
  image: File | null;
}

const Marketplace = () => {
  const navigate = useNavigate();
  const [newPlace, setNewPlace] = useState<NewPlace>({
    name: "",
    latitude: "",
    longitude: "",
    image: null
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [savedPlace, setSavedPlace] = useState<NewPlace | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [blockchainSuccessOpen, setBlockchainSuccessOpen] = useState(false);

  // Function to upload image to IPFS (mock implementation)
  const uploadToIPFS = async (file: File): Promise<string> => {
    // In a real implementation, you would upload to IPFS here
    // For now, we'll create a mock IPFS hash
    const mockHash = `QmExample${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
    return `ipfs://${mockHash}`;
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewPlace(prev => ({ ...prev, image: file }));
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      // Check if it's an image file
      if (file.type.startsWith('image/')) {
        setNewPlace(prev => ({ ...prev, image: file }));
      }
    }
  };

  const handleSave = async () => {
    if (newPlace.name && newPlace.latitude && newPlace.longitude) {
      try {
        setLoading(true);

        // Create image preview URL if image exists
        let previewUrl = null;
        let imageHash = "";
        
        if (newPlace.image) {
          previewUrl = URL.createObjectURL(newPlace.image);
          setImagePreviewUrl(previewUrl);
          
          // Upload image to IPFS
          imageHash = await uploadToIPFS(newPlace.image);
        }

        // Save to blockchain
        const contract = await getContract();
        
        // Create a title that includes location info
        const placeTitle = `${newPlace.name} (${newPlace.latitude}, ${newPlace.longitude})`;
        
        // 🔐 WALLET POPUP + SIGNER VERIFICATION
        const tx = await contract.saveImage(imageHash || "ipfs://placeholder", placeTitle);
        
        // ⛓ WAIT FOR BLOCK CONFIRMATION
        await tx.wait();
        
        // Show local success modal first
        setSavedPlace({ ...newPlace });
        setShowSuccessModal(true);
        
        // Reset form
        setNewPlace({
          name: "",
          latitude: "",
          longitude: "",
          image: null
        });
        
        // Reset file input
        const fileInput = document.getElementById('image-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        
        // Show blockchain success after local modal
        setTimeout(() => {
          setShowSuccessModal(false);
          setBlockchainSuccessOpen(true);
        }, 2000);
        
      } catch (error) {
        console.error("Save failed:", error);
        alert("Transaction failed or rejected. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const isFormValid = newPlace.name && newPlace.latitude && newPlace.longitude;

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Background layers */}
      <BackgroundEffects />
      
      {/* Navigation */}
      <Navbar onMapClick={() => navigate('/')} />
      
      {/* Header */}
      <div className="relative z-10 pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="text-gradient-gold">Digital</span>{" "}
              <span className="text-foreground">Marketplace</span>
            </h1>
            <p className="text-foreground/80 text-lg sm:text-xl leading-relaxed">
              Exploring tokenization, decentralization, and digital privacy in the modern world
            </p>
          </div>
        </div>
      </div>

      {/* Tokenization & Privacy Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Tokenization Card */}
            <Card className="glass-card border-border/30">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg gold-gradient flex items-center justify-center mb-4">
                  <Coins className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl font-display text-foreground">
                  Tokenization Revolution
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  How digital assets are reshaping ownership and value exchange
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-foreground/80 leading-relaxed">
                <p className="mb-4">
                  Tokenization transforms real-world assets into digital tokens on blockchain networks, 
                  enabling fractional ownership, increased liquidity, and global accessibility.
                </p>
                <p>
                  From real estate to art, tokenization democratizes investment opportunities 
                  while maintaining transparency and security through decentralized protocols.
                </p>
              </CardContent>
            </Card>

            {/* Decentralization Card */}
            <Card className="glass-card border-border/30">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg gold-gradient flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl font-display text-foreground">
                  Decentralized Networks
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Building trust without central authorities
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-foreground/80 leading-relaxed">
                <p className="mb-4">
                  Decentralized systems eliminate single points of failure and reduce dependency 
                  on centralized institutions, creating more resilient and democratic networks.
                </p>
                <p>
                  Smart contracts automate agreements, while distributed consensus mechanisms 
                  ensure network integrity without requiring trusted intermediaries.
                </p>
              </CardContent>
            </Card>

            {/* Privacy Card */}
            <Card className="glass-card border-border/30">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg gold-gradient flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl font-display text-foreground">
                  Digital Privacy Impact
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Protecting individual rights in the digital age
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-foreground/80 leading-relaxed">
                <p className="mb-4">
                  Blockchain technology offers both transparency and privacy through cryptographic 
                  techniques, allowing users to control their data and digital identity.
                </p>
                <p>
                  Zero-knowledge proofs and privacy coins enable private transactions while 
                  maintaining the benefits of decentralized verification and immutable records.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Privacy Section */}
          <div className="glass-card rounded-2xl p-8 sm:p-12 border border-border/30 mb-16">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">
              Privacy in the <span className="text-gradient-gold">Decentralized Era</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Challenges</h3>
                <ul className="space-y-2 text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                    <span>Public ledgers can expose transaction patterns and wallet addresses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                    <span>Metadata analysis can link real-world identities to blockchain activities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                    <span>Regulatory compliance often requires identity verification</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Solutions</h3>
                <ul className="space-y-2 text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                    <span>Privacy-focused cryptocurrencies with built-in anonymity features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                    <span>Layer-2 solutions and mixing protocols for enhanced privacy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                    <span>Self-sovereign identity systems for user-controlled data</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upload New Places Section */}
      <section className="relative z-10 py-16 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              <span className="text-gradient-gold">Explore</span> & Upload New Places
            </h2>
            <p className="text-foreground/80 text-lg max-w-2xl mx-auto">
              Contribute to our heritage map by uploading new locations and sharing their stories
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="glass-card border-border/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <MapPin className="w-5 h-5 text-gold" />
                  Add New Heritage Site
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Share a new location with the community
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="image-upload" className="text-foreground">
                    Upload Image
                  </Label>
                  <div 
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      isDragOver 
                        ? 'border-gold bg-gold/10' 
                        : 'border-border/50 hover:border-gold/50'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <Camera className="w-8 h-8 text-muted-foreground" />
                      <div className="text-sm text-muted-foreground">
                        {newPlace.image ? (
                          <span className="text-foreground font-medium">{newPlace.image.name}</span>
                        ) : (
                          <div>
                            <span className="block">Click to upload an image</span>
                            <span className="text-xs opacity-75">or drag and drop here</span>
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                </div>

                {/* Place Name */}
                <div className="space-y-2">
                  <Label htmlFor="place-name" className="text-foreground">
                    Place Name
                  </Label>
                  <Input
                    id="place-name"
                    placeholder="Enter the name of the place"
                    value={newPlace.name}
                    onChange={(e) => setNewPlace(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-secondary/40 border-border/50"
                  />
                </div>

                {/* Coordinates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="latitude" className="text-foreground">
                      Latitude
                    </Label>
                    <Input
                      id="latitude"
                      placeholder="22.5726"
                      value={newPlace.latitude}
                      onChange={(e) => setNewPlace(prev => ({ ...prev, latitude: e.target.value }))}
                      className="bg-secondary/40 border-border/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude" className="text-foreground">
                      Longitude
                    </Label>
                    <Input
                      id="longitude"
                      placeholder="88.3639"
                      value={newPlace.longitude}
                      onChange={(e) => setNewPlace(prev => ({ ...prev, longitude: e.target.value }))}
                      className="bg-secondary/40 border-border/50"
                    />
                  </div>
                </div>

                {/* Save Button */}
                <Button
                  variant="gold"
                  className="w-full"
                  onClick={handleSave}
                  disabled={!isFormValid || loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving to Blockchain...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save New Place
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={(open) => {
        setShowSuccessModal(open);
        // Clean up image URL when modal closes
        if (!open && imagePreviewUrl) {
          URL.revokeObjectURL(imagePreviewUrl);
          setImagePreviewUrl(null);
        }
      }}>
        <DialogContent className="glass-card border-border/30 max-w-md">
          <DialogHeader className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <DialogTitle className="font-display text-xl text-foreground">
              Place Saved Successfully!
            </DialogTitle>
          </DialogHeader>
          
          {savedPlace && (
            <div className="space-y-4">
              <Card className="bg-secondary/40 border-border/30">
                <CardContent className="p-4">
                  {/* Image Preview */}
                  {imagePreviewUrl && (
                    <div className="mb-4">
                      <img 
                        src={imagePreviewUrl} 
                        alt={savedPlace.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  
                  <h3 className="font-semibold text-foreground mb-2">{savedPlace.name}</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      Latitude: {savedPlace.latitude}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      Longitude: {savedPlace.longitude}
                    </p>
                    {savedPlace.image && (
                      <p className="flex items-center gap-2">
                        <Camera className="w-3 h-3" />
                        Image: {savedPlace.image.name}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Button
                variant="gold"
                className="w-full"
                onClick={() => {
                  setShowSuccessModal(false);
                  // Clean up image URL
                  if (imagePreviewUrl) {
                    URL.revokeObjectURL(imagePreviewUrl);
                    setImagePreviewUrl(null);
                  }
                }}
              >
                Continue Exploring
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Blockchain Success Modal */}
      {blockchainSuccessOpen && (
        <SuccessModal onClose={() => setBlockchainSuccessOpen(false)} />
      )}
    </main>
  );
};

export default Marketplace;