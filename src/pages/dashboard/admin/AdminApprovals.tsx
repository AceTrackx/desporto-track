import { Home, Users, Calendar, BarChart3, Settings, UserCheck } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ApprovalPanel from "@/components/approvals/ApprovalPanel";

const navItems = [
  { label: "Dashboard", href: "/dashboard/admin", icon: Home },
  { label: "Approvals", href: "/dashboard/admin/approvals", icon: UserCheck },
  { label: "Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Schedule", href: "/dashboard/admin/schedule", icon: Calendar },
  { label: "Reports", href: "/dashboard/admin/reports", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];

const AdminApprovals = () => {
  return (
    <DashboardLayout title="User Approvals" navItems={navItems} userRole="Admin">
      <ApprovalPanel />
    </DashboardLayout>
  );
};

export default AdminApprovals;
