import { useState } from "react";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { Login } from "@/components/Login";
import { Signup } from "@/components/Signup";
import { WelcomeVideo } from "@/components/WelcomeVideo";
import { Auth } from "@/components/Auth";
import { useAuth } from "@/hooks/useAuth";
import { Dashboard } from "@/components/Dashboard";
import { motion } from "framer-motion";

const Index = () => {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<'home' | 'login' | 'signup' | 'welcome' | 'dashboard'>('home');

  const handleDiscoverClick = () => setCurrentView('login');
  const handleBackToHome = () => setCurrentView('home');
  const handleShowSignup = () => setCurrentView('signup');
  const handleShowLogin = () => setCurrentView('login');
  const handleLogin = () => setCurrentView('welcome');
  const handleSignup = () => setCurrentView('welcome');
  const handleWelcomeComplete = () => {
    setCurrentView('dashboard');
  };

  if (currentView === 'welcome') {
    return <WelcomeVideo onComplete={handleWelcomeComplete} />;
  }

  if (currentView === 'signup') {
    return (
      <Signup 
        onBack={handleBackToHome}
        onSignIn={handleShowLogin}
        onSignUp={handleSignup}
      />
    );
  }

  if (currentView === 'login') {
    return (
      <Login 
        onBack={handleBackToHome}
        onSignUp={handleShowSignup}
        onLogin={handleLogin}
      />
    );
  }

  if (currentView === 'dashboard') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Dashboard />
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen">
      <BackgroundPaths 
      title="THE VIGORS CLUB" 
      onDiscoverClick={handleDiscoverClick} 
    />
      {!user && (
        <section id="auth-section" className="py-20">
          <Auth />
        </section>
      )}
    </div>
  );
};

export default Index;
