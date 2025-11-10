import React from 'react';
import { FileText, Shield } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-purple-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 text-white text-xl font-bold">
            <FileText className="w-6 h-6" />
            <span>RegComply AI</span>
          </div>
          <div className="flex items-center space-x-2 text-white">
            <Shield className="w-5 h-5" />
            <span className="text-sm">510(k) Document Analyzer</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
