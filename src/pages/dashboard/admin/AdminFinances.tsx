import { motion } from "framer-motion";
import { Home, Users, Calendar, CreditCard, BarChart3, Settings, TrendingUp, DollarSign, Receipt, ArrowUpRight, ArrowDownRight } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const navItems = [
  { label: "Dashboard", href: "/dashboard/admin", icon: Home },
  { label: "Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Schedule", href: "/dashboard/admin/schedule", icon: Calendar },
  { label: "Finances", href: "/dashboard/admin/finances", icon: CreditCard },
  { label: "Reports", href: "/dashboard/admin/reports", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];

const stats = [
  { label: "Total Revenue", value: "$145.2K", change: "+18%", trend: "up", icon: DollarSign },
  { label: "Monthly Income", value: "$45.2K", change: "+12%", trend: "up", icon: TrendingUp },
  { label: "Pending Payments", value: "$8.4K", change: "12 invoices", trend: "neutral", icon: Receipt },
  { label: "Expenses", value: "$28.6K", change: "-5%", trend: "down", icon: CreditCard },
];

const recentTransactions = [
  { description: "Monthly Fee - Alex Thompson", amount: "+$250", date: "Jan 13", type: "income" },
  { description: "Equipment Purchase", amount: "-$1,200", date: "Jan 12", type: "expense" },
  { description: "Monthly Fee - Marcus Johnson", amount: "+$250", date: "Jan 11", type: "income" },
  { description: "Facility Rent", amount: "-$5,000", date: "Jan 10", type: "expense" },
  { description: "Tournament Entry", amount: "+$2,500", date: "Jan 8", type: "income" },
];

const AdminFinances = () => {
  return (
    <DashboardLayout title="Finances" navItems={navItems} userRole="Admin" userName="John Mitchell">
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="rounded-2xl border border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><stat.icon className="w-5 h-5 text-primary" /></div>
                  <span className={`text-sm font-medium flex items-center gap-1 ${stat.trend === "up" ? "text-primary" : stat.trend === "down" ? "text-coral" : "text-muted-foreground"}`}>
                    {stat.trend === "up" && <ArrowUpRight className="w-4 h-4" />}{stat.trend === "down" && <ArrowDownRight className="w-4 h-4" />}{stat.change}
                  </span>
                </div>
                <div className="font-display text-3xl text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="rounded-2xl border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2"><Receipt className="w-5 h-5 text-primary" />Recent Transactions</CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentTransactions.map((tx, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.type === "income" ? "bg-primary/10" : "bg-coral/10"}`}>
                      {tx.type === "income" ? <ArrowUpRight className="w-5 h-5 text-primary" /> : <ArrowDownRight className="w-5 h-5 text-coral" />}
                    </div>
                    <div><div className="font-medium text-foreground">{tx.description}</div><div className="text-sm text-muted-foreground">{tx.date}</div></div>
                  </div>
                  <div className={`font-display text-lg ${tx.type === "income" ? "text-primary" : "text-coral"}`}>{tx.amount}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AdminFinances;
