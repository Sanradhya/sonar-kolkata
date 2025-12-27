import { MapPin, ShoppingBag, Compass, Camera, Heart, Users } from "lucide-react";
import { GlowCard } from "../spotlight-card";

const features = [
  {
    icon: MapPin,
    title: "Interactive Map",
    description: "Explore Kolkata's heritage sites with our detailed interactive map"
  },
  {
    icon: ShoppingBag,
    title: "Local Marketplace",
    description: "Discover authentic Kolkata crafts and products from local artisans"
  },
  {
    icon: Compass,
    title: "Guided Tours",
    description: "Virtual tours of iconic landmarks with rich historical context"
  },
  {
    icon: Camera,
    title: "Photo Stories",
    description: "Capture and share your Kolkata moments with the community"
  },
  {
    icon: Heart,
    title: "Curated Experiences",
    description: "Hand-picked recommendations for food, culture, and hidden gems"
  },
  {
    icon: Users,
    title: "Community",
    description: "Connect with fellow explorers and locals who love Kolkata"
  }
];

const FeaturesSection = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-gold text-sm font-medium uppercase tracking-widest">Features</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            <span className="text-gradient-gold">Everything</span>{" "}
            <span className="text-foreground">You Need</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover the city of joy through innovative tools designed for explorers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <GlowCard
              key={feature.title}
              glowColor="gold"
              customSize={true}
              className="group transition-all duration-300 flex flex-col"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex-1">
                <div className="w-12 h-12 rounded-lg bg-secondary/60 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
