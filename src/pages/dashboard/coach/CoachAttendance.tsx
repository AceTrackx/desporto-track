import { motion } from "framer-motion";
import {
  Home,
  Calendar,
  Users,
  ClipboardCheck,
  BarChart3,
  FileText,
  Check,
  X,
  Clock,
  AlertCircle,
  Activity,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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

const todaySession = {
  title: "U-15 Technical Training",
  time: "10:00 AM - 12:00 PM",
  date: "Monday, January 13, 2026",
  location: "Field A",
};

const players = [
  { name: "Alex Thompson", status: "present", time: "9:45 AM" },
  { name: "Marcus Johnson", status: "present", time: "9:50 AM" },
  { name: "David Chen", status: "present", time: "9:55 AM" },
  { name: "Emma Wilson", status: "absent", time: null },
  { name: "Oliver Brown", status: "present", time: "9:48 AM" },
  { name: "Sophia Miller", status: "late", time: "10:15 AM" },
  { name: "Noah Davis", status: "present", time: "9:52 AM" },
  { name: "Liam Harris", status: "present", time: "9:47 AM" },
  { name: "Isabella Garcia", status: "present", time: "9:53 AM" },
  { name: "Ethan Martinez", status: "absent", time: null },
];

const attendanceStats = [
  { label: "Present", value: 7, color: "text-primary", bgColor: "bg-primary/10" },
  { label: "Late", value: 1, color: "text-accent-foreground", bgColor: "bg-accent/10" },
  { label: "Absent", value: 2, color: "text-coral", bgColor: "bg-coral/10" },
];

const recentSessions = [
  { date: "Jan 10", session: "U-15 Tactical", present: 17, absent: 1, rate: 94 },
  { date: "Jan 8", session: "U-15 Fitness", present: 16, absent: 2, rate: 89 },
  { date: "Jan 6", session: "U-15 Technical", present: 18, absent: 0, rate: 100 },
  { date: "Jan 3", session: "U-15 Match Prep", present: 15, absent: 3, rate: 83 },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "present":
      return <Check className="w-4 h-4 text-primary" />;
    case "absent":
      return <X className="w-4 h-4 text-coral" />;
    case "late":
      return <Clock className="w-4 h-4 text-accent-foreground" />;
    default:
      return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
  }
};

const getStatusStyles = (status: string) => {
  switch (status) {
    case "present":
      return "bg-primary/10 text-primary border-primary/20";
    case "absent":
      return "bg-coral/10 text-coral border-coral/20";
    case "late":
      return "bg-accent/10 text-accent-foreground border-accent/20";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

const CoachAttendance = () => {
  return (
    <DashboardLayout
      title="Attendance"
      navItems={navItems}
      userRole="Coach"
      userName="Coach Williams"
    >
      <div className="space-y-8">
        {/* Current Session */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="rounded-2xl border border-border bg-primary/5">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Current Session</div>
                  <h2 className="font-display text-2xl text-foreground">{todaySession.title}</h2>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span>{todaySession.date}</span>
                    <span>{todaySession.time}</span>
                    <span>{todaySession.location}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  {attendanceStats.map((stat, index) => (
                    <div key={index} className={`px-4 py-3 rounded-xl ${stat.bgColor}`}>
                      <div className={`font-display text-2xl ${stat.color}`}>{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Player List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="rounded-2xl border border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Player Attendance
                </CardTitle>
                <Button variant="accent" size="sm">Save Attendance</Button>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {players.map((player, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                            {player.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-foreground">{player.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {player.time || "Not checked in"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-medium border flex items-center gap-1.5 ${getStatusStyles(player.status)}`}>
                          {getStatusIcon(player.status)}
                          {player.status.charAt(0).toUpperCase() + player.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Sessions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="rounded-2xl border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <ClipboardCheck className="w-5 h-5 text-primary" />
                  Recent Sessions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentSessions.map((session, index) => (
                  <div
                    key={index}
                    className="p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">{session.session}</span>
                      <span className={`font-display text-lg ${
                        session.rate >= 90 ? "text-primary" : 
                        session.rate >= 80 ? "text-accent-foreground" : "text-coral"
                      }`}>
                        {session.rate}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{session.date}</span>
                      <span>{session.present} present, {session.absent} absent</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CoachAttendance;
