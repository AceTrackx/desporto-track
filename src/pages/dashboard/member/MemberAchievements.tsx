import { motion } from "framer-motion";
import {
  Home,
  Calendar,
  BarChart3,
  Trophy,
  Target,
  UserCheck,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  usePlayerCombinedAttendance,
  usePlayerPerformanceMetrics,
} from "@/hooks/useMemberData";

const navItems = [
  { label: "Dashboard", href: "/dashboard/member", icon: Home },
  { label: "Schedule", href: "/dashboard/member/schedule", icon: Calendar },
  { label: "My Progress", href: "/dashboard/member/progress", icon: BarChart3 },
  { label: "Attendance", href: "/dashboard/member/attendance", icon: UserCheck },
  { label: "Achievements", href: "/dashboard/member/achievements", icon: Trophy },
];

const MemberAchievements = () => {
  const { data: attendanceStats } = usePlayerCombinedAttendance();
  const { data: metrics } = usePlayerPerformanceMetrics();

  // Derive achievements from real data
  const achievements = [];

  if (attendanceStats) {
    if (attendanceStats.rate >= 90) {
      achievements.push({ title: "Consistent Performer", description: `${attendanceStats.rate}% attendance rate`, icon: Target, rarity: "Epic" });
    }
    if (attendanceStats.present >= 50) {
      achievements.push({ title: "Half Century", description: `Attended ${attendanceStats.present} sessions`, icon: Trophy, rarity: "Legendary" });
    } else if (attendanceStats.present >= 25) {
      achievements.push({ title: "Quarter Century", description: `Attended ${attendanceStats.present} sessions`, icon: Trophy, rarity: "Rare" });
    } else if (attendanceStats.present >= 10) {
      achievements.push({ title: "Getting Started", description: `Attended ${attendanceStats.present} sessions`, icon: Trophy, rarity: "Common" });
    }
  }

  if (metrics) {
    if (metrics.totalMatches >= 10) {
      achievements.push({ title: "Match Veteran", description: `Played ${metrics.totalMatches} matches`, icon: Target, rarity: "Epic" });
    } else if (metrics.totalMatches >= 5) {
      achievements.push({ title: "Match Player", description: `Played ${metrics.totalMatches} matches`, icon: Target, rarity: "Rare" });
    }
    if (metrics.avgMatchRating >= 8) {
      achievements.push({ title: "Star Performer", description: `Average match rating: ${metrics.avgMatchRating}/10`, icon: Trophy, rarity: "Legendary" });
    }
  }

  const getRarityStyles = (rarity: string) => {
    switch (rarity) {
      case "Legendary": return "bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-600";
      case "Epic": return "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-600";
      case "Rare": return "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-600";
      default: return "bg-primary/10 border-primary/20 text-primary";
    }
  };

  return (
    <DashboardLayout title="Achievements" navItems={navItems} userRole="Member">
      <div className="space-y-8">
        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Achievements Earned", value: String(achievements.length), icon: Trophy, color: "text-primary" },
            { label: "Matches Played", value: String(metrics?.totalMatches || 0), icon: Target, color: "text-teal" },
            { label: "Sessions Attended", value: String(attendanceStats?.present || 0), icon: Calendar, color: "text-accent-foreground" },
            { label: "Attendance Rate", value: `${attendanceStats?.rate || 0}%`, icon: UserCheck, color: "text-coral" },
          ].map((stat, index) => (
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

        {/* Achievements */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                Earned Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="font-medium">No achievements yet</p>
                  <p className="text-sm mt-1">Keep attending sessions and playing matches to earn achievements!</p>
                </div>
              ) : (
                achievements.map((achievement, index) => (
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
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default MemberAchievements;
