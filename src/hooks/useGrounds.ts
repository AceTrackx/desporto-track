import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Ground {
  id: string;
  name: string;
  location: string;
  address: string | null;
  ground_type: string;
  surface: string | null;
  capacity: number | null;
  facilities: string[] | null;
  hourly_rate: number | null;
  status: string;
  latitude: number | null;
  longitude: number | null;
  opening_time: string | null;
  closing_time: string | null;
  created_at: string;
}

export interface ScheduleBooking {
  id: string;
  ground_id: string | null;
  sport_id: string | null;
  session_id: string | null;
  match_id: string | null;
  booked_by: string | null;
  title: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  booking_type: string;
  status: string;
  notes: string | null;
  created_at: string;
  ground?: Ground;
  sport?: { id: string; name: string };
}

export function useGrounds() {
  return useQuery({
    queryKey: ["grounds"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("grounds")
        .select("*")
        .order("name");
      if (error) throw error;
      return data as Ground[];
    },
  });
}

export function useScheduleBookings(date?: string) {
  return useQuery({
    queryKey: ["schedule-bookings", date],
    queryFn: async () => {
      let query = supabase
        .from("schedule_bookings")
        .select(`
          *,
          ground:grounds(*),
          sport:sports(id, name)
        `)
        .order("booking_date")
        .order("start_time");

      if (date) {
        query = query.eq("booking_date", date);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as ScheduleBooking[];
    },
  });
}

export function useWeekBookings(startDate: string, endDate: string) {
  return useQuery({
    queryKey: ["schedule-bookings", "week", startDate, endDate],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("schedule_bookings")
        .select(`
          *,
          ground:grounds(*),
          sport:sports(id, name)
        `)
        .gte("booking_date", startDate)
        .lte("booking_date", endDate)
        .order("booking_date")
        .order("start_time");
      if (error) throw error;
      return data as ScheduleBooking[];
    },
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      ground_id: string;
      sport_id?: string;
      title: string;
      booking_date: string;
      start_time: string;
      end_time: string;
      booking_type?: string;
      notes?: string;
    }) => {
      const { data: result, error } = await supabase
        .from("schedule_bookings")
        .insert(data)
        .select()
        .single();
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule-bookings"] });
    },
  });
}

export function useUpdateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: { id: string } & Partial<ScheduleBooking>) => {
      const { data: result, error } = await supabase
        .from("schedule_bookings")
        .update(data)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule-bookings"] });
    },
  });
}

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("schedule_bookings")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule-bookings"] });
    },
  });
}
