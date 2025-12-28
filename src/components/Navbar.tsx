import { Map, Store } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import RainbowLoginButton from "./RainbowLoginButton";
import logo from "@/assets/logo/logo.png";

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
      onClick: onMapClick,
    },
    { label: "Marketplace", icon: <Store className="w-4 h-4" />, href: "/marketplace" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 animate-fade-in">
      <div className="backdrop-blur-md bg-background/80 border-b border-border/20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 w-full">
            {/* Logo */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link to="/" className="flex items-center gap-3">
                <img 
                  src={logo} 
                  alt="Sonar Kolkata Logo" 
                  className="w-8 h-8 object-contain"
                />
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-lg font-medium">
                    শোনার
                  </span>
                  <span className="font-malinton text-lg font-semibold text-foreground">
                    Kolkata
                  </span>
                </div>
              </Link>
            </div>

            {/* Centered Navigation Items */}
            <div className="flex items-center gap-1 sm:gap-2 absolute left-1/2 transform -translate-x-1/2">
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
                  ) : item.href?.startsWith("/") ? (
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

            {/* Right side - Login Button */}
            <div className="flex items-center flex-shrink-0">
              <RainbowLoginButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;





