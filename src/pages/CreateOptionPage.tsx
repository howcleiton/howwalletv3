
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShieldCheck, Mail } from "lucide-react"; // Removed KeyRound as it wasn't used
import MobileLayout from "@/components/layout/MobileLayout"; // Import MobileLayout

const CreateOptionPage = () => {
  const navigate = useNavigate();

  return (
    // Wrap the entire page content with MobileLayout
    <MobileLayout className="flex flex-col items-center justify-center">
      <motion.div
        className="w-full max-w-sm text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Logo - Consistent with WelcomePage */}
        <img
          // Assuming the logo is in the public root or public/icons/
          // Verify the correct path in your project structure.
          src="/logo_howwallet.png" // Simplified path, ensure image exists in public folder
          alt="How Wallet Logo"
          className="w-20 h-20 mx-auto mb-6 opacity-90"
          onError={(e) => { 
              console.error('Failed to load logo'); 
              (e.target as HTMLImageElement).style.display = 'none'; // Hide broken image icon
          }}
        />

        <h1 className="text-2xl font-semibold mb-2 text-foreground">Adicionar uma carteira</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Iniciar a sessão ou importar uma carteira existente
        </p>

        {/* Feature Highlights - Styled similar to reference */}
        <div className="text-left text-sm space-y-4 mb-8 bg-secondary p-4 rounded-xl">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <strong className="text-foreground block">Segurança reforçada</strong>
              <span className="text-muted-foreground">
                Sua carteira está guardada de forma segura e descentralizada com múltiplos fatores.
              </span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <strong className="text-foreground block">Recuperação fácil</strong>
              <span className="text-muted-foreground">
                Recupere sua carteira com seu e-mail e um PIN de 4 dígitos.
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons - Using updated Button component */}
        <Button
          size="lg"
          className="w-full mb-3 font-semibold" // Default primary style
          onClick={() => navigate("/create-email")} // Assuming this path exists
        >
          Continuar com o e-mail
        </Button>

        <Button
          size="lg"
          variant="outline" // Use outline style for secondary action
          className="w-full font-semibold border-border hover:bg-secondary"
          onClick={() => navigate("/create-wallet")} // Navigate to seed phrase creation
        >
          Criar uma carteira de frase semente
        </Button>
      </motion.div>
    </MobileLayout>
  );
};

export default CreateOptionPage;

