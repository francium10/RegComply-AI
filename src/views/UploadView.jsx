import React, { useState } from 'react';
import { Zap, DollarSign, CheckCircle } from 'lucide-react';
import FileUploadZone from '../components/FileUploadZone';
import FeatureCard from '../components/FeatureCard';

export default function UploadView({ onAnalyze }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleClearFile = () => {
    setSelectedFile(null);
  };

  const handleAnalyzeClick = () => {
    if (selectedFile) {
      onAnalyze(selectedFile);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="bg-white rounded-2xl p-10 shadow-lg mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Content */}
          <div>
            <h1 className="text-5xl font-bold mb-6 text-gray-900">
              Accelerate Your FDA Submission
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              AI-powered compliance checking for 510(k) submissions. Get instant feedback in minutes, not weeks. Save thousands in consultant fees.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-3 gap-6">
              <FeatureCard
                icon={Zap}
                title="60 Second Analysis"
                description="Instant compliance checking"
              />
              <FeatureCard
                icon={DollarSign}
                title="80% Cost Savings"
                description="$499 vs $15,000 consultants"
              />
              <FeatureCard
                icon={CheckCircle}
                title="FDA Compliant"
                description="Based on official guidance"
              />
            </div>
          </div>

          {/* Right - Upload Zone */}
          <div>
            <FileUploadZone
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile}
              onClear={handleClearFile}
            />

            {/* Analyze Button */}
            <button
              onClick={handleAnalyzeClick}
              disabled={!selectedFile}
              className={`w-full mt-6 py-3 rounded-lg font-bold text-white transition-all flex items-center justify-center space-x-2 ${
                selectedFile
                  ? 'bg-gradient-to-r from-purple-600 to-purple-800 hover:shadow-lg transform hover:scale-105'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              <span>🔍</span>
              <span>Analyze Document</span>
            </button>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="font-bold text-lg text-gray-900 mb-2">How It Works</h3>
          <p className="text-gray-600 text-sm">
            Upload your 510(k) document and our AI instantly analyzes it against FDA requirements, identifying gaps and providing actionable recommendations.
          </p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="font-bold text-lg text-gray-900 mb-2">What You Get</h3>
          <p className="text-gray-600 text-sm">
            Detailed compliance report with section-by-section analysis, severity levels, specific FDA citations, and prioritized recommendations for improvements.
          </p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="font-bold text-lg text-gray-900 mb-2">Next Steps</h3>
          <p className="text-gray-600 text-sm">
            Use our recommendations to strengthen your submission, then chat with our AI assistant for detailed guidance on any specific FDA requirements.
          </p>
        </div>
      </div>
    </div>
  );
}
