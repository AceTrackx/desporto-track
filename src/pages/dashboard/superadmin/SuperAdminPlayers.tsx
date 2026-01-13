import { motion } from "framer-motion";
import {
  Home,
  MapPin,
  Users,
  BarChart3,
  Settings,
  CreditCard,
  Search,
  Filter,
  TrendingUp,
  Trophy,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const navItems = [
  { label: "Dashboard", href: "/dashboard/superadmin", icon: Home },
  { label: "Grounds", href: "/dashboard/superadmin/grounds", icon: MapPin },
  { label: "All Players", href: "/dashboard/superadmin/players", icon: Users },
  { label: "Coaches", href: "/dashboard/superadmin/coaches", icon: Users },
  { label: "Finances", href: "/dashboard/superadmin/finances", icon: CreditCard },
  { label: "Analytics", href: "/dashboard/superadmin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/superadmin/settings", icon: Settings },
];

const players = [
  { name: "Alex Thompson", squad: "U-15 Elite", age: 14, position: "Forward", attendance: 94, performance: "A", fee: "Paid" },
  { name: "Marcus Johnson", squad: "U-17 Premier", age: 16, position: "Midfielder", attendance: 88, performance: "A+", fee: "Paid" },
  { name: "Emma Wilson", squad: "U-13 Development", age: 12, position: "Defender", attendance: 96, performance: "B+", fee: "Paid" },
  { name: "David Chen", squad: "U-15 Elite", age: 14, position: "Goalkeeper", attendance: 92, performance: "A", fee: "Pending" },
  { name: "Sophie Martinez", squad: "U-17 Premier", age: 16, position: "Forward", attendance: 85, performance: "A", fee: "Paid" },
  { name: "James Wilson", squad: "U-11 Beginners", age: 10, position: "Midfielder", attendance: 90, performance: "B", fee: "Paid" },
  { name: "Olivia Brown", squad: "U-13 Development", age: 12, position: "Forward", attendance: 98, performance: "A+", fee: "Paid" },
  { name: "Noah Davis", squad: "U-17 Premier", age: 17, position: "Defender", attendance: 82, performance: "B+", fee: "Overdue" },
];

const squadStats = [
  { name: "U-17 Premier", players: 45, avgAttendance: 88, avgPerformance: "A" },
  { name: "U-15 Elite", players: 38, avgAttendance: 92, avgPerformance: "A" },
  { name: "U-13 Development", players: 42, avgAttendance: 95, avgPerformance: "B+" },
  { name: "U-11 Beginners", players: 28, avgAttendance: 90, avgPerformance: "B" },
];

const SuperAdminPlayers = () => {
  return (
    <DashboardLayout
      title="All Players"
      navItems={navItems}
      userRole="Owner"
      userName="Michael Roberts"
    >
      <div className="space-y-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: "Total Players", value: "248", icon: Users },
            { label: "Avg Attendance", value: "91%", icon: TrendingUp },
            { label: "Top Performers", value: "45", icon: Trophy },
            { label: "Pending Fees", value: "12", icon: CreditCard },
          ].map((stat, index) => (
            <Card key={index} className="rounded-2xl border border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <stat.icon className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
                <div className="font-display text-3xl text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Squad Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Squad Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {squadStats.map((squad, index) => (
                  <div key={index} className="p-4 bg-card border border-border rounded-2xl">
                    <div className="font-semibold text-foreground mb-3">{squad.name}</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Players</span>
                        <span className="text-foreground font-medium">{squad.players}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Attendance</span>
                        <span className="text-foreground font-medium">{squad.avgAttendance}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Performance</span>
                        <span className="text-primary font-semibold">{squad.avgPerformance}</span>
                      </div>
                    </div>
                    <Progress value={squad.avgAttendance} className="h-2 mt-3" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Players List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="rounded-2xl border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Player Directory
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search players..." className="pl-9 w-64" />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {players.map((player, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                          {player.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-foreground">{player.name}</div>
                        <div className="text-sm text-muted-foreground">{player.squad} • {player.position} • Age {player.age}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">Attendance</div>
                        <div className="font-semibold text-foreground">{player.attendance}%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">Performance</div>
                        <div className="font-semibold text-primary">{player.performance}</div>
                      </div>
                      <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                        player.fee === "Paid" ? "bg-primary/10 text-primary border-primary/20" : 
                        player.fee === "Pending" ? "bg-accent/10 text-accent-foreground border-accent/20" : 
                        "bg-coral/10 text-coral border-coral/20"
                      }`}>
                        {player.fee}
                      </span>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminPlayers;
