import { motion } from "framer-motion";
import { Home, Users, Calendar, CreditCard, BarChart3, Settings, Bell, Shield, Palette, Globe } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const navItems = [
  { label: "Dashboard", href: "/dashboard/admin", icon: Home },
  { label: "Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Schedule", href: "/dashboard/admin/schedule", icon: Calendar },
  { label: "Finances", href: "/dashboard/admin/finances", icon: CreditCard },
  { label: "Reports", href: "/dashboard/admin/reports", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];

const settingSections = [
  { title: "Notifications", icon: Bell, settings: [
    { name: "Email notifications", description: "Receive email updates", enabled: true },
    { name: "Push notifications", description: "Browser push alerts", enabled: true },
    { name: "SMS alerts", description: "Text message reminders", enabled: false },
  ]},
  { title: "Security", icon: Shield, settings: [
    { name: "Two-factor authentication", description: "Extra security layer", enabled: true },
    { name: "Session timeout", description: "Auto logout after inactivity", enabled: true },
  ]},
  { title: "Preferences", icon: Palette, settings: [
    { name: "Dark mode", description: "Use dark theme", enabled: false },
    { name: "Compact view", description: "Reduce spacing", enabled: false },
  ]},
];

const AdminSettings = () => {
  return (
    <DashboardLayout title="Settings" navItems={navItems} userRole="Admin" userName="John Mitchell">
      <div className="space-y-6 max-w-4xl">
        {settingSections.map((section, sIndex) => (
          <motion.div key={sIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: sIndex * 0.1 }}>
            <Card className="rounded-2xl border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2"><section.icon className="w-5 h-5 text-primary" />{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.settings.map((setting, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl">
                    <div><div className="font-medium text-foreground">{setting.name}</div><div className="text-sm text-muted-foreground">{setting.description}</div></div>
                    <Switch defaultChecked={setting.enabled} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Button variant="default">Save Changes</Button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;
