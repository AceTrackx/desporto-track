import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play, Users, TrendingUp, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient dashed-pattern" />
      
      {/* Field Lines Pattern */}
      <div className="absolute inset-0 field-pattern opacity-50" />
      
      {/* Content */}
      <div className="relative container mx-auto px-4 pt-16 lg:pt-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-10rem)]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
            >
              <Trophy className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Trusted by 500+ Academies</span>
            </motion.div>

            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-wide mb-6">
              TRAIN
              <br />
              SMARTER,
              <br />
              <span className="text-lime">PLAY</span>
              <br />
              <span className="text-lime">BETTER.</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-lg mb-8 leading-relaxed">
              The complete platform for football academy management. Track performance, 
              analyze progress, and develop champions with real-time insights.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/auth?signup=true">
                  Start Free Trial <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="lg">
                <Play className="w-5 h-5" /> Watch Demo
              </Button>
            </div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/20"
            >
              <div>
                <div className="font-display text-4xl text-lime">500+</div>
                <div className="text-white/70 text-sm">Academies</div>
              </div>
              <div>
                <div className="font-display text-4xl text-lime">50K+</div>
                <div className="text-white/70 text-sm">Athletes</div>
              </div>
              <div>
                <div className="font-display text-4xl text-lime">1M+</div>
                <div className="text-white/70 text-sm">Sessions Tracked</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Floating Cards */}
            <div className="relative">
              {/* Main Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="bg-card rounded-3xl border border-border p-6 max-w-sm ml-auto"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-card-foreground">Team Overview</div>
                    <div className="text-sm text-muted-foreground">U-17 Squad</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-muted rounded-xl p-3 text-center">
                    <div className="font-display text-2xl text-primary">24</div>
                    <div className="text-xs text-muted-foreground">Players</div>
                  </div>
                  <div className="bg-muted rounded-xl p-3 text-center">
                    <div className="font-display text-2xl text-primary">89%</div>
                    <div className="text-xs text-muted-foreground">Attendance</div>
                  </div>
                  <div className="bg-muted rounded-xl p-3 text-center">
                    <div className="font-display text-2xl text-accent">A+</div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Stats Card */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -left-10 top-20 bg-card rounded-2xl border border-border p-4 w-48"
              >
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium">Performance</span>
                </div>
                <div className="font-display text-3xl text-primary">+23%</div>
                <div className="text-xs text-muted-foreground">This month</div>
              </motion.div>

              {/* Player Card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute right-0 -bottom-10 bg-accent rounded-2xl p-4 w-40"
              >
                <div className="text-accent-foreground">
                  <div className="font-display text-lg">NEXT SESSION</div>
                  <div className="font-bold text-2xl">06:00 PM</div>
                  <div className="text-sm opacity-80">Training Ground</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
