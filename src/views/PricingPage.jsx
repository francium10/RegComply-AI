// src/views/PricingPage.jsx
import React, { useState } from 'react';
import { 
  Check, 
  X, 
  Zap, 
  Building2, 
  Rocket,
  ArrowLeft,
  FileText,
  MessageSquare,
  Download,
  Clock,
  Shield,
  Users,
  Headphones,
  Star
} from 'lucide-react';

export default function PricingPage({ onBack, onSelectPlan, isAuthenticated }) {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'annual'

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
      priceLabel: null, // Will show calculated price
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

  const handleSelectPlan = (planId) => {
    if (onSelectPlan) {
      onSelectPlan(planId, billingCycle);
    } else {
      // Default behavior - could redirect to signup
      console.log(`Selected plan: ${planId}, billing: ${billingCycle}`);
    }
  };

  const getPrice = (plan) => {
    if (plan.priceLabel) return plan.priceLabel;
    const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
    return `$${price}`;
  };

  const getSavings = (plan) => {
    if (plan.monthlyPrice === 0) return null;
    const monthlyCost = plan.monthlyPrice * 12;
    const annualCost = plan.annualPrice * 12;
    const savings = monthlyCost - annualCost;
    return savings;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 mb-8 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        )}

        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your needs. Save up to 20% with annual billing.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
                billingCycle === 'monthly'
                  ? 'bg-white text-purple-600 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition flex items-center space-x-2 ${
                billingCycle === 'annual'
                  ? 'bg-white text-purple-600 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>Annual</span>
              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const savings = getSavings(plan);
            
            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 ${
                  plan.popular ? 'ring-2 ring-purple-600' : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-purple-800 text-white text-center py-2 text-sm font-semibold">
                    <div className="flex items-center justify-center space-x-1">
                      <Star className="w-4 h-4 fill-current" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <div className={`p-8 ${plan.popular ? 'pt-14' : ''}`}>
                  {/* Plan Header */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      plan.color === 'purple' ? 'bg-purple-100' : 'bg-indigo-100'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        plan.color === 'purple' ? 'text-purple-600' : 'text-indigo-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                      <p className="text-sm text-gray-500">{plan.description}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-4xl font-bold text-gray-900">
                        {getPrice(plan)}
                      </span>
                      <span className="text-gray-500">
                        {plan.priceSubtext}
                      </span>
                    </div>
                    {billingCycle === 'annual' && savings > 0 && (
                      <p className="text-green-600 text-sm mt-1">
                        Save ${savings}/year
                      </p>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full py-3 rounded-lg font-bold transition-all ${
                      plan.ctaStyle === 'solid'
                        ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:shadow-lg transform hover:scale-105'
                        : 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50'
                    }`}
                  >
                    {plan.cta}
                  </button>

                  {/* Features List */}
                  <div className="mt-8 space-y-4">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
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
        <div className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Enterprise Solutions</h2>
            <p className="text-gray-300 text-lg mb-8">
              Need unlimited analyses, API access, or custom integrations? 
              We offer tailored solutions for large medical device companies.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="flex flex-col items-center">
                <FileText className="w-8 h-8 text-purple-400 mb-2" />
                <span className="text-sm">Unlimited Analyses</span>
              </div>
              <div className="flex flex-col items-center">
                <Shield className="w-8 h-8 text-purple-400 mb-2" />
                <span className="text-sm">API Access</span>
              </div>
              <div className="flex flex-col items-center">
                <Users className="w-8 h-8 text-purple-400 mb-2" />
                <span className="text-sm">Team Management</span>
              </div>
              <div className="flex flex-col items-center">
                <Headphones className="w-8 h-8 text-purple-400 mb-2" />
                <span className="text-sm">Dedicated Support</span>
              </div>
            </div>

            <button
              onClick={() => handleSelectPlan('enterprise')}
              className="px-8 py-4 bg-white text-gray-900 rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              Contact Enterprise Sales
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow">
              <h3 className="font-bold text-gray-900 mb-2">
                What counts as one document analysis?
              </h3>
              <p className="text-gray-600">
                Each PDF upload or Profile Builder submission counts as one analysis. 
                You'll receive a comprehensive compliance report for each analysis.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
              <h3 className="font-bold text-gray-900 mb-2">
                Can I upgrade or downgrade my plan?
              </h3>
              <p className="text-gray-600">
                Yes! You can change your plan at any time. When upgrading, you'll get 
                immediate access to new features. When downgrading, changes take effect 
                at your next billing cycle.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
              <h3 className="font-bold text-gray-900 mb-2">
                Do unused analyses roll over?
              </h3>
              <p className="text-gray-600">
                Monthly analyses don't roll over, but you can purchase additional 
                analysis credits at any time at a discounted rate.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
              <h3 className="font-bold text-gray-900 mb-2">
                Is my data secure?
              </h3>
              <p className="text-gray-600">
                Absolutely. We use bank-level encryption, and your documents are 
                processed securely and deleted after analysis. We never share your 
                data with third parties.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
              <h3 className="font-bold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards (Visa, MasterCard, American Express) 
                and can arrange invoicing for Enterprise customers.
              </p>
            </div>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-16 text-center pb-8">
          <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-6 py-3 rounded-full">
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