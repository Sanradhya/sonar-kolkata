import { MapPin, Mail, Twitter, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-16 px-4 sm:px-6 border-t border-border/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-6 h-6 text-gold" />
              <span className="font-display text-2xl font-bold">
                <span className="text-gradient-gold">Sonar</span>{" "}
                <span className="text-foreground">Kolkata</span>
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Experience the city of joy through a new lens. Discover heritage, 
              culture, and hidden gems of Kolkata.
            </p>
            <p className="text-muted-foreground/70 text-sm">
              Powered by <span className="text-gold font-medium">Kiwi</span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["Map", "Marketplace", "About", "Help"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-gold transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-4">
              Connect
            </h4>
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <Mail className="w-4 h-4" />
              <span>hello@sonarkolkata.com</span>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-gold transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-gold transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-gold transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground/70 text-sm">
            © 2025 Sonar Kolkata. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground/70">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
