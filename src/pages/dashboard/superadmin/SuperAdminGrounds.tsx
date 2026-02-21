import { motion } from "framer-motion";
import {
  Home,
  MapPin,
  Users,
  BarChart3,
  Settings,
  CreditCard,
  Plus,
  Calendar,
  Clock,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import AddGroundDialog from "@/components/grounds/AddGroundDialog";
import { useGrounds } from "@/hooks/useGrounds";

const navItems = [
  { label: "Dashboard", href: "/dashboard/superadmin", icon: Home },
  { label: "Grounds", href: "/dashboard/superadmin/grounds", icon: MapPin },
  { label: "All Players", href: "/dashboard/superadmin/players", icon: Users },
  { label: "Coaches", href: "/dashboard/superadmin/coaches", icon: Users },
  { label: "Finances", href: "/dashboard/superadmin/finances", icon: CreditCard },
  { label: "Analytics", href: "/dashboard/superadmin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/superadmin/settings", icon: Settings },
];

const grounds = [
  { 
    name: "Main Stadium Field", 
    type: "Full Size (100x70m)", 
    status: "available", 
    surface: "Natural Grass",
    facilities: ["Floodlights", "Changing Rooms", "First Aid"],
    weeklyBookings: 18,
    maxBookings: 28,
    revenue: 4500,
  },
  { 
    name: "Training Ground A", 
    type: "Half Field (50x35m)", 
    status: "in-use", 
    surface: "Artificial Turf",
    facilities: ["Floodlights", "Goals"],
    weeklyBookings: 24,
    maxBookings: 35,
    revenue: 2800,
  },
  { 
    name: "Training Ground B", 
    type: "Half Field (50x35m)", 
    status: "available", 
    surface: "Artificial Turf",
    facilities: ["Floodlights", "Goals"],
    weeklyBookings: 20,
    maxBookings: 35,
    revenue: 2400,
  },
  { 
    name: "Indoor Facility", 
    type: "Indoor Court (40x20m)", 
    status: "maintenance", 
    surface: "Indoor Turf",
    facilities: ["Climate Control", "Sound System"],
    weeklyBookings: 0,
    maxBookings: 42,
    revenue: 0,
  },
];

const todaySchedule = [
  { ground: "Main Stadium", session: "U-17 Match Prep", time: "9:00 AM - 11:00 AM", coach: "Coach Williams" },
  { ground: "Training Ground A", session: "U-15 Technical", time: "10:00 AM - 12:00 PM", coach: "Coach Davis" },
  { ground: "Main Stadium", session: "U-17 vs City FC", time: "3:00 PM - 5:00 PM", coach: "All Coaches" },
  { ground: "Training Ground B", session: "U-13 Development", time: "4:00 PM - 5:30 PM", coach: "Coach Martinez" },
];

const SuperAdminGrounds = () => {
  return (
    <DashboardLayout
      title="Training Grounds"
      navItems={navItems}
      userRole="Owner"
      userName="Michael Roberts"
    >
      <div className="space-y-8">
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: "Total Grounds", value: "4", icon: MapPin },
            { label: "Available Now", value: "2", icon: MapPin },
            { label: "Weekly Bookings", value: "62", icon: Calendar },
            { label: "Weekly Revenue", value: "$9.7K", icon: CreditCard },
          ].map((stat, index) => (
            <Card key={index} className="rounded-2xl border border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <stat.icon className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
                <div className="font-display text-3xl text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Grounds List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                All Grounds
              </CardTitle>
              <AddGroundDialog />
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-4">
                {grounds.map((ground, index) => (
                  <div key={index} className="p-5 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="font-semibold text-foreground text-lg">{ground.name}</div>
                        <div className="text-sm text-muted-foreground">{ground.type}</div>
                      </div>
                      <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                        ground.status === "available" ? "bg-primary/10 text-primary border-primary/20" : 
                        ground.status === "in-use" ? "bg-teal/10 text-teal border-teal/20" : 
                        "bg-coral/10 text-coral border-coral/20"
                      }`}>
                        {ground.status === "in-use" ? "In Use" : ground.status === "maintenance" ? "Maintenance" : "Available"}
                      </span>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Surface</span>
                        <span className="text-foreground">{ground.surface}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Weekly Revenue</span>
                        <span className="text-foreground font-semibold">${ground.revenue.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Booking Utilization</span>
                        <span className="text-foreground">{ground.weeklyBookings}/{ground.maxBookings}</span>
                      </div>
                      <Progress value={(ground.weeklyBookings / ground.maxBookings) * 100} className="h-2.5" />
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {ground.facilities.map((facility, fIndex) => (
                        <span key={fIndex} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-lg">
                          {facility}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">View Schedule</Button>
                      <Button variant="default" size="sm" className="flex-1">Manage</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Today's Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Today's Ground Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todaySchedule.map((slot, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-1 h-12 rounded-full bg-primary" />
                      <div>
                        <div className="font-semibold text-foreground">{slot.session}</div>
                        <div className="text-sm text-muted-foreground">{slot.ground} • {slot.coach}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-foreground">{slot.time}</div>
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

export default SuperAdminGrounds;
