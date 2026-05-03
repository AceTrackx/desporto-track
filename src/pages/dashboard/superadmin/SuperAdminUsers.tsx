import { Home, Users, MapPin, BarChart3, Settings, CreditCard, UserCheck } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ApprovalPanel from "@/components/approvals/ApprovalPanel";

const navItems = [
  { label: "Dashboard", href: "/dashboard/superadmin", icon: Home },
  { label: "Grounds", href: "/dashboard/superadmin/grounds", icon: MapPin },
  { label: "Approvals", href: "/dashboard/superadmin/users", icon: UserCheck },
  { label: "All Players", href: "/dashboard/superadmin/players", icon: Users },
  { label: "Coaches", href: "/dashboard/superadmin/coaches", icon: Users },
  { label: "Finances", href: "/dashboard/superadmin/finances", icon: CreditCard },
  { label: "Analytics", href: "/dashboard/superadmin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/superadmin/settings", icon: Settings },
];

const SuperAdminUsers = () => {
  return (
    <DashboardLayout title="User Approvals" navItems={navItems} userRole="Owner">
      <ApprovalPanel />
    </DashboardLayout>
  );
};

export default SuperAdminUsers;
