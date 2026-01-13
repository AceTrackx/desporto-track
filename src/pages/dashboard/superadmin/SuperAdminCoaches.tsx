import { motion } from "framer-motion";
import {
  Home,
  MapPin,
  Users,
  BarChart3,
  Settings,
  CreditCard,
  Search,
  Plus,
  Star,
  Calendar,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

const coaches = [
  { 
    name: "Coach Williams", 
    specialization: "Technical Training", 
    teams: ["U-15 Elite", "U-17 Premier"],
    players: 56,
    sessionsThisWeek: 8,
    rating: 4.8,
    status: "active",
    salary: 4500,
  },
  { 
    name: "Coach Davis", 
    specialization: "Youth Development", 
    teams: ["U-13 Development"],
    players: 42,
    sessionsThisWeek: 6,
    rating: 4.6,
    status: "active",
    salary: 4000,
  },
  { 
    name: "Coach Martinez", 
    specialization: "Goalkeeping", 
    teams: ["All Squads"],
    players: 18,
    sessionsThisWeek: 10,
    rating: 4.9,
    status: "active",
    salary: 4200,
  },
  { 
    name: "Coach Thompson", 
    specialization: "Fitness & Conditioning", 
    teams: ["U-17 Premier", "U-15 Elite"],
    players: 83,
    sessionsThisWeek: 12,
    rating: 4.7,
    status: "active",
    salary: 4300,
  },
  { 
    name: "Coach Brown", 
    specialization: "Beginners Training", 
    teams: ["U-11 Beginners"],
    players: 28,
    sessionsThisWeek: 5,
    rating: 4.5,
    status: "on-leave",
    salary: 3500,
  },
];

const upcomingSessions = [
  { coach: "Coach Williams", session: "U-17 Match Prep", time: "Today, 10:00 AM", ground: "Main Stadium" },
  { coach: "Coach Davis", session: "U-13 Technical", time: "Today, 2:00 PM", ground: "Training Ground A" },
  { coach: "Coach Martinez", session: "GK Training", time: "Today, 4:00 PM", ground: "Training Ground B" },
  { coach: "Coach Thompson", session: "Fitness Session", time: "Tomorrow, 9:00 AM", ground: "Indoor Facility" },
];

const SuperAdminCoaches = () => {
  return (
    <DashboardLayout
      title="Coaches"
      navItems={navItems}
      userRole="Owner"
      userName="Michael Roberts"
    >
      <div className="space-y-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: "Total Coaches", value: "12", icon: Users },
            { label: "Active Today", value: "8", icon: Calendar },
            { label: "Avg Rating", value: "4.7", icon: Star },
            { label: "Monthly Payroll", value: "₹40L", icon: CreditCard },
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

        {/* Coaches List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                All Coaches
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search coaches..." className="pl-9 w-64" />
                </div>
                <Button variant="accent" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Coach
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-4">
                {coaches.map((coach, index) => (
                  <div key={index} className="p-5 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {coach.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-foreground">{coach.name}</div>
                          <div className="text-sm text-muted-foreground">{coach.specialization}</div>
                        </div>
                      </div>
                      <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                        coach.status === "active" ? "bg-primary/10 text-primary border-primary/20" : 
                        "bg-accent/10 text-accent-foreground border-accent/20"
                      }`}>
                        {coach.status === "active" ? "Active" : "On Leave"}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {coach.teams.map((team, tIndex) => (
                        <span key={tIndex} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-lg">
                          {team}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-muted rounded-xl">
                        <div className="text-lg font-semibold text-foreground">{coach.players}</div>
                        <div className="text-xs text-muted-foreground">Players</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-xl">
                        <div className="text-lg font-semibold text-foreground">{coach.sessionsThisWeek}</div>
                        <div className="text-xs text-muted-foreground">Sessions/Week</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-xl">
                        <div className="text-lg font-semibold text-primary flex items-center justify-center gap-1">
                          <Star className="w-4 h-4" />
                          {coach.rating}
                        </div>
                        <div className="text-xs text-muted-foreground">Rating</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">View Profile</Button>
                      <Button variant="default" size="sm" className="flex-1">Manage</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Upcoming Coach Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingSessions.map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-1 h-12 rounded-full bg-primary" />
                      <div>
                        <div className="font-semibold text-foreground">{session.session}</div>
                        <div className="text-sm text-muted-foreground">{session.coach} • {session.ground}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-foreground">{session.time}</div>
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

export default SuperAdminCoaches;
