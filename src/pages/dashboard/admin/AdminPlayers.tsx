import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  Calendar,
  BarChart3,
  Settings,
  UserCheck,
  Search,
  MapPin,
  ArrowLeft,
  Loader2,
  Filter,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useCoachGroundIds } from "@/hooks/useCoachScope";
import { usePlayerAssignments } from "@/hooks/usePlayerAssignments";
import { useGrounds } from "@/hooks/useGrounds";

const navItems = [
  { label: "Dashboard", href: "/dashboard/admin", icon: Home },
  { label: "Approvals", href: "/dashboard/admin/approvals", icon: UserCheck },
  { label: "Students", href: "/dashboard/admin/players", icon: Users },
  { label: "Schedule", href: "/dashboard/admin/schedule", icon: Calendar },
  { label: "Reports", href: "/dashboard/admin/reports", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];

const AdminPlayers = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [groundFilter, setGroundFilter] = useState<string>("all");

  // Admin's assigned grounds
  const { data: adminGroundIds = [], isLoading: groundIdsLoading } = useCoachGroundIds();
  const { data: allGrounds = [] } = useGrounds();
  const { data: assignments = [], isLoading: assignmentsLoading } = usePlayerAssignments();

  const isLoading = groundIdsLoading || assignmentsLoading;

  // If admin has no specific ground assignments, show all
  const hasGroundScope = adminGroundIds.length > 0;

  // Filter grounds to admin's assigned ones (or all if unscoped)
  const adminGrounds = hasGroundScope
    ? allGrounds.filter((g) => adminGroundIds.includes(g.id))
    : allGrounds;

  // Filter assignments to admin's grounds (or all if unscoped)
  const adminAssignments = hasGroundScope
    ? assignments.filter((a) => adminGroundIds.includes(a.ground_id))
    : assignments;

  const filteredAssignments = adminAssignments.filter((a) => {
    const name = (a as any).player?.profile?.full_name || "";
    const matchesSearch =
      !search || name.toLowerCase().includes(search.toLowerCase());
    const matchesGround =
      groundFilter === "all" || a.ground_id === groundFilter;
    return matchesSearch && matchesGround;
  });

  return (
    <DashboardLayout title="Students" navItems={navItems} userRole="Admin">
      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard/admin")}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <Card className="rounded-2xl border border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Total Students
                </span>
              </div>
              <div className="font-display text-3xl text-foreground">
                {adminAssignments.length}
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  My Grounds
                </span>
              </div>
              <div className="font-display text-3xl text-foreground">
                {adminGrounds.length}
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Filtered</span>
              </div>
              <div className="font-display text-3xl text-foreground">
                {filteredAssignments.length}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Student Directory
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
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
                    <SelectItem value="all">All My Grounds</SelectItem>
                    {adminGrounds.map((g) => (
                      <SelectItem key={g.id} value={g.id}>
                        {g.name}
                      </SelectItem>
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
              ) : filteredAssignments.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No students found on your assigned grounds.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredAssignments.map((assignment: any) => {
                    const player = assignment.player;
                    const ground = assignment.ground;
                    return (
                      <div
                        key={assignment.id}
                        className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                              {(player?.profile?.full_name || "?")
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold text-foreground">
                              {player?.profile?.full_name || "Unknown"}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {player?.sport?.name || "No sport"} •{" "}
                              {player?.position || "No position"}
                              {player?.age_group
                                ? ` • ${player.age_group}`
                                : ""}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {ground && (
                            <Badge
                              variant="outline"
                              className="flex items-center gap-1"
                            >
                              <MapPin className="w-3 h-3" />
                              {ground.name}
                            </Badge>
                          )}
                          <span
                            className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                              player?.status === "active"
                                ? "bg-primary/10 text-primary border-primary/20"
                                : player?.status === "injured"
                                  ? "bg-destructive/10 text-destructive border-destructive/20"
                                  : "bg-muted text-muted-foreground border-border"
                            }`}
                          >
                            {player?.status || "active"}
                          </span>
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

export default AdminPlayers;
