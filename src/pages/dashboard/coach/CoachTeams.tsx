import { motion } from "framer-motion";
import {
  Home,
  Calendar,
  Users,
  ClipboardCheck,
  BarChart3,
  FileText,
  TrendingUp,
  UserPlus,
  Star,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navItems = [
  { label: "Dashboard", href: "/dashboard/coach", icon: Home },
  { label: "Schedule", href: "/dashboard/coach/schedule", icon: Calendar },
  { label: "My Teams", href: "/dashboard/coach/teams", icon: Users },
  { label: "Attendance", href: "/dashboard/coach/attendance", icon: ClipboardCheck },
  { label: "Analytics", href: "/dashboard/coach/analytics", icon: BarChart3 },
  { label: "Reports", href: "/dashboard/coach/reports", icon: FileText },
];

const teams = [
  {
    name: "U-15 Elite",
    description: "Advanced players aged 14-15",
    players: 18,
    avgAttendance: 92,
    performance: "A",
    topPlayers: ["Alex T.", "Marcus J.", "David C."],
    nextSession: "Mon, 10:00 AM",
    record: { wins: 12, draws: 3, losses: 2 },
  },
  {
    name: "U-17 Premier",
    description: "Elite squad aged 16-17",
    players: 22,
    avgAttendance: 88,
    performance: "A+",
    topPlayers: ["James W.", "Oliver B.", "Noah D."],
    nextSession: "Mon, 3:00 PM",
    record: { wins: 15, draws: 2, losses: 1 },
  },
  {
    name: "U-13 Development",
    description: "Development squad aged 12-13",
    players: 16,
    avgAttendance: 95,
    performance: "B+",
    topPlayers: ["Emma W.", "Sophia M.", "Liam H."],
    nextSession: "Tue, 9:00 AM",
    record: { wins: 8, draws: 5, losses: 4 },
  },
];

const CoachTeams = () => {
  return (
    <DashboardLayout
      title="My Teams"
      navItems={navItems}
      userRole="Coach"
      userName="Coach Williams"
    >
      <div className="space-y-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: "Total Teams", value: "3", icon: Users, color: "text-primary" },
            { label: "Total Players", value: "56", icon: UserPlus, color: "text-teal" },
            { label: "Avg Performance", value: "A", icon: Star, color: "text-accent-foreground" },
            { label: "Win Rate", value: "78%", icon: TrendingUp, color: "text-coral" },
          ].map((stat, index) => (
            <Card key={index} className="rounded-2xl border border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
                <div className="font-display text-3xl text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Teams List */}
        <div className="space-y-4">
          {teams.map((team, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <Card className="rounded-2xl border border-border hover:border-primary/20 transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Team Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="font-display text-2xl text-foreground">{team.name}</h3>
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <span className="font-display text-lg text-primary">{team.performance}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">{team.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-3 bg-muted rounded-xl">
                          <div className="text-2xl font-display text-foreground">{team.players}</div>
                          <div className="text-xs text-muted-foreground">Players</div>
                        </div>
                        <div className="p-3 bg-muted rounded-xl">
                          <div className="text-2xl font-display text-foreground">{team.avgAttendance}%</div>
                          <div className="text-xs text-muted-foreground">Attendance</div>
                        </div>
                        <div className="p-3 bg-muted rounded-xl">
                          <div className="text-2xl font-display text-primary">{team.record.wins}</div>
                          <div className="text-xs text-muted-foreground">Wins</div>
                        </div>
                        <div className="p-3 bg-muted rounded-xl">
                          <div className="text-2xl font-display text-foreground">{team.record.draws}</div>
                          <div className="text-xs text-muted-foreground">Draws</div>
                        </div>
                      </div>
                    </div>

                    {/* Right Side */}
                    <div className="lg:w-64 space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Top Players</div>
                        <div className="flex -space-x-2">
                          {team.topPlayers.map((player, pIndex) => (
                            <Avatar key={pIndex} className="w-8 h-8 border-2 border-background">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                {player.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs text-muted-foreground">
                            +{team.players - 3}
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Next Session</div>
                        <div className="text-sm font-medium text-foreground">{team.nextSession}</div>
                      </div>

                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Attendance Rate</div>
                        <Progress value={team.avgAttendance} className="h-2.5" />
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">View Roster</Button>
                        <Button variant="default" size="sm" className="flex-1">Manage</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CoachTeams;
