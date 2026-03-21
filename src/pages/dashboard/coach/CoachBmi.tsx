import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Calendar,
  Users,
  ClipboardCheck,
  Activity,
  BarChart3,
  FileText,
  Scale,
  ArrowLeft,
  Search,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import BmiTracker from "@/components/bmi/BmiTracker";
import { usePlayers } from "@/hooks/usePlayers";
import { useCoachPlayerIds, useCoachSports } from "@/hooks/useCoachScope";

const navItems = [
  { label: "Dashboard", href: "/dashboard/coach", icon: Home },
  { label: "Schedule", href: "/dashboard/coach/schedule", icon: Calendar },
  { label: "My Teams", href: "/dashboard/coach/teams", icon: Users },
  { label: "Players", href: "/dashboard/coach/players", icon: Users },
  { label: "BMI Tracker", href: "/dashboard/coach/bmi", icon: Scale },
  { label: "Attendance", href: "/dashboard/coach/attendance", icon: ClipboardCheck },
  { label: "Performance", href: "/dashboard/coach/performance", icon: Activity },
  { label: "Analytics", href: "/dashboard/coach/analytics", icon: BarChart3 },
  { label: "Reports", href: "/dashboard/coach/reports", icon: FileText },
];

const CoachBmi = () => {
  const navigate = useNavigate();
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>("");
  const [selectedSportId, setSelectedSportId] = useState<string>("");
  const [search, setSearch] = useState("");

  const { data: coachSportsData } = useCoachSports();
  const sports = coachSportsData?.map((gs: any) => gs.sport || gs).filter(Boolean) || [];
  const { data: allPlayers } = usePlayers(selectedSportId || undefined);
  const { data: coachPlayerIds = [] } = useCoachPlayerIds();

  const players = coachPlayerIds.length > 0
    ? (allPlayers || []).filter(p => coachPlayerIds.includes(p.id))
    : allPlayers || [];

  const filteredPlayers = players.filter(p =>
    (p.profile?.full_name || "").toLowerCase().includes(search.toLowerCase())
  );

  if (sports.length && !selectedSportId) {
    setSelectedSportId(sports[0].id);
  }

  const selectedPlayer = players.find(p => p.id === selectedPlayerId);

  return (
    <DashboardLayout title="BMI Tracker" navItems={navItems} userRole="Coach">
      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard/coach")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        {!selectedPlayerId ? (
          <>
            {/* Sport filter + search */}
            <Card className="rounded-2xl border border-border">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search players..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
                  </div>
                  <Select value={selectedSportId} onValueChange={setSelectedSportId}>
                    <SelectTrigger className="w-48"><SelectValue placeholder="Select sport" /></SelectTrigger>
                    <SelectContent>
                      {sports.map((s: any) => (
                        <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Player list */}
            <Card className="rounded-2xl border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Scale className="w-5 h-5 text-primary" />
                  Select a Player
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredPlayers.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No players found</div>
                ) : (
                  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {filteredPlayers.map((player) => (
                      <motion.div
                        key={player.id}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/50 transition-colors cursor-pointer"
                        onClick={() => setSelectedPlayerId(player.id)}
                      >
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                            {(player.profile?.full_name || "?").split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-foreground">{player.profile?.full_name || "Unknown"}</div>
                          <div className="text-sm text-muted-foreground">{player.position || "No position"}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <Button variant="outline" size="sm" onClick={() => setSelectedPlayerId("")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Player List
            </Button>
            <BmiTracker
              playerId={selectedPlayerId}
              playerName={selectedPlayer?.profile?.full_name || undefined}
              canDelete={true}
            />
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CoachBmi;
