
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWalletStore } from '@/store/walletStore';
import MobileLayout from '@/components/layout/MobileLayout';
import SectionHeader from '@/components/ui/section-header'; // Assuming this is styled
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label'; // Import Label
import { CopyIcon, CheckIcon, AlertTriangle, Loader2 } from 'lucide-react'; // Added Loader2
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const CreateWalletPage = () => {
  const { createWallet, isWalletLoading } = useWalletStore();
  const [walletName, setWalletName] = useState('My Wallet');
  const [newWallet, setNewWallet] = useState<{ seedPhrase: string[], address: string } | null>(null);
  const [copiedPhrase, setCopiedPhrase] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Reset state when component mounts
    setNewWallet(null);
    setCopiedPhrase(false);
    setCopiedAddress(false);
  }, []);

  const handleCreate = async () => {
    if (!walletName.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a name for your wallet.",
        variant: "destructive",
      });
      return;
    }
    try {
      const wallet = await createWallet(walletName);
      setNewWallet({
        seedPhrase: wallet.seedPhrase || [],
        address: wallet.address
      });
      toast({
        title: "Wallet Created Successfully!",
        description: "Please back up your recovery phrase securely.",
      });
    } catch (error) {
      console.error("Wallet creation error:", error);
      toast({
        title: "Wallet Creation Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      });
    }
  };

  const copySeedPhrase = () => {
    if (newWallet?.seedPhrase) {
      navigator.clipboard.writeText(newWallet.seedPhrase.join(' '));
      setCopiedPhrase(true);
      toast({ title: "Recovery Phrase Copied!" });
      setTimeout(() => setCopiedPhrase(false), 2500);
    }
  };

  const copyAddress = () => {
    if (newWallet?.address) {
      navigator.clipboard.writeText(newWallet.address);
      setCopiedAddress(true);
      toast({ title: "Address Copied!" });
      setTimeout(() => setCopiedAddress(false), 2500);
    }
  };

  const goToWallet = () => {
    // Ideally, ensure the user acknowledges saving the phrase
    // For now, just navigate
    navigate('/');
  };

  return (
    <MobileLayout>
      <SectionHeader title={newWallet ? "Backup Phrase" : "Create Wallet"} showBackButton />

      <div className="p-4 flex flex-col flex-grow">
        {!newWallet ? (
          // Step 1: Enter Wallet Name
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col justify-center items-center flex-grow text-center"
          >
            <div className="w-full max-w-sm mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Name Your Wallet
              </h2>
              <Label htmlFor="walletName" className="sr-only">Wallet Name</Label>
              <Input
                id="walletName"
                value={walletName}
                onChange={(e) => setWalletName(e.target.value)}
                placeholder="e.g., My Main Wallet"
                className="text-center mb-4"
                autoFocus
              />
              <Button
                onClick={handleCreate}
                className="w-full"
                size="lg"
                disabled={isWalletLoading || !walletName.trim()}
              >
                {isWalletLoading ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Creating...</>
                ) : (
                  'Create Wallet'
                )}
              </Button>
            </div>
            <div className="text-xs text-muted-foreground max-w-xs">
              <p className="mb-1 font-medium">Creating a wallet generates:</p>
              <ul className="list-disc list-inside text-left space-y-0.5">
                <li>A unique Solana address</li>
                <li>A 12-word recovery phrase</li>
              </ul>
              <p className="mt-2">Keep your recovery phrase safe!</p>
            </div>
          </motion.div>
        ) : (
          // Step 2: Backup Recovery Phrase
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col flex-grow"
          >
            {/* Warning Box */}
            <div className="mb-5 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 text-xs text-yellow-700 dark:text-yellow-300 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-yellow-600 dark:text-yellow-400" />
              <p>
                <span className="font-semibold">Critical:</span> Write down this 12-word phrase in order and store it securely offline. This is the only way to recover your wallet.
              </p>
            </div>

            {/* Seed Phrase Grid */}
            <div className="grid grid-cols-3 gap-2.5 mb-5">
              {newWallet.seedPhrase.map((word, index) => (
                <div
                  key={index}
                  className="p-2.5 bg-secondary rounded-lg text-center text-sm"
                >
                  <span className="text-xs text-muted-foreground mr-1">{index + 1}.</span>
                  <span className="font-medium text-foreground">{word}</span>
                </div>
              ))}
            </div>

            {/* Copy Phrase Button */}
            <Button
              variant="secondary"
              className="w-full mb-6"
              onClick={copySeedPhrase}
            >
              {copiedPhrase ? (
                <><CheckIcon className="w-4 h-4 mr-2 text-green-500" />Copied Phrase</>
              ) : (
                <><CopyIcon className="w-4 h-4 mr-2" />Copy Phrase</>
              )}
            </Button>

            {/* Address Display */}
            <div className="mb-6">
              <Label className="block text-xs text-muted-foreground mb-1.5">Your New Wallet Address</Label>
              <div className="flex items-center gap-2 bg-secondary p-2 rounded-xl">
                <p className="font-mono text-sm text-foreground truncate flex-grow text-left pl-2">{newWallet.address}</p>
                <Button
                  variant="ghost" 
                  size="icon"
                  onClick={copyAddress}
                  className="flex-shrink-0 h-8 w-8"
                  aria-label="Copy address"
                >
                  {copiedAddress ? (
                    <CheckIcon className="w-4 h-4 text-green-500" />
                  ) : (
                    <CopyIcon className="w-4 h-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {/* Confirmation Button */}
            <div className="mt-auto pt-4">
              <Button
                onClick={goToWallet}
                className="w-full"
                size="lg"
              >
                I've Saved My Recovery Phrase
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </MobileLayout>
  );
};

export default CreateWalletPage;
