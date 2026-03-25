import { Link, useLocation } from "react-router-dom";
import { Link2, LayoutDashboard, Mail, FileEdit, Settings, ShieldCheck, User, Pen, CreditCard, HelpCircle, BookOpen, HeadphonesIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const DashboardSidebar = () => {
  const location = useLocation();

  const mainNav = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Mail, label: "Envelopes", path: "/envelopes", badge: 1 },
    { icon: FileEdit, label: "Drafts", path: "/drafts" },
    { icon: Settings, label: "Workspace Management", path: "/workspace" },
  ];

  const accountNav = [
    { icon: ShieldCheck, label: "Document Verification", path: "/verification" },
    { icon: User, label: "Account", path: "/account" },
    { icon: Pen, label: "Visual Signature", path: "/signature" },
    { icon: CreditCard, label: "Plan & Billing", path: "/billing" },
  ];

  const supportNav = [
    { icon: HelpCircle, label: "Terms of Use", path: "/terms" },
    { icon: BookOpen, label: "Documentation & Guides", path: "/docs" },
    { icon: HeadphonesIcon, label: "Contact Support", path: "/support" },
  ];

  const renderNavItem = (item: { icon: React.ElementType; label: string; path: string; badge?: number }) => {
    const isActive = location.pathname === item.path;
    return (
      <Link
        key={item.path}
        to={item.path}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
          isActive
            ? "bg-primary text-primary-foreground font-medium"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <item.icon className="h-4 w-4 shrink-0" />
        <span className="flex-1">{item.label}</span>
        {item.badge && (
          <span className="h-5 min-w-5 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground text-[10px] font-semibold px-1.5">
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <aside className="w-60 border-r bg-card flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 px-5 py-4 border-b">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
          <Link2 className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="text-base font-bold text-foreground">Teranode</span>
      </Link>

      {/* Workspace label */}
      <div className="px-4 pt-4 pb-2">
        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
          Apex Homes Ltd
        </p>
      </div>

      {/* Main Nav */}
      <nav className="px-3 space-y-0.5">
        {mainNav.map(renderNavItem)}
      </nav>

      {/* Account */}
      <div className="px-4 pt-5 pb-2">
        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Account</p>
      </div>
      <nav className="px-3 space-y-0.5">
        {accountNav.map(renderNavItem)}
      </nav>

      {/* Support */}
      <div className="px-4 pt-5 pb-2">
        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Support</p>
      </div>
      <nav className="px-3 space-y-0.5">
        {supportNav.map(renderNavItem)}
      </nav>

      {/* Version */}
      <div className="mt-auto px-4 py-3 border-t flex items-center justify-between">
        <span className="text-[11px] text-muted-foreground">v1.6</span>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
