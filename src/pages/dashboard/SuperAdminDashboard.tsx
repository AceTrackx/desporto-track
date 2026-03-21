import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Home,
  MapPin,
  Users,
  BarChart3,
  Settings,
  CreditCard,
  TrendingUp,
  Calendar,
  Loader2,
  UserCheck,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGrounds } from "@/hooks/useGrounds";
import { usePlayers } from "@/hooks/usePlayers";
import { useCoachesList } from "@/hooks/useCoachesList";
import { useSessions } from "@/hooks/useSessions";
import { useMatches } from "@/hooks/useMatches";
import { format, isFuture } from "date-fns";

const navItems = [
  { label: "Dashboard", href: "/dashboard/superadmin", icon: Home },
  { label: "Grounds", href: "/dashboard/superadmin/grounds", icon: MapPin },
  { label: "All Players", href: "/dashboard/superadmin/players", icon: Users },
  { label: "Coaches", href: "/dashboard/superadmin/coaches", icon: Users },
  { label: "Finances", href: "/dashboard/superadmin/finances", icon: CreditCard },
  { label: "Analytics", href: "/dashboard/superadmin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/superadmin/settings", icon: Settings },
];

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const { data: grounds = [], isLoading: loadingGrounds } = useGrounds();
  const { data: players = [] } = usePlayers();
  const { data: coaches = [] } = useCoachesList();
  const { data: sessions = [] } = useSessions();
  const { data: matches = [] } = useMatches();

  const availableGrounds = grounds.filter(g => g.status === "available").length;

  // Upcoming events: next sessions + matches
  const upcomingEvents = [
    ...sessions.filter(s => isFuture(new Date(s.session_date))).map(s => ({
      id: s.id, title: s.focus_area || s.session_type || "Training",
      type: "Training", date: new Date(s.session_date),
      ground: s.ground?.name || "—",
    })),
    ...matches.filter(m => isFuture(new Date(m.match_date))).map(m => ({
      id: m.id, title: `vs ${m.opponent_name}`,
      type: m.match_type || "Match", date: new Date(m.match_date),
      ground: m.ground?.name || m.venue || "—",
    })),
  ].sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, 5);

  return (
    <DashboardLayout title="Owner Dashboard" navItems={navItems} userRole="Owner">
      <div className="space-y-8">
        {/* Overview Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Players", value: String(players.length), icon: Users, color: "text-primary" },
            { label: "Active Coaches", value: String(coaches.length), icon: Users, color: "text-teal" },
            { label: "Training Grounds", value: String(grounds.length), icon: MapPin, color: "text-primary" },
            { label: "Upcoming Sessions", value: String(upcomingEvents.length), icon: Calendar, color: "text-coral" },
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

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Grounds Overview */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2">
            <Card className="rounded-2xl border border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Training Grounds
                </CardTitle>
                <Button variant="accent" size="sm" onClick={() => navigate("/dashboard/superadmin/grounds")}>Manage Grounds</Button>
              </CardHeader>
              <CardContent>
                {loadingGrounds ? (
                  <div className="flex justify-center py-8"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /></div>
                ) : grounds.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No grounds added yet.</div>
                ) : (
                  <div className="space-y-3">
                    {grounds.map((ground) => (
                      <div key={ground.id} className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors cursor-pointer" onClick={() => navigate(`/dashboard/superadmin/grounds/${ground.id}`)}>
                        <div className="flex items-center gap-4 flex-1">
                          <div className={`w-1 h-10 rounded-full ${
                            ground.status === "available" ? "bg-primary" : ground.status === "maintenance" ? "bg-coral" : "bg-teal"
                          }`} />
                          <div className="flex-1">
                            <div className="font-semibold text-foreground">{ground.name}</div>
                            <div className="text-sm text-muted-foreground">{ground.location} • {ground.ground_type}</div>
                          </div>
                        </div>
                        <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                          ground.status === "available" ? "bg-primary/10 text-primary border-primary/20" :
                          ground.status === "maintenance" ? "bg-coral/10 text-coral border-coral/20" :
                          "bg-teal/10 text-teal border-teal/20"
                        }`}>
                          {ground.status.charAt(0).toUpperCase() + ground.status.slice(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Links */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="rounded-2xl border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Quick Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-card border border-border rounded-2xl">
                  <div className="text-sm text-muted-foreground mb-1">Available Grounds</div>
                  <div className="font-display text-2xl text-foreground">{availableGrounds} / {grounds.length}</div>
                </div>
                <div className="p-4 bg-card border border-border rounded-2xl">
                  <div className="text-sm text-muted-foreground mb-1">Total Sessions</div>
                  <div className="font-display text-2xl text-foreground">{sessions.length}</div>
                </div>
                <div className="p-4 bg-card border border-border rounded-2xl">
                  <div className="text-sm text-muted-foreground mb-1">Total Matches</div>
                  <div className="font-display text-2xl text-foreground">{matches.length}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Upcoming Events */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="rounded-2xl border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingEvents.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No upcoming events.</div>
              ) : (
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-1 h-12 rounded-full ${event.type === "Match" || event.type === "friendly" || event.type === "league" ? "bg-coral" : "bg-primary"}`} />
                        <div>
                          <div className="font-semibold text-foreground">{event.title}</div>
                          <div className="text-sm text-muted-foreground">{event.ground}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-foreground">{format(event.date, "EEE, MMM d")}</div>
                        <div className="text-sm text-muted-foreground">{format(event.date, "h:mm a")}</div>
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

export default SuperAdminDashboard;
