// src/App.jsx
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import WelcomePage from './views/WelcomePage';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import PricingPage from './views/PricingPage';
import ProfilePage from './views/ProfilePage';
import UploadView from './views/UploadView';
import ProfileBuilder from './views/ProfileBuilder';
import ResultsView from './views/ResultsView';
import LoadingView from './views/LoadingView';
import ChatWidget from './components/ChatWidget';
import Footer from './components/Footer';
import { analyzeDocument, analyzeProfile } from './services/api';

// Main App Content (uses auth context)
function AppContent() {
  const { isAuthenticated, loading } = useAuth();
  const [view, setView] = useState('upload');
  const [authView, setAuthView] = useState('welcome'); // 'welcome', 'login', 'register', 'pricing'
  const [selectedFile, setSelectedFile] = useState(null);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // ============ Auth Handlers ============

  const handleGoToLogin = () => setAuthView('login');
  const handleGoToRegister = () => setAuthView('register');
  const handleGoToWelcome = () => setAuthView('welcome');
  const handleGoToPricing = () => setAuthView('pricing');
  
  const handleAuthSuccess = () => {
    setAuthView('welcome');
    setView('upload');
  };

  const handleSelectPlan = (planId, billingCycle) => {
    console.log(`Selected plan: ${planId}, billing: ${billingCycle}`);
    // For now, redirect to register
    // Later, this will integrate with Stripe
    if (planId === 'enterprise') {
      // Could open a contact form or mailto link
      window.location.href = 'mailto:sales@regcomply.ai?subject=Enterprise%20Inquiry';
    } else {
      setAuthView('register');
    }
  };

  // ============ App Handlers ============

  const handleAnalyze = async (file) => {
    setSelectedFile(file);
    setView('loading');
    setError(null);
    
    try {
      const analysisResults = await analyzeDocument(file);
      setResults(analysisResults);
      setView('results');
    } catch (err) {
      setError(err.message);
      setView('upload');
      alert(`Analysis failed: ${err.message}`);
    }
  };

  const handleProfileSubmit = async (profileData) => {
    setView('loading');
    setError(null);
    
    try {
      const analysisResults = await analyzeProfile(profileData);
      setResults(analysisResults);
      setView('results');
    } catch (err) {
      setError(err.message);
      setView('profile');
      alert(`Profile analysis failed: ${err.message}`);
    }
  };

  const handleGoToProfile = () => setView('profile');
  const handleBackToUpload = () => setView('upload');
  const handleNavigate = (newView) => setView(newView);

  const handleReset = () => {
    setSelectedFile(null);
    setResults(null);
    setError(null);
    setView('upload');
  };

  // ============ Render ============

  // Not authenticated - show auth pages
  if (!isAuthenticated) {
    if (authView === 'login') {
      return (
        <LoginPage
          onBack={handleGoToWelcome}
          onRegister={handleGoToRegister}
          onSuccess={handleAuthSuccess}
        />
      );
    }
    
    if (authView === 'register') {
      return (
        <RegisterPage
          onBack={handleGoToWelcome}
          onLogin={handleGoToLogin}
          onSuccess={handleAuthSuccess}
        />
      );
    }

    if (authView === 'pricing') {
      return (
        <PricingPage
          onBack={handleGoToWelcome}
          onSelectPlan={handleSelectPlan}
          isAuthenticated={false}
        />
      );
    }
    
    // Default: Welcome page
    return (
      <WelcomePage
        onLogin={handleGoToLogin}
        onRegister={handleGoToRegister}
        onPricing={handleGoToPricing}
      />
    );
  }

  // Authenticated - show main app
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar onNavigate={handleNavigate} currentView={view} />
      
      <main className="flex-grow">
        {view === 'upload' && (
          <UploadView 
            onAnalyze={handleAnalyze} 
            onGoToProfile={handleGoToProfile}
          />
        )}
        
        {view === 'profile' && (
          <ProfileBuilder 
            onSubmit={handleProfileSubmit}
            onBack={handleBackToUpload}
          />
        )}

        {view === 'profile-page' && (
          <ProfilePage 
            onBack={handleBackToUpload}
          />
        )}

        {view === 'pricing' && (
          <PricingPage
            onBack={handleBackToUpload}
            onSelectPlan={handleSelectPlan}
            isAuthenticated={true}
          />
        )}
        
        {view === 'loading' && <LoadingView />}
        
        {view === 'results' && results && (
          <ResultsView 
            onReset={handleReset} 
            file={selectedFile}
            results={results}
          />
        )}
      </main>

      <ChatWidget />
      <Footer />
    </div>
  );
}

// Root App Component with AuthProvider wrapper
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}