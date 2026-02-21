import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Loader2 } from "lucide-react";
import { useCreateGround } from "@/hooks/useGrounds";
import { toast } from "sonner";

const AddGroundDialog = () => {
  const [open, setOpen] = useState(false);
  const createGround = useCreateGround();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [groundType, setGroundType] = useState("outdoor");
  const [surface, setSurface] = useState("");
  const [capacity, setCapacity] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [openingTime, setOpeningTime] = useState("06:00");
  const [closingTime, setClosingTime] = useState("22:00");
  const [facilities, setFacilities] = useState("");

  const resetForm = () => {
    setName("");
    setLocation("");
    setAddress("");
    setGroundType("outdoor");
    setSurface("");
    setCapacity("");
    setHourlyRate("");
    setOpeningTime("06:00");
    setClosingTime("22:00");
    setFacilities("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !location) {
      toast.error("Name and location are required");
      return;
    }

    try {
      await createGround.mutateAsync({
        name,
        location,
        address: address || undefined,
        ground_type: groundType,
        surface: surface || undefined,
        capacity: capacity ? parseInt(capacity) : undefined,
        hourly_rate: hourlyRate ? parseFloat(hourlyRate) : undefined,
        opening_time: openingTime,
        closing_time: closingTime,
        facilities: facilities ? facilities.split(",").map((f) => f.trim()).filter(Boolean) : undefined,
      });
      toast.success("Ground added successfully");
      resetForm();
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to add ground");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="accent" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Ground
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Ground</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Main Stadium" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Bengaluru" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Full address" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Ground Type</Label>
              <Select value={groundType} onValueChange={setGroundType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="outdoor">Outdoor</SelectItem>
                  <SelectItem value="indoor">Indoor</SelectItem>
                  <SelectItem value="covered">Covered</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="surface">Surface</Label>
              <Input id="surface" value={surface} onChange={(e) => setSurface(e.target.value)} placeholder="Natural Grass" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input id="capacity" type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Hourly Rate (₹)</Label>
              <Input id="hourlyRate" type="number" step="0.01" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} placeholder="500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="openingTime">Opening Time</Label>
              <Input id="openingTime" type="time" value={openingTime} onChange={(e) => setOpeningTime(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="closingTime">Closing Time</Label>
              <Input id="closingTime" type="time" value={closingTime} onChange={(e) => setClosingTime(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="facilities">Facilities (comma-separated)</Label>
            <Input id="facilities" value={facilities} onChange={(e) => setFacilities(e.target.value)} placeholder="Floodlights, Changing Rooms, First Aid" />
          </div>

          <Button type="submit" className="w-full" disabled={createGround.isPending}>
            {createGround.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Add Ground
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGroundDialog;
