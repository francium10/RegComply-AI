// src/components/FileUploadZone.jsx
import React, { useRef, useState, useCallback } from 'react';
import { Cloud, X, Folder, FileText, CheckCircle, AlertCircle, Upload } from 'lucide-react';

export default function FileUploadZone({ onFileSelect, selectedFile, onClear }) {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const [error, setError] = useState('');

  const validateFile = (file) => {
    setError('');
    
    // Check file type
    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      setError('Please upload a PDF file');
      return false;
    }
    
    // Check file size (16MB max)
    const maxSize = 16 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File size must be less than 16MB');
      return false;
    }
    
    return true;
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => prev + 1);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => {
      if (prev - 1 === 0) {
        setIsDragOver(false);
      }
      return prev - 1;
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    setDragCounter(0);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  }, [onFileSelect]);

  const handleFileInputChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
    // Reset input so same file can be selected again
    e.target.value = '';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleClear = () => {
    setError('');
    onClear();
  };

  return (
    <div className="relative">
      {/* Main Upload Card */}
      <div className={`bg-white rounded-2xl p-6 md:p-8 shadow-lg border-2 transition-all duration-300 ${
        selectedFile 
          ? 'border-green-200' 
          : isDragOver 
            ? 'border-purple-400 shadow-purple-100' 
            : 'border-gray-100 hover:border-purple-200'
      }`}>
        <h3 className="text-xl md:text-2xl font-bold text-center mb-6 text-gray-900">
          Upload Your 510(k) Document
        </h3>
        
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2 animate-shake">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
        
        {!selectedFile ? (
          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-2xl p-8 md:p-12 text-center cursor-pointer transition-all duration-300 ${
              isDragOver
                ? 'border-purple-500 bg-purple-50 scale-[1.02]'
                : 'border-gray-300 bg-gray-50 hover:border-purple-400 hover:bg-purple-50/50'
            }`}
          >
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileInputChange}
              className="hidden"
            />
            
            {/* Decorative corners */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-purple-300 rounded-tl-lg" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-purple-300 rounded-tr-lg" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-purple-300 rounded-bl-lg" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-purple-300 rounded-br-lg" />
            
            {/* Upload Icon */}
            <div className={`relative mx-auto w-20 h-20 mb-6 transition-transform duration-300 ${isDragOver ? 'scale-110' : ''}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl opacity-20 blur-xl" />
              <div className="relative w-full h-full bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                {isDragOver ? (
                  <Upload className="w-10 h-10 text-white animate-bounce" />
                ) : (
                  <Cloud className="w-10 h-10 text-white" />
                )}
              </div>
            </div>
            
            <h5 className="text-lg font-semibold text-gray-800 mb-2">
              {isDragOver ? 'Drop your file here!' : 'Drag & Drop your PDF here'}
            </h5>
            <p className="text-gray-500 mb-6">or click anywhere to browse</p>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105"
            >
              <Folder className="w-5 h-5" />
              <span>Select File</span>
            </button>
            
            <p className="text-gray-400 mt-6 text-sm">
              Maximum file size: 16MB • PDF only
            </p>
          </div>
        ) : (
          /* Selected File Display */
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-5 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* File Icon */}
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30">
                    <FileText className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                {/* File Info */}
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 truncate max-w-[200px] md:max-w-xs">
                    {selectedFile.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(selectedFile.size)} • Ready to analyze
                  </p>
                </div>
              </div>
              
              {/* Remove Button */}
              <button
                onClick={handleClear}
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
                aria-label="Remove file"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
