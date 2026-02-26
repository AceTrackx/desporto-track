import { useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  MapPin,
  Users,
  BarChart3,
  Settings,
  CreditCard,
  Search,
  Filter,
  Loader2,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePlayers } from "@/hooks/usePlayers";
import { usePlayerAssignments } from "@/hooks/usePlayerAssignments";
import { useGrounds } from "@/hooks/useGrounds";

const navItems = [
  { label: "Dashboard", href: "/dashboard/superadmin", icon: Home },
  { label: "Grounds", href: "/dashboard/superadmin/grounds", icon: MapPin },
  { label: "All Players", href: "/dashboard/superadmin/players", icon: Users },
  { label: "Coaches", href: "/dashboard/superadmin/coaches", icon: Users },
  { label: "Finances", href: "/dashboard/superadmin/finances", icon: CreditCard },
  { label: "Analytics", href: "/dashboard/superadmin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/superadmin/settings", icon: Settings },
];

const SuperAdminPlayers = () => {
  const [search, setSearch] = useState("");
  const [groundFilter, setGroundFilter] = useState<string>("all");
  const { data: players = [], isLoading } = usePlayers();
  const { data: assignments = [] } = usePlayerAssignments();
  const { data: grounds = [] } = useGrounds();

  // Map player ID -> assignment
  const assignmentByPlayer = assignments.reduce((acc, a) => {
    acc[a.player_id] = a;
    return acc;
  }, {} as Record<string, typeof assignments[0]>);

  const filteredPlayers = players.filter(p => {
    const name = p.profile?.full_name || "";
    const matchesSearch = !search || name.toLowerCase().includes(search.toLowerCase());
    const assignment = assignmentByPlayer[p.id];
    const matchesGround = groundFilter === "all" || 
      (groundFilter === "unassigned" ? !assignment : assignment?.ground_id === groundFilter);
    return matchesSearch && matchesGround;
  });

  const assignedCount = players.filter(p => assignmentByPlayer[p.id]).length;

  return (
    <DashboardLayout
      title="All Players"
      navItems={navItems}
      userRole="Owner"
      userName="Michael Roberts"
    >
      <div className="space-y-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: "Total Players", value: String(players.length), icon: Users },
            { label: "Assigned to Grounds", value: String(assignedCount), icon: MapPin },
            { label: "Unassigned", value: String(players.length - assignedCount), icon: Users },
            { label: "Grounds", value: String(grounds.length), icon: MapPin },
          ].map((stat, index) => (
            <Card key={index} className="rounded-2xl border border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <stat.icon className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
                <div className="font-display text-3xl text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Players List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Player Directory
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search players..."
                    className="pl-9 w-64"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Select value={groundFilter} onValueChange={setGroundFilter}>
                  <SelectTrigger className="w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by ground" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Grounds</SelectItem>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    {grounds.map((g) => (
                      <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : filteredPlayers.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  {search || groundFilter !== "all" ? "No players match your filters." : "No players registered yet."}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredPlayers.map((player) => {
                    const assignment = assignmentByPlayer[player.id];
                    return (
                      <div key={player.id} className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                              {(player.profile?.full_name || "?").split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold text-foreground">{player.profile?.full_name || "Unknown"}</div>
                            <div className="text-sm text-muted-foreground">
                              {player.sport?.name || "No sport"} • {player.position || "No position"} 
                              {player.age_group ? ` • ${player.age_group}` : ""}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {assignment ? (
                            <Badge variant="outline" className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {assignment.ground?.name || "Unknown Ground"}
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="text-muted-foreground">Unassigned</Badge>
                          )}
                          {assignment?.primary_coach && (
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {assignment.primary_coach.full_name || "Coach"}
                            </Badge>
                          )}
                          <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                            player.status === "active" ? "bg-primary/10 text-primary border-primary/20" :
                            player.status === "injured" ? "bg-coral/10 text-coral border-coral/20" :
                            "bg-muted text-muted-foreground border-border"
                          }`}>
                            {player.status || "active"}
                          </span>
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminPlayers;
