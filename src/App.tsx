import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import HowItWorksSection from './components/HowItWorksSection';
import FeaturesSection from './components/FeaturesSection';
import MunicipalitySection from './components/MunicipalitySection';
import FinalCTASection from './components/FinalCTASection';
import Footer from './components/Footer';
import AITipsModal from './components/AITipsModal';
import FloatingAIButton from './components/FloatingAIButton';
import TimingSchedule from './components/TimingSchedule';
import RouteMap from './components/RouteMap';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import { onAuthStateChanged, signOutUser } from './firebase/auth';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // Add fade-in animation classes
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-fade-in-up, .animate-fade-in-right');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [activeSection]);

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
    setActiveSection('home');
  };

  const handleSignup = () => {
    setIsLoggedIn(true);
    setShowSignup(false);
    setActiveSection('home');
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
      setIsLoggedIn(false);
      setActiveSection('home');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const handleShowSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  // Show login page if not logged in and login is requested
  if (showLogin && !isLoggedIn) {
    return <LoginPage onLogin={handleLogin} onBack={() => setShowLogin(false)} onSwitchToSignup={handleShowSignup} />;
  }

  // Show signup page if signup is requested
  if (showSignup) {
    return <SignupPage onSignup={handleSignup} onBack={() => setShowSignup(false)} onSwitchToLogin={handleShowLogin} />;
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'timing':
        if (!isLoggedIn) {
          handleShowLogin();
          return null;
        }
        return <TimingSchedule onBack={() => setActiveSection('home')} />;
      case 'route':
        if (!isLoggedIn) {
          handleShowLogin();
          return null;
        }
        return <RouteMap onBack={() => setActiveSection('home')} />;
      case 'feedback':
      case 'share':
      case 'terms':
      case 'privacy':
        if (!isLoggedIn) {
          handleShowLogin();
          return null;
        }
        // For now, redirect to home - you can create dedicated pages later
        setActiveSection('home');
        return null;
      default:
        return (
          <>
            <HeroSection onLoginClick={handleShowLogin} onSignupClick={handleShowSignup} />
            <ProblemSection />
            <SolutionSection />
            <HowItWorksSection />
            <FeaturesSection />
            <MunicipalitySection />
            <FinalCTASection />
            <Footer />
            <FloatingAIButton onClick={() => setIsAIModalOpen(true)} />
            <AITipsModal isOpen={isAIModalOpen} onClose={() => setIsAIModalOpen(false)} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        isLoggedIn={isLoggedIn}
        onLogin={handleShowLogin}
        onLogout={handleLogout}
      />
      {renderContent()}
    </div>
  );
}

export default App;