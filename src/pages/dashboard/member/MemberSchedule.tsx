import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Calendar,
  BarChart3,
  Trophy,
  Clock,
  MapPin,
  UserCheck,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePlayerUpcomingSessions, usePlayerAssignment } from "@/hooks/useMemberData";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, isToday } from "date-fns";

const navItems = [
  { label: "Dashboard", href: "/dashboard/member", icon: Home },
  { label: "Schedule", href: "/dashboard/member/schedule", icon: Calendar },
  { label: "My Progress", href: "/dashboard/member/progress", icon: BarChart3 },
  { label: "Attendance", href: "/dashboard/member/attendance", icon: UserCheck },
  { label: "Achievements", href: "/dashboard/member/achievements", icon: Trophy },
];

const MemberSchedule = () => {
  const navigate = useNavigate();
  const { data: upcomingData, isLoading } = usePlayerUpcomingSessions();
  const { data: assignment } = usePlayerAssignment();

  // Get current week days
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 0 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

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

  // Get upcoming events (next 5)
  const upcomingEvents = allEvents
    .filter(e => e.date >= today)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  return (
    <DashboardLayout
      title="My Schedule"
      navItems={navItems}
      userRole="Member"
      
    >
      <div className="space-y-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate("/dashboard/member")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
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

        {/* Week View */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="rounded-2xl border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                This Week
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/dashboard/member/schedule/calendar")}
                className="flex items-center gap-1"
              >
                View Full Calendar
                <ChevronRight className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map(day => {
                  const dayEvents = getEventsForDay(day);
                  const isTodayDay = isToday(day);
                  return (
                    <div
                      key={day.toISOString()}
                      className={`min-h-[120px] p-3 rounded-xl border transition-colors ${
                        isTodayDay 
                          ? "bg-primary/10 border-primary/30 ring-2 ring-primary/20" 
                          : "bg-card border-border hover:border-primary/20"
                      }`}
                    >
                      <div className="text-center mb-2">
                        <div className="text-xs text-muted-foreground uppercase">
                          {format(day, "EEE")}
                        </div>
                        <div className={`text-lg font-semibold ${isTodayDay ? "text-primary" : "text-foreground"}`}>
                          {format(day, "d")}
                        </div>
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 3).map(event => (
                          <div
                            key={event.id}
                            className={`text-xs px-2 py-1.5 rounded-lg ${
                              event.type === "match" 
                                ? "bg-coral/20 text-coral border border-coral/20" 
                                : "bg-primary/20 text-primary border border-primary/20"
                            }`}
                          >
                            <div className="font-medium truncate">{event.title}</div>
                            <div className="text-[10px] opacity-80">{event.time}</div>
                          </div>
                        ))}
                        {dayEvents.length > 3 && (
                          <div className="text-xs text-center text-muted-foreground">
                            +{dayEvents.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Events */}
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
              ) : upcomingEvents.length > 0 ? (
                upcomingEvents.map((event, index) => (
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
                    <Badge 
                      className={event.type === "match" 
                        ? "bg-coral/10 text-coral border-coral/20" 
                        : "bg-primary/10 text-primary border-primary/20"
                      } 
                      variant="outline"
                    >
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
