import { Map, Store, HelpCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

interface NavbarProps {
  onMapClick?: () => void;
}

const Navbar = ({ onMapClick }: NavbarProps) => {
  const navItems: NavItem[] = [
    { 
      label: "Map", 
      icon: <Map className="w-4 h-4" />, 
      onClick: onMapClick 
    },
    { label: "Marketplace", icon: <Store className="w-4 h-4" />, href: "#marketplace" },
    { label: "Help", icon: <HelpCircle className="w-4 h-4" />, href: "#help" },
  ];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 animate-fade-in">
      <div className="glass-card border-b border-border/20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center shadow-glow">
                  <span className="text-primary-foreground font-display font-bold text-sm">S</span>
                </div>
                <span className="font-display text-lg font-semibold text-foreground hidden sm:block">
                  Sonar
                </span>
              </Link>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center gap-1 sm:gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="nav"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={item.onClick}
                  asChild={!item.onClick}
                >
                  {item.onClick ? (
                    <>
                      {item.icon}
                      <span className="hidden sm:inline">{item.label}</span>
                    </>
                  ) : item.href?.startsWith('/') ? (
                    <Link to={item.href}>
                      {item.icon}
                      <span className="hidden sm:inline">{item.label}</span>
                    </Link>
                  ) : (
                    <a href={item.href}>
                      {item.icon}
                      <span className="hidden sm:inline">{item.label}</span>
                    </a>
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
