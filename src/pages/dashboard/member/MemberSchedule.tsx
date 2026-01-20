import { useState } from "react";
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
  UserCheck,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePlayerUpcomingSessions, usePlayerAssignment } from "@/hooks/useMemberData";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from "date-fns";

const navItems = [
  { label: "Dashboard", href: "/dashboard/member", icon: Home },
  { label: "Schedule", href: "/dashboard/member/schedule", icon: Calendar },
  { label: "My Progress", href: "/dashboard/member/progress", icon: BarChart3 },
  { label: "Attendance", href: "/dashboard/member/attendance", icon: UserCheck },
  { label: "Achievements", href: "/dashboard/member/achievements", icon: Trophy },
];

const MemberSchedule = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { data: upcomingData, isLoading } = usePlayerUpcomingSessions();
  const { data: assignment } = usePlayerAssignment();

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Combine sessions and matches for calendar
  const allEvents = [
    ...(upcomingData?.sessions || []).map(s => ({
      id: s.id,
      title: s.focus_area || "Training",
      date: new Date(s.session_date),
      type: "session" as const,
      location: s.ground?.name,
      time: format(new Date(s.session_date), "h:mm a"),
    })),
    ...(upcomingData?.matches || []).map(m => ({
      id: m.id,
      title: `vs ${m.opponent_name}`,
      date: new Date(m.match_date),
      type: "match" as const,
      location: m.venue || m.ground?.name,
      time: format(new Date(m.match_date), "h:mm a"),
    })),
  ];

  const getEventsForDay = (day: Date) => allEvents.filter(e => isSameDay(e.date, day));

  return (
    <DashboardLayout
      title="My Schedule"
      navItems={navItems}
      userRole="Member"
      userName="Alex Thompson"
    >
      <div className="space-y-8">
        {/* Ground Info */}
        {assignment && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="rounded-2xl border border-border bg-primary/5">
              <CardContent className="p-4 flex items-center gap-4">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <span className="font-medium text-foreground">{assignment.ground?.name}</span>
                  <span className="text-muted-foreground"> • Coach: {assignment.primary_coach?.full_name}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Calendar View */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="rounded-2xl border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                {format(currentMonth, "MMMM yyyy")}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentMonth(new Date())}>Today</Button>
                <Button variant="outline" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                  <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: monthStart.getDay() }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                {daysInMonth.map(day => {
                  const dayEvents = getEventsForDay(day);
                  const isToday = isSameDay(day, new Date());
                  return (
                    <div
                      key={day.toISOString()}
                      className={`aspect-square p-1 rounded-xl border transition-colors ${
                        isToday ? "bg-primary/10 border-primary/30" : "bg-card border-border hover:border-primary/20"
                      }`}
                    >
                      <div className={`text-xs text-center mb-1 ${isToday ? "text-primary font-bold" : "text-foreground"}`}>
                        {format(day, "d")}
                      </div>
                      <div className="space-y-0.5">
                        {dayEvents.slice(0, 2).map(event => (
                          <div
                            key={event.id}
                            className={`text-[10px] px-1 py-0.5 rounded truncate ${
                              event.type === "match" ? "bg-coral/20 text-coral" : "bg-primary/20 text-primary"
                            }`}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-[10px] text-muted-foreground text-center">+{dayEvents.length - 2}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Events List */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {isLoading ? (
                <div className="text-center py-8 text-muted-foreground">Loading...</div>
              ) : allEvents.length > 0 ? (
                allEvents.slice(0, 10).map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-1 h-14 rounded-full ${event.type === "match" ? "bg-coral" : "bg-primary"}`} />
                      <div>
                        <div className="font-semibold text-foreground">{event.title}</div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {format(event.date, "EEE, MMM d")}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {event.time}
                          </span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                            <MapPin className="w-3.5 h-3.5" />
                            {event.location}
                          </div>
                        )}
                      </div>
                    </div>
                    <Badge className={event.type === "match" ? "bg-coral/10 text-coral border-coral/20" : "bg-primary/10 text-primary border-primary/20"} variant="outline">
                      {event.type === "match" ? "Match" : "Training"}
                    </Badge>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">No upcoming events scheduled</div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default MemberSchedule;
