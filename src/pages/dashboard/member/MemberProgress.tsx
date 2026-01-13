import { motion } from "framer-motion";
import {
  Home,
  Calendar,
  BarChart3,
  Trophy,
  TrendingUp,
  Target,
  Zap,
  Activity,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const navItems = [
  { label: "Dashboard", href: "/dashboard/member", icon: Home },
  { label: "Schedule", href: "/dashboard/member/schedule", icon: Calendar },
  { label: "My Progress", href: "/dashboard/member/progress", icon: BarChart3 },
  { label: "Achievements", href: "/dashboard/member/achievements", icon: Trophy },
];

const overallStats = [
  { label: "Overall Rating", value: "A+", change: "+2 ranks", icon: Trophy, color: "text-primary" },
  { label: "Training Hours", value: "156", change: "+12 this month", icon: Activity, color: "text-teal" },
  { label: "Goals Scored", value: "28", change: "+5 this season", icon: Target, color: "text-coral" },
  { label: "Sessions Attended", value: "89%", change: "+3% vs last month", icon: TrendingUp, color: "text-primary" },
];

const skillCategories = [
  {
    name: "Technical Skills",
    skills: [
      { name: "Ball Control", current: 85, previous: 78, max: 100 },
      { name: "Passing Accuracy", current: 78, previous: 72, max: 100 },
      { name: "First Touch", current: 82, previous: 76, max: 100 },
      { name: "Shooting", current: 72, previous: 68, max: 100 },
      { name: "Dribbling", current: 88, previous: 82, max: 100 },
    ],
  },
  {
    name: "Physical Attributes",
    skills: [
      { name: "Speed", current: 76, previous: 74, max: 100 },
      { name: "Stamina", current: 82, previous: 78, max: 100 },
      { name: "Strength", current: 68, previous: 65, max: 100 },
      { name: "Agility", current: 84, previous: 80, max: 100 },
    ],
  },
  {
    name: "Mental Attributes",
    skills: [
      { name: "Decision Making", current: 75, previous: 70, max: 100 },
      { name: "Positioning", current: 78, previous: 72, max: 100 },
      { name: "Teamwork", current: 90, previous: 88, max: 100 },
      { name: "Leadership", current: 72, previous: 68, max: 100 },
    ],
  },
];

const recentAssessments = [
  { date: "Jan 10, 2026", coach: "Coach Williams", rating: "A", notes: "Excellent dribbling improvement. Work on left foot." },
  { date: "Dec 28, 2025", coach: "Coach Johnson", rating: "A-", notes: "Good positioning. Needs to improve stamina." },
  { date: "Dec 15, 2025", coach: "Coach Williams", rating: "B+", notes: "Strong technical skills. Focus on decision making." },
];

const MemberProgress = () => {
  return (
    <DashboardLayout
      title="My Progress"
      navItems={navItems}
      userRole="Member"
      userName="Alex Thompson"
    >
      <div className="space-y-8">
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
                <div className="text-sm text-primary">{stat.change}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Skill Categories */}
        <div className="grid lg:grid-cols-3 gap-6">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + catIndex * 0.1 }}
            >
              <Card className="rounded-2xl border border-border h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.skills.map((skill, index) => (
                    <div key={index} className="p-4 bg-card border border-border rounded-2xl">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-foreground text-sm">{skill.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-primary">{skill.current}</span>
                          <span className={`text-xs ${
                            skill.current > skill.previous ? "text-primary" : "text-muted-foreground"
                          }`}>
                            {skill.current > skill.previous ? `+${skill.current - skill.previous}` : "—"}
                          </span>
                        </div>
                      </div>
                      <div className="relative">
                        <Progress value={skill.current} className="h-2.5" />
                        <div
                          className="absolute top-0 w-0.5 h-2.5 bg-muted-foreground/50 rounded"
                          style={{ left: `${skill.previous}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Assessments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Recent Assessments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentAssessments.map((assessment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <span className="font-display text-xl text-primary">{assessment.rating}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{assessment.date}</div>
                      <div className="text-sm text-muted-foreground">by {assessment.coach}</div>
                    </div>
                  </div>
                  <div className="flex-1 mx-8 text-sm text-muted-foreground hidden md:block">
                    {assessment.notes}
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

export default MemberProgress;
