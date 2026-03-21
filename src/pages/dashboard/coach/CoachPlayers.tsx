import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  Home,
  Calendar,
  Users,
  ClipboardCheck,
  BarChart3,
  FileText,
  Activity,
  UserPlus,
  Search,
  Filter,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useSports } from "@/hooks/useSports";
import { usePlayers, useCreatePlayer } from "@/hooks/usePlayers";
import { useCoachPlayerIds, useCoachSports } from "@/hooks/useCoachScope";
import { toast } from "sonner";

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

const CoachPlayers = () => {
  const [selectedSportId, setSelectedSportId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [addPlayerOpen, setAddPlayerOpen] = useState(false);
  const [newPlayerData, setNewPlayerData] = useState({
    position: "",
    jersey_number: "",
  });

  const { data: coachSportsData, isLoading: sportsLoading } = useCoachSports();
  const sports = coachSportsData?.map((gs: any) => gs.sport).filter(Boolean) || [];
  const { data: coachPlayerIds = [] } = useCoachPlayerIds();
  const createPlayer = useCreatePlayer();

  // Only show players assigned to coach's grounds
  const players = coachPlayerIds.length > 0
    ? (allPlayers || []).filter(p => coachPlayerIds.includes(p.id))
    : allPlayers;

  // Auto-select first sport
  if (sports?.length && !selectedSportId) {
    setSelectedSportId(sports[0].id);
  }

  const filteredPlayers = players?.filter((player) =>
    player.profile?.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "injured":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      case "suspended":
        return "bg-orange-500/10 text-orange-600 border-orange-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  return (
    <DashboardLayout
      title="Players"
      navItems={navItems}
      userRole="Coach"
      
    >
      <div className="space-y-6">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search players..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
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
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: "Total Players", value: players?.length || 0, color: "text-primary" },
            { label: "Active", value: players?.filter((p) => p.status === "active").length || 0, color: "text-green-500" },
            { label: "Injured", value: players?.filter((p) => p.status === "injured").length || 0, color: "text-red-500" },
            { label: "Suspended", value: players?.filter((p) => p.status === "suspended").length || 0, color: "text-orange-500" },
          ].map((stat, index) => (
            <Card key={index} className="rounded-2xl border border-border">
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
                <div className={`font-display text-3xl ${stat.color}`}>{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Players List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Players ({filteredPlayers?.length || 0})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {playersLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))}
                </div>
              ) : filteredPlayers?.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No players found for this sport.</p>
                  <p className="text-sm mt-1">Players need to be added by an admin.</p>
                </div>
              ) : (
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {filteredPlayers?.map((player) => (
                    <div
                      key={player.id}
                      className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/50 transition-colors"
                    >
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {player.profile?.full_name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("") || "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-foreground truncate">
                          {player.profile?.full_name || "Unknown Player"}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {player.position || "No position"} • #{player.jersey_number || "-"}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={`text-xs capitalize ${getStatusColor(player.status)}`}>
                            {player.status}
                          </Badge>
                          {player.joined_date && (
                            <span className="text-xs text-muted-foreground">
                              Since {format(new Date(player.joined_date), "MMM yyyy")}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default CoachPlayers;
