import { motion } from "framer-motion";
import {
  Home,
  Calendar,
  BarChart3,
  Trophy,
  Clock,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", href: "/dashboard/member", icon: Home },
  { label: "Schedule", href: "/dashboard/member/schedule", icon: Calendar },
  { label: "My Progress", href: "/dashboard/member/progress", icon: BarChart3 },
  { label: "Achievements", href: "/dashboard/member/achievements", icon: Trophy },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const currentWeek = [
  { day: "Mon", date: 13, sessions: [{ title: "Technical Training", time: "10:00 AM", type: "Training" }] },
  { day: "Tue", date: 14, sessions: [{ title: "Match vs City FC", time: "2:00 PM", type: "Match" }] },
  { day: "Wed", date: 15, sessions: [{ title: "Fitness Session", time: "9:00 AM", type: "Fitness" }] },
  { day: "Thu", date: 16, sessions: [] },
  { day: "Fri", date: 17, sessions: [{ title: "Tactical Training", time: "4:00 PM", type: "Training" }] },
  { day: "Sat", date: 18, sessions: [{ title: "Friendly Match", time: "11:00 AM", type: "Match" }] },
  { day: "Sun", date: 19, sessions: [] },
];

const upcomingEvents = [
  { title: "Technical Training", date: "Mon, Jan 13", time: "10:00 AM - 12:00 PM", location: "Main Field", type: "Training", attendees: 18 },
  { title: "Match vs City FC", date: "Tue, Jan 14", time: "2:00 PM - 4:00 PM", location: "Stadium A", type: "Match", attendees: 22 },
  { title: "Fitness Session", date: "Wed, Jan 15", time: "9:00 AM - 10:30 AM", location: "Gym", type: "Fitness", attendees: 16 },
  { title: "Tactical Training", date: "Fri, Jan 17", time: "4:00 PM - 6:00 PM", location: "Training Ground B", type: "Training", attendees: 20 },
  { title: "Friendly Match", date: "Sat, Jan 18", time: "11:00 AM - 1:00 PM", location: "Main Field", type: "Match", attendees: 22 },
];

const MemberSchedule = () => {
  return (
    <DashboardLayout
      title="My Schedule"
      navItems={navItems}
      userRole="Member"
      userName="Alex Thompson"
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
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {currentWeek.map((day, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-2xl border transition-colors ${
                      day.date === 13 
                        ? "bg-primary/5 border-primary/20" 
                        : "bg-card border-border hover:border-primary/20"
                    }`}
                  >
                    <div className="text-center mb-3">
                      <div className="text-xs text-muted-foreground">{day.day}</div>
                      <div className={`font-display text-2xl ${
                        day.date === 13 ? "text-primary" : "text-foreground"
                      }`}>
                        {day.date}
                      </div>
                    </div>
                    {day.sessions.length > 0 ? (
                      <div className="space-y-1">
                        {day.sessions.map((session, sIndex) => (
                          <div
                            key={sIndex}
                            className={`p-2 rounded-lg text-xs ${
                              session.type === "Match" ? "bg-coral/10 text-coral" :
                              session.type === "Fitness" ? "bg-teal/10 text-teal" : 
                              "bg-primary/10 text-primary"
                            }`}
                          >
                            <div className="font-medium truncate">{session.title}</div>
                            <div className="opacity-70">{session.time}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-xs text-muted-foreground text-center py-2">
                        No sessions
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Events List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-1 h-14 rounded-full ${
                      event.type === "Match" ? "bg-coral" :
                      event.type === "Fitness" ? "bg-teal" : "bg-primary"
                    }`} />
                    <div>
                      <div className="font-semibold text-foreground">{event.title}</div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {event.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {event.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {event.attendees} attending
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                      event.type === "Match" ? "bg-coral/10 text-coral border-coral/20" :
                      event.type === "Fitness" ? "bg-teal/10 text-teal border-teal/20" : 
                      "bg-primary/10 text-primary border-primary/20"
                    }`}>
                      {event.type}
                    </span>
                    <Button variant="outline" size="sm">View Details</Button>
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

export default MemberSchedule;
