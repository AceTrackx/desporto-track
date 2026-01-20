import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import {
  Home,
  Calendar,
  Users,
  ClipboardCheck,
  BarChart3,
  FileText,
  Trophy,
  Dumbbell,
  Activity,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateMatchDialog } from "@/components/performance/CreateMatchDialog";
import { CreateSessionDialog } from "@/components/performance/CreateSessionDialog";
import { MatchPerformanceForm } from "@/components/performance/MatchPerformanceForm";
import { PracticePerformanceForm } from "@/components/performance/PracticePerformanceForm";
import { useSports } from "@/hooks/useSports";
import { useMatches } from "@/hooks/useMatches";
import { useSessions } from "@/hooks/useSessions";
import { usePlayers } from "@/hooks/usePlayers";
import { useMetricTemplates } from "@/hooks/useMetricTemplates";

const navItems = [
  { label: "Dashboard", href: "/dashboard/coach", icon: Home },
  { label: "Schedule", href: "/dashboard/coach/schedule", icon: Calendar },
  { label: "My Teams", href: "/dashboard/coach/teams", icon: Users },
  { label: "Attendance", href: "/dashboard/coach/attendance", icon: ClipboardCheck },
  { label: "Performance", href: "/dashboard/coach/performance", icon: Activity },
  { label: "Analytics", href: "/dashboard/coach/analytics", icon: BarChart3 },
  { label: "Reports", href: "/dashboard/coach/reports", icon: FileText },
];

type ViewState = "selection" | "match-entry" | "practice-entry";

const CoachPerformance = () => {
  const [selectedSportId, setSelectedSportId] = useState<string>("");
  const [selectedMatchId, setSelectedMatchId] = useState<string>("");
  const [selectedSessionId, setSelectedSessionId] = useState<string>("");
  const [currentView, setCurrentView] = useState<ViewState>("selection");
  const [activeTab, setActiveTab] = useState<"match" | "practice">("match");

  const { data: sports, isLoading: sportsLoading } = useSports();
  const { data: matches, isLoading: matchesLoading } = useMatches(selectedSportId || undefined);
  const { data: sessions, isLoading: sessionsLoading } = useSessions(selectedSportId || undefined);
  const { data: players, isLoading: playersLoading } = usePlayers(selectedSportId || undefined);
  const { data: matchMetrics } = useMetricTemplates(selectedSportId || undefined, "match");
  const { data: practiceMetrics } = useMetricTemplates(selectedSportId || undefined, "practice");

  const selectedMatch = matches?.find((m) => m.id === selectedMatchId);
  const selectedSession = sessions?.find((s) => s.id === selectedSessionId);

  // Auto-select first sport if available
  if (sports?.length && !selectedSportId) {
    setSelectedSportId(sports[0].id);
  }

  const handleMatchSelect = (matchId: string) => {
    setSelectedMatchId(matchId);
    setCurrentView("match-entry");
  };

  const handleSessionSelect = (sessionId: string) => {
    setSelectedSessionId(sessionId);
    setCurrentView("practice-entry");
  };

  const handleBack = () => {
    setCurrentView("selection");
    setSelectedMatchId("");
    setSelectedSessionId("");
  };

  const handleFormSuccess = () => {
    handleBack();
  };

  return (
    <DashboardLayout
      title="Performance Entry"
      navItems={navItems}
      userRole="Coach"
      userName="Coach Williams"
    >
      <AnimatePresence mode="wait">
        {/* Match Performance Entry View */}
        {currentView === "match-entry" && selectedMatch && players && matchMetrics && (
          <motion.div
            key="match-entry"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Selection
              </Button>
            </div>

            <Card className="rounded-2xl border border-border">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <Trophy className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">
                      Match vs {selectedMatch.opponent_name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(selectedMatch.match_date), "PPP")} • {selectedMatch.match_type}
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <MatchPerformanceForm
              match={selectedMatch}
              players={players}
              metrics={matchMetrics}
              onSuccess={handleFormSuccess}
            />
          </motion.div>
        )}

        {/* Practice Performance Entry View */}
        {currentView === "practice-entry" && selectedSession && players && practiceMetrics && (
          <motion.div
            key="practice-entry"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Selection
              </Button>
            </div>

            <Card className="rounded-2xl border border-border">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-accent/10">
                    <Dumbbell className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">
                      {selectedSession.focus_area || "Training Session"}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(selectedSession.session_date), "PPP")}
                      {selectedSession.duration_minutes && ` • ${selectedSession.duration_minutes} min`}
                      {" • "}{selectedSession.session_type}
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <PracticePerformanceForm
              session={selectedSession}
              players={players}
              metrics={practiceMetrics}
              onSuccess={handleFormSuccess}
            />
          </motion.div>
        )}

        {/* Selection View */}
        {currentView === "selection" && (
          <motion.div
            key="selection"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Sport Selection */}
            <Card className="rounded-2xl border border-border">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-foreground mb-1">
                      Select Sport
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Choose a sport to manage match and practice performances
                    </p>
                  </div>
                  {sportsLoading ? (
                    <Skeleton className="h-10 w-48" />
                  ) : (
                    <Select value={selectedSportId} onValueChange={setSelectedSportId}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select sport" />
                      </SelectTrigger>
                      <SelectContent>
                        {sports?.map((sport) => (
                          <SelectItem key={sport.id} value={sport.id}>
                            {sport.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Performance Tabs */}
            {selectedSportId && (
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "match" | "practice")} className="space-y-6">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="match" className="flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    Match Performance
                  </TabsTrigger>
                  <TabsTrigger value="practice" className="flex items-center gap-2">
                    <Dumbbell className="w-4 h-4" />
                    Practice Performance
                  </TabsTrigger>
                </TabsList>

                {/* Match Performance Tab */}
                <TabsContent value="match" className="space-y-6">
                  <Card className="rounded-2xl border border-border">
                    <CardHeader className="flex flex-row items-center justify-between pb-4">
                      <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-primary" />
                        Select Match
                      </CardTitle>
                      <CreateMatchDialog
                        defaultSportId={selectedSportId}
                        onSuccess={(id) => handleMatchSelect(id)}
                      />
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {matchesLoading ? (
                        <div className="space-y-3">
                          {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-20 w-full" />
                          ))}
                        </div>
                      ) : matches?.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          No matches found. Create a new match to get started.
                        </div>
                      ) : (
                        matches?.slice(0, 5).map((match) => (
                          <button
                            key={match.id}
                            onClick={() => handleMatchSelect(match.id)}
                            className="w-full flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-1 h-12 rounded-full bg-primary" />
                              <div className="text-left">
                                <div className="font-semibold text-foreground">
                                  vs {match.opponent_name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {format(new Date(match.match_date), "PPP")}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline" className="text-xs capitalize">
                                    {match.match_type}
                                  </Badge>
                                  {match.result && (
                                    <Badge
                                      variant={
                                        match.result === "win"
                                          ? "default"
                                          : match.result === "loss"
                                          ? "destructive"
                                          : "secondary"
                                      }
                                      className="text-xs capitalize"
                                    >
                                      {match.result}
                                    </Badge>
                                  )}
                                  {match.home_score !== null && match.away_score !== null && (
                                    <span className="text-xs text-muted-foreground">
                                      {match.home_score} - {match.away_score}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                          </button>
                        ))
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Practice Performance Tab */}
                <TabsContent value="practice" className="space-y-6">
                  <Card className="rounded-2xl border border-border">
                    <CardHeader className="flex flex-row items-center justify-between pb-4">
                      <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <Dumbbell className="w-5 h-5 text-primary" />
                        Select Training Session
                      </CardTitle>
                      <CreateSessionDialog
                        defaultSportId={selectedSportId}
                        onSuccess={(id) => handleSessionSelect(id)}
                      />
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {sessionsLoading ? (
                        <div className="space-y-3">
                          {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-20 w-full" />
                          ))}
                        </div>
                      ) : sessions?.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          No training sessions found. Create a new session to get started.
                        </div>
                      ) : (
                        sessions?.slice(0, 5).map((session) => (
                          <button
                            key={session.id}
                            onClick={() => handleSessionSelect(session.id)}
                            className="w-full flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-1 h-12 rounded-full bg-accent" />
                              <div className="text-left">
                                <div className="font-semibold text-foreground">
                                  {session.focus_area || "Training Session"}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {format(new Date(session.session_date), "PPP")}
                                  {session.duration_minutes && ` • ${session.duration_minutes} min`}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline" className="text-xs capitalize">
                                    {session.session_type}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                          </button>
                        ))
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default CoachPerformance;
