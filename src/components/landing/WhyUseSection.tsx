import { CheckCircle, Sparkles } from "lucide-react";

const benefits = [
  "Authentic local experiences curated by Kolkata residents",
  "Decentralized and community-driven platform",
  "Secure wallet-based authentication",
  "Support local artisans and businesses directly",
  "Discover hidden gems off the tourist trail",
  "Rich historical context for every location"
];

const WhyUseSection = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <span className="text-gold text-sm font-medium uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Why Sonar Kolkata
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6">
              <span className="text-foreground">The City of Joy,</span>
              <br />
              <span className="text-gradient-gold">Reimagined</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Sonar Kolkata bridges tradition and technology, bringing you an immersive 
              way to explore one of India's most culturally rich cities. Powered by Kiwi, 
              we ensure your journey is authentic, secure, and unforgettable.
            </p>

            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/90">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-gold/20 via-mustard/10 to-gold/20 rounded-3xl blur-3xl opacity-40" />
            <div className="relative glass-card rounded-2xl p-8 border border-border/30">
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card rounded-xl p-6 text-center">
                  <div className="text-4xl font-display font-bold text-gradient-gold">500+</div>
                  <div className="text-muted-foreground text-sm mt-2">Heritage Sites</div>
                </div>
                <div className="glass-card rounded-xl p-6 text-center">
                  <div className="text-4xl font-display font-bold text-gradient-gold">50K+</div>
                  <div className="text-muted-foreground text-sm mt-2">Active Users</div>
                </div>
                <div className="glass-card rounded-xl p-6 text-center">
                  <div className="text-4xl font-display font-bold text-gradient-gold">1K+</div>
                  <div className="text-muted-foreground text-sm mt-2">Local Partners</div>
                </div>
                <div className="glass-card rounded-xl p-6 text-center">
                  <div className="text-4xl font-display font-bold text-gradient-gold">4.9</div>
                  <div className="text-muted-foreground text-sm mt-2">User Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUseSection;
