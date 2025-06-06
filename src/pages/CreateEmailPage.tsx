
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import MobileLayout from '@/components/layout/MobileLayout'; // Import MobileLayout
import SectionHeader from '@/components/ui/section-header'; // Import SectionHeader for back button

const CreateEmailPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleContinue = () => {
    // Basic email validation
    if (!email || !/^[^\[\]@]+@[^\[\]@]+\.[^\[\]@]+$/.test(email)) return;
    // TODO: Store email securely (e.g., in zustand store, potentially encrypted)
    console.log('Email submitted:', email); // Placeholder
    navigate('/create-pin'); // Navigate to the next step
  };

  return (
    // Wrap with MobileLayout for consistent background and structure
    <MobileLayout className="flex flex-col">
      {/* Add a header with a back button */}
      <SectionHeader title="" showBackButton /> 

      <motion.div
        className="w-full max-w-sm text-center flex-grow flex flex-col justify-center px-4" // Added padding and flex grow/center
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex-grow"> {/* Pushes content down */}
          <h1 className="text-2xl font-semibold mb-2 text-foreground">Digite seu e-mail</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Nós usaremos isso para proteger e recuperar sua carteira.
          </p>

          <Input
            type="email"
            placeholder="exemplo@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4" // Use theme input style
            autoComplete="email"
          />
        </div>

        <div className="mt-auto pb-6"> {/* Pushes button to bottom */}
          <Button
            size="lg"
            onClick={handleContinue}
            className="w-full font-semibold" // Use theme button style
            disabled={!/^[^\[\]@]+@[^\[\]@]+\.[^\[\]@]+$/.test(email)} // Validate email format for enabling button
          >
            Continuar
          </Button>
        </div>
      </motion.div>
    </MobileLayout>
  );
};

export default CreateEmailPage;

