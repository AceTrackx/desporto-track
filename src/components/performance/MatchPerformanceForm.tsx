import { useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  Save,
  ChevronDown,
  ChevronUp,
  User,
  Trophy,
  Clock,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { MetricForm } from "./MetricForm";
import type { Player, Match, MetricTemplate } from "@/types/sports";
import { useCreateMatchPerformance } from "@/hooks/usePerformances";
import { toast } from "sonner";

interface MatchPerformanceFormProps {
  match: Match;
  players: Player[];
  metrics: MetricTemplate[];
  onSuccess?: () => void;
}

interface PlayerPerformanceData {
  metrics: Record<string, number | boolean>;
  minutes_played: number;
  started_match: boolean;
  coach_rating: number;
  coach_notes: string;
}

export function MatchPerformanceForm({
  match,
  players,
  metrics,
  onSuccess,
}: MatchPerformanceFormProps) {
  const [expandedPlayers, setExpandedPlayers] = useState<Set<string>>(new Set());
  const [performanceData, setPerformanceData] = useState<Record<string, PlayerPerformanceData>>({});
  const createPerformance = useCreateMatchPerformance();

  const togglePlayer = (playerId: string) => {
    const newExpanded = new Set(expandedPlayers);
    if (newExpanded.has(playerId)) {
      newExpanded.delete(playerId);
    } else {
      newExpanded.add(playerId);
      // Initialize data if not exists
      if (!performanceData[playerId]) {
        setPerformanceData((prev) => ({
          ...prev,
          [playerId]: {
            metrics: {},
            minutes_played: 0,
            started_match: false,
            coach_rating: 5,
            coach_notes: "",
          },
        }));
      }
    }
    setExpandedPlayers(newExpanded);
  };

  const updatePlayerData = (playerId: string, field: keyof PlayerPerformanceData, value: any) => {
    setPerformanceData((prev) => ({
      ...prev,
      [playerId]: {
        ...prev[playerId],
        [field]: value,
      },
    }));
  };

  const handleSavePlayer = async (playerId: string) => {
    const data = performanceData[playerId];
    if (!data) return;

    try {
      await createPerformance.mutateAsync({
        player_id: playerId,
        match_id: match.id,
        metrics: data.metrics,
        minutes_played: data.minutes_played,
        started_match: data.started_match,
        coach_rating: data.coach_rating,
        coach_notes: data.coach_notes || undefined,
      });
      toast.success("Performance saved successfully");
      onSuccess?.();
    } catch (error) {
      toast.error("Failed to save performance");
    }
  };

  return (
    <Card className="rounded-2xl border border-border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Match Performance Entry
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              vs {match.opponent_name} • {format(new Date(match.match_date), "PPP")}
            </p>
          </div>
          <Badge variant="outline" className="capitalize">
            {match.match_type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {players.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No players found for this sport. Add players first.
          </div>
        ) : (
          players.map((player) => {
            const isExpanded = expandedPlayers.has(player.id);
            const data = performanceData[player.id];

            return (
              <Collapsible key={player.id} open={isExpanded}>
                <motion.div
                  className="border border-border rounded-xl overflow-hidden"
                  initial={false}
                  animate={{ backgroundColor: isExpanded ? "hsl(var(--muted))" : "transparent" }}
                >
                  <CollapsibleTrigger asChild>
                    <button
                      onClick={() => togglePlayer(player.id)}
                      className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {player.profile?.full_name
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("") || "?"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                          <div className="font-medium text-foreground">
                            {player.profile?.full_name || "Unknown Player"}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {player.position || "No position"} • #{player.jersey_number || "-"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {data && (
                          <Badge variant="secondary" className="mr-2">
                            Rating: {data.coach_rating}/10
                          </Badge>
                        )}
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-4 pb-4 space-y-4">
                      {/* Basic info */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-background rounded-xl">
                        <div className="space-y-2">
                          <Label className="text-sm flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Minutes Played
                          </Label>
                          <Input
                            type="number"
                            min={0}
                            max={120}
                            value={data?.minutes_played || 0}
                            onChange={(e) =>
                              updatePlayerData(player.id, "minutes_played", parseInt(e.target.value) || 0)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm">Started Match</Label>
                          <div className="flex items-center h-10">
                            <Switch
                              checked={data?.started_match || false}
                              onCheckedChange={(checked) =>
                                updatePlayerData(player.id, "started_match", checked)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-span-2 space-y-2">
                          <Label className="text-sm flex items-center gap-2">
                            <Star className="w-4 h-4" />
                            Coach Rating: {data?.coach_rating || 5}/10
                          </Label>
                          <Slider
                            value={[data?.coach_rating || 5]}
                            min={1}
                            max={10}
                            step={1}
                            onValueChange={([val]) =>
                              updatePlayerData(player.id, "coach_rating", val)
                            }
                          />
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="space-y-3">
                        <Label className="text-sm font-semibold">Performance Metrics</Label>
                        <MetricForm
                          metrics={metrics}
                          values={data?.metrics || {}}
                          onChange={(metrics) => updatePlayerData(player.id, "metrics", metrics)}
                        />
                      </div>

                      {/* Notes */}
                      <div className="space-y-2">
                        <Label className="text-sm">Coach Notes</Label>
                        <Textarea
                          placeholder="Add notes about this player's performance..."
                          value={data?.coach_notes || ""}
                          onChange={(e) =>
                            updatePlayerData(player.id, "coach_notes", e.target.value)
                          }
                        />
                      </div>

                      {/* Save button */}
                      <Button
                        onClick={() => handleSavePlayer(player.id)}
                        disabled={createPerformance.isPending}
                        className="w-full"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {createPerformance.isPending ? "Saving..." : "Save Performance"}
                      </Button>
                    </div>
                  </CollapsibleContent>
                </motion.div>
              </Collapsible>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
