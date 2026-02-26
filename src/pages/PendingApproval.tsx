import { motion } from "framer-motion";
import { Clock, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const PendingApproval = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center space-y-6"
      >
        <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
          <Clock className="w-10 h-10 text-accent-foreground" />
        </div>
        <h1 className="font-display text-4xl text-foreground tracking-wide">
          PENDING APPROVAL
        </h1>
        <p className="text-muted-foreground text-lg">
          Your account has been created successfully. An administrator will review and approve your registration shortly.
        </p>
        <p className="text-sm text-muted-foreground">
          You'll be assigned to a ground and can start using the platform once approved. Please check back later.
        </p>
        <Button variant="outline" onClick={handleSignOut} className="mt-4">
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </motion.div>
    </div>
  );
};

export default PendingApproval;
