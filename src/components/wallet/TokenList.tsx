
import { useWalletStore } from '@/store/walletStore';
import TokenCard from './TokenCard';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const TokenList = () => {
  const { currentWallet } = useWalletStore();

  if (!currentWallet || currentWallet.tokens.length === 0) return null; // Return null if no wallet or no tokens

  return (
    <div className="p-4 pt-0"> {/* Adjusted padding */}
      <motion.h2 
        initial={{ opacity: 0, x: -10 }}
        animate={{ 
          opacity: 1, 
          x: 0,
          transition: { delay: 0.15, duration: 0.3, ease: "easeOut" } // Added delay
        }}
        className={cn(
          "text-base font-medium text-muted-foreground mb-3" // Adjusted style: size, weight, color, margin
        )}
      >
        Tokens
      </motion.h2>
      {/* Container for the list, no extra div needed if TokenCard handles its motion */}
      {
        currentWallet.tokens.map((token, index) => (
          <TokenCard key={token.id} token={token} index={index} />
        ))
      }
    </div>
  );
};

export default TokenList;
