import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useSports } from "@/hooks/useSports";
import { useGrounds } from "@/hooks/useGrounds";
import { useCreateSession } from "@/hooks/useSessions";
import { toast } from "sonner";

const sessionSchema = z.object({
  sport_id: z.string().min(1, "Sport is required"),
  ground_id: z.string().min(1, "Ground is required - sessions must be linked to a ground"),
  session_date: z.date({ required_error: "Session date is required" }),
  session_type: z.enum(["regular", "intensive", "recovery", "tactical", "fitness"]).default("regular"),
  duration_minutes: z.number().min(15).max(300).optional(),
  focus_area: z.string().optional(),
  notes: z.string().optional(),
});

type SessionFormValues = z.infer<typeof sessionSchema>;

interface CreateSessionDialogProps {
  onSuccess?: (sessionId: string) => void;
  defaultSportId?: string;
  defaultGroundId?: string;
}

export function CreateSessionDialog({ onSuccess, defaultSportId, defaultGroundId }: CreateSessionDialogProps) {
  const [open, setOpen] = useState(false);
  const { data: sports } = useSports();
  const { data: grounds } = useGrounds();
  const createSession = useCreateSession();

  const form = useForm<SessionFormValues>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      sport_id: defaultSportId || "",
      ground_id: defaultGroundId || "",
      session_type: "regular",
      duration_minutes: 90,
      focus_area: "",
      notes: "",
    },
  });

  const onSubmit = async (values: SessionFormValues) => {
    try {
      const result = await createSession.mutateAsync({
        sport_id: values.sport_id,
        ground_id: values.ground_id,
        session_date: values.session_date.toISOString(),
        session_type: values.session_type,
        duration_minutes: values.duration_minutes,
        focus_area: values.focus_area,
        notes: values.notes,
      });
      toast.success("Training session created successfully");
      setOpen(false);
      form.reset();
      onSuccess?.(result.id);
    } catch (error) {
      toast.error("Failed to create session");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          New Session
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Training Session</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="ground_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ground *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ground" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {grounds?.map((ground) => (
                        <SelectItem key={ground.id} value={ground.id}>
                          {ground.name} - {ground.location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Students assigned to this ground will see this session in their schedule
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sport_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sport *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sport" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sports?.map((sport) => (
                        <SelectItem key={sport.id} value={sport.id}>
                          {sport.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="session_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Session Date *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : "Pick a date"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="session_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Session Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="regular">Regular</SelectItem>
                        <SelectItem value="intensive">Intensive</SelectItem>
                        <SelectItem value="recovery">Recovery</SelectItem>
                        <SelectItem value="tactical">Tactical</SelectItem>
                        <SelectItem value="fitness">Fitness</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="duration_minutes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (minutes)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={15}
                      max={300}
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="focus_area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Focus Area (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Passing, Shooting, Defense..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any additional notes..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={createSession.isPending}>
                {createSession.isPending ? "Creating..." : "Create Session"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
