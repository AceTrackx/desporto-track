import { motion } from "framer-motion";
import {
  Home,
  Calendar,
  Users,
  ClipboardCheck,
  BarChart3,
  FileText,
  TrendingUp,
  TrendingDown,
  Target,
  Activity,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

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

const overviewStats = [
  { label: "Avg Team Performance", value: "A", change: "+5%", trend: "up", icon: TrendingUp },
  { label: "Sessions This Month", value: "24", change: "+8", trend: "up", icon: Calendar },
  { label: "Player Improvement", value: "78%", change: "+12%", trend: "up", icon: Target },
  { label: "Training Efficiency", value: "92%", change: "-2%", trend: "down", icon: Activity },
];

const teamPerformance = [
  { name: "U-17 Premier", technical: 88, tactical: 85, physical: 82, mental: 78 },
  { name: "U-15 Elite", technical: 82, tactical: 78, physical: 80, mental: 75 },
  { name: "U-13 Development", technical: 72, tactical: 68, physical: 75, mental: 70 },
];

const monthlyProgress = [
  { month: "Oct", sessions: 20, attendance: 88, performance: 75 },
  { month: "Nov", sessions: 22, attendance: 90, performance: 78 },
  { month: "Dec", sessions: 18, attendance: 85, performance: 80 },
  { month: "Jan", sessions: 24, attendance: 92, performance: 85 },
];

const topImprovers = [
  { name: "Alex Thompson", team: "U-15 Elite", improvement: "+18%", skill: "Dribbling" },
  { name: "Marcus Johnson", team: "U-15 Elite", improvement: "+15%", skill: "Shooting" },
  { name: "James Wilson", team: "U-17 Premier", improvement: "+14%", skill: "Passing" },
  { name: "Emma Wilson", team: "U-13 Development", improvement: "+12%", skill: "Ball Control" },
];

const CoachAnalytics = () => {
  return (
    <DashboardLayout
      title="Analytics"
      navItems={navItems}
      userRole="Coach"
      
    >
      <div className="space-y-8">
        {/* Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {overviewStats.map((stat, index) => (
            <Card key={index} className="rounded-2xl border border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className={`text-sm font-medium flex items-center gap-1 ${
                    stat.trend === "up" ? "text-primary" : "text-coral"
                  }`}>
                    {stat.trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {stat.change}
                  </span>
                </div>
                <div className="font-display text-3xl text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Team Performance Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="rounded-2xl border border-border h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Team Performance
                </CardTitle>
                <Button variant="outline" size="sm">Export</Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {teamPerformance.map((team, index) => (
                  <div key={index} className="p-4 bg-card border border-border rounded-2xl">
                    <div className="font-semibold text-foreground mb-4">{team.name}</div>
                    <div className="space-y-3">
                      {[
                        { name: "Technical", value: team.technical },
                        { name: "Tactical", value: team.tactical },
                        { name: "Physical", value: team.physical },
                        { name: "Mental", value: team.mental },
                      ].map((skill, sIndex) => (
                        <div key={sIndex} className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground w-20">{skill.name}</span>
                          <div className="flex-1">
                            <Progress value={skill.value} className="h-2.5" />
                          </div>
                          <span className="text-sm font-medium text-primary w-10">{skill.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Monthly Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="rounded-2xl border border-border h-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Monthly Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-4 h-48">
                  {monthlyProgress.map((month, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div className="w-full flex flex-col items-center gap-1 flex-1 justify-end">
                        <div
                          className="w-full bg-primary rounded-t-lg"
                          style={{ height: `${month.performance}%` }}
                        />
                      </div>
                      <div className="mt-3 text-center">
                        <div className="font-semibold text-foreground">{month.performance}%</div>
                        <div className="text-xs text-muted-foreground">{month.month}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Top Improvers */}
                <div className="mt-8 pt-6 border-t border-border">
                  <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    Top Improvers This Month
                  </h4>
                  <div className="space-y-3">
                    {topImprovers.map((player, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-card border border-border rounded-xl hover:border-primary/20 transition-colors"
                      >
                        <div>
                          <div className="font-medium text-foreground text-sm">{player.name}</div>
                          <div className="text-xs text-muted-foreground">{player.team} • {player.skill}</div>
                        </div>
                        <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                          {player.improvement}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CoachAnalytics;
