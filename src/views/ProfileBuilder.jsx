// src/views/ProfileBuilder.jsx
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ArrowRight, Save, CheckCircle, AlertCircle, 
  FileText, Target, Shield, Activity, BookOpen, Beaker,
  ChevronDown, ChevronUp, HelpCircle, Sparkles
} from 'lucide-react';

export default function ProfileBuilder({ onSubmit, onBack }) {
  const [currentSection, setCurrentSection] = useState(0);
  const [expandedSections, setExpandedSections] = useState([0]);
  const [showSaveMessage, setShowSaveMessage] = useState(false);
  
  const [formData, setFormData] = useState({
    // Device Description
    deviceName: '',
    deviceClass: '',
    productCode: '',
    regulationNumber: '',
    deviceDescription: '',
    
    // Intended Use
    intendedUse: '',
    indicationsForUse: '',
    contraindications: '',
    targetPopulation: '',
    useEnvironment: '',
    
    // Substantial Equivalence
    predicateDevice: '',
    predicateK510Number: '',
    comparisonDescription: '',
    technologicalCharacteristics: '',
    performanceComparison: '',
    
    // Performance Testing
    benchTesting: '',
    animalTesting: '',
    clinicalData: '',
    softwareVerification: '',
    
    // Labeling
    labelingDescription: '',
    instructionsForUse: '',
    warnings: '',
    
    // Biocompatibility
    biocompatibilityApproach: '',
    materialsDescription: '',
    testingPerformed: '',
  });

  const sections = [
    {
      id: 'device',
      title: 'Device Description',
      icon: FileText,
      color: 'purple',
      fields: [
        { name: 'deviceName', label: 'Device Trade Name', type: 'text', placeholder: 'e.g., CardioMonitor Pro 3000', required: true },
        { name: 'deviceClass', label: 'Device Classification', type: 'select', options: ['Class I', 'Class II', 'Class III'], required: true },
        { name: 'productCode', label: 'Product Code', type: 'text', placeholder: 'e.g., DQA', required: true },
        { name: 'regulationNumber', label: '21 CFR Regulation Number', type: 'text', placeholder: 'e.g., 870.2300' },
        { name: 'deviceDescription', label: 'Detailed Device Description', type: 'textarea', placeholder: 'Provide a comprehensive description of your device, including its components, materials, and how it functions...', required: true },
      ]
    },
    {
      id: 'intended-use',
      title: 'Intended Use',
      icon: Target,
      color: 'blue',
      fields: [
        { name: 'intendedUse', label: 'Intended Use Statement', type: 'textarea', placeholder: 'Describe the general purpose and function of the device...', required: true, help: 'A clear statement of what the device is intended to do and how it will be used.' },
        { name: 'indicationsForUse', label: 'Indications for Use', type: 'textarea', placeholder: 'List specific medical conditions, diseases, or situations where the device should be used...', required: true, help: 'Specific conditions or reasons for which the device is intended.' },
        { name: 'contraindications', label: 'Contraindications', type: 'textarea', placeholder: 'List conditions or situations where the device should NOT be used...', required: true, help: 'Situations where the device should not be used due to risk.' },
        { name: 'targetPopulation', label: 'Target Patient Population', type: 'textarea', placeholder: 'Describe the intended patient population (age, conditions, etc.)...', required: true },
        { name: 'useEnvironment', label: 'Use Environment', type: 'select', options: ['Hospital/Clinical Setting', 'Home Use', 'Both Clinical and Home', 'Surgical Environment', 'Other'], required: true },
      ]
    },
    {
      id: 'equivalence',
      title: 'Substantial Equivalence',
      icon: Shield,
      color: 'green',
      fields: [
        { name: 'predicateDevice', label: 'Predicate Device Name', type: 'text', placeholder: 'e.g., XYZ Medical Monitor Model A', required: true },
        { name: 'predicateK510Number', label: 'Predicate 510(k) Number', type: 'text', placeholder: 'e.g., K123456', required: true },
        { name: 'comparisonDescription', label: 'Comparison to Predicate', type: 'textarea', placeholder: 'Describe how your device compares to the predicate in terms of intended use, design, and technology...', required: true },
        { name: 'technologicalCharacteristics', label: 'Technological Characteristics', type: 'textarea', placeholder: 'Describe the technological features and how they compare to the predicate device...' },
        { name: 'performanceComparison', label: 'Performance Comparison', type: 'textarea', placeholder: 'Compare performance specifications between your device and the predicate...' },
      ]
    },
    {
      id: 'testing',
      title: 'Performance Testing',
      icon: Activity,
      color: 'amber',
      fields: [
        { name: 'benchTesting', label: 'Bench Testing', type: 'textarea', placeholder: 'Describe bench testing performed to verify device performance...' },
        { name: 'animalTesting', label: 'Animal Testing (if applicable)', type: 'textarea', placeholder: 'Describe any animal studies conducted...' },
        { name: 'clinicalData', label: 'Clinical Data', type: 'textarea', placeholder: 'Summarize any clinical data or studies supporting device safety and effectiveness...' },
        { name: 'softwareVerification', label: 'Software Verification (if applicable)', type: 'textarea', placeholder: 'Describe software verification and validation activities...' },
      ]
    },
    {
      id: 'labeling',
      title: 'Labeling',
      icon: BookOpen,
      color: 'cyan',
      fields: [
        { name: 'labelingDescription', label: 'Labeling Overview', type: 'textarea', placeholder: 'Describe the overall labeling approach and components...' },
        { name: 'instructionsForUse', label: 'Instructions for Use Summary', type: 'textarea', placeholder: 'Summarize key instructions for using the device...' },
        { name: 'warnings', label: 'Warnings and Precautions', type: 'textarea', placeholder: 'List key warnings and precautions for users...' },
      ]
    },
    {
      id: 'biocompatibility',
      title: 'Biocompatibility',
      icon: Beaker,
      color: 'pink',
      fields: [
        { name: 'biocompatibilityApproach', label: 'Biocompatibility Approach', type: 'select', options: ['ISO 10993 Testing', 'Predicate Equivalence', 'Risk-Based Approach', 'Not Applicable'] },
        { name: 'materialsDescription', label: 'Materials in Patient Contact', type: 'textarea', placeholder: 'List and describe materials that contact the patient...' },
        { name: 'testingPerformed', label: 'Testing Performed', type: 'textarea', placeholder: 'Describe biocompatibility testing performed or planned...' },
      ]
    },
  ];

  // Auto-save to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('profileBuilderDraft');
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (e) {
        console.error('Failed to load draft');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('profileBuilderDraft', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveDraft = () => {
    localStorage.setItem('profileBuilderDraft', JSON.stringify(formData));
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 2000);
  };

  const toggleSection = (idx) => {
    setExpandedSections(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const goToSection = (idx) => {
    setCurrentSection(idx);
    if (!expandedSections.includes(idx)) {
      setExpandedSections(prev => [...prev, idx]);
    }
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const calculateProgress = () => {
    const allFields = sections.flatMap(s => s.fields);
    const filledFields = allFields.filter(f => formData[f.name]?.trim());
    return Math.round((filledFields.length / allFields.length) * 100);
  };

  const getSectionProgress = (section) => {
    const filled = section.fields.filter(f => formData[f.name]?.trim()).length;
    return Math.round((filled / section.fields.length) * 100);
  };

  const colorClasses = {
    purple: 'from-purple-500 to-indigo-600',
    blue: 'from-blue-500 to-cyan-600',
    green: 'from-green-500 to-emerald-600',
    amber: 'from-amber-500 to-orange-600',
    cyan: 'from-cyan-500 to-teal-600',
    pink: 'from-pink-500 to-rose-600',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-6 md:py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="group flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back</span>
          </button>
          
          <button
            onClick={handleSaveDraft}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 font-medium transition-colors"
          >
            <Save className="w-4 h-4" />
            <span className="hidden sm:inline">Save Draft</span>
          </button>
        </div>

        {/* Save Message */}
        {showSaveMessage && (
          <div className="fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg flex items-center space-x-2 animate-fade-in z-50">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Draft saved!</span>
          </div>
        )}

        {/* Title & Progress */}
        <div className="bg-white rounded-3xl shadow-xl shadow-purple-500/5 p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Device Profile Builder</h1>
              <p className="text-gray-600 mt-1">Build your 510(k) submission profile step by step</p>
            </div>
            
            {/* Overall Progress */}
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="28" fill="none" stroke="#f3f4f6" strokeWidth="6" />
                  <circle
                    cx="32" cy="32" r="28" fill="none"
                    stroke="url(#progressGradient)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${(calculateProgress() / 100) * 176} 176`}
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9333ea" />
                      <stop offset="100%" stopColor="#4f46e5" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-gray-900">{calculateProgress()}%</span>
                </div>
              </div>
              <div className="hidden md:block text-sm text-gray-500">Complete</div>
            </div>
          </div>

          {/* Section Pills - Mobile Horizontal Scroll */}
          <div className="flex overflow-x-auto pb-2 -mx-2 px-2 space-x-2 scrollbar-hide md:flex-wrap md:gap-2 md:space-x-0">
            {sections.map((section, idx) => {
              const Icon = section.icon;
              const progress = getSectionProgress(section);
              const isActive = currentSection === idx;
              
              return (
                <button
                  key={section.id}
                  onClick={() => goToSection(idx)}
                  className={`flex-shrink-0 flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-lg shadow-purple-500/30'
                      : progress === 100
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="whitespace-nowrap">{section.title}</span>
                  {progress === 100 && !isActive && <CheckCircle className="w-4 h-4" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Form Sections */}
        <div className="space-y-4">
          {sections.map((section, sectionIdx) => {
            const Icon = section.icon;
            const isExpanded = expandedSections.includes(sectionIdx);
            const progress = getSectionProgress(section);
            
            return (
              <div key={section.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(sectionIdx)}
                  className={`w-full px-6 py-4 flex items-center justify-between transition-colors ${
                    isExpanded ? 'bg-gradient-to-r from-gray-50 to-white' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorClasses[section.color]} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-gray-900">{section.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${colorClasses[section.color]} transition-all duration-300`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{progress}%</span>
                      </div>
                    </div>
                  </div>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isExpanded ? 'bg-purple-100' : 'bg-gray-100'}`}>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-purple-600" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                  </div>
                </button>

                {/* Section Content */}
                {isExpanded && (
                  <div className="px-6 pb-6 space-y-5">
                    {section.fields.map((field) => (
                      <div key={field.name}>
                        <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                          <span>{field.label}</span>
                          {field.required && <span className="text-red-500">*</span>}
                          {field.help && (
                            <div className="group relative">
                              <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                              <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                                {field.help}
                              </div>
                            </div>
                          )}
                        </label>
                        
                        {field.type === 'select' ? (
                          <select
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white transition-all appearance-none"
                          >
                            <option value="">Select an option...</option>
                            {field.options.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        ) : field.type === 'textarea' ? (
                          <textarea
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            rows={4}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white transition-all resize-none"
                          />
                        ) : (
                          <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white transition-all"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation & Submit */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-4 bg-white/90 backdrop-blur-lg p-4 rounded-2xl shadow-xl border border-gray-100">
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={() => goToSection(Math.max(0, currentSection - 1))}
              disabled={currentSection === 0}
              className="flex-1 sm:flex-none px-5 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            <button
              onClick={() => goToSection(Math.min(sections.length - 1, currentSection + 1))}
              disabled={currentSection === sections.length - 1}
              className="flex-1 sm:flex-none px-5 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium flex items-center justify-center space-x-2"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center justify-center space-x-2 hover:scale-[1.02]"
          >
            <Sparkles className="w-5 h-5" />
            <span>Analyze Profile</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
