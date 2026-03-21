import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface BmiRecord {
  id: string;
  player_id: string;
  height_cm: number;
  weight_kg: number;
  bmi_value: number;
  recorded_by: string | null;
  notes: string | null;
  recorded_at: string;
  created_at: string;
  recorder?: { full_name: string | null } | null;
}

export function useBmiRecords(playerId?: string) {
  return useQuery({
    queryKey: ["bmi-records", playerId],
    queryFn: async (): Promise<BmiRecord[]> => {
      if (!playerId) return [];
      const { data, error } = await supabase
        .from("bmi_records")
        .select("*, recorder:profiles!bmi_records_recorded_by_fkey(full_name)")
        .eq("player_id", playerId)
        .order("recorded_at", { ascending: true });
      if (error) throw error;
      return data as unknown as BmiRecord[];
    },
    enabled: !!playerId,
  });
}

export function useCreateBmiRecord() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (data: {
      player_id: string;
      height_cm: number;
      weight_kg: number;
      notes?: string;
      recorded_at?: string;
    }) => {
      const bmi = data.weight_kg / Math.pow(data.height_cm / 100, 2);
      const { data: result, error } = await supabase
        .from("bmi_records")
        .insert({
          player_id: data.player_id,
          height_cm: data.height_cm,
          weight_kg: data.weight_kg,
          bmi_value: Math.round(bmi * 100) / 100,
          recorded_by: user?.id || null,
          notes: data.notes || null,
          recorded_at: data.recorded_at || new Date().toISOString(),
        })
        .select()
        .single();
      if (error) throw error;
      return result;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["bmi-records", variables.player_id] });
    },
  });
}

export function useDeleteBmiRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, playerId }: { id: string; playerId: string }) => {
      const { error } = await supabase.from("bmi_records").delete().eq("id", id);
      if (error) throw error;
      return playerId;
    },
    onSuccess: (playerId) => {
      queryClient.invalidateQueries({ queryKey: ["bmi-records", playerId] });
    },
  });
}
