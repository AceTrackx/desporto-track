import { motion } from "framer-motion";
import {
  Home,
  Users,
  Calendar,
  BarChart3,
  Settings,
  UserPlus,
  UserCheck,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const navItems = [
  { label: "Dashboard", href: "/dashboard/admin", icon: Home },
  { label: "Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Schedule", href: "/dashboard/admin/schedule", icon: Calendar },
  { label: "Reports", href: "/dashboard/admin/reports", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];

const stats = [
  { label: "Total Students", value: "248", change: "+12%", icon: Users, color: "text-primary" },
  { label: "Pending Approvals", value: "8", change: "Needs attention", icon: Clock, color: "text-accent" },
  { label: "Approved Today", value: "5", change: "+3", icon: CheckCircle2, color: "text-primary" },
  { label: "New Applications", value: "12", change: "This week", icon: UserPlus, color: "text-teal" },
];

const pendingApprovals = [
  { id: 1, name: "James Wilson", squad: "U-15 Elite", date: "Today", age: 14, parentPhone: "+91 98765 43210" },
  { id: 2, name: "Sophia Miller", squad: "U-11 Beginners", date: "Today", age: 10, parentPhone: "+91 87654 32109" },
  { id: 3, name: "Arjun Patel", squad: "U-13 Development", date: "Yesterday", age: 12, parentPhone: "+91 76543 21098" },
  { id: 4, name: "Priya Sharma", squad: "U-17 Premier", date: "Yesterday", age: 16, parentPhone: "+91 65432 10987" },
  { id: 5, name: "Rahul Kumar", squad: "U-15 Elite", date: "2 days ago", age: 14, parentPhone: "+91 54321 09876" },
];

const recentApprovals = [
  { name: "Olivia Brown", squad: "U-13 Development", date: "Today", status: "Approved" },
  { name: "Noah Davis", squad: "U-17 Premier", date: "Yesterday", status: "Approved" },
  { name: "Emma Johnson", squad: "U-11 Beginners", date: "2 days ago", status: "Approved" },
  { name: "Liam Anderson", squad: "U-15 Elite", date: "3 days ago", status: "Rejected" },
];

const squadStats = [
  { name: "U-17 Premier", students: 45, capacity: 50, pending: 2 },
  { name: "U-15 Elite", students: 38, capacity: 40, pending: 3 },
  { name: "U-13 Development", students: 42, capacity: 50, pending: 1 },
  { name: "U-11 Beginners", students: 28, capacity: 35, pending: 2 },
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
          {/* Pending Approvals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="rounded-2xl border border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-primary" />
                  Pending Student Approvals
                </CardTitle>
                <span className="px-3 py-1 bg-accent/10 text-accent-foreground rounded-full text-sm font-medium">
                  {pendingApprovals.length} pending
                </span>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingApprovals.map((student) => (
                    <div key={student.id} className="p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-semibold text-foreground">{student.name}</span>
                            <span className="text-sm text-muted-foreground">Age: {student.age}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{student.squad}</span>
                            <span>•</span>
                            <span>{student.parentPhone}</span>
                            <span>•</span>
                            <span>{student.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="text-coral border-coral/20 hover:bg-coral/10">
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                          <Button variant="accent" size="sm">
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="rounded-2xl border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentApprovals.map((approval, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-card border border-border rounded-2xl">
                    <div>
                      <div className="font-medium text-foreground">{approval.name}</div>
                      <div className="text-sm text-muted-foreground">{approval.squad}</div>
                    </div>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                      approval.status === "Approved"
                        ? "bg-primary/10 text-primary border-primary/20"
                        : "bg-coral/10 text-coral border-coral/20"
                    }`}>
                      {approval.status}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Squad Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Squad Overview
              </CardTitle>
              <Button variant="outline" size="sm">View All Squads</Button>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {squadStats.map((squad, index) => (
                  <div key={index} className="p-4 bg-card border border-border rounded-2xl">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="font-semibold text-foreground">{squad.name}</span>
                        <span className="text-sm text-muted-foreground ml-2">
                          ({squad.students}/{squad.capacity})
                        </span>
                      </div>
                      {squad.pending > 0 && (
                        <span className="px-2 py-1 bg-accent/10 text-accent-foreground rounded-full text-xs font-medium">
                          {squad.pending} pending
                        </span>
                      )}
                    </div>
                    <Progress value={(squad.students / squad.capacity) * 100} className="h-2.5" />
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