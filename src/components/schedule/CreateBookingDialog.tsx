import { useState } from "react";
import { format } from "date-fns";
import { CalendarPlus, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGrounds, useCreateBooking } from "@/hooks/useGrounds";
import { useSports } from "@/hooks/useSports";
import { toast } from "sonner";

interface CreateBookingDialogProps {
  defaultDate?: string;
  onSuccess?: () => void;
}

export function CreateBookingDialog({ defaultDate, onSuccess }: CreateBookingDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    ground_id: "",
    sport_id: "",
    booking_date: defaultDate || format(new Date(), "yyyy-MM-dd"),
    start_time: "10:00",
    end_time: "12:00",
    booking_type: "training",
    notes: "",
  });

  const { data: grounds } = useGrounds();
  const { data: sports } = useSports();
  const createBooking = useCreateBooking();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBooking.mutateAsync({
        title: formData.title,
        ground_id: formData.ground_id,
        sport_id: formData.sport_id || undefined,
        booking_date: formData.booking_date,
        start_time: formData.start_time,
        end_time: formData.end_time,
        booking_type: formData.booking_type,
        notes: formData.notes || undefined,
      });
      toast.success("Booking created successfully!");
      setOpen(false);
      setFormData({
        title: "",
        ground_id: "",
        sport_id: "",
        booking_date: defaultDate || format(new Date(), "yyyy-MM-dd"),
        start_time: "10:00",
        end_time: "12:00",
        booking_type: "training",
        notes: "",
      });
      onSuccess?.();
    } catch (error) {
      toast.error("Failed to create booking");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="accent" size="sm">
          <CalendarPlus className="w-4 h-4 mr-1" /> Book Ground
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarPlus className="w-5 h-5 text-primary" />
            Book a Ground
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Session Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., U-15 Football Training"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Ground</Label>
              <Select
                value={formData.ground_id}
                onValueChange={(v) => setFormData({ ...formData, ground_id: v })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select ground" />
                </SelectTrigger>
                <SelectContent>
                  {grounds?.filter(g => g.status === 'available').map((ground) => (
                    <SelectItem key={ground.id} value={ground.id}>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        {ground.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Sport</Label>
              <Select
                value={formData.sport_id}
                onValueChange={(v) => setFormData({ ...formData, sport_id: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sport" />
                </SelectTrigger>
                <SelectContent>
                  {sports?.map((sport) => (
                    <SelectItem key={sport.id} value={sport.id}>
                      {sport.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <Input
              type="date"
              value={formData.booking_date}
              onChange={(e) => setFormData({ ...formData, booking_date: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Time</Label>
              <Input
                type="time"
                value={formData.start_time}
                onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>End Time</Label>
              <Input
                type="time"
                value={formData.end_time}
                onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Booking Type</Label>
            <Select
              value={formData.booking_type}
              onValueChange={(v) => setFormData({ ...formData, booking_type: v })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="training">Training</SelectItem>
                <SelectItem value="match">Match</SelectItem>
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="private">Private Booking</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Notes (Optional)</Label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any additional notes..."
              rows={2}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createBooking.isPending}>
              {createBooking.isPending ? "Creating..." : "Create Booking"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
