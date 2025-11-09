import React, { useState, useEffect } from 'react';

export default function LoadingView() {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    'Extracting document sections...',
    'Analyzing against FDA requirements...',
    'Checking compliance standards...',
    'Generating recommendations...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) {
          return prev + 25;
        }
        return prev;
      });
      setMessageIndex(prev => (prev + 1) % messages.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
        {/* Spinner */}
        <div className="flex justify-center mb-8">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full animate-spin opacity-25" />
            <div className="absolute inset-2 bg-white rounded-full" />
            <div className="absolute inset-2 flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Analyzing your document...
        </h2>

        <p className="text-lg text-gray-600 mb-8 min-h-6">
          {messages[messageIndex]}
        </p>

        {/* Progress Bar */}
        <div className="bg-gray-200 rounded-full h-2 overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-purple-800 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm text-gray-500">{progress}% Complete</p>

        {/* Info Cards */}
        <div className="grid grid-cols-3 gap-4 mt-10">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-2xl font-bold text-blue-600">📋</p>
            <p className="text-sm text-gray-600 mt-2">Analyzing Document Structure</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-2xl font-bold text-green-600">✅</p>
            <p className="text-sm text-gray-600 mt-2">Checking Compliance</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-2xl font-bold text-purple-600">🤖</p>
            <p className="text-sm text-gray-600 mt-2">Generating Report</p>
          </div>
        </div>
      </div>
    </div>
  );
}
