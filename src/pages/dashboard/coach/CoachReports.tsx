import { motion } from "framer-motion";
import {
  Home,
  Calendar,
  Users,
  ClipboardCheck,
  BarChart3,
  FileText,
  Download,
  Send,
  Clock,
  CheckCircle,
  Activity,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const navItems = [
  { label: "Dashboard", href: "/dashboard/coach", icon: Home },
  { label: "Schedule", href: "/dashboard/coach/schedule", icon: Calendar },
  { label: "My Teams", href: "/dashboard/coach/teams", icon: Users },
  { label: "Players", href: "/dashboard/coach/players", icon: Users },
  { label: "Attendance", href: "/dashboard/coach/attendance", icon: ClipboardCheck },
  { label: "Performance", href: "/dashboard/coach/performance", icon: Activity },
  { label: "Analytics", href: "/dashboard/coach/analytics", icon: BarChart3 },
  { label: "Reports", href: "/dashboard/coach/reports", icon: FileText },
];

const reportStats = [
  { label: "Reports Generated", value: "45", icon: FileText, color: "text-primary" },
  { label: "Pending Reviews", value: "3", icon: Clock, color: "text-accent-foreground" },
  { label: "Sent to Parents", value: "38", icon: Send, color: "text-teal" },
  { label: "Completed", value: "42", icon: CheckCircle, color: "text-primary" },
];

const pendingReports = [
  { player: "Alex Thompson", team: "U-15 Elite", type: "Monthly Progress", dueDate: "Jan 15", progress: 75 },
  { player: "Marcus Johnson", team: "U-15 Elite", type: "Performance Review", dueDate: "Jan 16", progress: 50 },
  { player: "David Chen", team: "U-15 Elite", type: "Monthly Progress", dueDate: "Jan 18", progress: 25 },
];

const recentReports = [
  { player: "Emma Wilson", team: "U-13 Development", type: "Monthly Progress", date: "Jan 10", status: "Sent" },
  { player: "Oliver Brown", team: "U-17 Premier", type: "Performance Review", date: "Jan 8", status: "Sent" },
  { player: "Sophia Miller", team: "U-13 Development", type: "Monthly Progress", date: "Jan 5", status: "Sent" },
  { player: "Noah Davis", team: "U-17 Premier", type: "Injury Report", date: "Jan 3", status: "Reviewed" },
  { player: "Liam Harris", team: "U-15 Elite", type: "Monthly Progress", date: "Dec 28", status: "Sent" },
];

const reportTemplates = [
  { name: "Monthly Progress Report", description: "Standard monthly player assessment", uses: 28 },
  { name: "Performance Review", description: "Detailed skill breakdown and goals", uses: 12 },
  { name: "Match Analysis", description: "Post-match performance evaluation", uses: 8 },
  { name: "Injury Report", description: "Document injuries and recovery", uses: 3 },
];

const CoachReports = () => {
  return (
    <DashboardLayout
      title="Reports"
      navItems={navItems}
      userRole="Coach"
      userName="Coach Williams"
    >
      <div className="space-y-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {reportStats.map((stat, index) => (
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

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Pending Reports */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="rounded-2xl border border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent-foreground" />
                  Pending Reports
                </CardTitle>
                <Button variant="accent" size="sm">Create New Report</Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingReports.map((report, index) => (
                  <div
                    key={index}
                    className="p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-semibold text-foreground">{report.player}</div>
                        <div className="text-sm text-muted-foreground">{report.team} • {report.type}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-foreground">Due: {report.dueDate}</div>
                        <div className="text-xs text-muted-foreground">{report.progress}% complete</div>
                      </div>
                    </div>
                    <Progress value={report.progress} className="h-2.5 mb-3" />
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">Continue</Button>
                      <Button variant="default" size="sm" className="flex-1">Complete & Send</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Report Templates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="rounded-2xl border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Templates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {reportTemplates.map((template, index) => (
                  <div
                    key={index}
                    className="p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-foreground text-sm">{template.name}</span>
                      <span className="text-xs text-muted-foreground">{template.uses} uses</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{template.description}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Recent Reports
              </CardTitle>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-1" /> Export All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentReports.map((report, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-1 h-10 rounded-full bg-primary" />
                      <div>
                        <div className="font-medium text-foreground">{report.player}</div>
                        <div className="text-sm text-muted-foreground">{report.team} • {report.type}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">{report.date}</div>
                      </div>
                      <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                        report.status === "Sent" 
                          ? "bg-primary/10 text-primary border-primary/20" 
                          : "bg-teal/10 text-teal border-teal/20"
                      }`}>
                        {report.status}
                      </span>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
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

export default CoachReports;
