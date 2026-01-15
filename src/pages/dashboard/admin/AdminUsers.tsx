import { motion } from "framer-motion";
import { Home, Users, Calendar, BarChart3, Settings, Search, UserPlus, UserCheck, CheckCircle2, XCircle, Clock } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navItems = [
  { label: "Dashboard", href: "/dashboard/admin", icon: Home },
  { label: "Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Schedule", href: "/dashboard/admin/schedule", icon: Calendar },
  { label: "Reports", href: "/dashboard/admin/reports", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];

const allStudents = [
  { id: 1, name: "James Wilson", squad: "U-15 Elite", status: "Pending", date: "Jan 15, 2026", age: 14, parentPhone: "+91 98765 43210" },
  { id: 2, name: "Sophia Miller", squad: "U-11 Beginners", status: "Pending", date: "Jan 15, 2026", age: 10, parentPhone: "+91 87654 32109" },
  { id: 3, name: "Arjun Patel", squad: "U-13 Development", status: "Pending", date: "Jan 14, 2026", age: 12, parentPhone: "+91 76543 21098" },
  { id: 4, name: "Olivia Brown", squad: "U-13 Development", status: "Approved", date: "Jan 13, 2026", age: 13, parentPhone: "+91 65432 10987" },
  { id: 5, name: "Noah Davis", squad: "U-17 Premier", status: "Approved", date: "Jan 12, 2026", age: 16, parentPhone: "+91 54321 09876" },
  { id: 6, name: "Emma Johnson", squad: "U-11 Beginners", status: "Approved", date: "Jan 11, 2026", age: 11, parentPhone: "+91 43210 98765" },
  { id: 7, name: "Liam Anderson", squad: "U-15 Elite", status: "Rejected", date: "Jan 10, 2026", age: 15, parentPhone: "+91 32109 87654" },
  { id: 8, name: "Priya Sharma", squad: "U-17 Premier", status: "Pending", date: "Jan 14, 2026", age: 16, parentPhone: "+91 21098 76543" },
];

const AdminUsers = () => {
  const pendingCount = allStudents.filter(s => s.status === "Pending").length;
  const approvedCount = allStudents.filter(s => s.status === "Approved").length;

  return (
    <DashboardLayout title="User Management" navItems={navItems} userRole="Admin" userName="John Mitchell">
      <div className="space-y-6">
        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-3 gap-4">
          <Card className="rounded-2xl border border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="font-display text-2xl text-foreground">{pendingCount}</div>
                  <div className="text-sm text-muted-foreground">Pending Approval</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-display text-2xl text-foreground">{approvedCount}</div>
                  <div className="text-sm text-muted-foreground">Approved</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <Users className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-display text-2xl text-foreground">{allStudents.length}</div>
                  <div className="text-sm text-muted-foreground">Total Students</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search students..." className="pl-10" />
          </div>
          <Button variant="accent">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Student
          </Button>
        </motion.div>

        {/* Students List */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="rounded-2xl border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-primary" />
                All Students
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {allStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-semibold text-foreground">{student.name}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        student.status === "Pending" 
                          ? "bg-accent/10 text-accent-foreground" 
                          : student.status === "Approved"
                          ? "bg-primary/10 text-primary"
                          : "bg-coral/10 text-coral"
                      }`}>
                        {student.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{student.squad}</span>
                      <span>•</span>
                      <span>Age: {student.age}</span>
                      <span>•</span>
                      <span>{student.parentPhone}</span>
                      <span>•</span>
                      <span>{student.date}</span>
                    </div>
                  </div>
                  {student.status === "Pending" && (
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="text-coral border-coral/20 hover:bg-coral/10">
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                      <Button variant="accent" size="sm">
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AdminUsers;
