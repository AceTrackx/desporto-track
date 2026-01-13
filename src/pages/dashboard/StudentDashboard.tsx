import { motion } from "framer-motion";
import {
  Home,
  Calendar,
  BarChart3,
  Trophy,
  Target,
  Clock,
  TrendingUp,
  Users,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const navItems = [
  { label: "Dashboard", href: "/dashboard/student", icon: Home },
  { label: "Schedule", href: "/dashboard/student/schedule", icon: Calendar },
  { label: "My Progress", href: "/dashboard/student/progress", icon: BarChart3 },
  { label: "Achievements", href: "/dashboard/student/achievements", icon: Trophy },
];

const upcomingSessions = [
  { title: "Technical Training", time: "10:00 AM", type: "Training", date: "Today" },
  { title: "Match vs City FC", time: "2:00 PM", type: "Match", date: "Tomorrow" },
  { title: "Fitness Session", time: "9:00 AM", type: "Fitness", date: "Wed, Jan 15" },
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

const StudentDashboard = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      navItems={navItems}
      userRole="Student"
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
          {/* Upcoming Sessions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="rounded-2xl shadow-soft">
              <CardHeader>
                <CardTitle className="font-display text-2xl tracking-wide flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-primary" />
                  UPCOMING SESSIONS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingSessions.map((session, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-muted rounded-xl hover:bg-muted/80 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-12 rounded-full ${
                        session.type === "Match" ? "bg-coral" :
                        session.type === "Fitness" ? "bg-teal" : "bg-primary"
                      }`} />
                      <div>
                        <div className="font-semibold text-foreground">{session.title}</div>
                        <div className="text-sm text-muted-foreground">{session.date} at {session.time}</div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      session.type === "Match" ? "bg-coral/20 text-coral" :
                      session.type === "Fitness" ? "bg-teal/20 text-teal" : "bg-primary/20 text-primary"
                    }`}>
                      {session.type}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="rounded-2xl shadow-soft">
              <CardHeader>
                <CardTitle className="font-display text-2xl tracking-wide flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-accent" />
                  ACHIEVEMENTS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-accent/10 rounded-xl"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                      <achievement.icon className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{achievement.title}</div>
                      <div className="text-sm text-muted-foreground">{achievement.description}</div>
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
          <Card className="rounded-2xl shadow-soft">
            <CardHeader>
              <CardTitle className="font-display text-2xl tracking-wide flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                SKILL PROGRESS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                {skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground">{skill.name}</span>
                      <span className="text-sm font-bold text-primary">{skill.value}%</span>
                    </div>
                    <Progress value={skill.value} className="h-3" />
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

export default StudentDashboard;
