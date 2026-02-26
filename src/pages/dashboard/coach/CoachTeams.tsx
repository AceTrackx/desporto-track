import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Calendar,
  Users,
  ClipboardCheck,
  BarChart3,
  FileText,
  TrendingUp,
  UserPlus,
  Star,
  Activity,
  ArrowLeft,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ManageTeamDialog } from "@/components/team/ManageTeamDialog";
import { usePlayers } from "@/hooks/usePlayers";
import { useSports } from "@/hooks/useSports";

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

const AGE_GROUPS = ["U-11", "U-13", "U-15", "U-17", "U-19"];

const CoachTeams = () => {
  const navigate = useNavigate();
  const { data: players = [], isLoading: playersLoading } = usePlayers();
  const { data: sports = [] } = useSports();

  const [selectedTeam, setSelectedTeam] = useState<{
    name: string;
    ageGroup: string;
    sportId?: string;
  } | null>(null);

  // Group players by age group
  const teamsByAgeGroup = AGE_GROUPS.map((ageGroup) => {
    const teamPlayers = players.filter((p) => p.age_group === ageGroup);
    const sportCounts: Record<string, number> = {};
    teamPlayers.forEach((p) => {
      const sportName = p.sport?.name || "Unknown";
      sportCounts[sportName] = (sportCounts[sportName] || 0) + 1;
    });

    return {
      name: `${ageGroup} Squad`,
      ageGroup,
      description: `Players in ${ageGroup} age category`,
      players: teamPlayers.length,
      sports: Object.entries(sportCounts).map(([name, count]) => ({ name, count })),
      topPlayers: teamPlayers.slice(0, 3).map((p) => p.profile?.full_name || "Unknown"),
      sportId: teamPlayers[0]?.sport_id,
    };
  }).filter((team) => team.players > 0);

  const totalPlayers = players.length;
  const totalTeams = teamsByAgeGroup.length;

  return (
    <DashboardLayout
      title="My Teams"
      navItems={navItems}
      userRole="Coach"
      
    >
      <div className="space-y-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate("/dashboard/coach")} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: "Total Teams", value: totalTeams.toString(), icon: Users, color: "text-primary" },
            { label: "Total Players", value: totalPlayers.toString(), icon: UserPlus, color: "text-teal" },
            { label: "Age Groups", value: AGE_GROUPS.length.toString(), icon: Star, color: "text-accent-foreground" },
            { label: "Sports", value: sports.length.toString(), icon: TrendingUp, color: "text-coral" },
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

        {/* Teams List */}
        {playersLoading ? (
          <div className="text-center py-8 text-muted-foreground">Loading teams...</div>
        ) : teamsByAgeGroup.length === 0 ? (
          <Card className="rounded-2xl border border-border">
            <CardContent className="p-8 text-center text-muted-foreground">
              No teams found. Add players with age groups to see teams here.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {teamsByAgeGroup.map((team, index) => (
              <motion.div
                key={team.ageGroup}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <Card className="rounded-2xl border border-border hover:border-primary/20 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      {/* Team Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="font-display text-2xl text-foreground">{team.name}</h3>
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <span className="font-display text-lg text-primary">{team.ageGroup}</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-4">{team.description}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="p-3 bg-muted rounded-xl">
                            <div className="text-2xl font-display text-foreground">{team.players}</div>
                            <div className="text-xs text-muted-foreground">Players</div>
                          </div>
                          {team.sports.slice(0, 3).map((sport, sIndex) => (
                            <div key={sIndex} className="p-3 bg-muted rounded-xl">
                              <div className="text-2xl font-display text-primary">{sport.count}</div>
                              <div className="text-xs text-muted-foreground">{sport.name}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right Side */}
                      <div className="lg:w-64 space-y-4">
                        <div>
                          <div className="text-sm text-muted-foreground mb-2">Top Players</div>
                          <div className="flex -space-x-2">
                            {team.topPlayers.map((player, pIndex) => (
                              <Avatar key={pIndex} className="w-8 h-8 border-2 border-background">
                                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                  {player
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                            {team.players > 3 && (
                              <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs text-muted-foreground">
                                +{team.players - 3}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => navigate("/dashboard/coach/players")}
                          >
                            View Roster
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            className="flex-1"
                            onClick={() =>
                              setSelectedTeam({
                                name: team.name,
                                ageGroup: team.ageGroup,
                                sportId: team.sportId,
                              })
                            }
                          >
                            Manage
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Manage Team Dialog */}
      {selectedTeam && (
        <ManageTeamDialog
          open={!!selectedTeam}
          onOpenChange={(open) => !open && setSelectedTeam(null)}
          team={selectedTeam}
        />
      )}
    </DashboardLayout>
  );
};

export default CoachTeams;
