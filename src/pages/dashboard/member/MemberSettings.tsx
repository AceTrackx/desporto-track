import { motion } from "framer-motion";
import {
  Home,
  Calendar,
  BarChart3,
  Trophy,
  Settings,
  Bell,
  User,
  Lock,
  Palette,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navItems = [
  { label: "Dashboard", href: "/dashboard/member", icon: Home },
  { label: "Schedule", href: "/dashboard/member/schedule", icon: Calendar },
  { label: "My Progress", href: "/dashboard/member/progress", icon: BarChart3 },
  { label: "Achievements", href: "/dashboard/member/achievements", icon: Trophy },
  { label: "Settings", href: "/dashboard/member/settings", icon: Settings },
];

const settingSections = [
  {
    title: "Notifications",
    icon: Bell,
    settings: [
      { name: "Session Reminders", description: "Get notified before training sessions", enabled: true },
      { name: "Progress Updates", description: "Weekly progress summary notifications", enabled: true },
      { name: "Match Announcements", description: "Alerts for upcoming matches", enabled: true },
      { name: "Coach Feedback", description: "Notifications when coach leaves feedback", enabled: true },
    ],
  },
  {
    title: "Privacy",
    icon: Lock,
    settings: [
      { name: "Show Profile to Team", description: "Allow teammates to view your profile", enabled: true },
      { name: "Share Progress Stats", description: "Let coaches share your stats with parents", enabled: true },
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

const MemberSettings = () => {
  return (
    <DashboardLayout
      title="Settings"
      navItems={navItems}
      userRole="Member"
      
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
                My Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center gap-3">
                  <Avatar className="w-24 h-24">
                    <AvatarFallback className="bg-primary/10 text-primary font-display text-2xl">
                      AT
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">Change Photo</Button>
                </div>
                <div className="flex-1 grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Full Name</label>
                    <Input defaultValue="Alex Thompson" className="bg-muted" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Email</label>
                    <Input defaultValue="alex.thompson@email.com" className="bg-muted" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Phone</label>
                    <Input defaultValue="+1 234 567 8900" className="bg-muted" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Date of Birth</label>
                    <Input defaultValue="2010-05-15" type="date" className="bg-muted" />
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

export default MemberSettings;
