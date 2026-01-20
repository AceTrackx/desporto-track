import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  ArrowLeft,
  Check,
  X,
  Clock,
  AlertCircle,
  Users,
  Calendar,
  MapPin,
  Save,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { usePlayers } from "@/hooks/usePlayers";
import {
  useSessionAttendance,
  useSessionAttendanceStats,
  useBulkMarkAttendance,
} from "@/hooks/useSessionAttendance";
import { toast } from "sonner";
import type { TrainingSession, Match } from "@/types/sports";

type AttendanceStatus = "present" | "absent" | "late" | "excused";

interface AttendanceMarkerProps {
  session?: TrainingSession;
  match?: Match;
  onBack: () => void;
}

export function AttendanceMarker({ session, match, onBack }: AttendanceMarkerProps) {
  const sessionId = session?.id;
  const sportId = session?.sport_id || match?.sport_id;
  const isMatch = !!match;

  const { data: players = [], isLoading: playersLoading } = usePlayers(sportId);
  const { data: existingAttendance = [] } = useSessionAttendance(sessionId);
  const { data: stats } = useSessionAttendanceStats(sessionId);
  const bulkMarkAttendance = useBulkMarkAttendance();

  // Local state for attendance changes
  const [attendanceMap, setAttendanceMap] = useState<Record<string, AttendanceStatus>>({});

  // Initialize from existing attendance
  useEffect(() => {
    if (existingAttendance.length > 0) {
      const map: Record<string, AttendanceStatus> = {};
      existingAttendance.forEach((record) => {
        map[record.player_id] = record.status as AttendanceStatus;
      });
      setAttendanceMap(map);
    }
  }, [existingAttendance]);

  const handleStatusChange = (playerId: string, status: AttendanceStatus) => {
    setAttendanceMap((prev) => ({
      ...prev,
      [playerId]: prev[playerId] === status ? undefined : status,
    }));
  };

  const handleSave = async () => {
    if (!sessionId) {
      toast.error("No session selected");
      return;
    }

    const records = Object.entries(attendanceMap)
      .filter(([_, status]) => status)
      .map(([player_id, status]) => ({
        session_id: sessionId,
        player_id,
        status: status as AttendanceStatus,
        check_in_time: status === "present" || status === "late" ? new Date().toTimeString().slice(0, 8) : undefined,
      }));

    if (records.length === 0) {
      toast.error("No attendance marked");
      return;
    }

    try {
      await bulkMarkAttendance.mutateAsync(records);
      toast.success("Attendance saved successfully");
    } catch (error) {
      toast.error("Failed to save attendance");
    }
  };

  const getStatusIcon = (status: AttendanceStatus | undefined) => {
    switch (status) {
      case "present":
        return <Check className="w-4 h-4" />;
      case "absent":
        return <X className="w-4 h-4" />;
      case "late":
        return <Clock className="w-4 h-4" />;
      case "excused":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusStyles = (status: AttendanceStatus | undefined, isActive: boolean) => {
    const base = "transition-colors";
    if (!isActive) return `${base} border-border hover:border-muted-foreground`;

    switch (status) {
      case "present":
        return `${base} bg-primary/10 text-primary border-primary`;
      case "absent":
        return `${base} bg-coral/10 text-coral border-coral`;
      case "late":
        return `${base} bg-accent/10 text-accent-foreground border-accent`;
      case "excused":
        return `${base} bg-muted text-muted-foreground border-muted-foreground`;
      default:
        return base;
    }
  };

  const title = session
    ? session.focus_area || session.session_type || "Training Session"
    : match
    ? `vs ${match.opponent_name}`
    : "Attendance";

  const date = session
    ? format(new Date(session.session_date), "EEEE, MMMM d, yyyy")
    : match
    ? format(new Date(match.match_date), "EEEE, MMMM d, yyyy")
    : "";

  const currentStats = {
    present: Object.values(attendanceMap).filter((s) => s === "present").length,
    late: Object.values(attendanceMap).filter((s) => s === "late").length,
    absent: Object.values(attendanceMap).filter((s) => s === "absent").length,
    excused: Object.values(attendanceMap).filter((s) => s === "excused").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="font-display text-2xl text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
      </div>

      {/* Stats */}
      <Card className="rounded-2xl border border-border bg-primary/5">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4">
            <div className="px-4 py-3 rounded-xl bg-primary/10">
              <div className="font-display text-2xl text-primary">{currentStats.present}</div>
              <div className="text-xs text-muted-foreground">Present</div>
            </div>
            <div className="px-4 py-3 rounded-xl bg-accent/10">
              <div className="font-display text-2xl text-accent-foreground">{currentStats.late}</div>
              <div className="text-xs text-muted-foreground">Late</div>
            </div>
            <div className="px-4 py-3 rounded-xl bg-coral/10">
              <div className="font-display text-2xl text-coral">{currentStats.absent}</div>
              <div className="text-xs text-muted-foreground">Absent</div>
            </div>
            <div className="px-4 py-3 rounded-xl bg-muted">
              <div className="font-display text-2xl text-muted-foreground">{currentStats.excused}</div>
              <div className="text-xs text-muted-foreground">Excused</div>
            </div>
            <div className="flex-1" />
            <Button onClick={handleSave} disabled={bulkMarkAttendance.isPending}>
              <Save className="w-4 h-4 mr-2" />
              {bulkMarkAttendance.isPending ? "Saving..." : "Save Attendance"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Player List */}
      <Card className="rounded-2xl border border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Mark Attendance ({players.length} players)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {playersLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading players...</div>
          ) : players.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No players found for this sport.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-3">
              {players.map((player) => {
                const currentStatus = attendanceMap[player.id];
                return (
                  <div
                    key={player.id}
                    className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                          {player.profile?.full_name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("") || "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-foreground">
                          {player.profile?.full_name || "Unknown"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {player.position || "No position"}
                          {player.jersey_number && ` • #${player.jersey_number}`}
                        </div>
                      </div>
                    </div>

                    {/* Status Buttons */}
                    <div className="flex items-center gap-1">
                      {(["present", "late", "absent", "excused"] as AttendanceStatus[]).map((status) => (
                        <Button
                          key={status}
                          variant="outline"
                          size="icon"
                          className={`w-8 h-8 rounded-lg ${getStatusStyles(
                            status,
                            currentStatus === status
                          )}`}
                          onClick={() => handleStatusChange(player.id, status)}
                          title={status.charAt(0).toUpperCase() + status.slice(1)}
                        >
                          {status === "present" && <Check className="w-4 h-4" />}
                          {status === "late" && <Clock className="w-4 h-4" />}
                          {status === "absent" && <X className="w-4 h-4" />}
                          {status === "excused" && <AlertCircle className="w-4 h-4" />}
                        </Button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
