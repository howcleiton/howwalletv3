
import { Link } from "react-router-dom";
import { Token } from "@/types";
import { formatAmount, formatUSD } from "@/lib/utils";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TokenCardProps {
  token: Token;
  index: number;
}

const TokenCard = ({ token, index }: TokenCardProps) => {
  const iconUrl = `https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/${token.mintAddress}/logo.png`;
  const fallbackIcon = "/icons/default-token.png"; // Ensure this path is correct in your public folder

  return (
    <Link to={`/token/${token.id}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { delay: (index + 3) * 0.05, duration: 0.3, ease: "easeOut" },
        }}
        whileHover={{ backgroundColor: "hsl(var(--secondary))" }} // Use secondary background for hover
        transition={{ duration: 0.15 }}
        className={cn(
          "flex items-center justify-between p-3 rounded-xl transition-colors duration-200",
          // Adjusted padding (p-3), increased rounding (rounded-xl)
          // Removed explicit background, relies on parent or default
        )}
      >
        <div className="flex items-center overflow-hidden mr-3"> {/* Adjusted margin */}
          {/* Icon styling based on reference */}
          <div className="w-10 h-10 rounded-full bg-muted mr-3 flex-shrink-0 flex items-center justify-center overflow-hidden shadow-sm">
            <img
              src={iconUrl}
              alt={`${token.name} logo`}
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src !== fallbackIcon) {
                  target.src = fallbackIcon;
                }
              }}
            />
          </div>

          <div className="overflow-hidden"> {/* Ensure text doesn't overflow */}
            <h3 className="font-medium text-foreground truncate text-base">{token.name}</h3> {/* Adjusted size */}
            <p className="text-sm text-muted-foreground">{token.symbol}</p>
          </div>
        </div>

        <div className="text-right flex-shrink-0 ml-3"> {/* Adjusted margin */}
          <p className="font-medium text-foreground text-base">
            {/* Adjusted size */}
            {formatAmount(token.balance)} {/* Removed symbol, it's below */}
          </p>
          <p className="text-sm text-muted-foreground">{formatUSD(token.usdValue)}</p>
        </div>
      </motion.div>
    </Link>
  );
};

export default TokenCard;

