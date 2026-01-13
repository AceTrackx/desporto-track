import { motion } from "framer-motion";
import {
  Home,
  Building,
  Users,
  BarChart3,
  Settings,
  Shield,
  Globe,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const navItems = [
  { label: "Dashboard", href: "/dashboard/superadmin", icon: Home },
  { label: "Academies", href: "/dashboard/superadmin/academies", icon: Building },
  { label: "All Users", href: "/dashboard/superadmin/users", icon: Users },
  { label: "Analytics", href: "/dashboard/superadmin/analytics", icon: BarChart3 },
  { label: "Security", href: "/dashboard/superadmin/security", icon: Shield },
  { label: "Settings", href: "/dashboard/superadmin/settings", icon: Settings },
];

const globalStats = [
  { label: "Total Academies", value: "156", change: "+24", icon: Building, color: "bg-primary" },
  { label: "Total Users", value: "12.4K", change: "+1.2K", icon: Users, color: "bg-accent" },
  { label: "Active Sessions", value: "3.2K", change: "+15%", icon: Globe, color: "bg-teal" },
  { label: "Platform Revenue", value: "$2.1M", change: "+32%", icon: TrendingUp, color: "bg-coral" },
];

const academies = [
  { name: "Elite Football Academy", location: "London, UK", students: 248, status: "active", health: 98 },
  { name: "Premier Youth Sports", location: "Manchester, UK", students: 186, status: "active", health: 95 },
  { name: "Champions Training Center", location: "Liverpool, UK", students: 312, status: "active", health: 92 },
  { name: "Future Stars Academy", location: "Birmingham, UK", students: 124, status: "warning", health: 78 },
  { name: "Victory Football School", location: "Leeds, UK", students: 98, status: "active", health: 88 },
];

const systemAlerts = [
  { type: "warning", message: "Future Stars Academy payment overdue", time: "2 hours ago" },
  { type: "info", message: "New academy registration: Celtic Youth FC", time: "5 hours ago" },
  { type: "success", message: "System update completed successfully", time: "1 day ago" },
  { type: "warning", message: "High server load detected in EU region", time: "2 days ago" },
];

const SuperAdminDashboard = () => {
  return (
    <DashboardLayout
      title="Super Admin"
      navItems={navItems}
      userRole="Super Admin"
      userName="Michael Roberts"
    >
      <div className="space-y-8">
        {/* Global Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {globalStats.map((stat, index) => (
            <Card key={index} className="rounded-2xl border border-border overflow-hidden">
              <div className={`h-1 ${stat.color}`} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-primary">{stat.change}</span>
                </div>
                <div className="font-display text-3xl text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Academies Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="rounded-2xl border border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-display text-2xl tracking-wide flex items-center gap-2">
                  <Building className="w-6 h-6 text-primary" />
                  ACADEMIES
                </CardTitle>
                <Button variant="accent" size="sm">Add Academy</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {academies.map((academy, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-3 h-12 rounded-full ${
                          academy.status === "active" ? "bg-primary" : "bg-accent"
                        }`} />
                        <div className="flex-1">
                          <div className="font-semibold text-foreground">{academy.name}</div>
                          <div className="text-sm text-muted-foreground">{academy.location} • {academy.students} students</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Health</div>
                          <div className={`font-bold ${
                            academy.health >= 90 ? "text-primary" :
                            academy.health >= 80 ? "text-accent-foreground" : "text-coral"
                          }`}>
                            {academy.health}%
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Manage</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* System Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="rounded-2xl border border-border">
              <CardHeader>
                <CardTitle className="font-display text-2xl tracking-wide flex items-center gap-2">
                  <Shield className="w-6 h-6 text-primary" />
                  SYSTEM ALERTS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {systemAlerts.map((alert, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-xl">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      alert.type === "warning" ? "bg-accent/20" :
                      alert.type === "success" ? "bg-primary/20" : "bg-teal/20"
                    }`}>
                      {alert.type === "warning" ? (
                        <AlertTriangle className="w-4 h-4 text-accent-foreground" />
                      ) : alert.type === "success" ? (
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      ) : (
                        <Globe className="w-4 h-4 text-teal" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">{alert.message}</div>
                      <div className="text-xs text-muted-foreground">{alert.time}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Platform Health */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardHeader>
              <CardTitle className="font-display text-2xl tracking-wide flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-primary" />
                PLATFORM HEALTH
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { label: "Server Uptime", value: 99.9, unit: "%" },
                  { label: "API Response", value: 45, unit: "ms" },
                  { label: "Active Connections", value: 3247, unit: "" },
                  { label: "Storage Used", value: 68, unit: "%" },
                ].map((metric, index) => (
                  <div key={index} className="text-center p-6 bg-muted/50 rounded-2xl">
                    <div className="font-display text-4xl text-foreground">
                      {metric.value}{metric.unit}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{metric.label}</div>
                    {metric.label.includes("%") || metric.label === "Storage Used" ? (
                      <Progress value={metric.value} className="h-2 mt-3" />
                    ) : null}
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

export default SuperAdminDashboard;
