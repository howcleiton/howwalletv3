
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useWalletStore } from '@/store/walletStore';
import MobileLayout from '@/components/layout/MobileLayout';
import SectionHeader from '@/components/ui/section-header';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react'; // For error display

const ConfirmPinPage = () => {
  const navigate = useNavigate();
  const { createWallet } = useWalletStore();

  const [confirmPin, setConfirmPin] = useState('');
  const [originalPin, setOriginalPin] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const savedPin = localStorage.getItem('howwallet_temp_pin');
    if (!savedPin) {
      console.warn('No temporary PIN found, redirecting to create PIN.');
      navigate('/create-pin'); // Redirect if no original PIN is found
    } else {
      setOriginalPin(savedPin);
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Allow only digits
    setError(''); // Clear error on input change
    if (value.length <= 4) {
      setConfirmPin(value);
      if (value.length === 4 && value === originalPin) {
        // Optionally auto-submit or enable button immediately
        // For now, let user click confirm
      }
    }
  };

  const handleConfirm = async () => {
    if (confirmPin !== originalPin) {
      setError('Os PINs não coincidem.');
      setConfirmPin(''); // Clear input on error
      inputRef.current?.focus();
      return;
    }

    setError('');
    try {
      // TODO: Implement actual wallet creation logic using the PIN
      // For now, simulate creation and navigate
      console.log('PIN Confirmed:', confirmPin);
      // Example: await createWalletWithPin(confirmPin);
      await createWallet('Minha Wallet'); // Using default name for now
      localStorage.removeItem('howwallet_temp_pin'); // Clean up temp PIN
      navigate('/wallet'); // Navigate to main wallet page on success
    } catch (err) {
      console.error('Error creating wallet:', err);
      setError('Falha ao criar a carteira. Tente novamente.');
    }
  };

  return (
    <MobileLayout className="flex flex-col">
      <SectionHeader title="" showBackButton />

      <motion.div
        className="w-full max-w-sm text-center flex-grow flex flex-col justify-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex-grow">
          <h1 className="text-2xl font-semibold mb-2 text-foreground">Confirme seu PIN</h1>
          {/* Optional: Add a subtitle if needed */}
          {/* <p className="text-sm text-muted-foreground mb-8">Digite o PIN novamente.</p> */}

          <Input
            ref={inputRef}
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={4}
            placeholder="----"
            value={confirmPin}
            onChange={handleChange}
            className={cn(
              'tracking-[1em] text-center text-2xl h-14 mt-8 mb-4',
              'placeholder:tracking-widest placeholder:font-light',
              error ? 'border-red-500 focus-visible:ring-red-500' : '' // Add error border
            )}
            autoComplete="new-password"
          />

          {/* Error Message Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 text-sm text-red-600 dark:text-red-400 p-2 rounded-lg bg-red-500/10 flex items-center justify-center gap-2"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}
        </div>

        <div className="mt-auto pb-6">
          <Button
            size="lg"
            onClick={handleConfirm}
            className="w-full font-semibold"
            disabled={confirmPin.length !== 4}
          >
            Confirmar
          </Button>
        </div>
      </motion.div>
    </MobileLayout>
  );
};

export default ConfirmPinPage;

