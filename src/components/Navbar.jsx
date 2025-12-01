// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { FileText, Shield, User, LogOut, ChevronDown, Settings, Home, CreditCard, Menu, X, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onNavigate, currentView }) {
  const { user, isAuthenticated, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showMobileMenu ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showMobileMenu]);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    setShowMobileMenu(false);
  };

  const handleNavigation = (view) => {
    if (onNavigate) onNavigate(view);
    setShowDropdown(false);
    setShowMobileMenu(false);
  };

  const navLinks = [
    { label: 'Dashboard', view: 'upload', icon: Home },
    { label: 'Predicate Finder', view: 'predicate-finder', icon: Search },
    { label: 'Pricing', view: 'pricing', icon: CreditCard },
  ];

  return (
    <>
      <nav className={`sticky top-0 z-40 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 transition-shadow duration-300 ${scrolled ? 'shadow-lg shadow-purple-900/20' : ''}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16 md:h-18">
            {/* Logo */}
            <button 
              onClick={() => handleNavigation('upload')}
              className="flex items-center space-x-2.5 text-white font-bold hover:opacity-90 transition group"
            >
              <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-lg md:text-xl">RegComply AI</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <button
                  key={link.view}
                  onClick={() => handleNavigation(link.view)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentView === link.view
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-3">
              <div className="hidden lg:flex items-center space-x-2 text-purple-200 bg-white/10 px-3 py-1.5 rounded-full">
                <Shield className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">510(k) Analyzer</span>
              </div>

              {/* User Menu (Desktop) */}
              {isAuthenticated && user && (
                <div className="hidden md:block relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-xl transition-all duration-200"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-white/30 to-white/10 rounded-lg flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left max-w-[120px]">
                      <p className="text-white text-sm font-semibold truncate">{user.name}</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-white/70 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showDropdown && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl shadow-purple-900/20 z-20 overflow-hidden border border-gray-100 animate-dropdown">
                        <div className="px-4 py-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-gray-100">
                          <p className="font-bold text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500 truncate">{user.email}</p>
                          {user.company && (
                            <span className="inline-block mt-2 text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                              {user.company}
                            </span>
                          )}
                        </div>
                        
                        <div className="py-2">
                          <button
                            onClick={() => handleNavigation('upload')}
                            className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition"
                          >
                            <Home className="w-4 h-4 text-gray-400" />
                            <span>Dashboard</span>
                          </button>
                          <button
                            onClick={() => handleNavigation('predicate-finder')}
                            className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition"
                          >
                            <Search className="w-4 h-4 text-gray-400" />
                            <span>Predicate Finder</span>
                          </button>
                          <button
                            onClick={() => handleNavigation('pricing')}
                            className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition"
                          >
                            <CreditCard className="w-4 h-4 text-gray-400" />
                            <span>Pricing & Plans</span>
                          </button>
                          <button
                            onClick={() => handleNavigation('profile-page')}
                            className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition"
                          >
                            <Settings className="w-4 h-4 text-gray-400" />
                            <span>Account Settings</span>
                          </button>
                          <div className="my-2 border-t border-gray-100" />
                          <button
                            onClick={handleLogout}
                            className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3 transition"
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

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(true)}
                className="md:hidden w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-lg transition"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setShowMobileMenu(false)}
          />
          
          <div className="absolute top-0 right-0 w-[280px] h-full bg-white shadow-2xl animate-slide-in-right">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-purple-600 to-indigo-700">
              <div className="flex items-center space-x-2 text-white">
                <FileText className="w-5 h-5" />
                <span className="font-bold">RegComply AI</span>
              </div>
              <button
                onClick={() => setShowMobileMenu(false)}
                className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/20 rounded-lg transition"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isAuthenticated && user && (
              <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 truncate">{user.name}</p>
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="py-4">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.view}
                    onClick={() => handleNavigation(link.view)}
                    className={`w-full px-5 py-3.5 text-left flex items-center space-x-3 transition ${
                      currentView === link.view
                        ? 'bg-purple-50 text-purple-700 border-r-4 border-purple-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{link.label}</span>
                  </button>
                );
              })}

              {isAuthenticated && (
                <>
                  <button
                    onClick={() => handleNavigation('profile-page')}
                    className={`w-full px-5 py-3.5 text-left flex items-center space-x-3 transition ${
                      currentView === 'profile-page'
                        ? 'bg-purple-50 text-purple-700 border-r-4 border-purple-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Account Settings</span>
                  </button>

                  <div className="my-4 mx-5 border-t border-gray-200" />

                  <button
                    onClick={handleLogout}
                    className="w-full px-5 py-3.5 text-left flex items-center space-x-3 text-red-600 hover:bg-red-50 transition"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Sign Out</span>
                  </button>
                </>
              )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center justify-center space-x-2 text-gray-400">
                <Shield className="w-4 h-4" />
                <span className="text-xs">510(k) Compliance Analyzer</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes dropdown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-dropdown { animation: dropdown 0.2s ease-out forwards; }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right { animation: slide-in-right 0.3s ease-out forwards; }
      `}</style>
    </>
  );
}