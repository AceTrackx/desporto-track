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
  const [recoveryError, setRecoveryError] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/auth", { replace: true });
      return;
    }

    let isActive = true;

    const fetchStatus = async () => {
      try {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("registration_status, requested_role")
          .eq("id", user.id)
          .maybeSingle();

        if (profileError) throw profileError;

        let resolvedProfile = profile;

        if (!resolvedProfile) {
          const fallbackFullName =
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            user.email ||
            "User";

          const fallbackRole =
            typeof user.user_metadata?.requested_role === "string"
              ? user.user_metadata.requested_role
              : "member";

          const fallbackSportId =
            typeof user.user_metadata?.sport_id === "string" && user.user_metadata.sport_id.length > 0
              ? user.user_metadata.sport_id
              : null;

          const { data: createdProfile, error: createError } = await supabase
            .from("profiles")
            .insert({
              id: user.id,
              email: user.email ?? null,
              full_name: fallbackFullName,
              requested_role: fallbackRole,
              sport_id: fallbackSportId,
              registration_status: "pending",
            })
            .select("registration_status, requested_role")
            .maybeSingle();

          if (createError) throw createError;
          resolvedProfile = createdProfile;
        }

        if (!isActive) return;

        if (!resolvedProfile) {
          setRecoveryError("Unable to load your profile.");
          setChecking(false);
          return;
        }

        setRecoveryError(null);
        setStatus(resolvedProfile.registration_status);

        if (resolvedProfile.registration_status === "approved") {
          const { data: userRoles, error: rolesError } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", user.id);

          if (rolesError) throw rolesError;

          const roleList = (userRoles || []).map((r) => r.role);

          if (!isActive) return;

          if (roleList.includes("superadmin")) {
            navigate("/dashboard/superadmin", { replace: true });
          } else if (roleList.includes("admin")) {
            navigate("/dashboard/admin", { replace: true });
          } else if (roleList.includes("coach")) {
            navigate("/dashboard/coach", { replace: true });
          } else {
            navigate("/dashboard/member", { replace: true });
          }
          return;
        }

        setChecking(false);
      } catch (error) {
        if (!isActive) return;
        setRecoveryError(error instanceof Error ? error.message : "Unable to load your dashboard.");
        setChecking(false);
      }
    };

    fetchStatus();

    return () => {
      isActive = false;
    };
  }, [user, authLoading, navigate]);

  if (authLoading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (recoveryError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6 text-center">
        <div>
          <h1 className="font-display text-4xl text-foreground mb-4">UNABLE TO LOAD DASHBOARD</h1>
          <p className="text-muted-foreground">{recoveryError}</p>
        </div>
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
