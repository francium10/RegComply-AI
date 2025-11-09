import React, { useState } from 'react';
import { Download, Printer, RotateCcw, CheckCircle, Percent, AlertTriangle, Clock } from 'lucide-react';
import StatCard from '../components/StatCard';
import SectionCard from '../components/SectionCard';
import { complianceData } from '../utils/mockData';

export default function ResultsView({ onReset, file }) {
  const [expandedSections, setExpandedSections] = useState(['Substantial Equivalence', 'Biocompatibility']);

  const toggleSection = (title) => {
    setExpandedSections(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert('Download functionality would be implemented with backend integration');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Statistics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard
          icon={CheckCircle}
          value={complianceData.sectionsFound}
          label="Sections Found"
          color="blue"
        />
        <StatCard
          icon={Percent}
          value={complianceData.completeness}
          label="Completeness"
          color="green"
        />
        <StatCard
          icon={AlertTriangle}
          value={complianceData.criticalIssues}
          label="Critical Issues"
          color="red"
        />
        <StatCard
          icon={Clock}
          value={complianceData.analysisTime}
          label="Analysis Time"
          color="cyan"
        />
      </div>

      {/* Overall Score Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">
        <h3 className="text-2xl font-bold mb-8 flex items-center space-x-2">
          <span>📊</span>
          <span>Compliance Report</span>
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Score Circle */}
          <div className="flex justify-center items-center">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                {/* Background circle */}
                <circle cx="100" cy="100" r="90" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                {/* Progress circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  strokeDasharray={`${(complianceData.overallScore / 100) * 565.48} 565.48`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#9333ea" />
                    <stop offset="100%" stopColor="#6b21a8" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-5xl font-bold text-purple-600">{complianceData.overallScore}</p>
                  <p className="text-sm text-gray-600 mt-1">Overall Score</p>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-2 bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-lg p-6">
            <h5 className="font-bold text-lg mb-3 flex items-center space-x-2">
              <span>✓</span>
              <span>Executive Summary</span>
            </h5>
            <p className="mb-4 leading-relaxed">{complianceData.summaryData.details}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-purple-200">Estimated Work</p>
                <p className="font-bold text-lg">⚙️ {complianceData.summaryData.estimatedWork}</p>
              </div>
              <div>
                <p className="text-sm text-purple-200">Target Date</p>
                <p className="font-bold text-lg">📅 {complianceData.summaryData.targetDate}</p>
              </div>
            </div>

            <div>
              <p className="font-bold text-sm mb-2">🎯 Priority Actions:</p>
              <ul className="space-y-1 text-left">
                {complianceData.summaryData.priorityActions.map((action, idx) => (
                  <li key={idx} className="text-sm ml-0">• {action}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Section-by-Section Analysis */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">
        <h3 className="text-2xl font-bold mb-6 flex items-center space-x-2">
          <span>📋</span>
          <span>Section-by-Section Analysis</span>
        </h3>

        <div className="space-y-2">
          {complianceData.sections.map((section, idx) => (
            <div key={idx}>
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full text-left"
              >
                <SectionCard
                  icon={section.icon}
                  title={section.title}
                  score={section.score}
                  severity={section.severity}
                  description={section.description}
                  recommendations={section.recommendations}
                  isExpanded={expandedSections.includes(section.title)}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <button
          onClick={handlePrint}
          className="px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-semibold flex items-center space-x-2"
        >
          <Printer className="w-5 h-5" />
          <span>Print Report</span>
        </button>
        <button
          onClick={handleDownload}
          className="px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-semibold flex items-center space-x-2"
        >
          <Download className="w-5 h-5" />
          <span>Download PDF</span>
        </button>
        <button
          onClick={onReset}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg hover:shadow-lg transition-all font-semibold flex items-center space-x-2"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Analyze Another Document</span>
        </button>
      </div>

      {/* Help Section */}
      <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
        <h4 className="font-bold text-blue-900 mb-2">💡 Need Help?</h4>
        <p className="text-blue-800 text-sm">
          Use the chat widget in the bottom right to ask questions about specific FDA requirements, get guidance on any section, or learn more about improving your submission.
        </p>
      </div>
    </div>
  );
}