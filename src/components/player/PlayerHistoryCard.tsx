import { format } from "date-fns";
import { motion } from "framer-motion";
import { Trophy, Dumbbell, TrendingUp, Star, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePlayerMatchPerformances, usePlayerPracticePerformances } from "@/hooks/usePerformances";
import { Skeleton } from "@/components/ui/skeleton";

interface PlayerHistoryCardProps {
  playerId: string;
  playerName: string;
}

export function PlayerHistoryCard({ playerId, playerName }: PlayerHistoryCardProps) {
  const { data: matchPerformances, isLoading: matchLoading } = usePlayerMatchPerformances(playerId);
  const { data: practicePerformances, isLoading: practiceLoading } = usePlayerPracticePerformances(playerId);

  const avgMatchRating = matchPerformances?.length
    ? matchPerformances.reduce((sum, p) => sum + (p.coach_rating || 0), 0) / matchPerformances.length
    : 0;

  const avgPracticeRating = practicePerformances?.length
    ? practicePerformances.reduce((sum, p) => sum + (p.coach_rating || 0), 0) / practicePerformances.length
    : 0;

  const attendanceRate = practicePerformances?.length
    ? (practicePerformances.filter(p => p.attended).length / practicePerformances.length) * 100
    : 0;

  if (matchLoading || practiceLoading) {
    return (
      <Card className="rounded-2xl border border-border">
        <CardContent className="p-6">
          <Skeleton className="h-48 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl border border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Performance History - {playerName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-xl bg-primary/5 border border-primary/20">
            <div className="text-2xl font-display text-primary">{matchPerformances?.length || 0}</div>
            <div className="text-xs text-muted-foreground">Matches Played</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-accent/10 border border-accent/20">
            <div className="text-2xl font-display text-accent-foreground">{avgMatchRating.toFixed(1)}</div>
            <div className="text-xs text-muted-foreground">Avg Match Rating</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-green-500/10 border border-green-500/20">
            <div className="text-2xl font-display text-green-600">{attendanceRate.toFixed(0)}%</div>
            <div className="text-xs text-muted-foreground">Attendance</div>
          </div>
        </div>

        <Tabs defaultValue="matches" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="matches" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" /> Matches ({matchPerformances?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="practice" className="flex items-center gap-2">
              <Dumbbell className="w-4 h-4" /> Practice ({practicePerformances?.length || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="matches" className="mt-4 space-y-3">
            {!matchPerformances?.length ? (
              <div className="text-center py-8 text-muted-foreground">
                No match history yet
              </div>
            ) : (
              matchPerformances.slice(0, 5).map((perf, idx) => (
                <motion.div
                  key={perf.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">
                        vs {perf.match?.opponent_name || "Unknown"}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {perf.match?.match_date 
                          ? format(new Date(perf.match.match_date), "PP")
                          : "Unknown date"
                        }
                        <span>•</span>
                        <span>{perf.minutes_played || 0} min</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {perf.started_match && (
                      <Badge variant="outline" className="text-xs">Started</Badge>
                    )}
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-accent/10">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{perf.coach_rating || "-"}</span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </TabsContent>

          <TabsContent value="practice" className="mt-4 space-y-3">
            {!practicePerformances?.length ? (
              <div className="text-center py-8 text-muted-foreground">
                No practice history yet
              </div>
            ) : (
              practicePerformances.slice(0, 5).map((perf, idx) => (
                <motion.div
                  key={perf.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      perf.attended ? "bg-green-500/10" : "bg-red-500/10"
                    }`}>
                      <Dumbbell className={`w-5 h-5 ${
                        perf.attended ? "text-green-600" : "text-red-600"
                      }`} />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">
                        {perf.session?.focus_area || "Training Session"}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {perf.session?.session_date 
                          ? format(new Date(perf.session.session_date), "PP")
                          : "Unknown date"
                        }
                        <span>•</span>
                        <span className="capitalize">{perf.session?.session_type || "regular"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Effort:</span>
                      <Progress value={(perf.effort_level || 0) * 20} className="w-16 h-2" />
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-accent/10">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{perf.coach_rating || "-"}</span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
