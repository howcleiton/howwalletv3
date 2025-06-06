
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import MobileLayout from '@/components/layout/MobileLayout';
import SectionHeader from '@/components/ui/section-header';
import { Input } from '@/components/ui/input'; // Import the styled Input
import { cn } from '@/lib/utils';

const CreatePinPage = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Allow only digits
    if (value.length <= 4) {
      setPin(value);

      if (value.length === 4) {
        // Store the PIN temporarily (consider more secure storage)
        localStorage.setItem('howwallet_temp_pin', value);
        // Automatically navigate to confirmation page
        setTimeout(() => navigate('/confirm-pin'), 200);
      }
    }
  };

  const handleContinue = () => {
    if (pin.length === 4) {
      localStorage.setItem('howwallet_temp_pin', pin);
      navigate('/confirm-pin');
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
          {/* Warning Text */}
          <div className="mb-4 text-xs text-yellow-600 dark:text-yellow-400 font-medium">
            Isto não pode ser recuperado.
          </div>

          <h1 className="text-2xl font-semibold mb-2 text-foreground">Criar um PIN</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Isto é utilizado para tornar sua carteira segura em todos os dispositivos.
          </p>

          {/* Use the styled Input component */}
          <Input
            ref={inputRef}
            type="password" // Use password type to mask input
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={4}
            placeholder="----"
            value={pin}
            onChange={handleChange}
            className={cn(
              'tracking-[1em] text-center text-2xl h-14 mb-8',
              'placeholder:tracking-widest placeholder:font-light'
            )} // Increased tracking, centered text, larger size
            autoComplete="new-password"
          />
        </div>

        <div className="mt-auto pb-6">
          <Button
            size="lg"
            disabled={pin.length !== 4}
            onClick={handleContinue}
            className="w-full font-semibold"
          >
            Continuar
          </Button>
        </div>
      </motion.div>
    </MobileLayout>
  );
};

export default CreatePinPage;

