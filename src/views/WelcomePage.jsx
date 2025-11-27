// src/views/WelcomePage.jsx
import React from 'react';
import { FileText, Shield, Zap, DollarSign, CheckCircle, ArrowRight, Users, CreditCard } from 'lucide-react';

export default function WelcomePage({ onLogin, onRegister, onPricing }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-2 rounded-xl">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">RegComply AI</span>
          </div>
          
          {/* Nav Links */}
          <div className="flex items-center space-x-6">
            <button
              onClick={onPricing}
              className="text-gray-600 hover:text-purple-600 font-medium transition"
            >
              Pricing
            </button>
            <button
              onClick={onLogin}
              className="text-gray-600 hover:text-purple-600 font-medium transition"
            >
              Sign In
            </button>
            <button
              onClick={onRegister}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg font-semibold hover:shadow-lg transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            <span>AI-Powered FDA Compliance</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            510(k) Compliance Analysis
            <br />
            <span className="text-purple-600">in Minutes, Not Weeks</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get instant AI-powered feedback on your FDA submissions. 
            Save thousands on regulatory consultants.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <button
              onClick={onRegister}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Start Free Analysis</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onPricing}
              className="px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all flex items-center justify-center space-x-2"
            >
              <CreditCard className="w-5 h-5" />
              <span>View Pricing</span>
            </button>
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>FDA Guidance Based</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-green-500" />
              <span>Trusted by 100+ Startups</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <Zap className="w-7 h-7 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">60-Second Analysis</h3>
            <p className="text-gray-600">
              Upload your 510(k) document and get comprehensive compliance analysis in under a minute. No more waiting weeks for consultant reviews.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <DollarSign className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Save 80% on Costs</h3>
            <p className="text-gray-600">
              Starting at just $499/month instead of $15,000+ for regulatory consultants. Perfect for early-stage startups and lean teams.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <CheckCircle className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">FDA-Ready Reports</h3>
            <p className="text-gray-600">
              Get section-by-section analysis, severity ratings, specific citations to 21 CFR, and actionable recommendations.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl p-10 shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Sign Up Free</h4>
              <p className="text-sm text-gray-600">Create your account in seconds. No credit card required.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Upload Document</h4>
              <p className="text-sm text-gray-600">Upload your 510(k) PDF or use our guided profile builder.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="font-bold text-gray-900 mb-2">AI Analysis</h4>
              <p className="text-sm text-gray-600">Our AI analyzes your submission against FDA requirements.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                4
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Get Results</h4>
              <p className="text-sm text-gray-600">Receive detailed report with scores and recommendations.</p>
            </div>
          </div>
        </div>

        {/* Pricing Preview */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-10 text-center text-white mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-purple-100 mb-6 text-lg">
            Start free. Upgrade when you need more analyses.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="bg-white/10 rounded-xl px-6 py-4">
              <div className="text-3xl font-bold">Free</div>
              <div className="text-purple-200 text-sm">1 analysis included</div>
            </div>
            <div className="bg-white/10 rounded-xl px-6 py-4 ring-2 ring-white">
              <div className="text-3xl font-bold">$499/mo</div>
              <div className="text-purple-200 text-sm">5 analyses/month</div>
            </div>
            <div className="bg-white/10 rounded-xl px-6 py-4">
              <div className="text-3xl font-bold">$999/mo</div>
              <div className="text-purple-200 text-sm">15 analyses/month</div>
            </div>
          </div>
          
          <button
            onClick={onPricing}
            className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            View Full Pricing Details
          </button>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Accelerate Your FDA Submission?
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Join innovative biotech startups saving time and money with AI-powered compliance.
          </p>
          <button
            onClick={onRegister}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Start Your Free Analysis
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="w-6 h-6" />
                <span className="font-bold text-lg">RegComply AI</span>
              </div>
              <p className="text-gray-400 text-sm">
                AI-powered FDA 510(k) compliance analysis for medical device companies.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><button onClick={onPricing} className="hover:text-white transition">Pricing</button></li>
                <li><a href="#" className="hover:text-white transition">Features</a></li>
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
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} RegComply AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}