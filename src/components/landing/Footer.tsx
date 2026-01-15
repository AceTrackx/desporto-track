import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-display text-2xl">D</span>
              </div>
              <span className="font-display text-2xl tracking-wide text-background">
                DESPORTO TRACK
              </span>
            </Link>
            <p className="text-background/70 mb-6">
              The complete tracking platform for Desporto Sports Academy. Excellence in Football, Basketball, and Skating.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Sports Programs */}
          <div>
            <h4 className="font-display text-xl tracking-wide mb-4">SPORTS PROGRAMS</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-background/70">
                <span>⚽</span> Football Academy
              </li>
              <li className="flex items-center gap-2 text-background/70">
                <span>🏀</span> Basketball Academy
              </li>
              <li className="flex items-center gap-2 text-background/70">
                <span>⛸️</span> Skating Academy
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xl tracking-wide mb-4">QUICK LINKS</h4>
            <ul className="space-y-3">
              <li><Link to="/auth" className="text-background/70 hover:text-accent transition-colors">Sign In</Link></li>
              <li><Link to="/auth?signup=true" className="text-background/70 hover:text-accent transition-colors">Register</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xl tracking-wide mb-4">CONTACT</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent mt-0.5" />
                <span className="text-background/70">info@desporto.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent mt-0.5" />
                <span className="text-background/70">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-0.5" />
                <span className="text-background/70">Desporto Sports Complex, Main Arena</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 mt-12 pt-8 text-center text-background/50">
          <p>&copy; {new Date().getFullYear()} Desporto Track. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
