import { motion } from "framer-motion";
import {
  Home,
  Calendar,
  BarChart3,
  CreditCard,
  MessageSquare,
  User,
  TrendingUp,
  Clock,
  CheckCircle2,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", href: "/dashboard/parent", icon: Home },
  { label: "Schedule", href: "/dashboard/parent/schedule", icon: Calendar },
  { label: "Progress", href: "/dashboard/parent/progress", icon: BarChart3 },
  { label: "Payments", href: "/dashboard/parent/payments", icon: CreditCard },
  { label: "Messages", href: "/dashboard/parent/messages", icon: MessageSquare },
];

const children = [
  {
    name: "Alex Thompson",
    age: 14,
    squad: "U-15 Elite",
    attendance: 89,
    performance: "A+",
    nextSession: "Today, 4:00 PM",
  },
  {
    name: "Emma Thompson",
    age: 12,
    squad: "U-13 Development",
    attendance: 95,
    performance: "A",
    nextSession: "Tomorrow, 10:00 AM",
  },
];

const recentActivity = [
  { action: "Attended training session", child: "Alex", time: "2 hours ago", type: "attendance" },
  { action: "Scored 2 goals in practice", child: "Alex", time: "2 hours ago", type: "achievement" },
  { action: "Completed skill assessment", child: "Emma", time: "Yesterday", type: "assessment" },
  { action: "Perfect attendance badge", child: "Emma", time: "2 days ago", type: "achievement" },
];

const payments = [
  { description: "Monthly Fee - January", amount: 150, status: "Paid", date: "Jan 1, 2026" },
  { description: "Monthly Fee - February", amount: 150, status: "Due", date: "Feb 1, 2026" },
  { description: "Tournament Fee", amount: 50, status: "Pending", date: "Jan 15, 2026" },
];

const ParentDashboard = () => {
  return (
    <DashboardLayout
      title="Parent Dashboard"
      navItems={navItems}
      userRole="Parent"
      userName="Sarah Thompson"
    >
      <div className="space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="font-display text-3xl tracking-wide text-foreground mb-2">
            HELLO, SARAH!
          </h2>
          <p className="text-muted-foreground">
            Monitor your children's progress and stay updated with academy activities.
          </p>
        </motion.div>

        {/* Children Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="font-display text-2xl tracking-wide text-foreground mb-4 flex items-center gap-2">
            <User className="w-6 h-6 text-primary" />
            YOUR CHILDREN
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {children.map((child, index) => (
              <Card key={index} className="rounded-2xl shadow-soft overflow-hidden">
                <div className="hero-gradient p-6 text-white">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16 border-2 border-white/30">
                      <AvatarFallback className="bg-white/20 text-white text-xl font-bold">
                        {child.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-display text-2xl tracking-wide">{child.name.toUpperCase()}</div>
                      <div className="text-white/80">{child.squad} • Age {child.age}</div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="font-display text-2xl text-primary">{child.attendance}%</div>
                      <div className="text-xs text-muted-foreground">Attendance</div>
                    </div>
                    <div className="text-center">
                      <div className="font-display text-2xl text-accent">{child.performance}</div>
                      <div className="text-xs text-muted-foreground">Performance</div>
                    </div>
                    <div className="text-center">
                      <div className="font-display text-2xl text-teal">12</div>
                      <div className="text-xs text-muted-foreground">Sessions</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Next Session:</span>
                    </div>
                    <span className="text-sm font-semibold text-foreground">{child.nextSession}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="rounded-2xl shadow-soft">
              <CardHeader>
                <CardTitle className="font-display text-2xl tracking-wide flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  RECENT ACTIVITY
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 bg-muted/50 rounded-xl">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === "achievement" ? "bg-accent/20" :
                      activity.type === "assessment" ? "bg-teal/20" : "bg-primary/20"
                    }`}>
                      <CheckCircle2 className={`w-5 h-5 ${
                        activity.type === "achievement" ? "text-accent-foreground" :
                        activity.type === "assessment" ? "text-teal" : "text-primary"
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{activity.action}</div>
                      <div className="text-sm text-muted-foreground">{activity.child} • {activity.time}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Payments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="rounded-2xl shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-display text-2xl tracking-wide flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-primary" />
                  PAYMENTS
                </CardTitle>
                <Button variant="outline" size="sm">View All</Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {payments.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                    <div>
                      <div className="font-medium text-foreground">{payment.description}</div>
                      <div className="text-sm text-muted-foreground">{payment.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-foreground">${payment.amount}</div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        payment.status === "Paid" ? "bg-primary/20 text-primary" :
                        payment.status === "Due" ? "bg-destructive/20 text-destructive" :
                        "bg-accent/20 text-accent-foreground"
                      }`}>
                        {payment.status}
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

export default ParentDashboard;
