import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { UserPlus, Loader2 } from "lucide-react";
import { useAssignCoachToGround } from "@/hooks/useGroundCoaches";
import { useCoachesList } from "@/hooks/useCoachesList";
import { useGroundSports } from "@/hooks/useGrounds";
import { toast } from "sonner";

interface AssignCoachDialogProps {
  groundId: string;
  groundName: string;
  existingCoachIds?: string[];
}

const AssignCoachDialog = ({ groundId, groundName, existingCoachIds = [] }: AssignCoachDialogProps) => {
  const [open, setOpen] = useState(false);
  const [selectedCoachId, setSelectedCoachId] = useState("");
  const [selectedSportId, setSelectedSportId] = useState("");
  const [isGroundAdmin, setIsGroundAdmin] = useState(false);
  const assignCoach = useAssignCoachToGround();
  const { data: coaches = [], isLoading: loadingCoaches } = useCoachesList();
  const { data: groundSports = [] } = useGroundSports(groundId);

  const availableCoaches = coaches.filter(c => !existingCoachIds.includes(c.id));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCoachId) {
      toast.error("Please select a coach");
      return;
    }
    if (!isGroundAdmin && !selectedSportId) {
      toast.error("Please select a sport for the coach");
      return;
    }

    try {
      await assignCoach.mutateAsync({
        ground_id: groundId,
        coach_id: selectedCoachId,
        sport_id: isGroundAdmin ? undefined : selectedSportId,
        is_ground_admin: isGroundAdmin,
      });
      toast.success("Coach assigned successfully");
      setSelectedCoachId("");
      setSelectedSportId("");
      setIsGroundAdmin(false);
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to assign coach");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <UserPlus className="w-4 h-4 mr-2" />
          Assign Coach
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Coach to {groundName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Select Coach</Label>
            {loadingCoaches ? (
              <div className="text-sm text-muted-foreground">Loading coaches...</div>
            ) : availableCoaches.length === 0 ? (
              <div className="text-sm text-muted-foreground">All coaches are already assigned</div>
            ) : (
              <Select value={selectedCoachId} onValueChange={setSelectedCoachId}>
                <SelectTrigger><SelectValue placeholder="Choose a coach" /></SelectTrigger>
                <SelectContent>
                  {availableCoaches.map((coach) => (
                    <SelectItem key={coach.id} value={coach.id}>
                      {coach.full_name || coach.email || "Unnamed Coach"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="ground-admin">Make Academy Admin (manages entire ground)</Label>
            <Switch id="ground-admin" checked={isGroundAdmin} onCheckedChange={(checked) => {
              setIsGroundAdmin(checked);
              if (checked) setSelectedSportId("");
            }} />
          </div>

          {!isGroundAdmin && (
            <div className="space-y-2">
              <Label>Assign to Sport *</Label>
              {groundSports.length === 0 ? (
                <div className="text-sm text-muted-foreground">No sports configured for this ground</div>
              ) : (
                <Select value={selectedSportId} onValueChange={setSelectedSportId}>
                  <SelectTrigger><SelectValue placeholder="Choose a sport" /></SelectTrigger>
                  <SelectContent>
                    {groundSports.map((gs: any) => (
                      <SelectItem key={gs.id} value={gs.sport?.id || gs.sport_id}>
                        {gs.sport?.name || "Unknown Sport"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={assignCoach.isPending || !selectedCoachId}>
            {assignCoach.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Assign Coach
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AssignCoachDialog;
