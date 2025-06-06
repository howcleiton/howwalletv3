
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWalletStore } from '@/store/walletStore';
import MobileLayout from '@/components/layout/MobileLayout';
import WalletHeader from '@/components/wallet/WalletHeader';
import ActionButtons from '@/components/wallet/ActionButtons';
import TokenList from '@/components/wallet/TokenList';
import { Button } from '@/components/ui/button'; // Ensure Button is imported
import { motion } from 'framer-motion'; // Import motion

const WalletPage = () => {
  const { currentWallet, createWallet } = useWalletStore();
  const navigate = useNavigate();

  useEffect(() => {
    // If no wallet exists, create a default one (or navigate to create/import)
    // For now, let's assume the logic directs here only if a wallet exists or is created.
    // If not, the welcome screen below handles the creation/import flow.
  }, [currentWallet, createWallet]);

  // Render welcome/setup screen if no wallet is loaded
  if (!currentWallet) {
    return (
      <MobileLayout className="flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Placeholder for a nice illustration or logo */}
          <div className="w-24 h-24 bg-primary rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
            {/* Replace with actual logo SVG if available */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-primary-foreground">
              <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
              <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
              <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-3">
            Welcome to How Wallet
          </h1>
          <p className="text-muted-foreground mb-8 max-w-xs mx-auto">
            Your secure and friendly crypto wallet for managing assets.
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-col gap-4 w-full max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
        >
          {/* Use the updated Button component styles */}
          <Button 
            onClick={() => navigate('/create-wallet')} 
            size="lg" // Use larger button size
          >
            Create a New Wallet
          </Button>
          
          <Button
            onClick={() => navigate('/import-wallet')}
            variant="outline" // Use outline variant
            size="lg"
          >
            Import Existing Wallet
          </Button>
        </motion.div>
      </MobileLayout>
    );
  }

  // Render main wallet view if a wallet exists
  return (
    <MobileLayout>
      <WalletHeader />
      <ActionButtons />
      <TokenList />
    </MobileLayout>
  );
};

export default WalletPage;
