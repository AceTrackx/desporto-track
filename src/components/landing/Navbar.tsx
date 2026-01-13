import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display text-2xl">A</span>
            </div>
            <span className="font-display text-3xl tracking-wide text-foreground">
              ACETRACK
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <button className="flex items-center gap-1 text-foreground/80 hover:text-primary transition-colors font-medium">
              Features <ChevronDown className="w-4 h-4" />
            </button>
            <Link to="/pricing" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Pricing
            </Link>
            <Link to="/about" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              About
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/auth">Log In</Link>
            </Button>
            <Button variant="accent" asChild>
              <Link to="/auth?signup=true">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-card border-t border-border"
        >
          <div className="container mx-auto px-4 py-6 space-y-4">
            <Link to="/" className="block py-2 text-foreground/80 hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link to="/features" className="block py-2 text-foreground/80 hover:text-primary transition-colors font-medium">
              Features
            </Link>
            <Link to="/pricing" className="block py-2 text-foreground/80 hover:text-primary transition-colors font-medium">
              Pricing
            </Link>
            <Link to="/about" className="block py-2 text-foreground/80 hover:text-primary transition-colors font-medium">
              About
            </Link>
            <div className="pt-4 flex flex-col gap-3">
              <Button variant="outline" asChild className="w-full">
                <Link to="/auth">Log In</Link>
              </Button>
              <Button variant="accent" asChild className="w-full">
                <Link to="/auth?signup=true">Get Started</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
