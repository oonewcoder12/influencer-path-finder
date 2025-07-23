import { Button } from "@/components/ui/button";
import { Search, Users, BarChart3, Settings } from "lucide-react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: null },
    { path: "/database", label: "Database", icon: Search },
    { path: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { path: "/contacts", label: "Contacts", icon: Users },
  ];

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg"></div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              FindFlow.ai
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="premium" size="sm">
            Upgrade
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;