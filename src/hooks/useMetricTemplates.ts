import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { MetricTemplate } from "@/types/sports";

export function useMetricTemplates(sportId: string | undefined, metricType?: 'match' | 'practice') {
  return useQuery({
    queryKey: ["metric-templates", sportId, metricType],
    queryFn: async (): Promise<MetricTemplate[]> => {
      if (!sportId) return [];

      let query = supabase
        .from("metric_templates")
        .select("*")
        .eq("sport_id", sportId)
        .order("display_order");

      if (metricType) {
        query = query.eq("metric_type", metricType);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as MetricTemplate[];
    },
    enabled: !!sportId,
  });
}

export function useAllMetricTemplates() {
  return useQuery({
    queryKey: ["metric-templates"],
    queryFn: async (): Promise<MetricTemplate[]> => {
      const { data, error } = await supabase
        .from("metric_templates")
        .select("*")
        .order("display_order");

      if (error) throw error;
      return data as MetricTemplate[];
    },
  });
}
