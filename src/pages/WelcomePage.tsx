
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useWalletStore } from "@/store/walletStore";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Import cn

// Placeholder icons - ideally replace with actual SVG components or images
const SolanaIcon = () => (
  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-blue-500 shadow-lg flex items-center justify-center">
    {/* Placeholder for Solana Logo */}
    <svg width="32" height="32" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M64 128C99.3462 128 128 99.3462 128 64C128 28.6538 99.3462 0 64 0C28.6538 0 0 28.6538 0 64C0 99.3462 28.6538 128 64 128Z" fill="#14F195"/><path d="M91.6346 43.7308H36.3654C33.3846 43.7308 31 46.1154 31 49.0962V54.4615C31 57.4423 33.3846 59.8269 36.3654 59.8269H91.6346C94.6154 59.8269 97 57.4423 97 54.4615V49.0962C97 46.1154 94.6154 43.7308 91.6346 43.7308Z" fill="white"/><path d="M91.6346 68.1731H36.3654C33.3846 68.1731 31 70.5577 31 73.5385V78.9038C31 81.8846 33.3846 84.2692 36.3654 84.2692H91.6346C94.6154 84.2692 97 81.8846 97 78.9038V73.5385C97 70.5577 94.6154 68.1731 91.6346 68.1731Z" fill="white"/></svg>
  </div>
);

const EthereumIcon = () => (
  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 shadow-lg flex items-center justify-center">
    {/* Placeholder for Ethereum Logo */}
    <svg width="32" height="32" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg" fill="#fff"><path d="M21 0L0 21l21 21 21-21L21 0zM6.6 21l14.4-8.4 14.4 8.4L21 29.4 6.6 21z"/></svg>
  </div>
);

const WelcomePage = () => {
  const navigate = useNavigate();
  const { currentWallet } = useWalletStore();

  useEffect(() => {
    // Redirect if wallet already exists
    if (currentWallet) {
      navigate("/wallet");
    }
  }, [currentWallet, navigate]);

  return (
    // Apply background and ensure full height
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-dark-background to-dark-background/90 text-white relative overflow-hidden">
      {/* Container to constrain width for mobile view */}
      <div className="w-full max-w-sm flex flex-col items-center justify-between flex-grow">
        {/* Floating Icons - Positioned absolutely relative to the outer container */}
        <motion.div
          className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 z-0"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 0.3, duration: 0.5 } }}
        >
          <SolanaIcon />
        </motion.div>
        <motion.div
          className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 z-0"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 0.4, duration: 0.5 } }}
        >
          <EthereumIcon />
        </motion.div>

        {/* Content Area - Centered within the max-w-sm container */}
        <div className="flex flex-col items-center justify-center flex-grow z-10 text-center mt-16 w-full">
          {/* Wallet Illustration */}
          <motion.img
            // Assuming the image is in the public root or public/illustrations/
            // Verify the correct path in your project structure.
            src="/wallet-illustration.png" // Changed path, ensure image exists in public folder
            alt="Secure Wallet Illustration"
            className="w-48 h-auto mb-8" // Adjusted size
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.6 } }}
            // Add error handling if needed
            onError={(e) => { 
              console.error('Failed to load wallet illustration'); 
              (e.target as HTMLImageElement).style.display = 'none'; // Hide broken image icon
            }}
          />

          {/* Text Content */}
          <motion.h1
            // Explicitly set text color to white for high contrast on dark background
            className="text-3xl font-bold mb-3 text-white" 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } }}
          >
            Bem-vindo à How Wallet
          </motion.h1>
          <motion.p
            className="text-base text-muted-foreground max-w-xs mb-10" // Muted foreground should be visible
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } }}
          >
            Sua carteira segura para gerenciar criptomoedas e NFTs.
          </motion.p>
        </div>

        {/* Bottom Area - Button and Pagination - Stays within max-w-sm */}
        <div className="w-full z-10 mb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5 } }}
          >
            <Button
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg"
              onClick={() => navigate("/create-option")} // Navigate to next step
            >
              Começar
            </Button>
          </motion.div>

          {/* Pagination Indicator */}
          <motion.p
            className="text-center text-sm text-muted-foreground mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.6, duration: 0.4 } }}
          >
            1 de 3
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;

