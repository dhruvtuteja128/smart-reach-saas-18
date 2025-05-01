
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  MessageCircle,
  Users,
  BarChart3,
  Settings,
  Star,
  Mail,
  Grid2X2,
  FileText,
  BellRing,
  Menu,
  X,
  Zap
} from "lucide-react";

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
};

const SidebarItem = ({ icon: Icon, label, href, isActive, onClick }: SidebarItemProps) => {
  return (
    <Link to={href} className="w-full" onClick={onClick}>
      <div
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-primary/10 dark:hover:bg-primary/20",
          isActive && "bg-primary/15 dark:bg-primary/25 text-primary font-medium"
        )}
      >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </div>
    </Link>
  );
};

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const menuItems = [
    { icon: Grid2X2, label: "Dashboard", href: "/" },
    { icon: MessageCircle, label: "Communication", href: "/communication" },
    { icon: FileText, label: "Ad Campaigns", href: "/campaigns" },
    { icon: Users, label: "CRM", href: "/crm" },
    { icon: Star, label: "Reviews", href: "/reviews" },
    { icon: Mail, label: "Workflows", href: "/workflows" },
    { icon: BarChart3, label: "Analytics", href: "/analytics" },
    { icon: Zap, label: "AI Assistant", href: "/assistant" },
    { icon: BellRing, label: "Integrations", href: "/integrations" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  const currentPath = window.location.pathname;

  // Function to close mobile sidebar when clicking a link
  const handleLinkClick = () => {
    if (isMobile) {
      setOpen(false);
    }
  };

  return (
    <>
      {/* Mobile menu toggle */}
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "flex flex-col h-screen fixed top-0 left-0 z-40 border-r bg-background/95 backdrop-blur-sm",
          isMobile
            ? open
              ? "w-64 animate-slide-in"
              : "-translate-x-full"
            : "w-64",
          "transition-all duration-300 ease-in-out"
        )}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b">
          <Link to="/" className="flex items-center gap-2 font-semibold text-lg" onClick={handleLinkClick}>
            <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span>SmartReach</span>
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                isActive={currentPath === item.href}
                onClick={handleLinkClick}
              />
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <Users className="h-4 w-4" />
            </div>
            <div className="text-sm">
              <p className="font-medium">Acme Inc</p>
              <p className="text-xs text-muted-foreground">Premium</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {isMobile && open && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden animate-fade-in"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};
