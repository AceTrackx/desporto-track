import { motion } from "framer-motion";
import { Home, Users, Calendar, CreditCard, BarChart3, Settings, Search, UserPlus, Mail, MoreVertical } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navItems = [
  { label: "Dashboard", href: "/dashboard/admin", icon: Home },
  { label: "Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Schedule", href: "/dashboard/admin/schedule", icon: Calendar },
  { label: "Finances", href: "/dashboard/admin/finances", icon: CreditCard },
  { label: "Reports", href: "/dashboard/admin/reports", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];

const users = [
  { name: "Alex Thompson", email: "alex@example.com", role: "Member", squad: "U-15 Elite", status: "Active", joined: "Sep 2024" },
  { name: "Coach Williams", email: "williams@example.com", role: "Coach", squad: "U-15, U-17", status: "Active", joined: "Jan 2023" },
  { name: "Marcus Johnson", email: "marcus@example.com", role: "Member", squad: "U-15 Elite", status: "Active", joined: "Oct 2024" },
  { name: "Sarah Miller", email: "sarah@example.com", role: "Admin", squad: "—", status: "Active", joined: "Mar 2022" },
  { name: "David Chen", email: "david@example.com", role: "Member", squad: "U-17 Premier", status: "Inactive", joined: "Aug 2024" },
  { name: "Emma Wilson", email: "emma@example.com", role: "Member", squad: "U-13 Development", status: "Active", joined: "Nov 2024" },
];

const AdminUsers = () => {
  return (
    <DashboardLayout title="Users" navItems={navItems} userRole="Admin" userName="John Mitchell">
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Search users..." className="pl-10" />
          </div>
          <Button variant="accent"><UserPlus className="w-4 h-4 mr-2" />Add User</Button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />All Users ({users.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {users.map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                          {user.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-foreground">{user.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1"><Mail className="w-3 h-3" />{user.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center hidden md:block"><div className="text-sm font-medium">{user.role}</div><div className="text-xs text-muted-foreground">Role</div></div>
                      <div className="text-center hidden lg:block"><div className="text-sm font-medium">{user.squad}</div><div className="text-xs text-muted-foreground">Squad</div></div>
                      <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${user.status === "Active" ? "bg-primary/10 text-primary border-primary/20" : "bg-muted text-muted-foreground border-border"}`}>{user.status}</span>
                      <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AdminUsers;
