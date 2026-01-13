import { motion } from "framer-motion";
import { 
  BarChart3, 
  Users, 
  Calendar, 
  FileText, 
  Bell, 
  Shield, 
  Smartphone,
  Target 
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "Track player progress with detailed statistics, video analysis, and AI-powered insights.",
    color: "text-primary",
  },
  {
    icon: Users,
    title: "Team Management",
    description: "Manage rosters, group players by skill level, and organize squads effortlessly.",
    color: "text-primary",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Schedule training sessions, matches, and events with automated conflict detection.",
    color: "text-teal",
  },
  {
    icon: FileText,
    title: "Progress Reports",
    description: "Generate comprehensive reports for parents with visual progress tracking.",
    color: "text-coral",
  },
  {
    icon: Bell,
    title: "Real-time Notifications",
    description: "Keep everyone informed with instant updates on schedules, results, and announcements.",
    color: "text-primary",
  },
  {
    icon: Shield,
    title: "Role-based Access",
    description: "Secure access control for admins, coaches, parents, and students.",
    color: "text-primary",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Access everything on the go with our responsive design and native app experience.",
    color: "text-teal",
  },
  {
    icon: Target,
    title: "Goal Tracking",
    description: "Set individual and team goals, track achievements, and celebrate milestones.",
    color: "text-coral",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="feature-tag bg-accent/20 text-accent-foreground border-accent/30 mb-4">
            Features
          </span>
          <h2 className="font-display text-5xl md:text-6xl text-foreground mb-4 tracking-wide">
            EVERYTHING YOU NEED TO RUN A WORLD-CLASS ACADEMY
          </h2>
          <p className="text-lg text-muted-foreground">
            From player development to parent communication, AceTrack has every tool 
            you need to manage your football academy.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/20 transition-all duration-300"
            >
              <feature.icon className={`w-7 h-7 ${feature.color} mb-4`} />
              <h3 className="font-semibold text-lg text-card-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
