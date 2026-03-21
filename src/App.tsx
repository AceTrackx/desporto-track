import { Toaster } from "@/components/ui/toaster";
import { lazy, Suspense } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import MemberDashboard from "./pages/dashboard/MemberDashboard";
import MemberSchedule from "./pages/dashboard/member/MemberSchedule";
import MemberScheduleCalendar from "./pages/dashboard/member/MemberScheduleCalendar";
import MemberProgress from "./pages/dashboard/member/MemberProgress";
import MemberAttendance from "./pages/dashboard/member/MemberAttendance";
import MemberAchievements from "./pages/dashboard/member/MemberAchievements";
import MemberBmi from "./pages/dashboard/member/MemberBmi";
import MemberSettings from "./pages/dashboard/member/MemberSettings";
import CoachDashboard from "./pages/dashboard/CoachDashboard";
import CoachSchedule from "./pages/dashboard/coach/CoachSchedule";
import CoachTeams from "./pages/dashboard/coach/CoachTeams";
import CoachPlayers from "./pages/dashboard/coach/CoachPlayers";
import CoachAttendance from "./pages/dashboard/coach/CoachAttendance";
import CoachPerformance from "./pages/dashboard/coach/CoachPerformance";
import CoachAnalytics from "./pages/dashboard/coach/CoachAnalytics";
import CoachReports from "./pages/dashboard/coach/CoachReports";
import CoachSettings from "./pages/dashboard/coach/CoachSettings";
import CoachBmi from "./pages/dashboard/coach/CoachBmi";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import AdminUsers from "./pages/dashboard/admin/AdminUsers";
import AdminSchedule from "./pages/dashboard/admin/AdminSchedule";
import AdminReports from "./pages/dashboard/admin/AdminReports";
import AdminSettings from "./pages/dashboard/admin/AdminSettings";
import SuperAdminDashboard from "./pages/dashboard/SuperAdminDashboard";
import SuperAdminGrounds from "./pages/dashboard/superadmin/SuperAdminGrounds";
import SuperAdminPlayers from "./pages/dashboard/superadmin/SuperAdminPlayers";
import SuperAdminCoaches from "./pages/dashboard/superadmin/SuperAdminCoaches";
import SuperAdminFinances from "./pages/dashboard/superadmin/SuperAdminFinances";
import SuperAdminAnalytics from "./pages/dashboard/superadmin/SuperAdminAnalytics";
import SuperAdminSettings from "./pages/dashboard/superadmin/SuperAdminSettings";
import SuperAdminUsers from "./pages/dashboard/superadmin/SuperAdminUsers";
import GroundDetail from "./pages/dashboard/superadmin/GroundDetail";
import DashboardRouter from "./pages/DashboardRouter";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<DashboardRouter />} />
            
            {/* Member Routes */}
            <Route path="/dashboard/member" element={<MemberDashboard />} />
            <Route path="/dashboard/member/schedule" element={<MemberSchedule />} />
            <Route path="/dashboard/member/schedule/calendar" element={<MemberScheduleCalendar />} />
            <Route path="/dashboard/member/progress" element={<MemberProgress />} />
            <Route path="/dashboard/member/attendance" element={<MemberAttendance />} />
            <Route path="/dashboard/member/achievements" element={<MemberAchievements />} />
            <Route path="/dashboard/member/settings" element={<MemberSettings />} />
            
            {/* Coach Routes */}
            <Route path="/dashboard/coach" element={<CoachDashboard />} />
            <Route path="/dashboard/coach/schedule" element={<CoachSchedule />} />
            <Route path="/dashboard/coach/teams" element={<CoachTeams />} />
            <Route path="/dashboard/coach/players" element={<CoachPlayers />} />
            <Route path="/dashboard/coach/attendance" element={<CoachAttendance />} />
            <Route path="/dashboard/coach/performance" element={<CoachPerformance />} />
            <Route path="/dashboard/coach/analytics" element={<CoachAnalytics />} />
            <Route path="/dashboard/coach/reports" element={<CoachReports />} />
            <Route path="/dashboard/coach/settings" element={<CoachSettings />} />
            
            {/* Admin Routes */}
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/dashboard/admin/users" element={<AdminUsers />} />
            <Route path="/dashboard/admin/schedule" element={<AdminSchedule />} />
            <Route path="/dashboard/admin/reports" element={<AdminReports />} />
            <Route path="/dashboard/admin/settings" element={<AdminSettings />} />
            
            {/* Super Admin (Owner) Routes */}
            <Route path="/dashboard/superadmin" element={<SuperAdminDashboard />} />
            <Route path="/dashboard/superadmin/grounds" element={<SuperAdminGrounds />} />
            <Route path="/dashboard/superadmin/grounds/:groundId" element={<GroundDetail />} />
            <Route path="/dashboard/superadmin/users" element={<SuperAdminUsers />} />
            <Route path="/dashboard/superadmin/players" element={<SuperAdminPlayers />} />
            <Route path="/dashboard/superadmin/coaches" element={<SuperAdminCoaches />} />
            <Route path="/dashboard/superadmin/finances" element={<SuperAdminFinances />} />
            <Route path="/dashboard/superadmin/analytics" element={<SuperAdminAnalytics />} />
            <Route path="/dashboard/superadmin/settings" element={<SuperAdminSettings />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
