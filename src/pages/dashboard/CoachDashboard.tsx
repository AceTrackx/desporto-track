import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { format, isSameDay, isFuture } from "date-fns";
import {
  Home,
  Calendar,
  Users,
  ClipboardCheck,
  BarChart3,
  FileText,
  Clock,
  CheckCircle,
  TrendingUp,
  MapPin,
  Loader2,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSessions } from "@/hooks/useSessions";
import { useCoachGroundIds } from "@/hooks/useCoachScope";
import { useCoachPlayerIds } from "@/hooks/useCoachScope";
import { useCoachGrounds } from "@/hooks/useGroundCoaches";
import { useAllGroundSports } from "@/hooks/useGrounds";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { label: "Dashboard", href: "/dashboard/coach", icon: Home },
  { label: "Schedule", href: "/dashboard/coach/schedule", icon: Calendar },
  { label: "My Teams", href: "/dashboard/coach/teams", icon: Users },
  { label: "Players", href: "/dashboard/coach/players", icon: Users },
  { label: "Attendance", href: "/dashboard/coach/attendance", icon: ClipboardCheck },
  { label: "Performance", href: "/dashboard/coach/performance", icon: TrendingUp },
  { label: "Analytics", href: "/dashboard/coach/analytics", icon: BarChart3 },
  { label: "Reports", href: "/dashboard/coach/reports", icon: FileText },
];

const CoachDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: groundIds = [] } = useCoachGroundIds();
  const { data: playerIds = [] } = useCoachPlayerIds();
  const { data: coachGrounds = [] } = useCoachGrounds(user?.id);
  const { data: allGroundSports = [] } = useAllGroundSports();
  const { data: allSessions = [], isLoading } = useSessions();

  // Filter sessions to coach's grounds
  const sessions = groundIds.length > 0
    ? allSessions.filter(s => s.ground_id && groundIds.includes(s.ground_id))
    : [];

  const today = new Date();
  const todaySessions = sessions.filter(s => isSameDay(new Date(s.session_date), today));
  const upcomingSessions = sessions
    .filter(s => isFuture(new Date(s.session_date)))
    .sort((a, b) => new Date(a.session_date).getTime() - new Date(b.session_date).getTime())
    .slice(0, 5);

  return (
    <DashboardLayout title="Coach Dashboard" navItems={navItems} userRole="Coach">
      <div className="space-y-8">
        {/* Quick Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "My Players", value: String(playerIds.length), icon: Users, color: "text-primary" },
            { label: "Sessions Today", value: String(todaySessions.length), icon: Calendar, color: "text-accent-foreground" },
            { label: "My Grounds", value: String(coachGrounds.length), icon: MapPin, color: "text-teal" },
            { label: "Upcoming", value: String(upcomingSessions.length), icon: Clock, color: "text-coral" },
          ].map((stat, index) => (
            <Card key={index} className="rounded-2xl border border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
                <div className="font-display text-3xl text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Today's Sessions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2">
            <Card className="rounded-2xl border border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Today's Sessions
                </CardTitle>
                <Button variant="accent" size="sm" onClick={() => navigate("/dashboard/coach/schedule")}>View Schedule</Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {isLoading ? (
                  <div className="flex justify-center py-8"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /></div>
                ) : todaySessions.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No sessions scheduled for today.</div>
                ) : (
                  todaySessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-1 h-12 rounded-full bg-primary" />
                        <div>
                          <div className="font-semibold text-foreground">{session.focus_area || session.session_type || "Training"}</div>
                          <div className="text-sm text-muted-foreground">{format(new Date(session.session_date), "h:mm a")} {session.duration_minutes ? `• ${session.duration_minutes} min` : ""}</div>
                          <div className="text-xs text-muted-foreground">{session.ground?.name || "—"}</div>
                        </div>
                      </div>
                      <Button variant="default" size="sm" onClick={() => navigate(`/dashboard/coach/attendance?session=${session.id}`)}>
                        Mark Attendance
                      </Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* My Grounds */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="rounded-2xl border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  My Grounds
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {coachGrounds.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">Not assigned to any ground yet.</div>
                ) : (
                  coachGrounds.map((gc) => (
                    <div key={gc.id} className="p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-foreground">{gc.ground?.name || "Unknown"}</span>
                        {gc.is_ground_admin && (
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">Admin</Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">{gc.ground?.location}</div>
                      <div className="flex flex-wrap gap-1">
                        {allGroundSports
                          .filter((gs: any) => gs.ground_id === gc.ground_id)
                          .map((gs: any) => (
                            <Badge key={gs.id} variant="secondary" className="text-xs">
                              {gs.sport?.name}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Upcoming Sessions */}
        {upcomingSessions.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="rounded-2xl border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Upcoming Sessions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-1 h-12 rounded-full bg-primary" />
                      <div>
                        <div className="font-semibold text-foreground">{session.focus_area || session.session_type || "Training"}</div>
                        <div className="text-sm text-muted-foreground">
                          {format(new Date(session.session_date), "EEE, MMM d • h:mm a")}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {session.sport?.name}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CoachDashboard;
