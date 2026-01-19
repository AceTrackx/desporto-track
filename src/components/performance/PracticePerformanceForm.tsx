import { useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  Save,
  ChevronDown,
  ChevronUp,
  Dumbbell,
  Star,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import type { Player, TrainingSession, MetricTemplate } from "@/types/sports";
import { useCreatePracticePerformance } from "@/hooks/usePerformances";
import { toast } from "sonner";

interface PracticePerformanceFormProps {
  session: TrainingSession;
  players: Player[];
  metrics: MetricTemplate[];
  onSuccess?: () => void;
}

interface PlayerPerformanceData {
  metrics: Record<string, number | boolean>;
  attended: boolean;
  effort_level: number;
  coach_rating: number;
  coach_notes: string;
}

export function PracticePerformanceForm({
  session,
  players,
  metrics,
  onSuccess,
}: PracticePerformanceFormProps) {
  const [expandedPlayers, setExpandedPlayers] = useState<Set<string>>(new Set());
  const [performanceData, setPerformanceData] = useState<Record<string, PlayerPerformanceData>>({});
  const createPerformance = useCreatePracticePerformance();

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
            attended: true,
            effort_level: 3,
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
        session_id: session.id,
        metrics: data.metrics,
        attended: data.attended,
        effort_level: data.effort_level,
        coach_rating: data.coach_rating,
        coach_notes: data.coach_notes || undefined,
      });
      toast.success("Performance saved successfully");
      onSuccess?.();
    } catch (error) {
      toast.error("Failed to save performance");
    }
  };

  const getEffortLabel = (level: number) => {
    const labels = ["", "Low", "Moderate", "Good", "High", "Excellent"];
    return labels[level] || "";
  };

  return (
    <Card className="rounded-2xl border border-border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-primary" />
              Practice Performance Entry
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {session.focus_area || "Training Session"} • {format(new Date(session.session_date), "PPP")}
              {session.duration_minutes && ` • ${session.duration_minutes} min`}
            </p>
          </div>
          <Badge variant="outline" className="capitalize">
            {session.session_type}
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
                          <>
                            <Badge
                              variant={data.attended ? "default" : "destructive"}
                              className="mr-1"
                            >
                              {data.attended ? "Present" : "Absent"}
                            </Badge>
                            <Badge variant="secondary">
                              Rating: {data.coach_rating}/10
                            </Badge>
                          </>
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
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-background rounded-xl">
                        <div className="space-y-2">
                          <Label className="text-sm">Attended</Label>
                          <div className="flex items-center h-10">
                            <Switch
                              checked={data?.attended ?? true}
                              onCheckedChange={(checked) =>
                                updatePlayerData(player.id, "attended", checked)
                              }
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm flex items-center gap-2">
                            <Flame className="w-4 h-4" />
                            Effort: {getEffortLabel(data?.effort_level || 3)}
                          </Label>
                          <Slider
                            value={[data?.effort_level || 3]}
                            min={1}
                            max={5}
                            step={1}
                            onValueChange={([val]) =>
                              updatePlayerData(player.id, "effort_level", val)
                            }
                          />
                        </div>
                        <div className="space-y-2">
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

                      {/* Only show metrics if attended */}
                      {data?.attended !== false && (
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold">Performance Metrics</Label>
                          <MetricForm
                            metrics={metrics}
                            values={data?.metrics || {}}
                            onChange={(metrics) => updatePlayerData(player.id, "metrics", metrics)}
                          />
                        </div>
                      )}

                      {/* Notes */}
                      <div className="space-y-2">
                        <Label className="text-sm">Coach Notes</Label>
                        <Textarea
                          placeholder="Add notes about this player's practice performance..."
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
