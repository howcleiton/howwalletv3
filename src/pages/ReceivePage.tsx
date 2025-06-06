
import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useWalletStore } from '@/store/walletStore';
import MobileLayout from '@/components/layout/MobileLayout';
import SectionHeader from '@/components/ui/section-header'; // Assuming this is styled
import { CopyIcon, CheckIcon, AlertTriangle } from 'lucide-react'; // Added AlertTriangle
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label'; // Import Label
import { Button } from '@/components/ui/button'; // Import Button for copy
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const ReceivePage = () => {
  const { currentWallet } = useWalletStore();
  const [copied, setCopied] = useState(false);
  const [selectedTokenSymbol, setSelectedTokenSymbol] = useState(
    currentWallet?.tokens[0]?.symbol || '' // Default to first token
  );
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentWallet) {
      navigate('/'); // Redirect if no wallet
    }
    // Ensure a token is selected if the default one isn't valid
    if (currentWallet && !currentWallet.tokens.find(t => t.symbol === selectedTokenSymbol)) {
      setSelectedTokenSymbol(currentWallet.tokens[0]?.symbol || '');
    }
  }, [currentWallet, navigate, selectedTokenSymbol]);

  if (!currentWallet) return null;

  const copyAddress = () => {
    navigator.clipboard.writeText(currentWallet.address);
    setCopied(true);
    toast({ title: "Address Copied!", description: currentWallet.address });
    setTimeout(() => setCopied(false), 2500);
  };

  const selectedToken = currentWallet.tokens.find(t => t.symbol === selectedTokenSymbol);

  return (
    <MobileLayout>
      <SectionHeader title="Receive Crypto" showBackButton />
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="p-4 flex flex-col items-center flex-grow"
      >
        {/* Token Select */}
        <div className="w-full max-w-xs mb-6">
          <Label htmlFor="token-select-receive" className="mb-2 block text-center text-sm text-muted-foreground">Select Token to Receive</Label>
          <Select value={selectedTokenSymbol} onValueChange={setSelectedTokenSymbol}>
            <SelectTrigger id="token-select-receive" className="w-full">
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
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* QR Code */}
        <div className="p-3 bg-white rounded-2xl mb-4 shadow-md inline-block"> {/* White background for QR */}
          <QRCodeSVG
            value={currentWallet.address} // QR code should contain the address
            size={180} // Adjusted size
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"Q"} // Quality level
            includeMargin={false}
          />
        </div>

        {/* Address Display and Copy Button */}
        <div className="w-full max-w-sm mb-6 text-center">
          <p className="text-muted-foreground text-sm mb-2">
            Your {selectedTokenSymbol || 'Wallet'} Address
          </p>
          <div className="flex items-center gap-2 bg-secondary p-2 rounded-xl">
            <p className="font-mono text-sm text-foreground truncate flex-grow text-left pl-2">{currentWallet.address}</p>
            <Button
              variant="ghost" 
              size="icon"
              onClick={copyAddress}
              className="flex-shrink-0 h-8 w-8"
              aria-label="Copy address"
            >
              {copied ? (
                <CheckIcon className="w-4 h-4 text-green-500" />
              ) : (
                <CopyIcon className="w-4 h-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>

        {/* Warning Box */}
        <div className="w-full max-w-sm mt-auto bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 text-xs text-yellow-700 dark:text-yellow-300 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-yellow-600 dark:text-yellow-400" />
          <p>
            Only send <span className="font-semibold">{selectedTokenSymbol || 'compatible assets'}</span> to this address. Sending other assets may result in permanent loss.
          </p>
        </div>
      </motion.div>
    </MobileLayout>
  );
};

export default ReceivePage;
