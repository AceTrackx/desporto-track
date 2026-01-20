import { useState } from "react";
import { Users, Search, UserPlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePlayers } from "@/hooks/usePlayers";

interface ManageTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  team: {
    name: string;
    ageGroup: string;
    sportId?: string;
  };
}

export function ManageTeamDialog({ open, onOpenChange, team }: ManageTeamDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: players = [], isLoading } = usePlayers(team.sportId);

  // Filter players by age group and search query
  const filteredPlayers = players.filter((player) => {
    const matchesAgeGroup = player.age_group === team.ageGroup;
    const playerName = player.profile?.full_name?.toLowerCase() || "";
    const matchesSearch = playerName.includes(searchQuery.toLowerCase());
    return matchesAgeGroup && (searchQuery === "" || matchesSearch);
  });

  const allPlayersInAgeGroup = players.filter((p) => p.age_group === team.ageGroup);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Manage {team.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Stats */}
          <div className="flex items-center gap-4 p-4 bg-muted rounded-xl">
            <div>
              <div className="text-2xl font-display text-foreground">{allPlayersInAgeGroup.length}</div>
              <div className="text-xs text-muted-foreground">Total Players</div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <div className="text-2xl font-display text-primary">{team.ageGroup}</div>
              <div className="text-xs text-muted-foreground">Age Group</div>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search players..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Player List */}
          <ScrollArea className="h-[300px]">
            <div className="space-y-2 pr-4">
              {isLoading ? (
                <div className="text-center py-8 text-muted-foreground">Loading players...</div>
              ) : filteredPlayers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {searchQuery ? "No players match your search" : `No players in ${team.ageGroup}`}
                </div>
              ) : (
                filteredPlayers.map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center justify-between p-3 bg-card border border-border rounded-xl hover:border-primary/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                          {player.profile?.full_name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("") || "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-foreground">
                          {player.profile?.full_name || "Unknown"}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{player.position || "No position"}</span>
                          {player.jersey_number && (
                            <>
                              <span>•</span>
                              <span>#{player.jersey_number}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={
                          player.status === "active"
                            ? "bg-primary/10 text-primary border-primary/20"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        {player.status || "active"}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
