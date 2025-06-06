
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useWalletStore } from '@/store/walletStore';
import MobileLayout from '@/components/layout/MobileLayout';
import SectionHeader from '@/components/ui/section-header'; // Assuming this is styled correctly or needs styling
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label'; // Import Label
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Assuming Select is styled correctly or needs styling
import { formatAddress, formatAmount, formatUSD } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle } from 'lucide-react'; // Added AlertCircle for errors
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const SendPage = () => {
  const { currentWallet, sendToken, isWalletLoading } = useWalletStore();
  const [searchParams] = useSearchParams();
  const defaultTokenSymbol = searchParams.get('token') || (currentWallet?.tokens[0]?.symbol || ''); // Default to first token if available
  const navigate = useNavigate();
  const { toast } = useToast();

  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedTokenSymbol, setSelectedTokenSymbol] = useState(defaultTokenSymbol);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (!currentWallet) {
      navigate('/'); // Redirect if no wallet
    }
    // Ensure a token is selected if the default one isn't valid
    if (currentWallet && !currentWallet.tokens.find(t => t.symbol === selectedTokenSymbol)) {
      setSelectedTokenSymbol(currentWallet.tokens[0]?.symbol || '');
    }
  }, [currentWallet, navigate, selectedTokenSymbol]);

  if (!currentWallet) return null; // Render nothing if no wallet (should be redirected)

  const selectedToken = currentWallet.tokens.find(t => t.symbol === selectedTokenSymbol);
  const maxAmount = selectedToken?.balance || 0;
  const usdValue = selectedToken ? parseFloat(amount.replace(/,/g, '') || '0') * selectedToken.priceUsd : 0;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and one decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const validateForm = () => {
    // Basic address validation (length check)
    if (!recipient.trim() || recipient.length < 32) { // Example length, adjust for Solana
      setValidationError('Please enter a valid recipient address.');
      return false;
    }
    if (!selectedTokenSymbol) {
      setValidationError('Please select a token to send.');
      return false;
    }
    const numericAmount = parseFloat(amount.replace(/,/g, '') || '0');
    if (numericAmount <= 0) {
      setValidationError('Please enter an amount greater than zero.');
      return false;
    }
    if (numericAmount > maxAmount) {
      setValidationError(`Insufficient balance. Max: ${formatAmount(maxAmount)} ${selectedTokenSymbol}`);
      return false;
    }
    setValidationError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !selectedToken) return;

    setIsSubmitting(true);
    try {
      await sendToken(selectedToken.symbol, parseFloat(amount.replace(/,/g, '')), recipient);
      toast({
        title: "Transaction Sent Successfully",
        description: `Sent ${amount} ${selectedToken.symbol} to ${formatAddress(recipient)}.`,
        // Consider adding a success variant style
      });
      navigate('/'); // Navigate back to wallet page on success
    } catch (error) {
      console.error("Send transaction error:", error);
      toast({
        title: "Transaction Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MobileLayout>
      {/* Assuming SectionHeader is styled appropriately */}
      <SectionHeader title="Send Crypto" showBackButton /> 
      
      <form onSubmit={handleSubmit} className="p-4 flex flex-col flex-grow">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="space-y-5 flex-grow" // Increased spacing
        >
          {/* Recipient Address Input */}
          <div>
            <Label htmlFor="recipient" className="mb-2 block">Recipient Address</Label>
            <Input
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Enter wallet address"
              disabled={isSubmitting}
              autoComplete="off"
            />
          </div>

          {/* Token Select */}
          <div>
            <Label htmlFor="token-select" className="mb-2 block">Token</Label>
            <Select
              value={selectedTokenSymbol}
              onValueChange={setSelectedTokenSymbol}
              disabled={isSubmitting}
            >
              {/* Assuming SelectTrigger/SelectContent are styled via ui components */}
              <SelectTrigger id="token-select" className="w-full">
                <SelectValue placeholder="Select a token" />
              </SelectTrigger>
              <SelectContent>
                {currentWallet.tokens.map(token => (
                  <SelectItem key={token.id} value={token.symbol}>
                    <div className="flex items-center gap-2">
                      <img
                        src={token.iconUrl} // Assuming iconUrl is available
                        alt={token.name}
                        className="w-5 h-5 rounded-full"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/icons/default-token.png'; }}
                      />
                      <span>{token.symbol}</span>
                      <span className="ml-auto text-muted-foreground text-xs">
                        Bal: {formatAmount(token.balance)}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount Input */}
          <div>
             <div className="flex justify-between items-center mb-2">
                <Label htmlFor="amount">Amount</Label>
                {selectedToken && (
                  <button
                    type="button"
                    onClick={() => setAmount(maxAmount.toString())}
                    className="text-xs font-medium text-primary hover:underline disabled:opacity-50 disabled:no-underline"
                    disabled={isSubmitting || maxAmount <= 0}
                  >
                    Use Max: {formatAmount(maxAmount)}
                  </button>
                )}
              </div>
            <Input
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              placeholder="0.00"
              type="text" // Use text to allow decimal formatting
              inputMode="decimal"
              disabled={isSubmitting || !selectedTokenSymbol}
              autoComplete="off"
            />
            {selectedToken && amount && (
              <p className="text-xs text-muted-foreground mt-1.5">
                ≈ {formatUSD(usdValue)}
              </p>
            )}
          </div>
        </motion.div>

        {/* Validation Error Display */}
        {validationError && (
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 mb-2 text-sm text-red-600 dark:text-red-400 p-3 rounded-lg bg-red-500/10 flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{validationError}</span>
          </motion.div>
        )}
        
        {/* Submit Button */}
        <motion.div 
          className="mt-auto pt-4" // Push button to bottom
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3, ease: 'easeOut' }}
        >
          <Button
            type="submit"
            className="w-full"
            size="lg" // Use large button size
            disabled={isSubmitting || isWalletLoading || !recipient || !amount || !selectedTokenSymbol}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Sending...
              </>
            ) : (
              'Review Send' // Changed text to match reference image
            )}
          </Button>
        </motion.div>
      </form>
    </MobileLayout>
  );
};

export default SendPage;
