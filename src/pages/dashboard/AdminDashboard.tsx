import { motion } from "framer-motion";
import {
  Home,
  Users,
  Calendar,
  CreditCard,
  BarChart3,
  Settings,
  UserPlus,
  TrendingUp,
  DollarSign,
  Building,
} from "lucide-react";
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
  { label: "Total Students", value: "248", change: "+12%", icon: Users, color: "text-primary" },
  { label: "Active Coaches", value: "12", change: "+2", icon: Building, color: "text-primary" },
  { label: "Monthly Revenue", value: "$45.2K", change: "+18%", icon: DollarSign, color: "text-teal" },
  { label: "New Enrollments", value: "24", change: "+8", icon: UserPlus, color: "text-coral" },
];

const revenueData = [
  { month: "Jan", amount: 42000 },
  { month: "Feb", amount: 38000 },
  { month: "Mar", amount: 45200 },
];

const recentEnrollments = [
  { name: "James Wilson", squad: "U-15 Elite", date: "Today", status: "Pending" },
  { name: "Olivia Brown", squad: "U-13 Development", date: "Yesterday", status: "Approved" },
  { name: "Noah Davis", squad: "U-17 Premier", date: "2 days ago", status: "Approved" },
  { name: "Sophia Miller", squad: "U-11 Beginners", date: "3 days ago", status: "Approved" },
];

const squadStats = [
  { name: "U-17 Premier", students: 45, capacity: 50, revenue: 12500 },
  { name: "U-15 Elite", students: 38, capacity: 40, revenue: 10200 },
  { name: "U-13 Development", students: 42, capacity: 50, revenue: 8400 },
  { name: "U-11 Beginners", students: 28, capacity: 35, revenue: 5600 },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout
      title="Admin Dashboard"
      navItems={navItems}
      userRole="Admin"
      userName="John Mitchell"
    >
      <div className="space-y-8">
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="rounded-2xl border border-border overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-primary">{stat.change}</span>
                </div>
                <div className="font-display text-3xl text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Squad Overview */}
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
                  Squad Overview
                </CardTitle>
                <Button variant="accent" size="sm">Manage Squads</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {squadStats.map((squad, index) => (
                    <div key={index} className="p-4 bg-muted/50 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="font-semibold text-foreground">{squad.name}</span>
                          <span className="text-sm text-muted-foreground ml-2">
                            ({squad.students}/{squad.capacity} students)
                          </span>
                        </div>
                        <span className="font-bold text-primary">${squad.revenue.toLocaleString()}</span>
                      </div>
                      <Progress value={(squad.students / squad.capacity) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Enrollments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="rounded-2xl border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-primary" />
                  New Enrollments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentEnrollments.map((enrollment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                    <div>
                      <div className="font-medium text-foreground">{enrollment.name}</div>
                      <div className="text-sm text-muted-foreground">{enrollment.squad}</div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      enrollment.status === "Pending"
                        ? "bg-accent/20 text-accent-foreground"
                        : "bg-primary/20 text-primary"
                    }`}>
                      {enrollment.status}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Revenue Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Revenue Overview
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Weekly</Button>
                <Button variant="default" size="sm">Monthly</Button>
                <Button variant="outline" size="sm">Yearly</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-4 h-48">
                {revenueData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-primary/20 rounded-t-xl relative overflow-hidden"
                      style={{ height: `${(data.amount / 50000) * 100}%` }}
                    >
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-xl"
                        style={{ height: "100%" }}
                      />
                    </div>
                    <div className="mt-2 text-center">
                      <div className="font-semibold text-foreground">${(data.amount / 1000).toFixed(1)}K</div>
                      <div className="text-sm text-muted-foreground">{data.month}</div>
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

export default AdminDashboard;
