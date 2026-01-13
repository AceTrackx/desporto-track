import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "14-day free trial",
  "No credit card required",
  "Cancel anytime",
  "Full feature access",
];

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient dashed-pattern" />
      
      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="font-display text-5xl md:text-7xl text-white mb-6 tracking-wide">
            READY TO TRANSFORM YOUR ACADEMY?
          </h2>
          
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of football academies already using AceTrack to develop 
            the next generation of champions.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="xl" asChild>
              <Link to="/auth?signup=true">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/contact">Contact Sales</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
