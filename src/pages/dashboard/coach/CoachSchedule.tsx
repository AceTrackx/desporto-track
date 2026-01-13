import { motion } from "framer-motion";
import {
  Home,
  Calendar,
  Users,
  ClipboardCheck,
  BarChart3,
  FileText,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", href: "/dashboard/coach", icon: Home },
  { label: "Schedule", href: "/dashboard/coach/schedule", icon: Calendar },
  { label: "My Teams", href: "/dashboard/coach/teams", icon: Users },
  { label: "Attendance", href: "/dashboard/coach/attendance", icon: ClipboardCheck },
  { label: "Analytics", href: "/dashboard/coach/analytics", icon: BarChart3 },
  { label: "Reports", href: "/dashboard/coach/reports", icon: FileText },
];

const weekDays = [
  { day: "Mon", date: 13, sessions: [
    { title: "U-15 Technical", time: "10:00 AM", players: 18, location: "Field A" },
    { title: "U-17 Tactics", time: "3:00 PM", players: 22, location: "Field B" },
  ]},
  { day: "Tue", date: 14, sessions: [
    { title: "U-13 Development", time: "9:00 AM", players: 16, location: "Field A" },
  ]},
  { day: "Wed", date: 15, sessions: [
    { title: "U-15 Match Prep", time: "2:00 PM", players: 18, location: "Main Field" },
    { title: "U-17 Fitness", time: "5:00 PM", players: 22, location: "Gym" },
  ]},
  { day: "Thu", date: 16, sessions: [
    { title: "U-13 Technical", time: "10:00 AM", players: 16, location: "Field A" },
  ]},
  { day: "Fri", date: 17, sessions: [
    { title: "U-15 Tactics", time: "3:00 PM", players: 18, location: "Field B" },
  ]},
  { day: "Sat", date: 18, sessions: [
    { title: "U-17 Match", time: "11:00 AM", players: 22, location: "Stadium" },
    { title: "U-15 Friendly", time: "2:00 PM", players: 18, location: "Main Field" },
  ]},
  { day: "Sun", date: 19, sessions: [] },
];

const upcomingSessions = [
  { title: "U-15 Technical Training", date: "Mon, Jan 13", time: "10:00 AM - 12:00 PM", location: "Field A", team: "U-15 Elite", players: 18 },
  { title: "U-17 Tactical Session", date: "Mon, Jan 13", time: "3:00 PM - 5:00 PM", location: "Field B", team: "U-17 Premier", players: 22 },
  { title: "U-13 Development", date: "Tue, Jan 14", time: "9:00 AM - 11:00 AM", location: "Field A", team: "U-13 Development", players: 16 },
  { title: "U-15 Match Preparation", date: "Wed, Jan 15", time: "2:00 PM - 4:00 PM", location: "Main Field", team: "U-15 Elite", players: 18 },
];

const CoachSchedule = () => {
  return (
    <DashboardLayout
      title="Schedule"
      navItems={navItems}
      userRole="Coach"
      userName="Coach Williams"
    >
      <div className="space-y-8">
        {/* Week View */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                January 2026
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">Today</Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button variant="accent" size="sm">
                  <Plus className="w-4 h-4 mr-1" /> Add Session
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-2xl border min-h-[160px] transition-colors ${
                      day.date === 13 
                        ? "bg-primary/5 border-primary/20" 
                        : "bg-card border-border hover:border-primary/20"
                    }`}
                  >
                    <div className="text-center mb-3">
                      <div className="text-xs text-muted-foreground">{day.day}</div>
                      <div className={`font-display text-xl ${
                        day.date === 13 ? "text-primary" : "text-foreground"
                      }`}>
                        {day.date}
                      </div>
                    </div>
                    <div className="space-y-1">
                      {day.sessions.map((session, sIndex) => (
                        <div
                          key={sIndex}
                          className="p-2 rounded-lg bg-primary/10 text-xs cursor-pointer hover:bg-primary/20 transition-colors"
                        >
                          <div className="font-medium text-primary truncate">{session.title}</div>
                          <div className="text-primary/70">{session.time}</div>
                          <div className="flex items-center gap-1 text-primary/60 mt-1">
                            <Users className="w-3 h-3" />
                            <span>{session.players}</span>
                          </div>
                        </div>
                      ))}
                      {day.sessions.length === 0 && (
                        <div className="text-xs text-muted-foreground text-center py-4">
                          No sessions
                        </div>
                      )}
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
          transition={{ delay: 0.1 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Upcoming Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingSessions.map((session, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-1 h-16 rounded-full bg-primary" />
                    <div>
                      <div className="font-semibold text-foreground">{session.title}</div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {session.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {session.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {session.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {session.players} players
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                      {session.team}
                    </span>
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="default" size="sm">Start</Button>
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

export default CoachSchedule;
