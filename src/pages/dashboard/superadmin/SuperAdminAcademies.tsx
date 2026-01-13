import { motion } from "framer-motion";
import {
  Home,
  Building,
  Users,
  BarChart3,
  Shield,
  Settings,
  Plus,
  MapPin,
  TrendingUp,
  Search,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

const navItems = [
  { label: "Dashboard", href: "/dashboard/superadmin", icon: Home },
  { label: "Academies", href: "/dashboard/superadmin/academies", icon: Building },
  { label: "All Users", href: "/dashboard/superadmin/users", icon: Users },
  { label: "Analytics", href: "/dashboard/superadmin/analytics", icon: BarChart3 },
  { label: "Security", href: "/dashboard/superadmin/security", icon: Shield },
  { label: "Settings", href: "/dashboard/superadmin/settings", icon: Settings },
];

const stats = [
  { label: "Total Academies", value: "156", change: "+12 this month", icon: Building, color: "text-primary" },
  { label: "Active", value: "148", change: "95%", icon: TrendingUp, color: "text-teal" },
  { label: "Pending Approval", value: "5", change: "Review needed", icon: Shield, color: "text-accent-foreground" },
  { label: "Total Students", value: "12.4K", change: "+1.2K", icon: Users, color: "text-primary" },
];

const academies = [
  { name: "Elite Football Academy", location: "London, UK", students: 248, coaches: 12, revenue: "$45.2K", status: "active", health: 98 },
  { name: "Premier Youth Sports", location: "Manchester, UK", students: 186, coaches: 8, revenue: "$32.8K", status: "active", health: 95 },
  { name: "Champions Training Center", location: "Liverpool, UK", students: 312, coaches: 15, revenue: "$58.4K", status: "active", health: 92 },
  { name: "Future Stars Academy", location: "Birmingham, UK", students: 124, coaches: 6, revenue: "$18.6K", status: "warning", health: 78 },
  { name: "Victory Football School", location: "Leeds, UK", students: 98, coaches: 5, revenue: "$14.2K", status: "active", health: 88 },
  { name: "Celtic Youth FC", location: "Glasgow, UK", students: 156, coaches: 7, revenue: "$24.8K", status: "pending", health: 0 },
];

const SuperAdminAcademies = () => {
  return (
    <DashboardLayout
      title="Academies"
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
                <div className="font-display text-3xl text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-primary">{stat.change}</div>
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
            <Input placeholder="Search academies..." className="pl-10" />
          </div>
          <Button variant="accent">
            <Plus className="w-4 h-4 mr-2" />
            Add Academy
          </Button>
        </motion.div>

        {/* Academies List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Building className="w-5 h-5 text-primary" />
                All Academies ({academies.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {academies.map((academy, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-1 h-14 rounded-full ${
                      academy.status === "active" ? "bg-primary" :
                      academy.status === "warning" ? "bg-accent" : "bg-muted"
                    }`} />
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">{academy.name}</div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5" />
                        {academy.location}
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span>{academy.students} students</span>
                        <span>{academy.coaches} coaches</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right hidden md:block">
                      <div className="font-semibold text-primary">{academy.revenue}</div>
                      <div className="text-xs text-muted-foreground">Monthly Revenue</div>
                    </div>
                    
                    {academy.status !== "pending" && (
                      <div className="w-24 hidden lg:block">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Health</span>
                          <span className={`font-semibold ${
                            academy.health >= 90 ? "text-primary" :
                            academy.health >= 80 ? "text-accent-foreground" : "text-coral"
                          }`}>
                            {academy.health}%
                          </span>
                        </div>
                        <Progress value={academy.health} className="h-2" />
                      </div>
                    )}

                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                      academy.status === "active" ? "bg-primary/10 text-primary border-primary/20" :
                      academy.status === "warning" ? "bg-accent/10 text-accent-foreground border-accent/20" :
                      "bg-muted text-muted-foreground border-border"
                    }`}>
                      {academy.status.charAt(0).toUpperCase() + academy.status.slice(1)}
                    </span>

                    <Button variant="outline" size="sm">Manage</Button>
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

export default SuperAdminAcademies;
