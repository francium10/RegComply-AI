// src/views/ProfileBuilder.jsx
import React, { useState } from 'react';
import { 
  FileText, Target, Scale, TestTube, Tag, Shield, 
  ChevronDown, ChevronUp, Save, ArrowLeft, Send,
  HelpCircle, CheckCircle
} from 'lucide-react';

export default function ProfileBuilder({ onSubmit, onBack }) {
  const [activeSection, setActiveSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state for all sections
  const [formData, setFormData] = useState({
    // Device Description
    deviceName: '',
    deviceType: '',
    productCode: '',
    regulatoryClass: 'Class II',
    physicalDescription: '',
    materials: '',
    dimensions: '',
    components: '',
    
    // Intended Use
    intendedUse: '',
    indicationsForUse: '',
    patientPopulation: '',
    contraindications: '',
    useEnvironment: '',
    userProfile: '',
    
    // Substantial Equivalence
    predicateDevice: '',
    predicateKNumber: '',
    comparisonSimilarities: '',
    comparisonDifferences: '',
    technologicalCharacteristics: '',
    
    // Performance Testing
    benchTesting: '',
    performanceStandards: '',
    testResults: '',
    shelfLife: '',
    sterilization: '',
    
    // Labeling
    labelingText: '',
    instructionsForUse: '',
    warnings: '',
    storageConditions: '',
    
    // Biocompatibility
    patientContact: '',
    contactDuration: '',
    biocompatibilityTests: '',
    materialsCharacterization: '',
  });

  const sections = [
    {
      id: 'device',
      title: 'Device Description',
      icon: FileText,
      description: 'Basic information about your medical device',
      fields: [
        { name: 'deviceName', label: 'Device Trade Name', type: 'text', required: true, placeholder: 'e.g., CardioMonitor Pro 3000' },
        { name: 'deviceType', label: 'Device Type', type: 'text', required: true, placeholder: 'e.g., Cardiac Monitor, Surgical Instrument' },
        { name: 'productCode', label: 'FDA Product Code (if known)', type: 'text', placeholder: 'e.g., DPS, LZS' },
        { name: 'regulatoryClass', label: 'Regulatory Class', type: 'select', required: true, options: ['Class I', 'Class II', 'Class III'] },
        { name: 'physicalDescription', label: 'Physical Description', type: 'textarea', required: true, placeholder: 'Describe the physical characteristics, appearance, and form factor of your device...' },
        { name: 'materials', label: 'Materials of Construction', type: 'textarea', required: true, placeholder: 'List all materials used (e.g., stainless steel 316L, medical-grade silicone, ABS plastic)...' },
        { name: 'dimensions', label: 'Dimensions & Specifications', type: 'textarea', placeholder: 'Size, weight, power requirements, etc.' },
        { name: 'components', label: 'Key Components', type: 'textarea', placeholder: 'List major components and accessories...' },
      ]
    },
    {
      id: 'intended',
      title: 'Intended Use',
      icon: Target,
      description: 'How your device is meant to be used',
      fields: [
        { name: 'intendedUse', label: 'Intended Use Statement', type: 'textarea', required: true, placeholder: 'The [Device Name] is intended for use in [specific purpose]...' },
        { name: 'indicationsForUse', label: 'Indications for Use', type: 'textarea', required: true, placeholder: 'Specific conditions, diseases, or patient needs the device addresses...' },
        { name: 'patientPopulation', label: 'Patient Population', type: 'textarea', required: true, placeholder: 'Age range, conditions, exclusions (e.g., Adults 18+, pediatric patients excluded)...' },
        { name: 'contraindications', label: 'Contraindications', type: 'textarea', placeholder: 'Conditions or situations where the device should NOT be used...' },
        { name: 'useEnvironment', label: 'Environment of Use', type: 'text', placeholder: 'e.g., Hospital, Clinic, Home use, Operating room' },
        { name: 'userProfile', label: 'Intended User', type: 'text', placeholder: 'e.g., Healthcare professional, Patient self-use, Trained technician' },
      ]
    },
    {
      id: 'equivalence',
      title: 'Substantial Equivalence',
      icon: Scale,
      description: 'Comparison to predicate device',
      fields: [
        { name: 'predicateDevice', label: 'Predicate Device Name', type: 'text', required: true, placeholder: 'Name of the legally marketed predicate device' },
        { name: 'predicateKNumber', label: 'Predicate 510(k) Number', type: 'text', required: true, placeholder: 'e.g., K123456' },
        { name: 'comparisonSimilarities', label: 'Similarities to Predicate', type: 'textarea', required: true, placeholder: 'How is your device similar to the predicate in intended use, design, materials, etc.?' },
        { name: 'comparisonDifferences', label: 'Differences from Predicate', type: 'textarea', required: true, placeholder: 'What are the differences? Explain why they don\'t raise new safety/effectiveness questions...' },
        { name: 'technologicalCharacteristics', label: 'Technological Characteristics', type: 'textarea', placeholder: 'Design, materials, energy source, software, etc.' },
      ]
    },
    {
      id: 'testing',
      title: 'Performance Testing',
      icon: TestTube,
      description: 'Testing and validation data',
      fields: [
        { name: 'benchTesting', label: 'Bench Testing Performed', type: 'textarea', placeholder: 'Describe bench/lab tests conducted...' },
        { name: 'performanceStandards', label: 'Applicable Standards', type: 'textarea', placeholder: 'List standards followed (e.g., ISO 13485, IEC 60601, ASTM F2129)...' },
        { name: 'testResults', label: 'Key Test Results', type: 'textarea', placeholder: 'Summary of test outcomes and pass/fail criteria...' },
        { name: 'shelfLife', label: 'Shelf Life / Stability Testing', type: 'textarea', placeholder: 'If applicable, describe shelf life claims and testing per ASTM F1980...' },
        { name: 'sterilization', label: 'Sterilization Method', type: 'textarea', placeholder: 'If applicable, describe sterilization method and validation...' },
      ]
    },
    {
      id: 'labeling',
      title: 'Labeling',
      icon: Tag,
      description: 'Device labeling and instructions',
      fields: [
        { name: 'labelingText', label: 'Device Label Content', type: 'textarea', placeholder: 'What appears on the device label/packaging?' },
        { name: 'instructionsForUse', label: 'Instructions for Use Summary', type: 'textarea', required: true, placeholder: 'Key points from your IFU document...' },
        { name: 'warnings', label: 'Warnings & Precautions', type: 'textarea', required: true, placeholder: 'List all warnings and precautions per 21 CFR 801...' },
        { name: 'storageConditions', label: 'Storage Conditions', type: 'text', placeholder: 'e.g., Store at room temperature (15-30°C), Keep dry' },
      ]
    },
    {
      id: 'biocompatibility',
      title: 'Biocompatibility',
      icon: Shield,
      description: 'Biological safety assessment',
      fields: [
        { name: 'patientContact', label: 'Type of Patient Contact', type: 'select', options: ['No patient contact', 'Surface contact (skin)', 'Surface contact (mucosal membrane)', 'External communicating (blood path indirect)', 'External communicating (blood path direct)', 'Implant (tissue/bone)', 'Implant (blood)'] },
        { name: 'contactDuration', label: 'Contact Duration', type: 'select', options: ['Limited (< 24 hours)', 'Prolonged (24 hours - 30 days)', 'Permanent (> 30 days)'] },
        { name: 'biocompatibilityTests', label: 'Biocompatibility Tests Performed', type: 'textarea', placeholder: 'List tests conducted per ISO 10993-1 (e.g., cytotoxicity, sensitization, irritation)...' },
        { name: 'materialsCharacterization', label: 'Materials Characterization', type: 'textarea', placeholder: 'Chemical characterization of materials in contact with patient...' },
      ]
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? -1 : index);
  };

  const getSectionProgress = (sectionIndex) => {
    const section = sections[sectionIndex];
    const requiredFields = section.fields.filter(f => f.required);
    if (requiredFields.length === 0) return 100;
    
    const filledRequired = requiredFields.filter(f => formData[f.name]?.trim()).length;
    return Math.round((filledRequired / requiredFields.length) * 100);
  };

  const getOverallProgress = () => {
    const allRequired = sections.flatMap(s => s.fields.filter(f => f.required));
    const filledRequired = allRequired.filter(f => formData[f.name]?.trim()).length;
    return Math.round((filledRequired / allRequired.length) * 100);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      alert('Submission failed: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    const allRequired = sections.flatMap(s => s.fields.filter(f => f.required));
    return allRequired.every(f => formData[f.name]?.trim());
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-8 shadow-lg mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              510(k) Product Profile Builder
            </h1>
            <p className="text-gray-600">
              Don't have a document? Build your device profile using our structured template.
            </p>
          </div>
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Upload</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Overall Progress</span>
            <span className="font-semibold text-purple-600">{getOverallProgress()}%</span>
          </div>
          <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-purple-800 transition-all duration-500"
              style={{ width: `${getOverallProgress()}%` }}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-purple-50 rounded-lg p-3">
            <p className="text-2xl font-bold text-purple-600">{sections.length}</p>
            <p className="text-xs text-gray-600">Sections</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <p className="text-2xl font-bold text-green-600">
              {sections.filter((_, i) => getSectionProgress(i) === 100).length}
            </p>
            <p className="text-xs text-gray-600">Completed</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-2xl font-bold text-blue-600">
              {sections.flatMap(s => s.fields.filter(f => f.required)).length}
            </p>
            <p className="text-xs text-gray-600">Required Fields</p>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4 mb-8">
        {sections.map((section, index) => {
          const Icon = section.icon;
          const progress = getSectionProgress(index);
          const isActive = activeSection === index;
          
          return (
            <div key={section.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(index)}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    progress === 100 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-purple-100 text-purple-600'
                  }`}>
                    {progress === 100 ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg text-gray-900">{section.title}</h3>
                    <p className="text-sm text-gray-500">{section.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <span className={`text-sm font-semibold ${
                      progress === 100 ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {progress}%
                    </span>
                    <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className={`h-full rounded-full transition-all ${
                          progress === 100 ? 'bg-green-500' : 'bg-purple-600'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  {isActive ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              {/* Section Content */}
              {isActive && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="pt-6 space-y-6">
                    {section.fields.map((field) => (
                      <div key={field.name}>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        
                        {field.type === 'textarea' ? (
                          <textarea
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleInputChange}
                            placeholder={field.placeholder}
                            rows={4}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                          />
                        ) : field.type === 'select' ? (
                          <select
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                          >
                            <option value="">Select...</option>
                            {field.options.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleInputChange}
                            placeholder={field.placeholder}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Section */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <HelpCircle className="w-5 h-5 text-blue-500" />
            <p className="text-sm text-gray-600">
              Complete all required fields (*) to generate your compliance analysis.
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => {
                localStorage.setItem('profileDraft', JSON.stringify(formData));
                alert('Draft saved!');
              }}
              className="px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition font-semibold flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>Save Draft</span>
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isFormValid() || isSubmitting}
              className={`px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 transition ${
                isFormValid() && !isSubmitting
                  ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
              <span>{isSubmitting ? 'Analyzing...' : 'Analyze Profile'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
        <h4 className="font-bold text-blue-900 mb-2">💡 Tips for Best Results</h4>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>• Be as specific as possible in your descriptions</li>
          <li>• Include exact material specifications and standards</li>
          <li>• Reference your predicate device's 510(k) number accurately</li>
          <li>• List all applicable FDA guidance documents and standards</li>
        </ul>
      </div>
    </div>
  );
}
