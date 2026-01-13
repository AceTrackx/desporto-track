import { motion } from "framer-motion";
import {
  Home,
  Building,
  Users,
  BarChart3,
  Shield,
  Settings,
  Search,
  UserPlus,
  Mail,
  MoreVertical,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navItems = [
  { label: "Dashboard", href: "/dashboard/superadmin", icon: Home },
  { label: "Academies", href: "/dashboard/superadmin/academies", icon: Building },
  { label: "All Users", href: "/dashboard/superadmin/users", icon: Users },
  { label: "Analytics", href: "/dashboard/superadmin/analytics", icon: BarChart3 },
  { label: "Security", href: "/dashboard/superadmin/security", icon: Shield },
  { label: "Settings", href: "/dashboard/superadmin/settings", icon: Settings },
];

const stats = [
  { label: "Total Users", value: "12,456", icon: Users, color: "text-primary" },
  { label: "Admins", value: "156", icon: Shield, color: "text-teal" },
  { label: "Coaches", value: "892", icon: Users, color: "text-accent-foreground" },
  { label: "Members", value: "11,408", icon: Users, color: "text-primary" },
];

const users = [
  { name: "John Mitchell", email: "john@eliteacademy.com", role: "Admin", academy: "Elite Football Academy", status: "Active", lastActive: "2 min ago" },
  { name: "Coach Williams", email: "williams@eliteacademy.com", role: "Coach", academy: "Elite Football Academy", status: "Active", lastActive: "5 min ago" },
  { name: "Sarah Chen", email: "sarah@premieryouth.com", role: "Admin", academy: "Premier Youth Sports", status: "Active", lastActive: "1 hour ago" },
  { name: "Michael Roberts", email: "michael@platform.com", role: "Super Admin", academy: "Platform", status: "Active", lastActive: "Just now" },
  { name: "Emma Davis", email: "emma@champions.com", role: "Coach", academy: "Champions Training", status: "Inactive", lastActive: "3 days ago" },
  { name: "Alex Thompson", email: "alex@eliteacademy.com", role: "Member", academy: "Elite Football Academy", status: "Active", lastActive: "10 min ago" },
];

const getRoleStyles = (role: string) => {
  switch (role) {
    case "Super Admin":
      return "bg-coral/10 text-coral border-coral/20";
    case "Admin":
      return "bg-accent/10 text-accent-foreground border-accent/20";
    case "Coach":
      return "bg-teal/10 text-teal border-teal/20";
    default:
      return "bg-primary/10 text-primary border-primary/20";
  }
};

const SuperAdminUsers = () => {
  return (
    <DashboardLayout
      title="All Users"
      navItems={navItems}
      userRole="Super Admin"
      userName="Michael Roberts"
    >
      <div className="space-y-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="rounded-2xl border border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
                <div className="font-display text-3xl text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Search and Add */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 justify-between"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Search users..." className="pl-10" />
          </div>
          <Button variant="accent">
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </motion.div>

        {/* Users List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                All Users
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {users.map((user, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-foreground">{user.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {user.email}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center hidden md:block">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getRoleStyles(user.role)}`}>
                        {user.role}
                      </span>
                    </div>
                    <div className="text-center hidden lg:block">
                      <div className="text-sm font-medium">{user.academy}</div>
                      <div className="text-xs text-muted-foreground">Academy</div>
                    </div>
                    <div className="text-center hidden md:block">
                      <div className="text-xs text-muted-foreground">{user.lastActive}</div>
                    </div>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                      user.status === "Active" 
                        ? "bg-primary/10 text-primary border-primary/20" 
                        : "bg-muted text-muted-foreground border-border"
                    }`}>
                      {user.status}
                    </span>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminUsers;
