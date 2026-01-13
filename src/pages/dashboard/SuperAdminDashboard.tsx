import { motion } from "framer-motion";
import {
  Home,
  MapPin,
  Users,
  BarChart3,
  Settings,
  CreditCard,
  TrendingUp,
  Calendar,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const navItems = [
  { label: "Dashboard", href: "/dashboard/superadmin", icon: Home },
  { label: "Grounds", href: "/dashboard/superadmin/grounds", icon: MapPin },
  { label: "All Players", href: "/dashboard/superadmin/players", icon: Users },
  { label: "Coaches", href: "/dashboard/superadmin/coaches", icon: Users },
  { label: "Finances", href: "/dashboard/superadmin/finances", icon: CreditCard },
  { label: "Analytics", href: "/dashboard/superadmin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/superadmin/settings", icon: Settings },
];

const overviewStats = [
  { label: "Total Players", value: "248", change: "+24", icon: Users, color: "text-primary" },
  { label: "Active Coaches", value: "12", change: "+2", icon: Users, color: "text-teal" },
  { label: "Monthly Revenue", value: "$58.5K", change: "+18%", icon: TrendingUp, color: "text-coral" },
  { label: "Training Grounds", value: "4", change: "Active", icon: MapPin, color: "text-primary" },
];

const grounds = [
  { name: "Main Stadium Field", type: "Full Size", status: "available", bookings: 12, capacity: "22 players" },
  { name: "Training Ground A", type: "Half Field", status: "in-use", bookings: 8, capacity: "15 players" },
  { name: "Training Ground B", type: "Half Field", status: "available", bookings: 6, capacity: "15 players" },
  { name: "Indoor Facility", type: "Indoor", status: "maintenance", bookings: 0, capacity: "12 players" },
];

const upcomingEvents = [
  { title: "U-17 vs City FC", type: "Match", date: "Today, 3:00 PM", ground: "Main Stadium" },
  { title: "Coaches Meeting", type: "Meeting", date: "Tomorrow, 10:00 AM", ground: "Indoor Facility" },
  { title: "U-15 Tournament", type: "Tournament", date: "Sat, Jan 18", ground: "Main Stadium" },
  { title: "Parent Open Day", type: "Event", date: "Sun, Jan 19", ground: "All Grounds" },
];

const recentAlerts = [
  { type: "warning", message: "Indoor Facility maintenance scheduled", time: "2 hours ago" },
  { type: "success", message: "Monthly payments collected: 94%", time: "Today" },
  { type: "info", message: "3 new trial session requests", time: "Today" },
];

const SuperAdminDashboard = () => {
  return (
    <DashboardLayout
      title="Owner Dashboard"
      navItems={navItems}
      userRole="Owner"
      userName="Michael Roberts"
    >
      <div className="space-y-8">
        {/* Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {overviewStats.map((stat, index) => (
            <Card key={index} className="rounded-2xl border border-border overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-primary">{stat.change}</span>
                </div>
                <div className="font-display text-3xl text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Grounds Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="rounded-2xl border border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Training Grounds
                </CardTitle>
                <Button variant="accent" size="sm">Manage Grounds</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {grounds.map((ground, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-1 h-10 rounded-full ${
                          ground.status === "available" ? "bg-primary" : 
                          ground.status === "in-use" ? "bg-teal" : "bg-coral"
                        }`} />
                        <div className="flex-1">
                          <div className="font-semibold text-foreground">{ground.name}</div>
                          <div className="text-sm text-muted-foreground">{ground.type} • {ground.capacity}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                          ground.status === "available" ? "bg-primary/10 text-primary border-primary/20" : 
                          ground.status === "in-use" ? "bg-teal/10 text-teal border-teal/20" : 
                          "bg-coral/10 text-coral border-coral/20"
                        }`}>
                          {ground.status === "in-use" ? "In Use" : ground.status === "maintenance" ? "Maintenance" : "Available"}
                        </span>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="rounded-2xl border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  Recent Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentAlerts.map((alert, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      alert.type === "warning" ? "bg-accent/10" :
                      alert.type === "success" ? "bg-primary/10" : "bg-teal/10"
                    }`}>
                      {alert.type === "warning" ? (
                        <AlertTriangle className="w-4 h-4 text-accent-foreground" />
                      ) : (
                        <CheckCircle2 className={`w-4 h-4 ${alert.type === "success" ? "text-primary" : "text-teal"}`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground">{alert.message}</div>
                      <div className="text-xs text-muted-foreground">{alert.time}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Upcoming Events
              </CardTitle>
              <Button variant="accent" size="sm">View Calendar</Button>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border w-fit mb-3 ${
                      event.type === "Match" ? "bg-coral/10 text-coral border-coral/20" :
                      event.type === "Tournament" ? "bg-primary/10 text-primary border-primary/20" :
                      event.type === "Meeting" ? "bg-teal/10 text-teal border-teal/20" :
                      "bg-accent/10 text-accent-foreground border-accent/20"
                    }`}>
                      {event.type}
                    </div>
                    <div className="font-semibold text-foreground mb-1">{event.title}</div>
                    <div className="text-sm text-muted-foreground">{event.date}</div>
                    <div className="text-xs text-muted-foreground mt-2">{event.ground}</div>
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
