import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  MapPin,
  Users,
  BarChart3,
  Settings,
  CreditCard,
  Clock,
  Loader2,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import AddGroundDialog from "@/components/grounds/AddGroundDialog";
import AssignCoachDialog from "@/components/grounds/AssignCoachDialog";
import { useGrounds, useAllGroundSports } from "@/hooks/useGrounds";
import { useGroundCoaches } from "@/hooks/useGroundCoaches";
import { usePlayerAssignments } from "@/hooks/usePlayerAssignments";

const navItems = [
  { label: "Dashboard", href: "/dashboard/superadmin", icon: Home },
  { label: "Grounds", href: "/dashboard/superadmin/grounds", icon: MapPin },
  { label: "All Players", href: "/dashboard/superadmin/players", icon: Users },
  { label: "Coaches", href: "/dashboard/superadmin/coaches", icon: Users },
  { label: "Finances", href: "/dashboard/superadmin/finances", icon: CreditCard },
  { label: "Analytics", href: "/dashboard/superadmin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/superadmin/settings", icon: Settings },
];

const SuperAdminGrounds = () => {
  const { data: grounds = [], isLoading: loadingGrounds } = useGrounds();
  const { data: allCoachAssignments = [] } = useGroundCoaches();
  const { data: allPlayerAssignments = [] } = usePlayerAssignments();
  const { data: allGroundSports = [] } = useAllGroundSports();

  // Group coaches and players by ground
  const coachesByGround = allCoachAssignments.reduce((acc, gc) => {
    if (!acc[gc.ground_id]) acc[gc.ground_id] = [];
    acc[gc.ground_id].push(gc);
    return acc;
  }, {} as Record<string, typeof allCoachAssignments>);

  const playersByGround = allPlayerAssignments.reduce((acc, pa) => {
    if (!acc[pa.ground_id]) acc[pa.ground_id] = [];
    acc[pa.ground_id].push(pa);
    return acc;
  }, {} as Record<string, typeof allPlayerAssignments>);

  const sportsByGround = allGroundSports.reduce((acc, gs) => {
    if (!acc[gs.ground_id]) acc[gs.ground_id] = [];
    acc[gs.ground_id].push(gs);
    return acc;
  }, {} as Record<string, typeof allGroundSports>);

  const availableCount = grounds.filter(g => g.status === "available").length;
  const totalPlayers = allPlayerAssignments.length;
  const totalCoaches = allCoachAssignments.length;

  return (
    <DashboardLayout
      title="Training Grounds"
      navItems={navItems}
      userRole="Owner"
      
    >
      <div className="space-y-8">
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: "Total Grounds", value: String(grounds.length), icon: MapPin },
            { label: "Available Now", value: String(availableCount), icon: MapPin },
            { label: "Assigned Coaches", value: String(totalCoaches), icon: Users },
            { label: "Assigned Students", value: String(totalPlayers), icon: Users },
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

        {/* Grounds List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                All Grounds
              </CardTitle>
              <AddGroundDialog />
            </CardHeader>
            <CardContent>
              {loadingGrounds ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : grounds.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No grounds yet. Add your first ground to get started.
                </div>
              ) : (
                <div className="grid lg:grid-cols-2 gap-4">
                  {grounds.map((ground) => {
                    const groundCoaches = coachesByGround[ground.id] || [];
                    const groundPlayers = playersByGround[ground.id] || [];
                    const groundSports = sportsByGround[ground.id] || [];

                    return (
                      <div key={ground.id} className="p-5 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="font-semibold text-foreground text-lg">{ground.name}</div>
                            <div className="text-sm text-muted-foreground">{ground.location}{ground.address ? ` • ${ground.address}` : ""}</div>
                          </div>
                          <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                            ground.status === "available" ? "bg-primary/10 text-primary border-primary/20" : 
                            ground.status === "maintenance" ? "bg-coral/10 text-coral border-coral/20" : 
                            "bg-accent/10 text-accent-foreground border-accent/20"
                          }`}>
                            {ground.status.charAt(0).toUpperCase() + ground.status.slice(1)}
                          </span>
                        </div>

                        <div className="space-y-3 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Type</span>
                            <span className="text-foreground capitalize">{ground.ground_type}</span>
                          </div>
                          {ground.surface && (
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Surface</span>
                              <span className="text-foreground">{ground.surface}</span>
                            </div>
                          )}
                          {ground.capacity && (
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Capacity</span>
                              <span className="text-foreground">{ground.capacity}</span>
                            </div>
                          )}
                          {ground.opening_time && ground.closing_time && (
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Hours</span>
                              <span className="text-foreground">{ground.opening_time} - {ground.closing_time}</span>
                            </div>
                          )}
                        </div>

                        {/* Sports */}
                        {groundSports.length > 0 && (
                          <div className="mb-4">
                            <div className="text-sm font-medium text-muted-foreground mb-2">Sports</div>
                            <div className="flex flex-wrap gap-1.5">
                              {groundSports.map((gs: any) => (
                                <Badge key={gs.id} variant="secondary" className="text-xs">
                                  {gs.sport?.name || "Unknown"}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Coaches assigned */}
                        <div className="mb-4">
                          <div className="text-sm font-medium text-muted-foreground mb-2">
                            Coaches ({groundCoaches.length})
                          </div>
                          {groundCoaches.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {groundCoaches.map((gc) => (
                                <Badge key={gc.id} variant="outline" className="flex items-center gap-1.5 py-1">
                                  <Avatar className="w-5 h-5">
                                    <AvatarFallback className="bg-primary/10 text-primary text-[10px]">
                                      {(gc.coach?.full_name || "?").split(" ").map(n => n[0]).join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  {gc.coach?.full_name || "Unknown"}
                                  {gc.is_ground_admin && (
                                    <span className="text-[10px] bg-primary/10 text-primary px-1 rounded">Admin</span>
                                  )}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <div className="text-xs text-muted-foreground">No coaches assigned</div>
                          )}
                        </div>

                        {/* Players count */}
                        <div className="mb-4">
                          <div className="text-sm font-medium text-muted-foreground">
                            Students: <span className="text-foreground font-semibold">{groundPlayers.length}</span>
                          </div>
                        </div>

                        {ground.facilities && ground.facilities.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {ground.facilities.map((facility, fIndex) => (
                              <span key={fIndex} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-lg">
                                {facility}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex gap-2">
                          <AssignCoachDialog
                            groundId={ground.id}
                            groundName={ground.name}
                            existingCoachIds={groundCoaches.map(gc => gc.coach_id)}
                          />
                          <Button variant="default" size="sm" className="flex-1">Manage</Button>
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

export default SuperAdminGrounds;
