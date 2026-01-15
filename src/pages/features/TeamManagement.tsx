import { motion } from "framer-motion";
import { ArrowLeft, Users, UserPlus, Layers, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const features = [
  {
    icon: UserPlus,
    title: "Roster Management",
    description: "Add, edit, and organize player profiles with comprehensive information tracking.",
  },
  {
    icon: Layers,
    title: "Squad Organization",
    description: "Group players by age, skill level, or custom categories for efficient management.",
  },
  {
    icon: MessageSquare,
    title: "Team Communication",
    description: "Send announcements and updates to entire teams or specific groups instantly.",
  },
  {
    icon: Users,
    title: "Parent Portal",
    description: "Keep parents informed with dedicated access to their child's progress and schedules.",
  },
];

const stats = [
  { label: "Players Managed", value: "500+" },
  { label: "Teams Supported", value: "50+" },
  { label: "Parent Accounts", value: "1000+" },
  { label: "Messages/Month", value: "10K+" },
];

const TeamManagement = () => {
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
                <Users className="w-8 h-8 text-primary" />
              </div>
              <span className="text-sm font-medium text-primary uppercase tracking-wider">Feature</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl text-foreground mb-6 tracking-wide">
              TEAM MANAGEMENT
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Manage rosters, group players by skill level, and organize squads effortlessly. 
              Keep everyone connected with streamlined communication tools.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card rounded-xl p-6 border border-border text-center">
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
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
              Ready to streamline your team management?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Organize your academy with powerful team management tools.
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

export default TeamManagement;
