import { motion } from "framer-motion";
import { ArrowLeft, Shield, Lock, Eye, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const features = [
  {
    icon: UserCheck,
    title: "Role Hierarchy",
    description: "Owner, Admin, Coach, and Member roles with appropriate permissions for each level.",
  },
  {
    icon: Lock,
    title: "Granular Permissions",
    description: "Fine-tune access to specific features and data based on user responsibilities.",
  },
  {
    icon: Eye,
    title: "Data Visibility",
    description: "Control what data each role can view, edit, or manage within the platform.",
  },
  {
    icon: Shield,
    title: "Secure Authentication",
    description: "Industry-standard security with encrypted passwords and secure sessions.",
  },
];

const roles = [
  { role: "Owner", access: "Full academy control, finances, all settings" },
  { role: "Admin", access: "User management, scheduling, approvals" },
  { role: "Coach", access: "Team management, attendance, player progress" },
  { role: "Member", access: "Personal progress, schedules, achievements" },
];

const RoleBasedAccess = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/#features">
            <Button variant="ghost" className="mb-8 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Features
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mb-16"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-primary/10">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <span className="text-sm font-medium text-primary uppercase tracking-wider">Feature</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl text-foreground mb-6 tracking-wide">
              ROLE-BASED ACCESS
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Secure access control for owners, admins, coaches, and members. 
              Everyone sees exactly what they need, nothing more.
            </p>
          </motion.div>

          {/* Roles Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-xl border border-border mb-16 overflow-hidden"
          >
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-semibold text-foreground">Access Levels</h2>
            </div>
            <div className="divide-y divide-border">
              {roles.map((item) => (
                <div key={item.role} className="p-6 flex items-center justify-between">
                  <span className="font-medium text-foreground">{item.role}</span>
                  <span className="text-muted-foreground text-sm">{item.access}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-semibold text-foreground mb-8">Key Capabilities</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-card rounded-xl p-6 border border-border"
                >
                  <feature.icon className="w-6 h-6 text-primary mb-4" />
                  <h3 className="font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card rounded-2xl p-8 border border-border text-center"
          >
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Ready to secure your academy?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Set up role-based access and keep your data secure.
            </p>
            <Link to="/auth">
              <Button size="lg" className="bg-primary text-primary-foreground">
                Get Started Free
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RoleBasedAccess;
