import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Calendar,
  BarChart3,
  Trophy,
  TrendingUp,
  Target,
  Zap,
  Activity,
  UserCheck,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  usePlayerMatchHistory, 
  usePlayerPracticeHistory, 
  usePlayerPerformanceMetrics,
  usePlayerAssignment,
  usePlayerCombinedAttendance,
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
  AreaChart,
  Area,
} from "recharts";

const navItems = [
  { label: "Dashboard", href: "/dashboard/member", icon: Home },
  { label: "Schedule", href: "/dashboard/member/schedule", icon: Calendar },
  { label: "My Progress", href: "/dashboard/member/progress", icon: BarChart3 },
  { label: "Attendance", href: "/dashboard/member/attendance", icon: UserCheck },
  { label: "Achievements", href: "/dashboard/member/achievements", icon: Trophy },
];

const MemberProgress = () => {
  const navigate = useNavigate();
  const { data: matchHistory, isLoading: loadingMatches } = usePlayerMatchHistory(10);
  const { data: practiceHistory, isLoading: loadingPractice } = usePlayerPracticeHistory(10);
  const { data: metrics, isLoading: loadingMetrics } = usePlayerPerformanceMetrics();
  const { data: assignment } = usePlayerAssignment();
  const { data: attendanceStats } = usePlayerCombinedAttendance();

  const isLoading = loadingMatches || loadingPractice || loadingMetrics;

  // Calculate stats
  const overallStats = [
    { 
      label: "Match Rating", 
      value: metrics?.avgMatchRating?.toFixed(1) || "—", 
      change: `${metrics?.totalMatches || 0} matches played`, 
      icon: Trophy, 
      color: "text-primary" 
    },
    { 
      label: "Practice Rating", 
      value: metrics?.avgPracticeRating?.toFixed(1) || "—", 
      change: `${metrics?.totalPractices || 0} sessions`, 
      icon: Activity, 
      color: "text-teal" 
    },
    { 
      label: "Attendance", 
      value: `${attendanceStats?.rate || 0}%`, 
      change: `${attendanceStats?.present || 0}/${attendanceStats?.total || 0} attended`, 
      icon: Target, 
      color: "text-coral" 
    },
    { 
      label: "Training Ground", 
      value: assignment?.ground?.name?.split(' ')[0] || "—", 
      change: assignment?.primary_coach?.full_name || "Coach", 
      icon: TrendingUp, 
      color: "text-primary" 
    },
  ];

  // Chart data for ratings over time
  const chartData = metrics?.allRatings?.map((r, i) => ({
    name: format(new Date(r.date), "MMM d"),
    rating: r.rating,
    type: r.type,
    label: r.label,
  })) || [];

  return (
    <DashboardLayout
      title="My Progress"
      navItems={navItems}
      userRole="Member"
      
    >
      <div className="space-y-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate("/dashboard/member")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {overallStats.map((stat, index) => (
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

        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-4 flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Performance Trend
              </CardTitle>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-muted-foreground">Rating</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Loading performance data...
                </div>
              ) : chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="ratingGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="name" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis 
                      domain={[0, 10]}
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number, name: string, props: { payload?: { label?: string; type?: string } }) => [
                        `${value}/10`,
                        props.payload?.label || 'Rating'
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="rating"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      fill="url(#ratingGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  No performance data available yet
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Match & Practice History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Performance History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="matches">
                <TabsList className="mb-4">
                  <TabsTrigger value="matches">Matches ({metrics?.totalMatches || 0})</TabsTrigger>
                  <TabsTrigger value="practice">Practice ({metrics?.totalPractices || 0})</TabsTrigger>
                </TabsList>

                <TabsContent value="matches" className="space-y-3">
                  {isLoading ? (
                    <div className="text-center py-8 text-muted-foreground">Loading...</div>
                  ) : matchHistory && matchHistory.length > 0 ? (
                    matchHistory.map((perf, index) => (
                      <motion.div
                        key={perf.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <span className="font-display text-xl text-primary">
                              {perf.coach_rating || "—"}
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">
                              vs {perf.match?.opponent_name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {perf.match?.match_date 
                                ? format(new Date(perf.match.match_date), "MMM d, yyyy")
                                : "—"}
                              {perf.minutes_played && ` • ${perf.minutes_played} mins`}
                              {perf.started_match && " • Started"}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right hidden md:block">
                            {perf.metrics && Object.entries(perf.metrics).slice(0, 3).map(([key, value]) => (
                              <span key={key} className="text-xs text-muted-foreground mr-3">
                                {key.replace(/_/g, ' ')}: {String(value)}
                              </span>
                            ))}
                          </div>
                          <Badge 
                            variant="outline" 
                            className={
                              (perf.coach_rating || 0) >= 8 
                                ? "bg-primary/10 text-primary border-primary/20"
                                : (perf.coach_rating || 0) >= 6
                                ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                                : "bg-muted text-muted-foreground"
                            }
                          >
                            {(perf.coach_rating || 0) >= 8 ? "Excellent" : (perf.coach_rating || 0) >= 6 ? "Good" : "Average"}
                          </Badge>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No match performances recorded yet
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="practice" className="space-y-3">
                  {isLoading ? (
                    <div className="text-center py-8 text-muted-foreground">Loading...</div>
                  ) : practiceHistory && practiceHistory.length > 0 ? (
                    practiceHistory.map((perf, index) => (
                      <motion.div
                        key={perf.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center">
                            <span className="font-display text-xl text-teal">
                              {perf.coach_rating || "—"}
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">
                              {perf.session?.focus_area || "Training Session"}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {perf.session?.session_date 
                                ? format(new Date(perf.session.session_date), "MMM d, yyyy")
                                : "—"}
                              {perf.effort_level && ` • Effort: ${perf.effort_level}/5`}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {perf.coach_notes && (
                            <span className="text-sm text-muted-foreground hidden md:block max-w-xs truncate">
                              {perf.coach_notes}
                            </span>
                          )}
                          <Badge 
                            variant="outline" 
                            className={
                              perf.attended 
                                ? "bg-primary/10 text-primary border-primary/20"
                                : "bg-destructive/10 text-destructive border-destructive/20"
                            }
                          >
                            {perf.attended ? "Attended" : "Missed"}
                          </Badge>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No practice performances recorded yet
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 gap-4"
        >
          <Link to="/dashboard/member/attendance">
            <Card className="rounded-2xl border border-border hover:border-primary/30 transition-colors cursor-pointer">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">View Full Attendance</div>
                    <div className="text-sm text-muted-foreground">
                      See detailed attendance history and stats
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link to="/dashboard/member/schedule">
            <Card className="rounded-2xl border border-border hover:border-primary/30 transition-colors cursor-pointer">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-teal" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Upcoming Schedule</div>
                    <div className="text-sm text-muted-foreground">
                      View upcoming sessions and matches
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default MemberProgress;
