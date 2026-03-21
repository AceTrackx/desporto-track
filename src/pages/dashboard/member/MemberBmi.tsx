import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Calendar,
  BarChart3,
  Trophy,
  UserCheck,
  Scale,
  ArrowLeft,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import BmiTracker from "@/components/bmi/BmiTracker";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard/member", icon: Home },
  { label: "Schedule", href: "/dashboard/member/schedule", icon: Calendar },
  { label: "My Progress", href: "/dashboard/member/progress", icon: BarChart3 },
  { label: "BMI Tracker", href: "/dashboard/member/bmi", icon: Scale },
  { label: "Attendance", href: "/dashboard/member/attendance", icon: UserCheck },
  { label: "Achievements", href: "/dashboard/member/achievements", icon: Trophy },
];

const MemberBmi = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: playerId, isLoading } = useQuery({
    queryKey: ["current-player-id", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data } = await supabase
        .from("players")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();
      return data?.id ?? null;
    },
    enabled: !!user?.id,
  });

  return (
    <DashboardLayout title="BMI Tracker" navItems={navItems} userRole="Member">
      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard/member")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : playerId ? (
          <BmiTracker playerId={playerId} canDelete={false} />
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            Player profile not found. Please contact your coach.
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MemberBmi;
