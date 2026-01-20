import { useState } from "react";
import { motion } from "framer-motion";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";
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
  Activity,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreateSessionDialog } from "@/components/performance/CreateSessionDialog";
import { useSessions } from "@/hooks/useSessions";

const navItems = [
  { label: "Dashboard", href: "/dashboard/coach", icon: Home },
  { label: "Schedule", href: "/dashboard/coach/schedule", icon: Calendar },
  { label: "My Teams", href: "/dashboard/coach/teams", icon: Users },
  { label: "Players", href: "/dashboard/coach/players", icon: Users },
  { label: "Attendance", href: "/dashboard/coach/attendance", icon: ClipboardCheck },
  { label: "Performance", href: "/dashboard/coach/performance", icon: Activity },
  { label: "Analytics", href: "/dashboard/coach/analytics", icon: BarChart3 },
  { label: "Reports", href: "/dashboard/coach/reports", icon: FileText },
];

const CoachSchedule = () => {
  const navigate = useNavigate();
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }));
  const { data: sessions = [], isLoading } = useSessions();

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getSessionsForDay = (date: Date) => {
    return sessions.filter((session) => {
      const sessionDate = new Date(session.session_date);
      return isSameDay(sessionDate, date);
    });
  };

  const upcomingSessions = sessions
    .filter((s) => new Date(s.session_date) >= new Date())
    .sort((a, b) => new Date(a.session_date).getTime() - new Date(b.session_date).getTime())
    .slice(0, 5);

  const handlePrevWeek = () => setWeekStart((prev) => addDays(prev, -7));
  const handleNextWeek = () => setWeekStart((prev) => addDays(prev, 7));
  const handleToday = () => setWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));

  return (
    <DashboardLayout
      title="Schedule"
      navItems={navItems}
      userRole="Coach"
      userName="Coach Williams"
    >
      <div className="space-y-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate("/dashboard/coach")} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        {/* Week View */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                {format(weekStart, "MMMM yyyy")}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={handlePrevWeek}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleToday}>Today</Button>
                <Button variant="outline" size="icon" onClick={handleNextWeek}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <CreateSessionDialog />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8 text-muted-foreground">Loading sessions...</div>
              ) : (
                <div className="grid grid-cols-7 gap-2">
                  {weekDays.map((date, index) => {
                    const daySessions = getSessionsForDay(date);
                    const isToday = isSameDay(date, new Date());

                    return (
                      <div
                        key={index}
                        className={`p-3 rounded-2xl border min-h-[160px] transition-colors ${
                          isToday
                            ? "bg-primary/5 border-primary/20"
                            : "bg-card border-border hover:border-primary/20"
                        }`}
                      >
                        <div className="text-center mb-3">
                          <div className="text-xs text-muted-foreground">{format(date, "EEE")}</div>
                          <div className={`font-display text-xl ${isToday ? "text-primary" : "text-foreground"}`}>
                            {format(date, "d")}
                          </div>
                        </div>
                        <div className="space-y-1">
                          {daySessions.slice(0, 3).map((session) => (
                            <div
                              key={session.id}
                              className="p-2 rounded-lg bg-primary/10 text-xs cursor-pointer hover:bg-primary/20 transition-colors"
                            >
                              <div className="font-medium text-primary truncate">
                                {session.focus_area || session.session_type || "Training"}
                              </div>
                              <div className="text-primary/70">
                                {format(new Date(session.session_date), "h:mm a")}
                              </div>
                              <div className="flex items-center gap-1 text-primary/60 mt-1">
                                <Badge variant="outline" className="text-[10px] px-1 py-0">
                                  {session.sport?.name}
                                </Badge>
                              </div>
                            </div>
                          ))}
                          {daySessions.length > 3 && (
                            <div className="text-xs text-muted-foreground text-center">
                              +{daySessions.length - 3} more
                            </div>
                          )}
                          {daySessions.length === 0 && (
                            <div className="text-xs text-muted-foreground text-center py-4">
                              No sessions
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
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
              {upcomingSessions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No upcoming sessions. Create one using the button above.
                </div>
              ) : (
                upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-1 h-16 rounded-full bg-primary" />
                      <div>
                        <div className="font-semibold text-foreground">
                          {session.focus_area || session.session_type || "Training Session"}
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {format(new Date(session.session_date), "EEE, MMM d")}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {format(new Date(session.session_date), "h:mm a")}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          {session.duration_minutes && (
                            <span>{session.duration_minutes} min</span>
                          )}
                          {session.coach?.full_name && (
                            <span className="flex items-center gap-1">
                              <Users className="w-3.5 h-3.5" />
                              {session.coach.full_name}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {session.sport?.name}
                      </Badge>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => navigate(`/dashboard/coach/attendance?session=${session.id}`)}
                      >
                        Mark Attendance
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default CoachSchedule;
