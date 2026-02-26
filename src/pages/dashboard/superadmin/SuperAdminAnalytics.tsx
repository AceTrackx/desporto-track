import { motion } from "framer-motion";
import {
  Home,
  MapPin,
  Users,
  BarChart3,
  Settings,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Target,
  Activity,
  Calendar,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const navItems = [
  { label: "Dashboard", href: "/dashboard/superadmin", icon: Home },
  { label: "Grounds", href: "/dashboard/superadmin/grounds", icon: MapPin },
  { label: "All Players", href: "/dashboard/superadmin/players", icon: Users },
  { label: "Coaches", href: "/dashboard/superadmin/coaches", icon: Users },
  { label: "Finances", href: "/dashboard/superadmin/finances", icon: CreditCard },
  { label: "Analytics", href: "/dashboard/superadmin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/superadmin/settings", icon: Settings },
];

const overviewStats = [
  { label: "Total Players", value: "248", change: "+24", trend: "up", icon: Users },
  { label: "Active Coaches", value: "12", change: "+2", trend: "up", icon: Users },
  { label: "Monthly Revenue", value: "$69.5K", change: "+18%", trend: "up", icon: TrendingUp },
  { label: "Avg Attendance", value: "91%", change: "+3%", trend: "up", icon: Activity },
];

const squadPerformance = [
  { name: "U-17 Premier", players: 45, attendance: 88, performance: "A+", winRate: 83 },
  { name: "U-15 Elite", players: 38, attendance: 92, performance: "A", winRate: 76 },
  { name: "U-13 Development", players: 42, attendance: 95, performance: "B+", winRate: 62 },
  { name: "U-11 Beginners", players: 28, attendance: 90, performance: "B", winRate: 55 },
];

const monthlyData = [
  { month: "Oct", players: 220, attendance: 85, revenue: 52 },
  { month: "Nov", players: 232, attendance: 88, revenue: 58 },
  { month: "Dec", players: 240, attendance: 87, revenue: 62 },
  { month: "Jan", players: 248, attendance: 91, revenue: 69.5 },
];

const topPerformers = [
  { name: "Alex Thompson", squad: "U-15 Elite", metric: "Goals", value: "28" },
  { name: "Marcus Johnson", squad: "U-17 Premier", metric: "Assists", value: "22" },
  { name: "Emma Wilson", squad: "U-13 Development", metric: "Attendance", value: "100%" },
  { name: "David Chen", squad: "U-15 Elite", metric: "Clean Sheets", value: "15" },
];

const coachMetrics = [
  { name: "Coach Williams", sessions: 156, avgRating: 4.8, playerImprovement: "+18%" },
  { name: "Coach Davis", sessions: 142, avgRating: 4.6, playerImprovement: "+15%" },
  { name: "Coach Martinez", sessions: 168, avgRating: 4.9, playerImprovement: "+22%" },
  { name: "Coach Thompson", sessions: 180, avgRating: 4.7, playerImprovement: "+16%" },
];

const SuperAdminAnalytics = () => {
  return (
    <DashboardLayout
      title="Analytics"
      navItems={navItems}
      userRole="Owner"
      
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
          {/* Squad Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="rounded-2xl border border-border h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Squad Performance
                </CardTitle>
                <Button variant="outline" size="sm">Export</Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {squadPerformance.map((squad, index) => (
                  <div key={index} className="p-4 bg-card border border-border rounded-2xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-foreground">{squad.name}</span>
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-lg">
                          {squad.performance}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">{squad.players} players</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-muted-foreground">Attendance</span>
                          <span className="text-foreground font-medium">{squad.attendance}%</span>
                        </div>
                        <Progress value={squad.attendance} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-muted-foreground">Win Rate</span>
                          <span className="text-foreground font-medium">{squad.winRate}%</span>
                        </div>
                        <Progress value={squad.winRate} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Monthly Growth */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card className="rounded-2xl border border-border h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Monthly Growth
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Players</Button>
                  <Button variant="default" size="sm">Revenue</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-4 h-48">
                  {monthlyData.map((month, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div className="w-full flex flex-col items-center gap-1 flex-1 justify-end">
                        <div
                          className="w-full bg-primary rounded-t-lg"
                          style={{ height: `${(month.revenue / 80) * 100}%` }}
                        />
                      </div>
                      <div className="mt-3 text-center">
                        <div className="font-semibold text-foreground">${month.revenue}K</div>
                        <div className="text-xs text-muted-foreground">{month.month}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top Performers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="rounded-2xl border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {topPerformers.map((player, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <span className="font-display text-sm text-primary">#{index + 1}</span>
                      </div>
                      <div>
                        <div className="font-medium text-foreground text-sm">{player.name}</div>
                        <div className="text-xs text-muted-foreground">{player.squad}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-primary">{player.value}</div>
                      <div className="text-xs text-muted-foreground">{player.metric}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Coach Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card className="rounded-2xl border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Coach Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {coachMetrics.map((coach, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors"
                  >
                    <div>
                      <div className="font-medium text-foreground text-sm">{coach.name}</div>
                      <div className="text-xs text-muted-foreground">{coach.sessions} sessions this year</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="font-semibold text-foreground">{coach.avgRating}</div>
                        <div className="text-xs text-muted-foreground">Rating</div>
                      </div>
                      <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                        {coach.playerImprovement}
                      </span>
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

export default SuperAdminAnalytics;
