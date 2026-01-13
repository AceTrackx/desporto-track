import { motion } from "framer-motion";
import { GraduationCap, UserCircle, Trophy, Settings, Crown } from "lucide-react";

const roles = [
  {
    icon: GraduationCap,
    title: "Students",
    description: "View training schedules, track personal progress, access skill assessments, and see upcoming matches.",
    features: ["Personal dashboard", "Progress tracking", "Session history", "Goal achievements"],
    gradient: "from-primary to-teal",
  },
  {
    icon: UserCircle,
    title: "Parents",
    description: "Monitor your child's development, view attendance, receive updates, and communicate with coaches.",
    features: ["Child progress reports", "Attendance tracking", "Payment management", "Coach messaging"],
    gradient: "from-teal to-accent",
  },
  {
    icon: Trophy,
    title: "Coaches",
    description: "Plan sessions, evaluate players, record attendance, and manage team activities efficiently.",
    features: ["Session planning", "Player evaluation", "Attendance management", "Performance notes"],
    gradient: "from-accent to-lime-dark",
  },
  {
    icon: Settings,
    title: "Admin",
    description: "Manage academy operations, oversee finances, handle enrollments, and generate reports.",
    features: ["User management", "Financial overview", "Enrollment handling", "Report generation"],
    gradient: "from-coral to-primary",
  },
  {
    icon: Crown,
    title: "Super Admin",
    description: "Full system control with multi-academy management, global settings, and complete oversight.",
    features: ["Multi-academy view", "System configuration", "Global analytics", "Full access control"],
    gradient: "from-primary to-emerald-dark",
  },
];

const Roles = () => {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="feature-tag bg-primary/10 text-primary border-primary/20 mb-4">
            User Roles
          </span>
          <h2 className="font-display text-5xl md:text-6xl text-foreground mb-4 tracking-wide">
            TAILORED FOR EVERYONE
          </h2>
          <p className="text-lg text-muted-foreground">
            Each user gets a personalized experience designed for their specific needs within the academy.
          </p>
        </motion.div>

        {/* Roles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role, index) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden bg-card rounded-3xl p-8 shadow-soft border border-border hover:shadow-card transition-all duration-300 ${
                index === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Gradient Accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${role.gradient}`} />
              
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${role.gradient} flex items-center justify-center mb-6`}>
                <role.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="font-display text-3xl text-card-foreground mb-3 tracking-wide">
                {role.title.toUpperCase()}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {role.description}
              </p>
              
              <ul className="space-y-2">
                {role.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-card-foreground">
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${role.gradient}`} />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roles;
