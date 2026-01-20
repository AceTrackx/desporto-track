import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Home,
  Calendar,
  BarChart3,
  Trophy,
  Target,
  Clock,
  TrendingUp,
  Users,
  ChevronRight,
  UserCheck,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { usePlayerUpcomingSessions, usePlayerAssignment } from "@/hooks/useMemberData";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, parseISO } from "date-fns";

const navItems = [
  { label: "Dashboard", href: "/dashboard/member", icon: Home },
  { label: "Schedule", href: "/dashboard/member/schedule", icon: Calendar },
  { label: "My Progress", href: "/dashboard/member/progress", icon: BarChart3 },
  { label: "Attendance", href: "/dashboard/member/attendance", icon: UserCheck },
  { label: "Achievements", href: "/dashboard/member/achievements", icon: Trophy },
];

const skills = [
  { name: "Passing", value: 78 },
  { name: "Shooting", value: 65 },
  { name: "Dribbling", value: 82 },
  { name: "Defending", value: 70 },
  { name: "Physical", value: 75 },
];

const achievements = [
  { title: "Perfect Attendance", description: "30 days streak", icon: Trophy },
  { title: "Top Scorer", description: "15 goals this season", icon: Target },
  { title: "Early Bird", description: "First to 50 sessions", icon: Clock },
];

const MemberDashboard = () => {
  const { data: upcomingData } = usePlayerUpcomingSessions();
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  // Combine sessions and matches for the week view
  const weekEvents = [
    ...(upcomingData?.sessions || []).map(s => ({
      id: s.id,
      title: s.focus_area || s.session_type || 'Practice',
      date: s.session_date,
      type: 'Training' as const,
    })),
    ...(upcomingData?.matches || []).map(m => ({
      id: m.id,
      title: `vs ${m.opponent_name}`,
      date: m.match_date,
      type: 'Match' as const,
    })),
  ];

  const getEventsForDay = (day: Date) => {
    return weekEvents.filter(event => {
      const eventDate = parseISO(event.date);
      return isSameDay(eventDate, day);
    });
  };
  return (
    <DashboardLayout
      title="Dashboard"
      navItems={navItems}
      userRole="Member"
      userName="Alex Thompson"
    >
      <div className="space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hero-gradient rounded-3xl p-8 text-white relative overflow-hidden"
        >
          <div className="dashed-pattern absolute inset-0 opacity-20" />
          <div className="relative z-10">
            <h2 className="font-display text-4xl md:text-5xl tracking-wide mb-2">
              WELCOME BACK, ALEX!
            </h2>
            <p className="text-white/80 text-lg mb-4">
              You have 2 training sessions scheduled this week.
            </p>
            <div className="flex flex-wrap gap-6 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4">
                <div className="font-display text-3xl text-lime">89%</div>
                <div className="text-white/70 text-sm">Attendance Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4">
                <div className="font-display text-3xl text-lime">A+</div>
                <div className="text-white/70 text-sm">Performance</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4">
                <div className="font-display text-3xl text-lime">12</div>
                <div className="text-white/70 text-sm">Goals Scored</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Week View Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="rounded-2xl border border-border">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    This Week
                  </CardTitle>
                  <Link to="/dashboard/member/schedule">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      View Full Calendar
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {weekDays.map((day) => {
                    const dayEvents = getEventsForDay(day);
                    const isToday = isSameDay(day, today);
                    
                    return (
                      <div
                        key={day.toISOString()}
                        className={`flex flex-col items-center p-2 rounded-xl min-h-[100px] ${
                          isToday 
                            ? "bg-primary/10 border-2 border-primary" 
                            : "bg-muted/30 border border-border"
                        }`}
                      >
                        <span className="text-xs text-muted-foreground font-medium">
                          {format(day, "EEE")}
                        </span>
                        <span className={`text-lg font-semibold mb-2 ${
                          isToday ? "text-primary" : "text-foreground"
                        }`}>
                          {format(day, "d")}
                        </span>
                        <div className="flex flex-col gap-1 w-full">
                          {dayEvents.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              className={`w-full px-1.5 py-0.5 rounded text-[10px] font-medium truncate text-center ${
                                event.type === "Match" 
                                  ? "bg-coral/20 text-coral" 
                                  : "bg-primary/20 text-primary"
                              }`}
                              title={event.title}
                            >
                              {event.type === "Match" ? "Match" : "Train"}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <span className="text-[10px] text-muted-foreground text-center">
                              +{dayEvents.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="rounded-2xl border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-accent" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <achievement.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-foreground text-sm">{achievement.title}</div>
                      <div className="text-xs text-muted-foreground">{achievement.description}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Skills Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
            <Card className="rounded-2xl border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Skill Progress
                </CardTitle>
              </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                {skills.map((skill) => (
                  <div key={skill.name} className="p-4 bg-card border border-border rounded-2xl">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-foreground text-sm">{skill.name}</span>
                      <span className="text-sm font-semibold text-primary">{skill.value}%</span>
                    </div>
                    <Progress value={skill.value} className="h-2.5" />
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

export default MemberDashboard;
