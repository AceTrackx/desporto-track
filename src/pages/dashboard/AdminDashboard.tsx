import { motion } from "framer-motion";
import {
  Home,
  Users,
  Calendar,
  BarChart3,
  Settings,
  MapPin,
  Clock,
  Loader2,
  UserCheck,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useGrounds } from "@/hooks/useGrounds";
import { usePlayers } from "@/hooks/usePlayers";
import { useCoachesList } from "@/hooks/useCoachesList";
import { usePlayerAssignments } from "@/hooks/usePlayerAssignments";
import { useGroundCoaches } from "@/hooks/useGroundCoaches";
import { useSessions } from "@/hooks/useSessions";

const navItems = [
  { label: "Dashboard", href: "/dashboard/admin", icon: Home },
  { label: "Approvals", href: "/dashboard/admin/approvals", icon: UserCheck },
  { label: "Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Schedule", href: "/dashboard/admin/schedule", icon: Calendar },
  { label: "Reports", href: "/dashboard/admin/reports", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];

const AdminDashboard = () => {
  const { data: grounds = [], isLoading: loadingGrounds } = useGrounds();
  const { data: players = [] } = usePlayers();
  const { data: coaches = [] } = useCoachesList();
  const { data: assignments = [] } = usePlayerAssignments();
  const { data: groundCoaches = [] } = useGroundCoaches();
  const { data: sessions = [] } = useSessions();

  const assignedPlayers = assignments.length;
  const unassignedPlayers = players.length - new Set(assignments.map(a => a.player_id)).size;

  return (
    <DashboardLayout title="Admin Dashboard" navItems={navItems} userRole="Admin">
      <div className="space-y-8">
        {/* Quick Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Students", value: String(players.length), icon: Users, color: "text-primary" },
            { label: "Total Coaches", value: String(coaches.length), icon: Users, color: "text-teal" },
            { label: "Training Grounds", value: String(grounds.length), icon: MapPin, color: "text-primary" },
            { label: "Total Sessions", value: String(sessions.length), icon: Calendar, color: "text-coral" },
          ].map((stat, index) => (
            <Card key={index} className="rounded-2xl border border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
                <div className="font-display text-3xl text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Ground Overview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="rounded-2xl border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Ground Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loadingGrounds ? (
                <div className="flex justify-center py-8"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /></div>
              ) : grounds.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No grounds configured.</div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {grounds.map((ground) => {
                    const coachCount = groundCoaches.filter(gc => gc.ground_id === ground.id).length;
                    const playerCount = assignments.filter(a => a.ground_id === ground.id).length;
                    const capacity = ground.capacity || 50;

                    return (
                      <div key={ground.id} className="p-4 bg-card border border-border rounded-2xl">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <span className="font-semibold text-foreground">{ground.name}</span>
                            <span className="text-sm text-muted-foreground ml-2">({ground.location})</span>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                            ground.status === "available" ? "bg-primary/10 text-primary border-primary/20" :
                            "bg-coral/10 text-coral border-coral/20"
                          }`}>
                            {ground.status}
                          </span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Coaches</span>
                            <span className="text-foreground font-medium">{coachCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Students</span>
                            <span className="text-foreground font-medium">{playerCount}</span>
                          </div>
                        </div>
                        {capacity > 0 && (
                          <Progress value={(playerCount / capacity) * 100} className="h-2 mt-3" />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Assignment Summary */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Student Assignments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-card border border-border rounded-2xl text-center">
                  <div className="font-display text-3xl text-foreground">{players.length}</div>
                  <div className="text-sm text-muted-foreground">Total Students</div>
                </div>
                <div className="p-4 bg-card border border-border rounded-2xl text-center">
                  <div className="font-display text-3xl text-primary">{assignedPlayers}</div>
                  <div className="text-sm text-muted-foreground">Assigned to Grounds</div>
                </div>
                <div className="p-4 bg-card border border-border rounded-2xl text-center">
                  <div className="font-display text-3xl text-coral">{unassignedPlayers > 0 ? unassignedPlayers : 0}</div>
                  <div className="text-sm text-muted-foreground">Unassigned</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
