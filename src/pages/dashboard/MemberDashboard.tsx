import { motion } from "framer-motion";
import {
  Home,
  Calendar,
  BarChart3,
  Trophy,
  Target,
  Clock,
  TrendingUp,
  Users,
  MapPin,
  UserCheck,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  usePlayerUpcomingSessions, 
  usePlayerAssignment,
  usePlayerCombinedAttendance,
  usePlayerPerformanceMetrics,
} from "@/hooks/useMemberData";
import { format, isFuture } from "date-fns";

const navItems = [
  { label: "Dashboard", href: "/dashboard/member", icon: Home },
  { label: "Schedule", href: "/dashboard/member/schedule", icon: Calendar },
  { label: "My Progress", href: "/dashboard/member/progress", icon: BarChart3 },
  { label: "Attendance", href: "/dashboard/member/attendance", icon: UserCheck },
  { label: "Achievements", href: "/dashboard/member/achievements", icon: Trophy },
];

const MemberDashboard = () => {
  const { data: upcomingData } = usePlayerUpcomingSessions();
  const { data: assignment } = usePlayerAssignment();
  const { data: attendanceStats } = usePlayerCombinedAttendance();
  const { data: metrics } = usePlayerPerformanceMetrics();

  // Combine sessions + matches for upcoming
  const upcomingEvents = [
    ...(upcomingData?.sessions || []).map(s => ({
      id: s.id,
      title: s.focus_area || "Training",
      date: new Date(s.session_date),
      type: "Training" as const,
    })),
    ...(upcomingData?.matches || []).map(m => ({
      id: m.id,
      title: `vs ${m.opponent_name}`,
      date: new Date(m.match_date),
      type: "Match" as const,
    })),
  ].sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, 5);

  return (
    <DashboardLayout title="Dashboard" navItems={navItems} userRole="Member">
      <div className="space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hero-gradient rounded-3xl p-8 text-white relative overflow-hidden"
        >
          <div className="dashed-pattern absolute inset-0 opacity-20" />
          <div className="relative z-10">
            <h2 className="font-display text-4xl md:text-5xl tracking-wide mb-2">
              WELCOME BACK!
            </h2>
            {assignment?.ground && (
              <p className="text-white/80 text-lg mb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {assignment.ground.name}
                {assignment.primary_coach?.full_name && ` • Coach: ${assignment.primary_coach.full_name}`}
              </p>
            )}
            <p className="text-white/70">
              {upcomingEvents.length > 0
                ? `You have ${upcomingEvents.length} upcoming event${upcomingEvents.length > 1 ? "s" : ""}.`
                : "No upcoming events scheduled."}
            </p>
            <div className="flex flex-wrap gap-6 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4">
                <div className="font-display text-3xl text-lime">{attendanceStats?.rate || 0}%</div>
                <div className="text-white/70 text-sm">Attendance Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4">
                <div className="font-display text-3xl text-lime">{metrics?.avgMatchRating || "—"}</div>
                <div className="text-white/70 text-sm">Match Rating</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4">
                <div className="font-display text-3xl text-lime">{metrics?.totalMatches || 0}</div>
                <div className="text-white/70 text-sm">Matches Played</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Upcoming Sessions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Upcoming Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No upcoming sessions scheduled.</div>
              ) : (
                upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-1 h-10 rounded-full ${event.type === "Match" ? "bg-coral" : "bg-primary"}`} />
                      <div>
                        <div className="font-semibold text-foreground">{event.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {format(event.date, "EEE, MMM d")} at {format(event.date, "h:mm a")}
                        </div>
                      </div>
                    </div>
                    <Badge className={event.type === "Match" ? "bg-coral/10 text-coral border-coral/20" : "bg-primary/10 text-primary border-primary/20"} variant="outline">
                      {event.type}
                    </Badge>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Sessions Attended", value: String(attendanceStats?.present || 0), icon: Target, color: "text-primary" },
            { label: "Total Matches", value: String(metrics?.totalMatches || 0), icon: Trophy, color: "text-coral" },
            { label: "Practice Sessions", value: String(metrics?.totalPractices || 0), icon: Clock, color: "text-teal" },
            { label: "Avg Practice Rating", value: metrics?.avgPracticeRating ? String(metrics.avgPracticeRating) : "—", icon: TrendingUp, color: "text-primary" },
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
      </div>
    </DashboardLayout>
  );
};

export default MemberDashboard;
