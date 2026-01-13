import { motion } from "framer-motion";
import { Home, Users, Calendar, CreditCard, BarChart3, Settings, FileText, Download, TrendingUp } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", href: "/dashboard/admin", icon: Home },
  { label: "Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Schedule", href: "/dashboard/admin/schedule", icon: Calendar },
  { label: "Finances", href: "/dashboard/admin/finances", icon: CreditCard },
  { label: "Reports", href: "/dashboard/admin/reports", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];

const reports = [
  { title: "Monthly Performance Report", type: "Performance", date: "Jan 2026", size: "2.4 MB" },
  { title: "Financial Summary Q4 2025", type: "Financial", date: "Dec 2025", size: "1.8 MB" },
  { title: "Attendance Overview", type: "Attendance", date: "Jan 2026", size: "956 KB" },
  { title: "Player Progress Report", type: "Performance", date: "Jan 2026", size: "3.2 MB" },
  { title: "Squad Analytics", type: "Analytics", date: "Jan 2026", size: "1.5 MB" },
];

const AdminReports = () => {
  return (
    <DashboardLayout title="Reports" navItems={navItems} userRole="Admin" userName="John Mitchell">
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[{ label: "Total Reports", value: "156" }, { label: "This Month", value: "12" }, { label: "Downloads", value: "89" }, { label: "Scheduled", value: "4" }].map((stat, i) => (
            <Card key={i} className="rounded-2xl border border-border">
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
                <div className="font-display text-3xl text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="rounded-2xl border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2"><FileText className="w-5 h-5 text-primary" />Available Reports</CardTitle>
              <Button variant="accent" size="sm">Generate New</Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {reports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><FileText className="w-5 h-5 text-primary" /></div>
                    <div><div className="font-medium text-foreground">{report.title}</div><div className="text-sm text-muted-foreground">{report.type} • {report.date} • {report.size}</div></div>
                  </div>
                  <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1" />Download</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AdminReports;
