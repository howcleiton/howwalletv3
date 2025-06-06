
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWalletStore } from '@/store/walletStore';
import MobileLayout from '@/components/layout/MobileLayout';
import SectionHeader from '@/components/ui/section-header'; // Assuming this is styled
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label'; // Import Label
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'; // Assuming Tabs are styled
import { motion } from 'framer-motion';
import { Loader2, AlertCircle } from 'lucide-react'; // Added AlertCircle
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const ImportWalletPage = () => {
  const { importWallet, isWalletLoading } = useWalletStore();
  const [walletName, setWalletName] = useState('Imported Wallet');
  const [seedPhrase, setSeedPhrase] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [activeTab, setActiveTab] = useState('seed');
  const [validationError, setValidationError] = useState('');

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Clear errors when tab changes
    setValidationError('');
  }, [activeTab]);

  const validateForm = () => {
    if (!walletName.trim()) {
      setValidationError('Please enter a name for your wallet.');
      return false;
    }

    if (activeTab === 'seed') {
      const words = seedPhrase.trim().split(/\s+/);
      // Basic validation: check for 12 or 24 words
      if (words.length !== 12 && words.length !== 24) {
        setValidationError('Recovery phrase must contain exactly 12 or 24 words.');
        return false;
      }
      // Check for empty words
      if (words.some(word => !word)) {
          setValidationError('Recovery phrase contains empty words. Please check your input.');
          return false;
      }
    } else { // Private Key validation
      // Basic validation: check if not empty and has a reasonable length
      if (!privateKey.trim() || privateKey.length < 40) { // Example length, adjust if needed
        setValidationError('Please enter a valid private key.');
        return false;
      }
    }

    setValidationError('');
    return true;
  };

  const handleImport = async () => {
    if (!validateForm()) return;

    try {
      const importData = activeTab === 'seed' ? seedPhrase.trim().split(/\s+/) : privateKey.trim();
      await importWallet(importData, walletName);

      toast({
        title: 'Wallet Imported Successfully!',
        description: `Wallet "${walletName}" is ready.`,
      });

      navigate('/'); // Navigate to main wallet page on success
    } catch (error) {
      console.error("Wallet import error:", error);
      setValidationError(error instanceof Error ? error.message : 'Failed to import wallet. Please check your input.');
      toast({
        title: 'Import Failed',
        description: error instanceof Error ? error.message : 'Please check your recovery phrase or private key.',
        variant: 'destructive',
      });
    }
  };

  return (
    <MobileLayout>
      <SectionHeader title="Import Wallet" showBackButton />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="p-4 flex flex-col flex-grow"
      >
        <div className="w-full max-w-md mx-auto flex flex-col flex-grow">
          {/* Wallet Name Input */}
          <div className="mb-5">
            <Label htmlFor="importWalletName" className="mb-2 block">Wallet Name</Label>
            <Input
              id="importWalletName"
              value={walletName}
              onChange={(e) => setWalletName(e.target.value)}
              placeholder="e.g., My Imported Wallet"
              disabled={isWalletLoading}
            />
          </div>

          {/* Tabs for Seed/Key */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-5">
            {/* Assuming TabsList/TabsTrigger are styled via ui components */}
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="seed">Recovery Phrase</TabsTrigger>
              <TabsTrigger value="key">Private Key</TabsTrigger>
            </TabsList>

            {/* Recovery Phrase Input */}
            <TabsContent value="seed" className="mt-4">
              <Label htmlFor="seedPhrase" className="mb-2 block">
                Enter 12 or 24 word phrase
              </Label>
              <Textarea
                id="seedPhrase"
                value={seedPhrase}
                onChange={(e) => setSeedPhrase(e.target.value)}
                placeholder="Enter words separated by single spaces..."
                className="min-h-[100px]" // Adjusted height
                disabled={isWalletLoading}
                rows={4}
              />
              <p className="text-xs text-muted-foreground mt-1.5">
                Ensure words are spelled correctly and separated by single spaces.
              </p>
            </TabsContent>

            {/* Private Key Input */}
            <TabsContent value="key" className="mt-4">
              <Label htmlFor="privateKey" className="mb-2 block">
                Enter private key
              </Label>
              <Input
                id="privateKey"
                type="password" // Use password type for masking
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                placeholder="Enter your private key string"
                className="font-mono" // Keep mono for keys
                disabled={isWalletLoading}
              />
            </TabsContent>
          </Tabs>

          {/* Validation Error Display */}
          {validationError && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 text-sm text-red-600 dark:text-red-400 p-3 rounded-lg bg-red-500/10 flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{validationError}</span>
            </motion.div>
          )}

          {/* Import Button - Pushed to bottom */}
          <div className="mt-auto pt-4">
            <Button
              onClick={handleImport}
              className="w-full"
              size="lg"
              disabled={isWalletLoading || (activeTab === 'seed' && !seedPhrase.trim()) || (activeTab === 'key' && !privateKey.trim()) || !walletName.trim()}
            >
              {isWalletLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Importing...
                </>
              ) : (
                'Import Wallet'
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </MobileLayout>
  );
};

export default ImportWalletPage;
