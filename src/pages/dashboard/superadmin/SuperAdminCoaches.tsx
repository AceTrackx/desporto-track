import { motion } from "framer-motion";
import {
  Home,
  MapPin,
  Users,
  BarChart3,
  Settings,
  CreditCard,
  Search,
  Calendar,
  Loader2,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useCoachesList } from "@/hooks/useCoachesList";
import { useGroundCoaches } from "@/hooks/useGroundCoaches";

const navItems = [
  { label: "Dashboard", href: "/dashboard/superadmin", icon: Home },
  { label: "Grounds", href: "/dashboard/superadmin/grounds", icon: MapPin },
  { label: "All Players", href: "/dashboard/superadmin/players", icon: Users },
  { label: "Coaches", href: "/dashboard/superadmin/coaches", icon: Users },
  { label: "Finances", href: "/dashboard/superadmin/finances", icon: CreditCard },
  { label: "Analytics", href: "/dashboard/superadmin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/superadmin/settings", icon: Settings },
];

const SuperAdminCoaches = () => {
  const [search, setSearch] = useState("");
  const { data: coaches = [], isLoading } = useCoachesList();
  const { data: allGroundCoaches = [] } = useGroundCoaches();

  // Map coach ID -> assigned grounds
  const groundsByCoach = allGroundCoaches.reduce((acc, gc) => {
    if (!acc[gc.coach_id]) acc[gc.coach_id] = [];
    acc[gc.coach_id].push(gc);
    return acc;
  }, {} as Record<string, typeof allGroundCoaches>);

  const filteredCoaches = coaches.filter(c =>
    !search || (c.full_name || c.email || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout
      title="Coaches"
      navItems={navItems}
      userRole="Owner"
      userName="Michael Roberts"
    >
      <div className="space-y-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {[
            { label: "Total Coaches", value: String(coaches.length), icon: Users },
            { label: "Assigned to Grounds", value: String(new Set(allGroundCoaches.map(gc => gc.coach_id)).size), icon: MapPin },
            { label: "Ground Admins", value: String(allGroundCoaches.filter(gc => gc.is_ground_admin).length), icon: Calendar },
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

        {/* Coaches List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                All Coaches
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search coaches..."
                  className="pl-9 w-64"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : filteredCoaches.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  {search ? "No coaches match your search." : "No coaches found. Assign the coach role to users first."}
                </div>
              ) : (
                <div className="grid lg:grid-cols-2 gap-4">
                  {filteredCoaches.map((coach) => {
                    const coachGrounds = groundsByCoach[coach.id] || [];
                    return (
                      <div key={coach.id} className="p-5 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors">
                        <div className="flex items-start gap-3 mb-4">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                              {(coach.full_name || "?").split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-semibold text-foreground">{coach.full_name || "Unnamed"}</div>
                            <div className="text-sm text-muted-foreground">{coach.email}</div>
                          </div>
                        </div>

                        <div className="mb-3">
                          <div className="text-sm font-medium text-muted-foreground mb-2">
                            Assigned Grounds ({coachGrounds.length})
                          </div>
                          {coachGrounds.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {coachGrounds.map((gc) => (
                                <Badge key={gc.id} variant="outline" className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {gc.ground?.name || "Unknown"}
                                  {gc.is_ground_admin && (
                                    <span className="text-[10px] bg-primary/10 text-primary px-1 rounded">Admin</span>
                                  )}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <div className="text-xs text-muted-foreground">Not assigned to any ground</div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">View Profile</Button>
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

export default SuperAdminCoaches;
