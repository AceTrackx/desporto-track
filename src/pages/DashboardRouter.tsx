import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import PendingApproval from "@/pages/PendingApproval";

const DashboardRouter = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState<string | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/auth");
      return;
    }

    const fetchStatus = async () => {
      // Get profile status
      const { data: profile } = await supabase
        .from("profiles")
        .select("registration_status, requested_role")
        .eq("id", user.id)
        .maybeSingle();

      if (!profile) {
        navigate("/auth");
        return;
      }

      setStatus(profile.registration_status);

      if (profile.registration_status === "approved") {
        // Get roles
        const { data: userRoles } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id);

        const roleList = (userRoles || []).map((r) => r.role);
        setRoles(roleList);

        // Redirect to highest-priority role dashboard
        if (roleList.includes("superadmin")) {
          navigate("/dashboard/superadmin", { replace: true });
        } else if (roleList.includes("admin")) {
          navigate("/dashboard/admin", { replace: true });
        } else if (roleList.includes("coach")) {
          navigate("/dashboard/coach", { replace: true });
        } else {
          navigate("/dashboard/member", { replace: true });
        }
      }

      setChecking(false);
    };

    fetchStatus();
  }, [user, authLoading, navigate]);

  if (authLoading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (status === "pending") {
    return <PendingApproval />;
  }

  if (status === "rejected") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6 text-center">
        <div>
          <h1 className="font-display text-4xl text-foreground mb-4">REGISTRATION DECLINED</h1>
          <p className="text-muted-foreground">Your registration was not approved. Please contact the academy administrator.</p>
        </div>
      </div>
    );
  }

  return null;
};

export default DashboardRouter;
