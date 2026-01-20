import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Calendar,
  BarChart3,
  Trophy,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  ArrowLeft,
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

const MemberScheduleCalendar = () => {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { data: upcomingData } = usePlayerUpcomingSessions();
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
      title="Full Calendar"
      navItems={navItems}
      userRole="Member"
      userName="Alex Thompson"
    >
      <div className="space-y-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate("/dashboard/member/schedule")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Schedule
        </Button>

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

        {/* Full Calendar View */}
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
              <div className="grid grid-cols-7 gap-2 mb-3">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: monthStart.getDay() }).map((_, i) => (
                  <div key={`empty-${i}`} className="min-h-[100px]" />
                ))}
                {daysInMonth.map(day => {
                  const dayEvents = getEventsForDay(day);
                  const isToday = isSameDay(day, new Date());
                  return (
                    <div
                      key={day.toISOString()}
                      className={`min-h-[100px] p-2 rounded-xl border transition-colors ${
                        isToday ? "bg-primary/10 border-primary/30" : "bg-card border-border hover:border-primary/20"
                      }`}
                    >
                      <div className={`text-sm mb-2 ${isToday ? "text-primary font-bold" : "text-foreground"}`}>
                        {format(day, "d")}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.map(event => (
                          <div
                            key={event.id}
                            className={`text-xs px-2 py-1 rounded-lg ${
                              event.type === "match" ? "bg-coral/20 text-coral" : "bg-primary/20 text-primary"
                            }`}
                          >
                            <div className="font-medium truncate">{event.title}</div>
                            <div className="text-[10px] opacity-80">{event.time}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Event Legend */}
        <Card className="rounded-2xl border border-border">
          <CardContent className="p-4 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">Training Session</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-coral" />
              <span className="text-sm text-muted-foreground">Match</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MemberScheduleCalendar;
