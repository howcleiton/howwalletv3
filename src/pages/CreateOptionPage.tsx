import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShieldCheck, Mail } from "lucide-react";

const CreateOptionPage = () => {
  const navigate = useNavigate();

  return (
    // Aplicando o mesmo padrão de layout mobile da WelcomePage
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-dark-background to-dark-background/90 text-white relative overflow-hidden">
      {/* Container para controlar largura para visualização mobile */}
      <div className="w-full max-w-sm flex flex-col items-center justify-between flex-grow">
        
        {/* Área de Conteúdo - Centralizada dentro do container max-w-sm */}
        <div className="flex flex-col items-center justify-center flex-grow z-10 text-center mt-16 w-full">
          {/* Logo - Consistente com WelcomePage */}
          <motion.img
            src="/icons/logo_howwallet.png"
            alt="How Wallet Logo"
            className="w-20 h-20 mx-auto mb-6 opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.6 } }}
            onError={(e) => { 
                console.error('Failed to load logo'); 
                (e.target as HTMLImageElement).style.display = 'none';
            }}
          />

          {/* Conteúdo de Texto */}
          <motion.h1
            className="text-2xl font-semibold mb-2 text-white"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } }}
          >
            Adicionar uma carteira
          </motion.h1>
          <motion.p
            className="text-sm text-muted-foreground mb-8 max-w-xs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } }}
          >
            Iniciar a sessão ou importar uma carteira existente
          </motion.p>

          {/* Destaques de Recursos - Estilizado similar à referência */}
          <motion.div
            className="text-left text-sm space-y-4 mb-8 bg-secondary p-4 rounded-xl max-w-xs w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.5 } }}
          >
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
          </motion.div>
        </div>

        {/* Área Inferior - Botões - Permanece dentro do max-w-sm */}
        <div className="w-full z-10 mb-4 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5 } }}
          >
            <Button
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              onClick={() => navigate("/create-email")}
            >
              Continuar com o e-mail
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.5 } }}
          >
            <Button
              size="lg"
              variant="outline"
              className="w-full font-semibold border-border hover:bg-secondary"
              onClick={() => navigate("/create-wallet")}
            >
              Criar uma carteira de frase semente
            </Button>
          </motion.div>

          {/* Indicador de Paginação */}
          <motion.p
            className="text-center text-sm text-muted-foreground mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.7, duration: 0.4 } }}
          >
            2 de 3
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default CreateOptionPage;