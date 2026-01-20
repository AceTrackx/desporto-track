import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Home,
  Calendar,
  Users,
  ClipboardCheck,
  BarChart3,
  FileText,
  Activity,
  ArrowLeft,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { SessionSelector } from "@/components/attendance/SessionSelector";
import { AttendanceMarker } from "@/components/attendance/AttendanceMarker";
import { useSession } from "@/hooks/useSessions";
import { useMatch } from "@/hooks/useMatches";
import type { TrainingSession, Match } from "@/types/sports";

const navItems = [
  { label: "Dashboard", href: "/dashboard/coach", icon: Home },
  { label: "Schedule", href: "/dashboard/coach/schedule", icon: Calendar },
  { label: "My Teams", href: "/dashboard/coach/teams", icon: Users },
  { label: "Players", href: "/dashboard/coach/players", icon: Users },
  { label: "Attendance", href: "/dashboard/coach/attendance", icon: ClipboardCheck },
  { label: "Performance", href: "/dashboard/coach/performance", icon: Activity },
  { label: "Analytics", href: "/dashboard/coach/analytics", icon: BarChart3 },
  { label: "Reports", href: "/dashboard/coach/reports", icon: FileText },
];

const CoachAttendance = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get session/match ID from URL if present
  const sessionIdFromUrl = searchParams.get("session");
  const matchIdFromUrl = searchParams.get("match");

  const [selectedSession, setSelectedSession] = useState<TrainingSession | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  // Fetch session/match if ID is in URL
  const { data: sessionFromUrl } = useSession(sessionIdFromUrl || undefined);
  const { data: matchFromUrl } = useMatch(matchIdFromUrl || undefined);

  // Set from URL params on load
  useEffect(() => {
    if (sessionFromUrl) {
      setSelectedSession(sessionFromUrl);
    }
  }, [sessionFromUrl]);

  useEffect(() => {
    if (matchFromUrl) {
      setSelectedMatch(matchFromUrl);
    }
  }, [matchFromUrl]);

  const handleSelectSession = (session: TrainingSession) => {
    setSelectedSession(session);
    setSelectedMatch(null);
    setSearchParams({ session: session.id });
  };

  const handleSelectMatch = (match: Match) => {
    setSelectedMatch(match);
    setSelectedSession(null);
    setSearchParams({ match: match.id });
  };

  const handleBack = () => {
    setSelectedSession(null);
    setSelectedMatch(null);
    setSearchParams({});
  };

  const isMarkingAttendance = selectedSession || selectedMatch;

  return (
    <DashboardLayout
      title="Attendance"
      navItems={navItems}
      userRole="Coach"
      userName="Coach Williams"
    >
      <div className="space-y-8">
        {/* Back to Dashboard (only when not marking attendance) */}
        {!isMarkingAttendance && (
          <Button variant="ghost" onClick={() => navigate("/dashboard/coach")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        )}

        {isMarkingAttendance ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AttendanceMarker
              session={selectedSession || undefined}
              match={selectedMatch || undefined}
              onBack={handleBack}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl text-foreground mb-2">
                  Select a Session or Match
                </h2>
                <p className="text-muted-foreground">
                  Choose a training session or match to mark attendance
                </p>
              </div>

              <SessionSelector
                onSelectSession={handleSelectSession}
                onSelectMatch={handleSelectMatch}
              />
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CoachAttendance;
