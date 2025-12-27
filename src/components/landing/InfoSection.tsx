import { Button } from "../ui/button";
import { ArrowRight, Building2, Palette, Utensils } from "lucide-react";

const categories = [
  {
    icon: Building2,
    title: "Heritage & Architecture",
    description: "From Victoria Memorial to Howrah Bridge, explore iconic British-era and colonial architecture",
    count: "150+ sites"
  },
  {
    icon: Palette,
    title: "Art & Culture",
    description: "Discover Kolkata's vibrant art scene, from galleries to street art and traditional crafts",
    count: "80+ venues"
  },
  {
    icon: Utensils,
    title: "Food & Cuisine",
    description: "Taste authentic Bengali cuisine from legendary eateries and hidden street food gems",
    count: "200+ spots"
  }
];

const InfoSection = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-gold text-sm font-medium uppercase tracking-widest">Explore</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            <span className="text-foreground">Discover</span>{" "}
            <span className="text-gradient-gold">Kolkata</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Dive deep into the soul of the city through curated categories
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={category.title}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
              <div className="relative glass-card rounded-2xl p-8 h-full border border-border/30 hover:border-gold/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center mb-6">
                  <category.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                  {category.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gold text-sm font-medium">{category.count}</span>
                  <Button variant="ghost" size="sm" className="group/btn text-muted-foreground hover:text-gold">
                    Explore
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
