import { motion } from "framer-motion";
import {
  Home,
  Calendar,
  BarChart3,
  Trophy,
  Medal,
  Star,
  Target,
  Clock,
  Flame,
  Award,
  Shield,
  Zap,
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

const stats = [
  { label: "Total Achievements", value: "24", icon: Trophy, color: "text-primary" },
  { label: "This Season", value: "8", icon: Star, color: "text-accent-foreground" },
  { label: "Badges Earned", value: "15", icon: Medal, color: "text-teal" },
  { label: "Leaderboard Rank", value: "#3", icon: Award, color: "text-coral" },
];

const earnedAchievements = [
  { title: "Perfect Attendance", description: "Attend 30 consecutive sessions", icon: Clock, date: "Jan 8, 2026", rarity: "Epic" },
  { title: "Top Scorer", description: "Score 15 goals in a season", icon: Target, date: "Dec 20, 2025", rarity: "Legendary" },
  { title: "Early Bird", description: "Be first to arrive 20 times", icon: Zap, date: "Dec 15, 2025", rarity: "Rare" },
  { title: "Team Player", description: "10 assists in a month", icon: Shield, date: "Dec 10, 2025", rarity: "Epic" },
  { title: "Iron Will", description: "Complete all fitness challenges", icon: Flame, date: "Nov 28, 2025", rarity: "Rare" },
  { title: "Sharp Shooter", description: "Score 5 goals in one match", icon: Target, date: "Nov 15, 2025", rarity: "Legendary" },
];

const inProgressAchievements = [
  { title: "Century Player", description: "Complete 100 training sessions", icon: Star, progress: 89, target: 100 },
  { title: "Hat Trick Hero", description: "Score 3 hat tricks in a season", icon: Trophy, progress: 2, target: 3 },
  { title: "Defensive Wall", description: "Keep 10 clean sheets", icon: Shield, progress: 7, target: 10 },
  { title: "Skill Master", description: "Reach 90% in all technical skills", icon: Zap, progress: 3, target: 5 },
];

const getRarityStyles = (rarity: string) => {
  switch (rarity) {
    case "Legendary":
      return "bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-600";
    case "Epic":
      return "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-600";
    case "Rare":
      return "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-600";
    default:
      return "bg-primary/10 border-primary/20 text-primary";
  }
};

const MemberAchievements = () => {
  return (
    <DashboardLayout
      title="Achievements"
      navItems={navItems}
      userRole="Member"
      userName="Alex Thompson"
    >
      <div className="space-y-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat, index) => (
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
          {/* Earned Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="rounded-2xl border border-border h-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  Earned Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {earnedAchievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-colors hover:border-primary/20 ${getRarityStyles(achievement.rarity)}`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center shrink-0">
                      <achievement.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{achievement.title}</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${getRarityStyles(achievement.rarity)}`}>
                          {achievement.rarity}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">{achievement.description}</div>
                      <div className="text-xs text-muted-foreground mt-1">Earned: {achievement.date}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* In Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="rounded-2xl border border-border h-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  In Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {inProgressAchievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <achievement.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground">{achievement.title}</div>
                        <div className="text-sm text-muted-foreground">{achievement.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-display text-lg text-primary">
                          {achievement.progress}/{achievement.target}
                        </div>
                      </div>
                    </div>
                    <Progress 
                      value={(achievement.progress / achievement.target) * 100} 
                      className="h-2.5" 
                    />
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

export default MemberAchievements;
