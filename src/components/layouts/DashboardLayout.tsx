
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  ShoppingCart, 
  UserCheck, 
  Wallet, 
  Users, 
  PieChart, 
  LogOut, 
  Menu, 
  X, 
  User
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { signOut } from "@/lib/auth";

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  adminOnly?: boolean;
};

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Token Issuance",
    href: "/tokens/issue",
    icon: FileText,
  },
  {
    title: "Marketplace",
    href: "/marketplace",
    icon: ShoppingCart,
  },
  {
    title: "KYC Verification",
    href: "/kyc",
    icon: UserCheck,
  },
  {
    title: "Wallet",
    href: "/wallet",
    icon: Wallet,
  },
  {
    title: "Admin Panel",
    href: "/admin",
    icon: Users,
    adminOnly: true,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: PieChart,
  },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { session } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Determine if the current user is an admin
  const isAdmin = session?.user?.role === "admin";

  // Filter navigation items based on user role
  const filteredNavItems = navItems.filter(
    (item) => !item.adminOnly || (item.adminOnly && isAdmin)
  );

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar for desktop */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r bg-card transition-transform duration-300 ease-in-out md:static",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-20"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 py-4">
          <Link to="/dashboard" className="flex items-center space-x-2">
            {isSidebarOpen ? (
              <h1 className="text-2xl font-bold">COPYM</h1>
            ) : (
              <span className="text-2xl font-bold">CM</span>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:flex hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
        <nav className="flex-1 space-y-1 px-2 py-4">
          {filteredNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                location.pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                !isSidebarOpen && "justify-center px-3"
              )}
            >
              <item.icon className={cn("h-5 w-5", isSidebarOpen && "mr-2")} />
              {isSidebarOpen && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
        <div className="mt-auto border-t p-4">
          <div className="flex items-center justify-between">
            <div className={cn("flex items-center", isSidebarOpen ? "space-x-3" : "justify-center w-full")}>
              <Link to="/profile">
                <Avatar>
                  <AvatarImage src={session?.user?.image || ""} />
                  <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
                </Avatar>
              </Link>
              {isSidebarOpen && (
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {session?.user?.name || "User"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {session?.user?.email || ""}
                  </p>
                </div>
              )}
            </div>
            {isSidebarOpen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => signOut()}
                title="Sign out"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top navbar */}
        <header className="flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <div className="flex items-center space-x-4">
            <Link to="/profile">
              <Button variant="ghost" size="sm" className="md:hidden">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => signOut()} 
              className="md:hidden"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
