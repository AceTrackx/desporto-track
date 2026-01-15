import { motion } from "framer-motion";
import {
  Home,
  Users,
  Calendar,
  BarChart3,
  Settings,
  Bell,
  User,
  Palette,
  Clock,
  FileText,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navItems = [
  { label: "Dashboard", href: "/dashboard/admin", icon: Home },
  { label: "Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Schedule", href: "/dashboard/admin/schedule", icon: Calendar },
  { label: "Reports", href: "/dashboard/admin/reports", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];

const settingSections = [
  {
    title: "Notifications",
    icon: Bell,
    settings: [
      { name: "New Registrations", description: "Get notified when new students register", enabled: true },
      { name: "Payment Alerts", description: "Alerts for pending and failed payments", enabled: true },
      { name: "Session Conflicts", description: "Notify about scheduling conflicts", enabled: true },
      { name: "Coach Reports", description: "Weekly coach performance summaries", enabled: true },
    ],
  },
  {
    title: "Scheduling Defaults",
    icon: Clock,
    settings: [
      { name: "Auto-approve Sessions", description: "Automatically approve coach-created sessions", enabled: false },
      { name: "Buffer Time", description: "Add 15-min buffer between sessions", enabled: true },
      { name: "Weekend Sessions", description: "Allow weekend scheduling", enabled: true },
    ],
  },
  {
    title: "Approvals",
    icon: FileText,
    settings: [
      { name: "Student Registration Approval", description: "Manually approve new student registrations", enabled: true },
      { name: "Ground Booking Approval", description: "Require approval for ground bookings", enabled: true },
      { name: "Match Scheduling", description: "Approve match schedules before publishing", enabled: false },
    ],
  },
  {
    title: "Preferences",
    icon: Palette,
    settings: [
      { name: "Dark Mode", description: "Use dark theme", enabled: false },
      { name: "Compact View", description: "Reduce spacing in layouts", enabled: false },
    ],
  },
];

const AdminSettings = () => {
  return (
    <DashboardLayout
      title="Settings"
      navItems={navItems}
      userRole="Admin"
      userName="John Mitchell"
    >
      <div className="space-y-8 max-w-4xl">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Admin Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center gap-3">
                  <Avatar className="w-24 h-24">
                    <AvatarFallback className="bg-primary/10 text-primary font-display text-2xl">
                      JM
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">Change Photo</Button>
                </div>
                <div className="flex-1 grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Full Name</label>
                    <Input defaultValue="John Mitchell" className="bg-muted" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Email</label>
                    <Input defaultValue="john.mitchell@academy.com" className="bg-muted" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Phone</label>
                    <Input defaultValue="+1 234 567 8902" className="bg-muted" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Role</label>
                    <Input defaultValue="Academy Administrator" className="bg-muted" disabled />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Settings Sections */}
        {settingSections.map((section, sIndex) => (
          <motion.div
            key={sIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + sIndex * 0.05 }}
          >
            <Card className="rounded-2xl border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <section.icon className="w-5 h-5 text-primary" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.settings.map((setting, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl"
                  >
                    <div>
                      <div className="font-medium text-foreground">{setting.name}</div>
                      <div className="text-sm text-muted-foreground">{setting.description}</div>
                    </div>
                    <Switch defaultChecked={setting.enabled} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-3"
        >
          <Button variant="default">Save Changes</Button>
          <Button variant="outline">Cancel</Button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;
