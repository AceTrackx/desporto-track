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
                <span className="text-accent-foreground font-display text-2xl">A</span>
              </div>
              <span className="font-display text-3xl tracking-wide text-background">
                ACETRACK
              </span>
            </Link>
            <p className="text-background/70 mb-6">
              The complete platform for football academy management and player development.
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

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xl tracking-wide mb-4">QUICK LINKS</h4>
            <ul className="space-y-3">
              <li><Link to="/features" className="text-background/70 hover:text-accent transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="text-background/70 hover:text-accent transition-colors">Pricing</Link></li>
              <li><Link to="/about" className="text-background/70 hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="text-background/70 hover:text-accent transition-colors">Blog</Link></li>
              <li><Link to="/careers" className="text-background/70 hover:text-accent transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display text-xl tracking-wide mb-4">SUPPORT</h4>
            <ul className="space-y-3">
              <li><Link to="/help" className="text-background/70 hover:text-accent transition-colors">Help Center</Link></li>
              <li><Link to="/docs" className="text-background/70 hover:text-accent transition-colors">Documentation</Link></li>
              <li><Link to="/contact" className="text-background/70 hover:text-accent transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="text-background/70 hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-background/70 hover:text-accent transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xl tracking-wide mb-4">CONTACT</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent mt-0.5" />
                <span className="text-background/70">hello@acetrack.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent mt-0.5" />
                <span className="text-background/70">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-0.5" />
                <span className="text-background/70">123 Sports Avenue, London, UK</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 mt-12 pt-8 text-center text-background/50">
          <p>&copy; {new Date().getFullYear()} AceTrack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
