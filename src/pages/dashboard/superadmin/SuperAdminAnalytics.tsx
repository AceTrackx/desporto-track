import { motion } from "framer-motion";
import {
  Home,
  Building,
  Users,
  BarChart3,
  Shield,
  Settings,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Globe,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const navItems = [
  { label: "Dashboard", href: "/dashboard/superadmin", icon: Home },
  { label: "Academies", href: "/dashboard/superadmin/academies", icon: Building },
  { label: "All Users", href: "/dashboard/superadmin/users", icon: Users },
  { label: "Analytics", href: "/dashboard/superadmin/analytics", icon: BarChart3 },
  { label: "Security", href: "/dashboard/superadmin/security", icon: Shield },
  { label: "Settings", href: "/dashboard/superadmin/settings", icon: Settings },
];

const platformStats = [
  { label: "Total Revenue", value: "$2.1M", change: "+32%", trend: "up", icon: DollarSign },
  { label: "Active Users", value: "8.4K", change: "+18%", trend: "up", icon: Users },
  { label: "Avg Session Time", value: "24 min", change: "+5%", trend: "up", icon: Activity },
  { label: "Churn Rate", value: "2.4%", change: "-0.8%", trend: "down", icon: TrendingDown },
];

const regionStats = [
  { region: "United Kingdom", academies: 89, users: 7200, revenue: "$1.2M", growth: 28 },
  { region: "Germany", academies: 34, users: 2800, revenue: "$420K", growth: 35 },
  { region: "France", academies: 21, users: 1600, revenue: "$280K", growth: 22 },
  { region: "Spain", academies: 12, users: 800, revenue: "$180K", growth: 45 },
];

const monthlyGrowth = [
  { month: "Oct", users: 6200, revenue: 1.4 },
  { month: "Nov", users: 7100, revenue: 1.6 },
  { month: "Dec", users: 7800, revenue: 1.8 },
  { month: "Jan", users: 8400, revenue: 2.1 },
];

const topAcademies = [
  { name: "Champions Training Center", revenue: "$58.4K", growth: "+24%", students: 312 },
  { name: "Elite Football Academy", revenue: "$45.2K", growth: "+18%", students: 248 },
  { name: "Premier Youth Sports", revenue: "$32.8K", growth: "+15%", students: 186 },
  { name: "Victory Football School", revenue: "$24.8K", growth: "+22%", students: 156 },
];

const SuperAdminAnalytics = () => {
  return (
    <DashboardLayout
      title="Analytics"
      navItems={navItems}
      userRole="Super Admin"
      userName="Michael Roberts"
    >
      <div className="space-y-8">
        {/* Platform Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {platformStats.map((stat, index) => (
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
          {/* Growth Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="rounded-2xl border border-border h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Platform Growth
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Users</Button>
                  <Button variant="default" size="sm">Revenue</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-4 h-48">
                  {monthlyGrowth.map((month, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div className="w-full flex flex-col items-center gap-1 flex-1 justify-end">
                        <div
                          className="w-full bg-primary rounded-t-lg"
                          style={{ height: `${(month.revenue / 2.5) * 100}%` }}
                        />
                      </div>
                      <div className="mt-3 text-center">
                        <div className="font-semibold text-foreground">${month.revenue}M</div>
                        <div className="text-xs text-muted-foreground">{month.month}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Academies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="rounded-2xl border border-border h-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Building className="w-5 h-5 text-primary" />
                  Top Performing Academies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {topAcademies.map((academy, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <span className="font-display text-sm text-primary">#{index + 1}</span>
                      </div>
                      <div>
                        <div className="font-medium text-foreground text-sm">{academy.name}</div>
                        <div className="text-xs text-muted-foreground">{academy.students} students</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-primary">{academy.revenue}</div>
                      <div className="text-xs text-primary">{academy.growth}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Regional Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Regional Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {regionStats.map((region, index) => (
                  <div
                    key={index}
                    className="p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-foreground">{region.region}</span>
                      <span className="text-sm font-medium text-primary">+{region.growth}%</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Academies</span>
                        <span className="text-foreground font-medium">{region.academies}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Users</span>
                        <span className="text-foreground font-medium">{region.users.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Revenue</span>
                        <span className="text-primary font-medium">{region.revenue}</span>
                      </div>
                    </div>
                    <Progress value={region.growth} className="h-2 mt-3" />
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

export default SuperAdminAnalytics;
