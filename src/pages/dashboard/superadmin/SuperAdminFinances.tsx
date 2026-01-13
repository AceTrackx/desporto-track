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
  DollarSign,
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

const revenueBreakdown = [
  { source: "Student Fees", amount: 45200, percentage: 65, trend: "+12%" },
  { source: "Ground Rentals", amount: 12500, percentage: 18, trend: "+8%" },
  { source: "Merchandise", amount: 5800, percentage: 8, trend: "+22%" },
  { source: "Events & Tournaments", amount: 6000, percentage: 9, trend: "+5%" },
];

const expenses = [
  { category: "Coach Salaries", amount: 28000, percentage: 55 },
  { category: "Ground Maintenance", amount: 8500, percentage: 17 },
  { category: "Equipment", amount: 6200, percentage: 12 },
  { category: "Utilities", amount: 4500, percentage: 9 },
  { category: "Marketing", amount: 3800, percentage: 7 },
];

const recentTransactions = [
  { description: "Student Fee - Alex Thompson", amount: 450, type: "income", date: "Today" },
  { description: "Coach Salary - Williams", amount: 4500, type: "expense", date: "Today" },
  { description: "Ground Rental - City FC", amount: 800, type: "income", date: "Yesterday" },
  { description: "Equipment Purchase", amount: 1200, type: "expense", date: "Yesterday" },
  { description: "Tournament Entry Fee", amount: 2500, type: "income", date: "2 days ago" },
  { description: "Utility Bill", amount: 850, type: "expense", date: "3 days ago" },
];

const monthlyData = [
  { month: "Oct", revenue: 52000, expenses: 42000 },
  { month: "Nov", revenue: 58000, expenses: 45000 },
  { month: "Dec", revenue: 62000, expenses: 48000 },
  { month: "Jan", revenue: 69500, expenses: 51000 },
];

const SuperAdminFinances = () => {
  return (
    <DashboardLayout
      title="Finances"
      navItems={navItems}
      userRole="Owner"
      userName="Michael Roberts"
    >
      <div className="space-y-8">
        {/* Financial Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: "Monthly Revenue", value: "$69.5K", change: "+18%", icon: TrendingUp, positive: true },
            { label: "Monthly Expenses", value: "$51K", change: "+6%", icon: TrendingDown, positive: false },
            { label: "Net Profit", value: "$18.5K", change: "+32%", icon: DollarSign, positive: true },
            { label: "Pending Payments", value: "$4.2K", change: "12 students", icon: CreditCard, positive: null },
          ].map((stat, index) => (
            <Card key={index} className="rounded-2xl border border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <stat.icon className={`w-5 h-5 ${stat.positive === true ? "text-primary" : stat.positive === false ? "text-coral" : "text-accent-foreground"}`} />
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                  </div>
                  <span className={`text-sm font-semibold ${stat.positive === true ? "text-primary" : stat.positive === false ? "text-coral" : "text-muted-foreground"}`}>
                    {stat.change}
                  </span>
                </div>
                <div className="font-display text-3xl text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Revenue Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="rounded-2xl border border-border h-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Revenue Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {revenueBreakdown.map((item, index) => (
                  <div key={index} className="p-4 bg-card border border-border rounded-2xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">{item.source}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-primary font-semibold">{item.trend}</span>
                        <span className="font-semibold text-foreground">${item.amount.toLocaleString()}</span>
                      </div>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">{item.percentage}% of total</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Expenses Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card className="rounded-2xl border border-border h-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-coral" />
                  Expenses Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {expenses.map((item, index) => (
                  <div key={index} className="p-4 bg-card border border-border rounded-2xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">{item.category}</span>
                      <span className="font-semibold text-foreground">${item.amount.toLocaleString()}</span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">{item.percentage}% of total</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Monthly Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Monthly Trend
              </CardTitle>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-muted-foreground">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-coral" />
                  <span className="text-muted-foreground">Expenses</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                {monthlyData.map((data, index) => (
                  <div key={index} className="text-center p-4 bg-card border border-border rounded-2xl">
                    <div className="text-sm text-muted-foreground mb-3">{data.month}</div>
                    <div className="space-y-2">
                      <div className="text-lg font-semibold text-primary">${(data.revenue / 1000).toFixed(0)}K</div>
                      <div className="text-sm text-coral">${(data.expenses / 1000).toFixed(0)}K</div>
                      <div className="text-xs text-muted-foreground border-t pt-2 mt-2">
                        Profit: <span className="text-primary font-semibold">${((data.revenue - data.expenses) / 1000).toFixed(0)}K</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Recent Transactions
              </CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTransactions.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        transaction.type === "income" ? "bg-primary/10" : "bg-coral/10"
                      }`}>
                        {transaction.type === "income" ? (
                          <TrendingUp className="w-5 h-5 text-primary" />
                        ) : (
                          <TrendingDown className="w-5 h-5 text-coral" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{transaction.description}</div>
                        <div className="text-sm text-muted-foreground">{transaction.date}</div>
                      </div>
                    </div>
                    <div className={`font-semibold ${transaction.type === "income" ? "text-primary" : "text-coral"}`}>
                      {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
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

export default SuperAdminFinances;
