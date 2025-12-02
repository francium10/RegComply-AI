// src/views/WelcomePage.jsx
import React, { useState, useEffect } from 'react';
import { 
  FileText, Shield, Zap, DollarSign, CheckCircle, ArrowRight, 
  Users, CreditCard, Play, Star, ChevronRight, Menu, X,
  Clock, Target
} from 'lucide-react';
import DemoModal from '../components/DemoModal';
import '../styles/animations.css';

export default function WelcomePage({ onLogin, onRegister, onPricing }) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showMobileMenu]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-lg shadow-lg shadow-purple-900/5' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">RegComply AI</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-purple-600 font-medium transition">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-purple-600 font-medium transition">How It Works</a>
              <button onClick={onPricing} className="text-gray-600 hover:text-purple-600 font-medium transition">Pricing</button>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button onClick={onLogin} className="text-gray-700 hover:text-purple-600 font-semibold transition">Sign In</button>
              <button onClick={onRegister} className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105">
                Get Started Free
              </button>
            </div>

            <button onClick={() => setShowMobileMenu(true)} className="md:hidden w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-lg transition">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowMobileMenu(false)} />
          <div className="absolute top-0 right-0 w-[280px] h-full bg-white shadow-2xl animate-slide-in">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-purple-600" />
                <span className="font-bold">RegComply AI</span>
              </div>
              <button onClick={() => setShowMobileMenu(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="py-4">
              <a href="#features" onClick={() => setShowMobileMenu(false)} className="block px-6 py-3 text-gray-700 hover:bg-gray-50">Features</a>
              <a href="#how-it-works" onClick={() => setShowMobileMenu(false)} className="block px-6 py-3 text-gray-700 hover:bg-gray-50">How It Works</a>
              <button onClick={() => { setShowMobileMenu(false); onPricing(); }} className="block w-full text-left px-6 py-3 text-gray-700 hover:bg-gray-50">Pricing</button>
              <div className="border-t my-4" />
              <div className="px-6 space-y-3">
                <button onClick={() => { setShowMobileMenu(false); onLogin(); }} className="w-full py-3 border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition">Sign In</button>
                <button onClick={() => { setShowMobileMenu(false); onRegister(); }} className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-xl font-semibold">Get Started Free</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative pt-24 md:pt-32 pb-16 md:pb-24 px-4 overflow-hidden">
        <div className="absolute top-20 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-40 right-0 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-fade-in">
              <Zap className="w-4 h-4" />
              <span>AI-Powered FDA Compliance</span>
              <ChevronRight className="w-4 h-4" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in-up">
              510(k) Compliance Analysis
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">in Minutes, Not Weeks</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
              Get instant AI-powered feedback on your FDA submissions. Save thousands on regulatory consultants and accelerate your time to market.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10 animate-fade-in-up animation-delay-400">
              <button onClick={onRegister} className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                <span>Start Free Analysis</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={onPricing} className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl font-bold text-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 flex items-center justify-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>View Pricing</span>
              </button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm animate-fade-in-up animation-delay-600">
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="text-gray-600">HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-gray-600">FDA Guidance Based</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <Users className="w-4 h-4 text-green-500" />
                <span className="text-gray-600">100+ Startups Trust Us</span>
              </div>
            </div>
          </div>

          {/* Demo Preview */}
          <div className="max-w-4xl mx-auto animate-fade-in-up animation-delay-800">
            <div 
              className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-2 shadow-2xl cursor-pointer group"
              onClick={() => setShowDemo(true)}
            >
              <div className="flex items-center space-x-2 px-4 py-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <div className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-2xl aspect-video flex items-center justify-center relative overflow-hidden">
                {/* Preview content */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-indigo-900/50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                    <p className="text-white font-semibold text-lg">Watch Demo</p>
                    <p className="text-purple-200 text-sm">See how RegComply AI works</p>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-4 left-4 w-32 h-8 bg-white/10 rounded-lg" />
                <div className="absolute top-4 right-4 w-16 h-8 bg-purple-500/30 rounded-lg" />
                <div className="absolute bottom-4 left-4 right-4 h-24 bg-white/5 rounded-xl" />
              </div>
            </div>
            <p className="text-center text-gray-500 text-sm mt-4">
              Click to see an interactive product walkthrough
            </p>
          </div>
        </div>
      </div>

      {/* Demo Modal */}
      <DemoModal isOpen={showDemo} onClose={() => setShowDemo(false)} />

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">Features</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">Everything You Need to Succeed</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our AI-powered platform streamlines your FDA submission process from start to finish.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="group bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">60-Second Analysis</h3>
              <p className="text-gray-600 leading-relaxed">Upload your 510(k) document and get comprehensive compliance analysis in under a minute. No more waiting weeks for consultant reviews.</p>
            </div>
            
            <div className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Save 80% on Costs</h3>
              <p className="text-gray-600 leading-relaxed">Starting at just $499/month instead of $15,000+ for regulatory consultants. Perfect for early-stage startups and lean teams.</p>
            </div>
            
            <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">FDA-Ready Reports</h3>
              <p className="text-gray-600 leading-relaxed">Get section-by-section analysis, severity ratings, specific citations to 21 CFR, and actionable recommendations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">Process</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Get your compliance report in four simple steps.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Sign Up Free', desc: 'Create your account in seconds. No credit card required.' },
              { step: 2, title: 'Upload Document', desc: 'Upload your 510(k) PDF or use our guided profile builder.' },
              { step: 3, title: 'AI Analysis', desc: 'Our AI analyzes your submission against FDA requirements.' },
              { step: 4, title: 'Get Results', desc: 'Receive detailed report with scores and recommendations.' },
            ].map((item, idx) => (
              <div key={idx} className="text-center relative">
                {idx < 3 && <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-purple-300 to-purple-300/0" />}
                <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg shadow-purple-500/30">{item.step}</div>
                <h4 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />)}
          </div>
          <blockquote className="text-xl md:text-2xl text-gray-700 font-medium mb-6 leading-relaxed">
            "RegComply AI saved us months of work and over $20,000 in consultant fees. The AI analysis caught issues we never would have found on our own."
          </blockquote>
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">SK</div>
            <div className="text-left">
              <p className="font-semibold text-gray-900">Sarah Kim</p>
              <p className="text-sm text-gray-500">VP Regulatory, MedTech Innovations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 rounded-3xl p-8 md:p-12 text-white text-center overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
            
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-purple-100 mb-8 text-lg max-w-2xl mx-auto">Start free. Upgrade when you need more analyses.</p>
              
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10">
                {[
                  { price: 'Free', desc: '1 analysis included' },
                  { price: '$499/mo', desc: '5 analyses/month', highlight: true },
                  { price: '$999/mo', desc: '15 analyses/month' },
                ].map((plan, idx) => (
                  <div key={idx} className={`bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-5 min-w-[140px] ${plan.highlight ? 'ring-2 ring-white scale-105' : ''}`}>
                    <div className="text-2xl md:text-3xl font-bold">{plan.price}</div>
                    <div className="text-purple-200 text-sm mt-1">{plan.desc}</div>
                  </div>
                ))}
              </div>
              
              <button onClick={onPricing} className="px-8 py-4 bg-white text-purple-700 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                View Full Pricing Details
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Accelerate Your FDA Submission?</h2>
          <p className="text-gray-600 mb-8 text-lg">Join innovative biotech startups saving time and money with AI-powered compliance.</p>
          <button onClick={onRegister} className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 inline-flex items-center space-x-2">
            <span>Start Your Free Analysis</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center"><FileText className="w-5 h-5" /></div>
                <span className="font-bold text-lg">RegComply AI</span>
              </div>
              <p className="text-gray-400 text-sm">AI-powered FDA 510(k) compliance analysis for medical device companies.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><button onClick={onPricing} className="hover:text-white transition">Pricing</button></li>
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} RegComply AI. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}