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

export function useGroundSports(groundId?: string) {
  return useQuery({
    queryKey: ["ground-sports", groundId],
    queryFn: async () => {
      let query = supabase
        .from("ground_sports")
        .select("*, sport:sports(id, name)");
      if (groundId) query = query.eq("ground_id", groundId);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!groundId,
  });
}

export function useAllGroundSports() {
  return useQuery({
    queryKey: ["ground-sports"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ground_sports")
        .select("*, sport:sports(id, name)");
      if (error) throw error;
      return data;
    },
  });
}

export function useCreateGround() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      location: string;
      address?: string;
      ground_type?: string;
      surface?: string;
      capacity?: number;
      facilities?: string[];
      hourly_rate?: number;
      opening_time?: string;
      closing_time?: string;
      sport_ids?: string[];
    }) => {
      const { sport_ids, ...groundData } = data;
      const { data: result, error } = await supabase
        .from("grounds")
        .insert(groundData)
        .select()
        .single();
      if (error) throw error;

      // Insert ground-sport associations
      if (sport_ids && sport_ids.length > 0) {
        const { error: sportError } = await supabase
          .from("ground_sports")
          .insert(sport_ids.map((sid) => ({ ground_id: result.id, sport_id: sid })));
        if (sportError) throw sportError;
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["grounds"] });
      queryClient.invalidateQueries({ queryKey: ["ground-sports"] });
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
