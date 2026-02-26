import { motion } from "framer-motion";
import {
  Home,
  MapPin,
  Users,
  BarChart3,
  Settings,
  Bell,
  User,
  Palette,
  Globe,
  Mail,
  CreditCard,
  Calendar,
  Building,
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
  { label: "Dashboard", href: "/dashboard/superadmin", icon: Home },
  { label: "Grounds", href: "/dashboard/superadmin/grounds", icon: MapPin },
  { label: "All Players", href: "/dashboard/superadmin/players", icon: Users },
  { label: "Coaches", href: "/dashboard/superadmin/coaches", icon: Users },
  { label: "Finances", href: "/dashboard/superadmin/finances", icon: CreditCard },
  { label: "Analytics", href: "/dashboard/superadmin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/superadmin/settings", icon: Settings },
];

const academyConfig = [
  { label: "Academy Name", value: "Elite Football Academy", icon: Building },
  { label: "Contact Email", value: "info@elitefootball.com", icon: Mail },
  { label: "Phone Number", value: "+1 234 567 8900", icon: Globe },
  { label: "Billing Currency", value: "USD ($)", icon: CreditCard },
];

const settingSections = [
  {
    title: "Academy Settings",
    icon: Building,
    settings: [
      { name: "Open Registrations", description: "Allow new student registrations", enabled: true },
      { name: "Trial Sessions", description: "Enable trial session bookings", enabled: true },
      { name: "Parent Portal", description: "Allow parents to view child progress", enabled: true },
    ],
  },
  {
    title: "Notifications",
    icon: Bell,
    settings: [
      { name: "Financial Alerts", description: "Revenue and payment notifications", enabled: true },
      { name: "New Registrations", description: "Alert on new student signups", enabled: true },
      { name: "Coach Reports", description: "Weekly coaching summaries", enabled: true },
      { name: "Ground Availability", description: "Alerts for ground scheduling conflicts", enabled: true },
    ],
  },
  {
    title: "Scheduling",
    icon: Clock,
    settings: [
      { name: "Weekend Sessions", description: "Allow weekend training sessions", enabled: true },
      { name: "Holiday Calendar", description: "Auto-block sessions on holidays", enabled: true },
      { name: "Buffer Between Sessions", description: "15-min gap between sessions", enabled: true },
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

const SuperAdminSettings = () => {
  return (
    <DashboardLayout
      title="Settings"
      navItems={navItems}
      userRole="Owner"
      
    >
      <div className="space-y-8">
        {/* Owner Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Owner Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center gap-3">
                  <Avatar className="w-24 h-24">
                    <AvatarFallback className="bg-primary/10 text-primary font-display text-2xl">
                      MR
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">Change Photo</Button>
                </div>
                <div className="flex-1 grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Full Name</label>
                    <Input defaultValue="Michael Roberts" className="bg-muted" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Email</label>
                    <Input defaultValue="michael@elitefootball.com" className="bg-muted" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Phone</label>
                    <Input defaultValue="+1 234 567 8900" className="bg-muted" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Role</label>
                    <Input defaultValue="Academy Owner" className="bg-muted" disabled />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Academy Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Building className="w-5 h-5 text-primary" />
                Academy Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {academyConfig.map((config, index) => (
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
              <div className="mt-4 p-4 bg-card border border-border rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Academy Address</span>
                </div>
                <Textarea 
                  defaultValue="123 Sports Complex Road, City Center, State 12345" 
                  className="bg-muted min-h-[80px]" 
                />
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
