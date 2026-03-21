import { useState } from "react";
import { motion } from "framer-motion";
import { Home, Users, MapPin, BarChart3, Settings, CreditCard, Search, CheckCircle2, XCircle, Clock, Loader2, UserCheck } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useAllRegisteredUsers, usePendingUsers, useApproveUser, useRejectUser } from "@/hooks/useProfileStatus";
import { useGrounds, useGroundSports } from "@/hooks/useGrounds";
import { toast } from "sonner";

const navItems = [
  { label: "Dashboard", href: "/dashboard/superadmin", icon: Home },
  { label: "Grounds", href: "/dashboard/superadmin/grounds", icon: MapPin },
  { label: "Approvals", href: "/dashboard/superadmin/users", icon: UserCheck },
  { label: "All Players", href: "/dashboard/superadmin/players", icon: Users },
  { label: "Coaches", href: "/dashboard/superadmin/coaches", icon: Users },
  { label: "Finances", href: "/dashboard/superadmin/finances", icon: CreditCard },
  { label: "Analytics", href: "/dashboard/superadmin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/superadmin/settings", icon: Settings },
];

const SuperAdminUsers = () => {
  const { data: allUsers = [], isLoading } = useAllRegisteredUsers();
  const { data: pendingUsers = [] } = usePendingUsers();
  const { data: grounds = [] } = useGrounds();
  const approveUser = useApproveUser();
  const rejectUser = useRejectUser();

  const [search, setSearch] = useState("");
  const [approveDialogUser, setApproveDialogUser] = useState<any | null>(null);
  const [selectedGround, setSelectedGround] = useState("");
  const [selectedSportId, setSelectedSportId] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const { data: groundSports = [] } = useGroundSports(selectedGround || undefined);

  const filteredUsers = allUsers
    .filter((u) => filter === "all" || u.registration_status === filter)
    .filter(
      (u) =>
        (u.full_name || "").toLowerCase().includes(search.toLowerCase()) ||
        (u.email || "").toLowerCase().includes(search.toLowerCase())
    );

  const handleApprove = async () => {
    if (!approveDialogUser || !selectedGround) {
      toast.error("Please select a ground");
      return;
    }
    try {
      await approveUser.mutateAsync({
        userId: approveDialogUser.id,
        role: approveDialogUser.requested_role,
        groundId: selectedGround,
        sportId: approveDialogUser.sport_id || undefined,
      });
      toast.success(`${approveDialogUser.full_name || "User"} approved`);
      setApproveDialogUser(null);
      setSelectedGround("");
    } catch (error: any) {
      toast.error(error.message || "Failed to approve");
    }
  };

  const handleReject = async (userId: string, name: string) => {
    try {
      await rejectUser.mutateAsync(userId);
      toast.success(`${name || "User"} rejected`);
    } catch (error: any) {
      toast.error(error.message || "Failed to reject");
    }
  };

  return (
    <DashboardLayout title="User Approvals" navItems={navItems} userRole="Owner">
      <div className="space-y-6">
        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-3 gap-4">
          {[
            { label: "Pending", value: pendingUsers.length, icon: Clock, color: "bg-accent/10 text-accent-foreground" },
            { label: "Approved", value: allUsers.filter((u) => u.registration_status === "approved").length, icon: CheckCircle2, color: "bg-primary/10 text-primary" },
            { label: "Total", value: allUsers.length, icon: Users, color: "bg-muted text-muted-foreground" },
          ].map((s, i) => (
            <Card key={i} className="rounded-2xl border border-border">
              <CardContent className="p-6 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color.split(" ")[0]}`}>
                  <s.icon className={`w-5 h-5 ${s.color.split(" ")[1]}`} />
                </div>
                <div>
                  <div className="font-display text-2xl text-foreground">{s.value}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Search & Filter */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search users..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Users List */}
        <Card className="rounded-2xl border border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-primary" />
              Users ({filteredUsers.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {isLoading ? (
              <div className="flex justify-center py-8"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /></div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No users found.</div>
            ) : (
              filteredUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-semibold text-foreground">{user.full_name || "No Name"}</span>
                      <Badge
                        variant="outline"
                        className={
                          user.registration_status === "pending"
                            ? "bg-accent/10 text-accent-foreground border-accent/20"
                            : user.registration_status === "approved"
                            ? "bg-primary/10 text-primary border-primary/20"
                            : "bg-destructive/10 text-destructive border-destructive/20"
                        }
                      >
                        {user.registration_status}
                      </Badge>
                      <Badge variant="secondary" className="text-xs capitalize">{user.requested_role}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{user.email}</span>
                      {user.sport && (
                        <>
                          <span>•</span>
                          <span>{user.sport.name}</span>
                        </>
                      )}
                    </div>
                  </div>
                  {user.registration_status === "pending" && (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive border-destructive/20 hover:bg-destructive/10"
                        onClick={() => handleReject(user.id, user.full_name || "")}
                        disabled={rejectUser.isPending}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                      <Button variant="accent" size="sm" onClick={() => setApproveDialogUser(user)}>
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                    </div>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Approve Dialog */}
      <Dialog open={!!approveDialogUser} onOpenChange={(open) => !open && setApproveDialogUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve & Assign Ground</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">User</p>
              <p className="font-semibold text-foreground">{approveDialogUser?.full_name}</p>
              <p className="text-sm text-muted-foreground">{approveDialogUser?.email}</p>
              <Badge variant="secondary" className="mt-1 capitalize">{approveDialogUser?.requested_role}</Badge>
            </div>
            <div className="space-y-2">
              <Label>Assign to Ground *</Label>
              <Select value={selectedGround} onValueChange={setSelectedGround}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a ground" />
                </SelectTrigger>
                <SelectContent>
                  {grounds.map((g) => (
                    <SelectItem key={g.id} value={g.id}>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {g.name} — {g.location}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full" onClick={handleApprove} disabled={!selectedGround || approveUser.isPending}>
              {approveUser.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle2 className="w-4 h-4 mr-2" />}
              Approve & Assign
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default SuperAdminUsers;
