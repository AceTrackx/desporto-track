import { motion } from "framer-motion";
import {
  Home,
  Building,
  Users,
  BarChart3,
  Shield,
  Settings,
  Bell,
  Palette,
  Globe,
  Database,
  Mail,
  CreditCard,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

const navItems = [
  { label: "Dashboard", href: "/dashboard/superadmin", icon: Home },
  { label: "Academies", href: "/dashboard/superadmin/academies", icon: Building },
  { label: "All Users", href: "/dashboard/superadmin/users", icon: Users },
  { label: "Analytics", href: "/dashboard/superadmin/analytics", icon: BarChart3 },
  { label: "Security", href: "/dashboard/superadmin/security", icon: Shield },
  { label: "Settings", href: "/dashboard/superadmin/settings", icon: Settings },
];

const settingSections = [
  {
    title: "Platform Settings",
    icon: Globe,
    settings: [
      { name: "Maintenance Mode", description: "Temporarily disable platform access", enabled: false },
      { name: "New Registrations", description: "Allow new academy registrations", enabled: true },
      { name: "Demo Mode", description: "Enable demo accounts for trials", enabled: true },
    ],
  },
  {
    title: "Notifications",
    icon: Bell,
    settings: [
      { name: "System Alerts", description: "Critical system notifications", enabled: true },
      { name: "New Academy Alerts", description: "Notify on new registrations", enabled: true },
      { name: "Payment Alerts", description: "Payment status notifications", enabled: true },
    ],
  },
  {
    title: "Security",
    icon: Shield,
    settings: [
      { name: "Force 2FA for Admins", description: "Require two-factor authentication", enabled: true },
      { name: "IP Whitelisting", description: "Restrict access by IP", enabled: false },
      { name: "Audit Logging", description: "Log all admin actions", enabled: true },
    ],
  },
  {
    title: "Email & Communications",
    icon: Mail,
    settings: [
      { name: "Marketing Emails", description: "Send promotional emails", enabled: true },
      { name: "Automated Reports", description: "Weekly summary emails", enabled: true },
      { name: "Support Notifications", description: "Alert on support tickets", enabled: true },
    ],
  },
];

const platformConfig = [
  { label: "Platform Name", value: "AceTrack", icon: Globe },
  { label: "Support Email", value: "support@acetrack.com", icon: Mail },
  { label: "Database Region", value: "EU West (London)", icon: Database },
  { label: "Billing Currency", value: "USD ($)", icon: CreditCard },
];

const SuperAdminSettings = () => {
  return (
    <DashboardLayout
      title="Settings"
      navItems={navItems}
      userRole="Super Admin"
      userName="Michael Roberts"
    >
      <div className="space-y-8">
        {/* Platform Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Platform Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {platformConfig.map((config, index) => (
                  <div
                    key={index}
                    className="p-4 bg-card border border-border rounded-2xl"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <config.icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">{config.label}</span>
                    </div>
                    <Input defaultValue={config.value} className="bg-muted" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Settings Sections */}
        <div className="grid lg:grid-cols-2 gap-6">
          {settingSections.map((section, sIndex) => (
            <motion.div
              key={sIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + sIndex * 0.05 }}
            >
              <Card className="rounded-2xl border border-border h-full">
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
        </div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-3"
        >
          <Button variant="default">Save Changes</Button>
          <Button variant="outline">Reset to Defaults</Button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminSettings;
