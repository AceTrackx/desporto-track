import { motion } from "framer-motion";
import {
  Home,
  Calendar,
  BarChart3,
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  usePlayerSessionAttendance, 
  usePlayerCombinedAttendance 
} from "@/hooks/useMemberData";
import { format } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const navItems = [
  { label: "Dashboard", href: "/dashboard/member", icon: Home },
  { label: "Schedule", href: "/dashboard/member/schedule", icon: Calendar },
  { label: "My Progress", href: "/dashboard/member/progress", icon: BarChart3 },
  { label: "Attendance", href: "/dashboard/member/attendance", icon: UserCheck },
  { label: "Achievements", href: "/dashboard/member/achievements", icon: Trophy },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "present":
      return <CheckCircle2 className="w-4 h-4 text-primary" />;
    case "absent":
      return <XCircle className="w-4 h-4 text-destructive" />;
    case "late":
      return <Clock className="w-4 h-4 text-amber-500" />;
    default:
      return <Clock className="w-4 h-4 text-muted-foreground" />;
  }
};

const getStatusBadge = (status: string) => {
  const styles: Record<string, string> = {
    present: "bg-primary/10 text-primary border-primary/20",
    absent: "bg-destructive/10 text-destructive border-destructive/20",
    late: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    excused: "bg-muted text-muted-foreground border-border",
  };
  return styles[status] || styles.excused;
};

const MemberAttendance = () => {
  const { data: sessionAttendance, isLoading: loadingSessions } = usePlayerSessionAttendance(50);
  const { data: combinedStats, isLoading: loadingStats } = usePlayerCombinedAttendance();

  const isLoading = loadingSessions || loadingStats;

  // Stats cards data
  const statsCards = [
    {
      label: "Attendance Rate",
      value: `${combinedStats?.rate || 0}%`,
      icon: TrendingUp,
      color: "text-primary",
      change: combinedStats && combinedStats.rate >= 80 ? "Good standing" : "Needs improvement",
    },
    {
      label: "Sessions Attended",
      value: combinedStats?.present || 0,
      icon: CheckCircle2,
      color: "text-primary",
      change: `Out of ${combinedStats?.total || 0} total`,
    },
    {
      label: "Practice Sessions",
      value: combinedStats?.sessionCount || 0,
      icon: Calendar,
      color: "text-teal",
      change: "Training sessions",
    },
    {
      label: "Matches",
      value: combinedStats?.matchCount || 0,
      icon: Trophy,
      color: "text-coral",
      change: "Match attendance",
    },
  ];

  return (
    <DashboardLayout
      title="My Attendance"
      navItems={navItems}
      userRole="Member"
      userName="Alex Thompson"
    >
      <div className="space-y-8">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {statsCards.map((stat, index) => (
            <Card key={index} className="rounded-2xl border border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
                <div className="font-display text-3xl text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.change}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Attendance Rate Over Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="rounded-2xl border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Attendance Rate Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    Loading...
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={combinedStats?.monthlyData || []}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="month" 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis 
                        domain={[0, 100]}
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="rate"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                        name="Attendance %"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Monthly Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="rounded-2xl border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Monthly Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    Loading...
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={combinedStats?.monthlyData || []}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="month" 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Bar dataKey="present" fill="hsl(var(--primary))" name="Present" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="late" fill="#f59e0b" name="Late" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="absent" fill="hsl(var(--destructive))" name="Absent" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Attendance History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-primary" />
                Attendance History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="sessions">Practice Sessions</TabsTrigger>
                  <TabsTrigger value="matches">Matches</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-3">
                  {isLoading ? (
                    <div className="text-center py-8 text-muted-foreground">Loading...</div>
                  ) : sessionAttendance && sessionAttendance.length > 0 ? (
                    sessionAttendance.map((record, index) => (
                      <motion.div
                        key={record.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            {getStatusIcon(record.status)}
                          </div>
                          <div>
                            <div className="font-medium text-foreground">
                              {record.session?.focus_area || "Training Session"}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {record.session?.session_date 
                                ? format(new Date(record.session.session_date), "MMM d, yyyy • h:mm a")
                                : "Date unavailable"}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {record.check_in_time && (
                            <span className="text-sm text-muted-foreground">
                              Check-in: {record.check_in_time}
                            </span>
                          )}
                          <Badge className={getStatusBadge(record.status)} variant="outline">
                            {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                          </Badge>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No attendance records found
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="sessions" className="space-y-3">
                  {isLoading ? (
                    <div className="text-center py-8 text-muted-foreground">Loading...</div>
                  ) : sessionAttendance && sessionAttendance.length > 0 ? (
                    sessionAttendance.map((record, index) => (
                      <motion.div
                        key={record.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl"
                      >
                        <div className="flex items-center gap-4">
                          {getStatusIcon(record.status)}
                          <div>
                            <div className="font-medium">{record.session?.focus_area}</div>
                            <div className="text-sm text-muted-foreground">
                              {record.session?.session_date 
                                ? format(new Date(record.session.session_date), "MMM d, yyyy")
                                : ""}
                            </div>
                          </div>
                        </div>
                        <Badge className={getStatusBadge(record.status)} variant="outline">
                          {record.status}
                        </Badge>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No session attendance records
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="matches" className="space-y-3">
                  <div className="text-center py-8 text-muted-foreground">
                    Match attendance records will appear here
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default MemberAttendance;
