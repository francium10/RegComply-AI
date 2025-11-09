import React, { useRef, useState } from 'react';
import { Cloud, X, Folder } from 'lucide-react';

export default function FileUploadZone({ onFileSelect, selectedFile, onClear }) {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-12 shadow-lg">
      <h3 className="text-2xl font-bold text-center mb-6">Upload Your 510(k) Document</h3>
      
      {!selectedFile ? (
        <>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-3 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all ${
              isDragOver
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300 bg-gray-50 hover:border-purple-500 hover:bg-blue-50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileInputChange}
              className="hidden"
            />
            
            <Cloud className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h5 className="text-lg font-semibold text-gray-800 mb-2">
              Drag & Drop your PDF here
            </h5>
            <p className="text-gray-600 mb-4">or click to browse</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="px-6 py-2 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors inline-flex items-center space-x-2"
            >
              <Folder className="w-4 h-4" />
              <span>Select File</span>
            </button>
            <p className="text-gray-500 mt-4 text-sm">
              Maximum file size: 16MB | PDF only
            </p>
          </div>
        </>
      ) : (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">
              PDF
            </div>
            <span className="font-semibold text-gray-800">{selectedFile.name}</span>
          </div>
          <button
            onClick={onClear}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
