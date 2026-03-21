import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home, MapPin, Users, BarChart3, Settings, CreditCard,
  ArrowLeft, Calendar, ClipboardCheck, Loader2, Activity,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGrounds, useGroundSports } from "@/hooks/useGrounds";
import { useGroundCoaches } from "@/hooks/useGroundCoaches";
import { usePlayerAssignments } from "@/hooks/usePlayerAssignments";
import { useSessions } from "@/hooks/useSessions";
import { useMatches } from "@/hooks/useMatches";
import { format, isFuture } from "date-fns";
import AssignCoachDialog from "@/components/grounds/AssignCoachDialog";

const navItems = [
  { label: "Dashboard", href: "/dashboard/superadmin", icon: Home },
  { label: "Grounds", href: "/dashboard/superadmin/grounds", icon: MapPin },
  { label: "All Players", href: "/dashboard/superadmin/players", icon: Users },
  { label: "Coaches", href: "/dashboard/superadmin/coaches", icon: Users },
  { label: "Finances", href: "/dashboard/superadmin/finances", icon: CreditCard },
  { label: "Analytics", href: "/dashboard/superadmin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/superadmin/settings", icon: Settings },
];

const GroundDetail = () => {
  const { groundId } = useParams<{ groundId: string }>();
  const navigate = useNavigate();
  const [activeSport, setActiveSport] = useState<string>("all");

  const { data: grounds = [], isLoading: loadingGrounds } = useGrounds();
  const { data: groundSports = [], isLoading: loadingSports } = useGroundSports(groundId);
  const { data: allCoachAssignments = [] } = useGroundCoaches();
  const { data: allPlayerAssignments = [] } = usePlayerAssignments(groundId);
  const { data: allSessions = [] } = useSessions();
  const { data: allMatches = [] } = useMatches();

  const ground = grounds.find(g => g.id === groundId);
  const groundCoaches = allCoachAssignments.filter(gc => gc.ground_id === groundId);

  // Filter sessions & matches for this ground
  const groundSessions = allSessions.filter(s => s.ground_id === groundId);
  const groundMatches = allMatches.filter(m => m.ground_id === groundId);

  // Filter by sport if a specific sport is selected
  const filteredPlayers = activeSport === "all"
    ? allPlayerAssignments
    : allPlayerAssignments.filter(a => a.player?.sport_id === activeSport);

  const filteredSessions = activeSport === "all"
    ? groundSessions
    : groundSessions.filter(s => s.sport_id === activeSport);

  const filteredMatches = activeSport === "all"
    ? groundMatches
    : groundMatches.filter(m => m.sport_id === activeSport);

  if (loadingGrounds || loadingSports) {
    return (
      <DashboardLayout title="Ground Details" navItems={navItems} userRole="Owner">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (!ground) {
    return (
      <DashboardLayout title="Ground Not Found" navItems={navItems} userRole="Owner">
        <div className="text-center py-20">
          <h2 className="font-display text-2xl text-foreground mb-2">Ground not found</h2>
          <Button variant="outline" onClick={() => navigate("/dashboard/superadmin/grounds")}>
            Back to Grounds
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title={ground.name} navItems={navItems} userRole="Owner">
      <div className="space-y-6">
        {/* Back + Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard/superadmin/grounds")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Grounds
          </Button>
          <AssignCoachDialog
            groundId={ground.id}
            groundName={ground.name}
            existingCoachIds={groundCoaches.map(gc => gc.coach_id)}
          />
        </div>

        {/* Ground Info Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="rounded-2xl border border-border">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="font-display text-3xl text-foreground">{ground.name}</h1>
                  <p className="text-muted-foreground mt-1">
                    {ground.location}{ground.address ? ` • ${ground.address}` : ""}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-3 text-sm text-muted-foreground">
                    <span className="capitalize">{ground.ground_type}</span>
                    {ground.surface && <span>• {ground.surface}</span>}
                    {ground.capacity && <span>• Capacity: {ground.capacity}</span>}
                    {ground.opening_time && ground.closing_time && (
                      <span>• {ground.opening_time} - {ground.closing_time}</span>
                    )}
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-medium border self-start ${
                  ground.status === "available" ? "bg-primary/10 text-primary border-primary/20" :
                  ground.status === "maintenance" ? "bg-coral/10 text-coral border-coral/20" :
                  "bg-teal/10 text-teal border-teal/20"
                }`}>
                  {ground.status.charAt(0).toUpperCase() + ground.status.slice(1)}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: "Sports", value: String(groundSports.length), icon: Activity },
            { label: "Coaches", value: String(groundCoaches.length), icon: Users },
            { label: "Students", value: String(allPlayerAssignments.length), icon: Users },
            { label: "Sessions", value: String(groundSessions.length), icon: Calendar },
          ].map((stat, i) => (
            <Card key={i} className="rounded-2xl border border-border">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <stat.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
                <div className="font-display text-2xl text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Sport Tabs → Content */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Tabs value={activeSport} onValueChange={setActiveSport}>
            <TabsList className="mb-4 flex-wrap h-auto gap-1">
              <TabsTrigger value="all">All Sports</TabsTrigger>
              {groundSports.map((gs: any) => (
                <TabsTrigger key={gs.sport?.id || gs.id} value={gs.sport?.id || gs.sport_id}>
                  {gs.sport?.name || "Unknown"}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Coaches Section */}
            <Card className="rounded-2xl border border-border mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  Coaches ({groundCoaches.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {groundCoaches.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-4 text-center">No coaches assigned to this ground.</p>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {groundCoaches.map(gc => (
                      <div key={gc.id} className="flex items-center gap-3 p-3 bg-card border border-border rounded-xl">
                        <Avatar className="w-9 h-9">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                            {(gc.coach?.full_name || "?").split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium text-foreground">{gc.coach?.full_name}</div>
                          <div className="text-xs text-muted-foreground">{gc.coach?.email}</div>
                        </div>
                        {gc.is_ground_admin && (
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-[10px] ml-1">
                            Admin
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Players Section */}
            <Card className="rounded-2xl border border-border mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  Students ({filteredPlayers.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredPlayers.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-4 text-center">No students assigned{activeSport !== "all" ? " for this sport" : ""}.</p>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredPlayers.map(assignment => (
                      <div key={assignment.id} className="flex items-center gap-3 p-3 bg-card border border-border rounded-xl hover:border-primary/20 transition-colors">
                        <Avatar className="w-9 h-9">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                            {(assignment.player?.profile?.full_name || "?").split(" ").map((n: string) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-foreground truncate">
                            {assignment.player?.profile?.full_name || "Unknown"}
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center gap-2">
                            <span>{assignment.player?.sport?.name}</span>
                            {assignment.batch_name && <span>• {assignment.batch_name}</span>}
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-[10px]">
                          {assignment.player?.position || "—"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Sessions Section */}
            <Card className="rounded-2xl border border-border mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  Training Sessions ({filteredSessions.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredSessions.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-4 text-center">No sessions{activeSport !== "all" ? " for this sport" : ""}.</p>
                ) : (
                  <div className="space-y-2">
                    {filteredSessions.slice(0, 10).map(session => (
                      <div key={session.id} className="flex items-center justify-between p-3 bg-card border border-border rounded-xl hover:border-primary/20 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-1 h-10 rounded-full ${isFuture(new Date(session.session_date)) ? "bg-primary" : "bg-muted-foreground/30"}`} />
                          <div>
                            <div className="text-sm font-medium text-foreground">
                              {session.focus_area || session.session_type || "Training"}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {format(new Date(session.session_date), "EEE, MMM d • h:mm a")}
                              {session.duration_minutes ? ` • ${session.duration_minutes}min` : ""}
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">{session.sport?.name}</Badge>
                      </div>
                    ))}
                    {filteredSessions.length > 10 && (
                      <p className="text-xs text-center text-muted-foreground pt-2">
                        +{filteredSessions.length - 10} more sessions
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Matches Section */}
            <Card className="rounded-2xl border border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <ClipboardCheck className="w-4 h-4 text-coral" />
                  Matches ({filteredMatches.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredMatches.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-4 text-center">No matches{activeSport !== "all" ? " for this sport" : ""}.</p>
                ) : (
                  <div className="space-y-2">
                    {filteredMatches.slice(0, 10).map(match => (
                      <div key={match.id} className="flex items-center justify-between p-3 bg-card border border-border rounded-xl hover:border-primary/20 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-1 h-10 rounded-full ${isFuture(new Date(match.match_date)) ? "bg-coral" : "bg-muted-foreground/30"}`} />
                          <div>
                            <div className="text-sm font-medium text-foreground">
                              vs {match.opponent_name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {format(new Date(match.match_date), "EEE, MMM d • h:mm a")}
                              {match.result && ` • ${match.result}`}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {match.home_score !== null && match.away_score !== null && (
                            <span className="text-sm font-semibold text-foreground">
                              {match.home_score} - {match.away_score}
                            </span>
                          )}
                          <Badge variant="outline" className="text-xs">{match.sport?.name}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </Tabs>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default GroundDetail;
