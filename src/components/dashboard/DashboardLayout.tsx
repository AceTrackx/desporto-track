import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Settings,
  Bell,
  LogOut,
  ChevronDown,
  Search,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  navItems: NavItem[];
  userRole: string;
  userName?: string;
}

const DashboardLayout = ({
  children,
  title,
  navItems,
  userRole,
  userName: userNameProp,
}: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const userName = userNameProp || user?.user_metadata?.full_name || user?.email || "User";

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center">
            <span className="text-sidebar-primary-foreground font-display text-2xl">D</span>
          </div>
          <span className="font-display text-2xl tracking-wide text-sidebar-foreground">
            DESPORTO
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Settings & Logout */}
      <div className="p-4 border-t border-sidebar-border space-y-1">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all duration-200 w-full"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 bg-sidebar border-r border-sidebar-border fixed h-screen">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0 bg-sidebar">
                <SidebarContent />
              </SheetContent>
            </Sheet>

            <h1 className="font-display text-2xl tracking-wide text-foreground hidden lg:block">
              {title.toUpperCase()}
            </h1>

            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-10 h-10 rounded-xl bg-muted border-0" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 hover:bg-muted rounded-xl px-3 py-2 transition-colors">
                    <Avatar className="w-9 h-9">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                        {userName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <div className="text-sm font-semibold text-foreground">{userName}</div>
                      <div className="text-xs text-muted-foreground capitalize">{userRole}</div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-muted-foreground hidden md:block" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
