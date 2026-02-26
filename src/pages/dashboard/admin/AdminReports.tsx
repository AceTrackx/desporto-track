import { motion } from "framer-motion";
import { Home, Users, Calendar, BarChart3, Settings, FileText, Download, TrendingUp, UserCheck, Clock } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", href: "/dashboard/admin", icon: Home },
  { label: "Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Schedule", href: "/dashboard/admin/schedule", icon: Calendar },
  { label: "Reports", href: "/dashboard/admin/reports", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];

const reports = [
  { title: "Attendance Report", description: "Weekly attendance summary for all squads", date: "Jan 15, 2026", type: "Attendance" },
  { title: "Approval Summary", description: "Student approval/rejection statistics", date: "Jan 14, 2026", type: "Approvals" },
  { title: "Squad Performance", description: "Performance metrics by squad", date: "Jan 12, 2026", type: "Performance" },
  { title: "Monthly Overview", description: "January 2026 comprehensive report", date: "Jan 10, 2026", type: "Overview" },
];

const stats = [
  { label: "Total Approvals", value: "156", change: "This month", icon: UserCheck },
  { label: "Avg. Processing Time", value: "2.4h", change: "-15%", icon: Clock },
  { label: "Approval Rate", value: "94%", change: "+2%", icon: TrendingUp },
];

const AdminReports = () => {
  return (
    <DashboardLayout title="Reports" navItems={navItems} userRole="Admin">
      <div className="space-y-6">
        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="rounded-2xl border border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-display text-2xl text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Reports List */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="rounded-2xl border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Available Reports
              </CardTitle>
              <Button variant="accent" size="sm">Generate Report</Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {reports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{report.title}</div>
                      <div className="text-sm text-muted-foreground">{report.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground">{report.type}</span>
                    <span className="text-sm text-muted-foreground">{report.date}</span>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
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
