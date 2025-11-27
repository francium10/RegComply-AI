// src/components/Navbar.jsx
import React, { useState } from 'react';
import { FileText, Shield, User, LogOut, ChevronDown, Settings, Home, CreditCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onNavigate, currentView }) {
  const { user, isAuthenticated, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  const handleProfileClick = () => {
    if (onNavigate) onNavigate('profile-page');
    setShowDropdown(false);
  };

  const handleHomeClick = () => {
    if (onNavigate) onNavigate('upload');
    setShowDropdown(false);
  };

  const handlePricingClick = () => {
    if (onNavigate) onNavigate('pricing');
    setShowDropdown(false);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-purple-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo - Clickable to go home */}
          <button 
            onClick={handleHomeClick}
            className="flex items-center space-x-2 text-white text-xl font-bold hover:opacity-90 transition"
          >
            <FileText className="w-6 h-6" />
            <span>RegComply AI</span>
          </button>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={handleHomeClick}
              className={`text-white/80 hover:text-white transition font-medium ${
                currentView === 'upload' ? 'text-white' : ''
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={handlePricingClick}
              className={`text-white/80 hover:text-white transition font-medium flex items-center space-x-1 ${
                currentView === 'pricing' ? 'text-white' : ''
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Pricing</span>
            </button>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Product Tag */}
            <div className="hidden sm:flex items-center space-x-2 text-purple-200">
              <Shield className="w-4 h-4" />
              <span className="text-sm">510(k) Analyzer</span>
            </div>

            {/* User Menu (if authenticated) */}
            {isAuthenticated && user && (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 bg-purple-700/50 hover:bg-purple-700 px-3 py-2 rounded-lg transition"
                >
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-white text-sm font-semibold">{user.name}</p>
                    {user.company && (
                      <p className="text-purple-200 text-xs">{user.company}</p>
                    )}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-white transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <>
                    {/* Backdrop */}
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowDropdown(false)}
                    />
                    
                    {/* Menu */}
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl z-20 overflow-hidden">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                        {user.company && (
                          <p className="text-xs text-purple-600 mt-1">{user.company}</p>
                        )}
                      </div>
                      
                      {/* Menu Items */}
                      <div className="py-2">
                        <button
                          onClick={handleHomeClick}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <Home className="w-4 h-4" />
                          <span>Dashboard</span>
                        </button>
                        <button
                          onClick={handlePricingClick}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <CreditCard className="w-4 h-4" />
                          <span>Pricing & Plans</span>
                        </button>
                        <button
                          onClick={handleProfileClick}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Account Settings</span>
                        </button>
                        <hr className="my-2 border-gray-100" />
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}