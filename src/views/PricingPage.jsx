// src/views/PricingPage.jsx
import React, { useState } from 'react';
import { 
  Check, X, Zap, Building2, Rocket, ArrowLeft, FileText, 
  Shield, Users, Headphones, Star, ChevronDown, ChevronUp
} from 'lucide-react';

export default function PricingPage({ onBack, onSelectPlan, isAuthenticated }) {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [openFaq, setOpenFaq] = useState(null);

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for trying out RegComply AI',
      icon: Zap,
      color: 'purple',
      monthlyPrice: 0,
      annualPrice: 0,
      priceLabel: 'Free',
      priceSubtext: 'forever',
      cta: 'Get Started Free',
      ctaStyle: 'outline',
      features: [
        { text: '1 document analysis', included: true },
        { text: 'Basic compliance report', included: true },
        { text: 'AI chat assistant (10 messages)', included: true },
        { text: 'Email support', included: true },
        { text: 'Detailed recommendations', included: false },
        { text: 'Export to Word/PDF', included: false },
        { text: 'Predicate device finder', included: false },
        { text: 'Priority processing', included: false },
      ],
      popular: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'For startups and small teams',
      icon: Rocket,
      color: 'purple',
      monthlyPrice: 499,
      annualPrice: 399,
      priceLabel: null,
      priceSubtext: 'per month',
      cta: 'Start Pro Trial',
      ctaStyle: 'solid',
      features: [
        { text: '5 document analyses/month', included: true },
        { text: 'Comprehensive compliance reports', included: true },
        { text: 'Unlimited AI chat assistant', included: true },
        { text: 'Priority email support', included: true },
        { text: 'Detailed recommendations', included: true },
        { text: 'Export to Word/PDF', included: true },
        { text: 'Predicate device finder', included: false },
        { text: 'Priority processing', included: false },
      ],
      popular: true,
    },
    {
      id: 'business',
      name: 'Business',
      description: 'For growing device companies',
      icon: Building2,
      color: 'indigo',
      monthlyPrice: 999,
      annualPrice: 799,
      priceLabel: null,
      priceSubtext: 'per month',
      cta: 'Contact Sales',
      ctaStyle: 'solid',
      features: [
        { text: '15 document analyses/month', included: true },
        { text: 'Comprehensive compliance reports', included: true },
        { text: 'Unlimited AI chat assistant', included: true },
        { text: 'Dedicated support manager', included: true },
        { text: 'Detailed recommendations', included: true },
        { text: 'Export to Word/PDF', included: true },
        { text: 'Predicate device finder', included: true },
        { text: 'Priority processing', included: true },
      ],
      popular: false,
    },
  ];

  const faqs = [
    {
      question: 'What counts as one document analysis?',
      answer: 'Each PDF upload or Profile Builder submission counts as one analysis. You\'ll receive a comprehensive compliance report for each analysis.'
    },
    {
      question: 'Can I upgrade or downgrade my plan?',
      answer: 'Yes! You can change your plan at any time. When upgrading, you\'ll get immediate access to new features. When downgrading, changes take effect at your next billing cycle.'
    },
    {
      question: 'Do unused analyses roll over?',
      answer: 'Monthly analyses don\'t roll over, but you can purchase additional analysis credits at any time at a discounted rate.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use bank-level encryption, and your documents are processed securely and deleted after analysis. We never share your data with third parties.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express) and can arrange invoicing for Enterprise customers.'
    },
  ];

  const handleSelectPlan = (planId) => {
    if (onSelectPlan) {
      onSelectPlan(planId, billingCycle);
    }
  };

  const getPrice = (plan) => {
    if (plan.priceLabel) return plan.priceLabel;
    const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
    return `$${price}`;
  };

  const getSavings = (plan) => {
    if (plan.monthlyPrice === 0) return null;
    return (plan.monthlyPrice - plan.annualPrice) * 12;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="group flex items-center space-x-2 text-gray-600 hover:text-purple-600 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back</span>
          </button>
        )}

        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your needs. Save up to 20% with annual billing.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center bg-gray-100 rounded-full p-1.5">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-purple-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center space-x-2 ${
                billingCycle === 'annual'
                  ? 'bg-white text-purple-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>Annual</span>
              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-bold">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-16">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const savings = getSavings(plan);
            
            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                  plan.popular ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-indigo-700 text-white text-center py-2.5 text-sm font-bold">
                    <div className="flex items-center justify-center space-x-1">
                      <Star className="w-4 h-4 fill-current" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <div className={`p-6 md:p-8 ${plan.popular ? 'pt-14' : ''}`}>
                  {/* Plan Header */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${
                      plan.color === 'purple' 
                        ? 'from-purple-500 to-indigo-600 shadow-purple-500/30' 
                        : 'from-indigo-500 to-blue-600 shadow-indigo-500/30'
                    } shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                      <p className="text-sm text-gray-500">{plan.description}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-4xl font-bold text-gray-900">{getPrice(plan)}</span>
                      <span className="text-gray-500">{plan.priceSubtext}</span>
                    </div>
                    {billingCycle === 'annual' && savings > 0 && (
                      <p className="text-green-600 text-sm font-medium mt-1">
                        Save ${savings}/year
                      </p>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full py-3.5 rounded-xl font-bold transition-all duration-300 ${
                      plan.ctaStyle === 'solid'
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-700 text-white hover:shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02]'
                        : 'border-2 border-purple-500 text-purple-600 hover:bg-purple-50'
                    }`}
                  >
                    {plan.cta}
                  </button>

                  {/* Features List */}
                  <div className="mt-8 space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        {feature.included ? (
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-green-600" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <X className="w-3 h-3 text-gray-400" />
                          </div>
                        )}
                        <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enterprise Section */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 rounded-3xl p-8 md:p-12 text-white mb-16 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
          
          <div className="relative max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Enterprise Solutions</h2>
            <p className="text-gray-300 text-lg mb-8">
              Need unlimited analyses, API access, or custom integrations? 
              We offer tailored solutions for large medical device companies.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {[
                { icon: FileText, label: 'Unlimited Analyses' },
                { icon: Shield, label: 'API Access' },
                { icon: Users, label: 'Team Management' },
                { icon: Headphones, label: 'Dedicated Support' },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6 text-purple-300" />
                    </div>
                    <span className="text-sm text-gray-300">{item.label}</span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => handleSelectPlan('enterprise')}
              className="px-8 py-4 bg-white text-gray-900 rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105"
            >
              Contact Enterprise Sales
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between"
                >
                  <h3 className="font-bold text-gray-900 pr-4">{faq.question}</h3>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${openFaq === idx ? 'bg-purple-100' : 'bg-gray-100'}`}>
                    {openFaq === idx ? (
                      <ChevronUp className="w-5 h-5 text-purple-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center pb-8">
          <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-6 py-3 rounded-full border border-green-200">
            <Shield className="w-5 h-5" />
            <span className="font-semibold">30-Day Money-Back Guarantee</span>
          </div>
          <p className="text-gray-600 mt-4">
            Try RegComply AI risk-free. If you're not satisfied, get a full refund within 30 days.
          </p>
        </div>
      </div>
    </div>
  );
}
