// src/views/ResultsView.jsx
import React, { useState } from 'react';
import { 
  Download, Printer, RotateCcw, CheckCircle, Percent, AlertTriangle, Clock,
  FileText, Users, Shield, Wrench, BookOpen, Activity, Target, HelpCircle, 
  ChevronDown, ChevronUp, Lightbulb, MessageCircle
} from 'lucide-react';
import StatCard from '../components/StatCard';
import SectionCard from '../components/SectionCard';

export default function ResultsView({ onReset, file, results }) {
  const data = results || {};
  const [expandedSections, setExpandedSections] = useState([]);

  const iconMap = {
    'FileText': FileText,
    'Users': Users,
    'Shield': Shield,
    'Wrench': Wrench,
    'BookOpen': BookOpen,
    'Activity': Activity,
    'Target': Target,
    'AlertTriangle': AlertTriangle,
    'CheckCircle': CheckCircle,
    'HelpCircle': HelpCircle,
  };

  const getIcon = (iconName) => {
    if (typeof iconName === 'function') return iconName;
    return iconMap[iconName] || FileText;
  };

  const toggleSection = (title) => {
    setExpandedSections(prev =>
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const handlePrint = () => window.print();
  const handleDownload = () => alert('Download functionality would be implemented with backend integration');

  const scoreColor = data.overallScore >= 80 ? 'text-green-500' : data.overallScore >= 60 ? 'text-amber-500' : 'text-red-500';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Compliance Analysis Report</h1>
          <p className="text-gray-600">Your 510(k) document has been analyzed against FDA requirements</p>
        </div>

        {/* Statistics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          <StatCard icon={CheckCircle} value={data.sectionsFound || '8'} label="Sections Found" color="blue" />
          <StatCard icon={Percent} value={data.completeness || '72%'} label="Completeness" color="green" />
          <StatCard icon={AlertTriangle} value={data.criticalIssues || '3'} label="Critical Issues" color="red" />
          <StatCard icon={Clock} value={data.analysisTime || '45s'} label="Analysis Time" color="cyan" />
        </div>

        {/* Overall Score Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-purple-500/5 p-6 md:p-8 mb-8 overflow-hidden">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Compliance Report</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Score Circle */}
            <div className="flex justify-center items-center">
              <div className="relative w-40 h-40 md:w-48 md:h-48">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="85" fill="none" stroke="#f3f4f6" strokeWidth="12" />
                  <circle
                    cx="100"
                    cy="100"
                    r="85"
                    fill="none"
                    stroke="url(#scoreGradient)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${((data.overallScore || 72) / 100) * 534} 534`}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9333ea" />
                      <stop offset="100%" stopColor="#4f46e5" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className={`text-4xl md:text-5xl font-bold ${scoreColor}`}>{data.overallScore || 72}</p>
                    <p className="text-sm text-gray-500 mt-1">Overall Score</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white rounded-2xl p-6 h-full">
                <h5 className="font-bold text-lg mb-3 flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Executive Summary</span>
                </h5>
                <p className="mb-4 leading-relaxed text-purple-100">
                  {data.summaryData?.details || 'Your submission demonstrates a solid foundation but requires attention in several critical areas. Focus on completing the Intended Use section and strengthening your substantial equivalence argument.'}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                    <p className="text-xs text-purple-200">Estimated Work</p>
                    <p className="font-bold text-lg">⚙️ {data.summaryData?.estimatedWork || '2-3 weeks'}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                    <p className="text-xs text-purple-200">Target Date</p>
                    <p className="font-bold text-lg">📅 {data.summaryData?.targetDate || 'Dec 15, 2024'}</p>
                  </div>
                </div>

                <div>
                  <p className="font-bold text-sm mb-2 flex items-center space-x-1">
                    <Lightbulb className="w-4 h-4" />
                    <span>Priority Actions:</span>
                  </p>
                  <ul className="space-y-1 text-sm text-purple-100">
                    {(data.summaryData?.priorityActions || [
                      'Complete Intended Use section with specific indications',
                      'Add predicate device comparison data',
                      'Include biocompatibility test results'
                    ]).map((action, idx) => (
                      <li key={idx}>• {action}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section-by-Section Analysis */}
        <div className="bg-white rounded-3xl shadow-xl shadow-purple-500/5 p-6 md:p-8 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Section-by-Section Analysis</h3>
          </div>

          <div className="space-y-3">
            {(data.sections || [
              { title: 'Device Description', icon: 'FileText', score: 85, severity: 'low', description: 'Well-documented device specifications with clear technical details.', recommendations: ['Add more detail on materials used', 'Include dimensional specifications'] },
              { title: 'Intended Use', icon: 'Target', score: 45, severity: 'critical', description: 'The intended use section lacks specific indications and contraindications.', recommendations: ['Define specific medical indications', 'List all contraindications', 'Specify target patient population'] },
              { title: 'Substantial Equivalence', icon: 'Shield', score: 60, severity: 'high', description: 'Predicate device comparison needs strengthening with more detailed analysis.', recommendations: ['Add side-by-side comparison table', 'Include performance data comparison', 'Address technological differences'] },
              { title: 'Performance Testing', icon: 'Activity', score: 78, severity: 'medium', description: 'Testing documentation is adequate but could be more comprehensive.', recommendations: ['Add statistical analysis details', 'Include sample size justification'] },
              { title: 'Biocompatibility', icon: 'Shield', score: 70, severity: 'medium', description: 'Biocompatibility assessment follows ISO 10993 but missing some tests.', recommendations: ['Complete cytotoxicity testing', 'Add sensitization study results'] },
              { title: 'Labeling', icon: 'BookOpen', score: 90, severity: 'low', description: 'Labeling is comprehensive and follows FDA guidelines.', recommendations: ['Minor formatting updates recommended'] },
            ]).map((section, idx) => (
              <div key={idx} onClick={() => toggleSection(section.title)} className="cursor-pointer">
                <SectionCard
                  icon={getIcon(section.icon)}
                  title={section.title}
                  score={section.score}
                  severity={section.severity}
                  description={section.description}
                  recommendations={section.recommendations}
                  isExpanded={expandedSections.includes(section.title)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={handlePrint}
            className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-semibold flex items-center space-x-2 shadow-sm"
          >
            <Printer className="w-5 h-5" />
            <span>Print Report</span>
          </button>
          <button
            onClick={handleDownload}
            className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-semibold flex items-center space-x-2 shadow-sm"
          >
            <Download className="w-5 h-5" />
            <span>Download PDF</span>
          </button>
          <button
            onClick={onReset}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all font-semibold flex items-center space-x-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Analyze Another</span>
          </button>
        </div>

        {/* Help Section */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-blue-900 mb-1">Need Help Understanding Your Results?</h4>
              <p className="text-blue-700 text-sm">
                Use the chat widget in the bottom right to ask questions about specific FDA requirements, get guidance on any section, or learn more about improving your submission.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
