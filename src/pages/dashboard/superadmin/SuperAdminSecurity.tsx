import { motion } from "framer-motion";
import {
  Home,
  Building,
  Users,
  BarChart3,
  Shield,
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Lock,
  Eye,
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

const securityStats = [
  { label: "Security Score", value: "94%", icon: Shield, color: "text-primary" },
  { label: "Active Threats", value: "0", icon: AlertTriangle, color: "text-teal" },
  { label: "Failed Logins (24h)", value: "23", icon: XCircle, color: "text-accent-foreground" },
  { label: "2FA Enabled", value: "89%", icon: Lock, color: "text-primary" },
];

const recentActivity = [
  { action: "Login attempt blocked", user: "unknown@attacker.com", ip: "192.168.1.100", time: "2 min ago", type: "warning" },
  { action: "Password changed", user: "john@eliteacademy.com", ip: "10.0.0.15", time: "15 min ago", type: "info" },
  { action: "New admin created", user: "sarah@premieryouth.com", ip: "10.0.0.22", time: "1 hour ago", type: "info" },
  { action: "Multiple failed logins", user: "coach@academy.com", ip: "192.168.1.55", time: "2 hours ago", type: "warning" },
  { action: "2FA enabled", user: "emma@champions.com", ip: "10.0.0.8", time: "3 hours ago", type: "success" },
];

const securityChecks = [
  { name: "SSL Certificate", status: "valid", expiry: "Mar 15, 2027", score: 100 },
  { name: "Database Encryption", status: "enabled", details: "AES-256", score: 100 },
  { name: "API Rate Limiting", status: "active", details: "1000 req/min", score: 100 },
  { name: "DDoS Protection", status: "active", details: "Cloudflare", score: 100 },
  { name: "Backup System", status: "active", details: "Daily backups", score: 95 },
  { name: "User 2FA Adoption", status: "partial", details: "89% of admins", score: 89 },
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case "warning":
      return <AlertTriangle className="w-4 h-4 text-accent-foreground" />;
    case "success":
      return <CheckCircle className="w-4 h-4 text-primary" />;
    default:
      return <Eye className="w-4 h-4 text-teal" />;
  }
};

const getActivityStyles = (type: string) => {
  switch (type) {
    case "warning":
      return "bg-accent/10";
    case "success":
      return "bg-primary/10";
    default:
      return "bg-teal/10";
  }
};

const SuperAdminSecurity = () => {
  return (
    <DashboardLayout
      title="Security"
      navItems={navItems}
      userRole="Super Admin"
      userName="Michael Roberts"
    >
      <div className="space-y-8">
        {/* Security Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {securityStats.map((stat, index) => (
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

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Security Checks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="rounded-2xl border border-border h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Security Status
                </CardTitle>
                <Button variant="outline" size="sm">Run Scan</Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {securityChecks.map((check, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        check.score >= 100 ? "bg-primary/10" : 
                        check.score >= 90 ? "bg-accent/10" : "bg-coral/10"
                      }`}>
                        {check.score >= 100 ? (
                          <CheckCircle className="w-4 h-4 text-primary" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-accent-foreground" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-foreground text-sm">{check.name}</div>
                        <div className="text-xs text-muted-foreground">{check.details}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-16">
                        <Progress value={check.score} className="h-2" />
                      </div>
                      <span className={`text-sm font-medium ${
                        check.score >= 100 ? "text-primary" : "text-accent-foreground"
                      }`}>
                        {check.score}%
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="rounded-2xl border border-border h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Security Activity
                </CardTitle>
                <Button variant="outline" size="sm">View All</Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${getActivityStyles(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground text-sm">{activity.action}</div>
                      <div className="text-xs text-muted-foreground truncate">{activity.user}</div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span>IP: {activity.ip}</span>
                        <span>•</span>
                        <span>{activity.time}</span>
                      </div>
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

export default SuperAdminSecurity;
