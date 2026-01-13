import { motion } from "framer-motion";
import {
  Home,
  Calendar,
  Users,
  ClipboardCheck,
  BarChart3,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const navItems = [
  { label: "Dashboard", href: "/dashboard/coach", icon: Home },
  { label: "Schedule", href: "/dashboard/coach/schedule", icon: Calendar },
  { label: "My Teams", href: "/dashboard/coach/teams", icon: Users },
  { label: "Attendance", href: "/dashboard/coach/attendance", icon: ClipboardCheck },
  { label: "Analytics", href: "/dashboard/coach/analytics", icon: BarChart3 },
  { label: "Reports", href: "/dashboard/coach/reports", icon: FileText },
];

const todaySessions = [
  { title: "U-15 Technical Training", time: "10:00 AM - 12:00 PM", players: 18, status: "upcoming" },
  { title: "U-17 Match Prep", time: "2:00 PM - 4:00 PM", players: 22, status: "upcoming" },
  { title: "U-13 Development", time: "5:00 PM - 6:30 PM", players: 16, status: "upcoming" },
];

const teams = [
  { name: "U-15 Elite", players: 18, avgAttendance: 92, performance: "A" },
  { name: "U-17 Premier", players: 22, avgAttendance: 88, performance: "A+" },
  { name: "U-13 Development", players: 16, avgAttendance: 95, performance: "B+" },
];

const recentPlayers = [
  { name: "Alex Thompson", improvement: "+15%", skill: "Passing", trend: "up" },
  { name: "Marcus Johnson", improvement: "+12%", skill: "Shooting", trend: "up" },
  { name: "David Chen", improvement: "-3%", skill: "Defending", trend: "down" },
  { name: "Emma Wilson", improvement: "+8%", skill: "Dribbling", trend: "up" },
];

const CoachDashboard = () => {
  return (
    <DashboardLayout
      title="Coach Dashboard"
      navItems={navItems}
      userRole="Coach"
      userName="Coach Williams"
    >
      <div className="space-y-8">
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: "Total Players", value: "56", icon: Users, color: "text-primary" },
            { label: "Sessions Today", value: "3", icon: Calendar, color: "text-accent-foreground" },
            { label: "Avg Attendance", value: "91%", icon: CheckCircle, color: "text-teal" },
            { label: "Reports Due", value: "2", icon: FileText, color: "text-coral" },
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="rounded-2xl border border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Today's Sessions
                </CardTitle>
                <Button variant="accent" size="sm">Add Session</Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {todaySessions.map((session, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-1 h-12 rounded-full bg-primary" />
                      <div>
                        <div className="font-semibold text-foreground">{session.title}</div>
                        <div className="text-sm text-muted-foreground">{session.time}</div>
                        <div className="flex items-center gap-1 mt-1">
                          <Users className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{session.players} players</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="default" size="sm">Start</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Teams Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="rounded-2xl border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  My Teams
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {teams.map((team, index) => (
                  <div key={index} className="p-4 bg-card border border-border rounded-2xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-foreground">{team.name}</span>
                      <span className="font-display text-xl text-primary">{team.performance}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                      <span>{team.players} players</span>
                      <span>{team.avgAttendance}% attendance</span>
                    </div>
                    <Progress value={team.avgAttendance} className="h-2.5" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Player Improvements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Player Progress This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                {recentPlayers.map((player, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-card border border-border rounded-2xl">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                        {player.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground text-sm truncate">{player.name}</div>
                      <div className="text-xs text-muted-foreground">{player.skill}</div>
                    </div>
                    <div className={`flex items-center gap-1 font-semibold text-sm ${
                      player.trend === "up" ? "text-primary" : "text-destructive"
                    }`}>
                      {player.trend === "up" ? (
                        <TrendingUp className="w-3.5 h-3.5" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5" />
                      )}
                      {player.improvement}
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

export default CoachDashboard;
