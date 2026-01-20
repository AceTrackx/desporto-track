import { format } from "date-fns";
import { Calendar, Clock, MapPin, Users, ChevronRight, Dumbbell, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSessions } from "@/hooks/useSessions";
import { useMatches } from "@/hooks/useMatches";
import type { TrainingSession, Match } from "@/types/sports";

interface SessionSelectorProps {
  onSelectSession: (session: TrainingSession) => void;
  onSelectMatch: (match: Match) => void;
}

export function SessionSelector({ onSelectSession, onSelectMatch }: SessionSelectorProps) {
  const { data: sessions = [], isLoading: sessionsLoading } = useSessions();
  const { data: matches = [], isLoading: matchesLoading } = useMatches();

  // Sort by date descending (most recent first)
  const sortedSessions = [...sessions].sort(
    (a, b) => new Date(b.session_date).getTime() - new Date(a.session_date).getTime()
  );

  const sortedMatches = [...matches].sort(
    (a, b) => new Date(b.match_date).getTime() - new Date(a.match_date).getTime()
  );

  return (
    <Tabs defaultValue="sessions" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="sessions" className="flex items-center gap-2">
          <Dumbbell className="w-4 h-4" />
          Practice Sessions
        </TabsTrigger>
        <TabsTrigger value="matches" className="flex items-center gap-2">
          <Trophy className="w-4 h-4" />
          Matches
        </TabsTrigger>
      </TabsList>

      <TabsContent value="sessions" className="space-y-3">
        {sessionsLoading ? (
          <div className="text-center py-8 text-muted-foreground">Loading sessions...</div>
        ) : sortedSessions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No training sessions found. Create a session from the Schedule page.
          </div>
        ) : (
          sortedSessions.map((session) => (
            <Card
              key={session.id}
              className="cursor-pointer hover:border-primary/40 transition-colors rounded-xl"
              onClick={() => onSelectSession(session)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">
                        {session.focus_area || session.session_type || "Training Session"}
                      </h3>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {session.sport?.name || "Sport"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {format(new Date(session.session_date), "MMM d, yyyy")}
                      </span>
                      {session.duration_minutes && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {session.duration_minutes} min
                        </span>
                      )}
                      {session.coach?.full_name && (
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {session.coach.full_name}
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </TabsContent>

      <TabsContent value="matches" className="space-y-3">
        {matchesLoading ? (
          <div className="text-center py-8 text-muted-foreground">Loading matches...</div>
        ) : sortedMatches.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No matches found. Create a match from the Performance page.
          </div>
        ) : (
          sortedMatches.map((match) => (
            <Card
              key={match.id}
              className="cursor-pointer hover:border-primary/40 transition-colors rounded-xl"
              onClick={() => onSelectMatch(match)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">
                        vs {match.opponent_name}
                      </h3>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {match.sport?.name || "Sport"}
                      </Badge>
                      {match.age_group && (
                        <Badge variant="outline">
                          {match.age_group}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {format(new Date(match.match_date), "MMM d, yyyy")}
                      </span>
                      {match.venue && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {match.venue}
                        </span>
                      )}
                      {match.result && (
                        <Badge
                          variant="outline"
                          className={
                            match.result === "win"
                              ? "bg-primary/10 text-primary"
                              : match.result === "loss"
                              ? "bg-coral/10 text-coral"
                              : "bg-muted"
                          }
                        >
                          {match.result.toUpperCase()}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </TabsContent>
    </Tabs>
  );
}
