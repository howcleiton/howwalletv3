
import { Link } from 'react-router-dom';
// Updated icons based on reference images (using Lucide for consistency)
import { ArrowUpRight, ArrowDownLeft, CreditCard } from 'lucide-react'; 
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Using appropriate Lucide icons that resemble the reference
const SendIcon = ArrowUpRight;
const ReceiveIcon = ArrowDownLeft; 
const BuyIcon = CreditCard;

const ActionButton = ({ 
  icon: Icon, 
  label, 
  to, 
  external,
  delay 
}: { 
  icon: React.ElementType; 
  label: string;
  to: string;
  external?: boolean;
  delay: number;
}) => {
  const ButtonContent = (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { delay: delay * 0.1, duration: 0.3, ease: "easeOut" } 
      }}
      whileHover={{ scale: 1.03, transition: { duration: 0.15 } }}
      whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
      className={cn(
        "flex flex-col items-center justify-center p-4 rounded-2xl transition-colors duration-200", // Increased rounding
        "bg-secondary hover:bg-secondary/80", // Use theme colors
      )}
    >
      {/* Icon background matching reference */}
      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-3 shadow-md">
        <Icon className="w-6 h-6 text-primary-foreground" /> {/* Adjusted size and color */}
      </div>
      <span className="text-sm font-medium text-foreground/90">{label}</span> {/* Adjusted text color/weight */}
    </motion.div>
  );

  if (external) {
    return (
      <a 
        href={to} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex-1"
      >
        {ButtonContent}
      </a>
    );
  }

  return (
    <Link to={to} className="flex-1">
      {ButtonContent}
    </Link>
  );
};

const ActionButtons = () => {
  return (
    <div className="p-4 pt-2"> {/* Adjusted padding */}
      <div className="flex gap-4"> {/* Increased gap */}
        <ActionButton 
          icon={SendIcon} 
          label="Send" 
          to="/send"
          delay={0}
        />
        <ActionButton 
          icon={ReceiveIcon} 
          label="Receive" 
          to="/receive"
          delay={1}
        />
        <ActionButton 
          icon={BuyIcon} 
          label="Buy" 
          // Using a placeholder link, assuming this might open a modal or external service
          to="#" // Changed to # as it's likely not a direct page navigation
          delay={2}
        />
      </div>
    </div>
  );
};

export default ActionButtons;
