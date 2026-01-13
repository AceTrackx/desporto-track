import { motion } from "framer-motion";
import {
  Home,
  Calendar,
  Users,
  ClipboardCheck,
  BarChart3,
  FileText,
  Settings,
  Bell,
  User,
  Lock,
  Palette,
  Clock,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

const navItems = [
  { label: "Dashboard", href: "/dashboard/coach", icon: Home },
  { label: "Schedule", href: "/dashboard/coach/schedule", icon: Calendar },
  { label: "My Teams", href: "/dashboard/coach/teams", icon: Users },
  { label: "Attendance", href: "/dashboard/coach/attendance", icon: ClipboardCheck },
  { label: "Analytics", href: "/dashboard/coach/analytics", icon: BarChart3 },
  { label: "Reports", href: "/dashboard/coach/reports", icon: FileText },
  { label: "Settings", href: "/dashboard/coach/settings", icon: Settings },
];

const settingSections = [
  {
    title: "Notifications",
    icon: Bell,
    settings: [
      { name: "Session Reminders", description: "Get notified 30 mins before sessions", enabled: true },
      { name: "Attendance Alerts", description: "Alert when players miss sessions", enabled: true },
      { name: "Report Deadlines", description: "Reminders for pending reports", enabled: true },
      { name: "Parent Messages", description: "Notifications for parent inquiries", enabled: true },
    ],
  },
  {
    title: "Session Defaults",
    icon: Clock,
    settings: [
      { name: "Auto-start Attendance", description: "Automatically open attendance at session start", enabled: true },
      { name: "Session Summaries", description: "Prompt for summary after each session", enabled: false },
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

const CoachSettings = () => {
  return (
    <DashboardLayout
      title="Settings"
      navItems={navItems}
      userRole="Coach"
      userName="Coach Williams"
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
                Coach Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center gap-3">
                  <Avatar className="w-24 h-24">
                    <AvatarFallback className="bg-primary/10 text-primary font-display text-2xl">
                      CW
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">Change Photo</Button>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Full Name</label>
                      <Input defaultValue="Coach Williams" className="bg-muted" />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Email</label>
                      <Input defaultValue="williams@academy.com" className="bg-muted" />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Phone</label>
                      <Input defaultValue="+1 234 567 8901" className="bg-muted" />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Specialization</label>
                      <Input defaultValue="Technical Training, Youth Development" className="bg-muted" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Bio</label>
                    <Textarea 
                      defaultValue="UEFA B Licensed coach with 10+ years experience in youth development. Specialized in technical training and player development programs." 
                      className="bg-muted min-h-[100px]" 
                    />
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

export default CoachSettings;
