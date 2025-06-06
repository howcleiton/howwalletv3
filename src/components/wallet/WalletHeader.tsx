
import { useState } from "react";
import { useWalletStore } from "@/store/walletStore";
import { formatAddress, formatUSD } from "@/lib/utils";
import { CopyIcon, CheckIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const WalletHeader = () => {
  const { currentWallet } = useWalletStore();
  const [copied, setCopied] = useState(false);

  if (!currentWallet) return null;

  // Calculate total wallet value
  const totalValue = currentWallet.tokens.reduce(
    (acc, token) => acc + token.usdValue,
    0
  );

  const copyAddress = () => {
    if (currentWallet.address) {
      navigator.clipboard.writeText(currentWallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="p-4 pt-6 pb-4 flex flex-col items-center"> {/* Increased top padding, centered items */}
      {/* Wallet Name, Address, Network - Kept for context, styled subtly */}
      <div className="flex justify-between items-center w-full mb-1">
        <h1 className="text-sm font-medium text-muted-foreground">{currentWallet.name}</h1>
        <div className="px-2 py-0.5 rounded-full bg-secondary text-xs text-secondary-foreground font-medium">
          {currentWallet.network === "mainnet" ? "Mainnet" : "Devnet"}
        </div>
      </div>
      <div className="flex items-center gap-1 mb-5"> {/* Address below name, increased bottom margin */}
        <p className="text-xs text-muted-foreground">{formatAddress(currentWallet.address, 4)}</p>
        <button
          onClick={copyAddress}
          className="p-0.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-150"
          aria-label="Copy address"
        >
          {copied ? (
            <CheckIcon className="w-3 h-3 text-green-500" />
          ) : (
            <CopyIcon className="w-3 h-3" />
          )}
        </button>
      </div>

      {/* Total Balance Display - Directly on background, centered */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { delay: 0.1, duration: 0.4, ease: "easeOut" },
        }}
        className="text-center" // Removed card background, centered text
      >
        <p className="text-sm text-muted-foreground mb-0.5">Total balance</p> {/* Adjusted text size/color/margin */}
        <h2 className="text-5xl font-bold text-foreground">
          {/* Increased font size significantly */}
          {formatUSD(totalValue)}
        </h2>
      </motion.div>
    </div>
  );
};

export default WalletHeader;

