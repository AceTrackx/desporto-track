import { motion } from "framer-motion";
import { Home, Users, Calendar, BarChart3, Settings, ChevronLeft, ChevronRight, Plus, Clock, MapPin } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", href: "/dashboard/admin", icon: Home },
  { label: "Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Schedule", href: "/dashboard/admin/schedule", icon: Calendar },
  { label: "Reports", href: "/dashboard/admin/reports", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];

const sessions = [
  { title: "U-15 Technical Training", coach: "Coach Williams", time: "10:00 AM", location: "Field A", squad: "U-15 Elite" },
  { title: "U-17 Tactical Session", coach: "Coach Johnson", time: "2:00 PM", location: "Field B", squad: "U-17 Premier" },
  { title: "U-13 Development", coach: "Coach Williams", time: "4:00 PM", location: "Field A", squad: "U-13 Development" },
];

const AdminSchedule = () => {
  return (
    <DashboardLayout title="Schedule" navItems={navItems} userRole="Admin" userName="John Mitchell">
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="rounded-2xl border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2"><Calendar className="w-5 h-5 text-primary" />January 2026</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon"><ChevronLeft className="w-4 h-4" /></Button>
                <Button variant="outline" size="sm">Today</Button>
                <Button variant="outline" size="icon"><ChevronRight className="w-4 h-4" /></Button>
                <Button variant="accent" size="sm"><Plus className="w-4 h-4 mr-1" />Add Session</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sessions.map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-1 h-14 rounded-full bg-primary" />
                      <div>
                        <div className="font-semibold text-foreground">{session.title}</div>
                        <div className="text-sm text-muted-foreground">{session.coach} • {session.squad}</div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{session.time}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{session.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="default" size="sm">View</Button>
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

export default AdminSchedule;
