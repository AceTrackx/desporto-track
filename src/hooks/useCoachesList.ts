import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CoachProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
}

export function useCoachesList() {
  return useQuery({
    queryKey: ["coaches-list"],
    queryFn: async (): Promise<CoachProfile[]> => {
      // Get all users with the 'coach' role
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("user_id")
        .eq("role", "coach");

      if (roleError) throw roleError;
      if (!roleData?.length) return [];

      const coachIds = roleData.map((r) => r.user_id);

      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, email, avatar_url")
        .in("id", coachIds);

      if (error) throw error;
      return data as CoachProfile[];
    },
  });
}
