import React, { useState } from 'react';
import Navbar from './components/Navbar';
import UploadView from './views/UploadView';
import ResultsView from './views/ResultsView';
import LoadingView from './views/LoadingView';
import ChatWidget from './components/ChatWidget';
import Footer from './components/Footer';

export default function App() {
  const [view, setView] = useState('upload'); // 'upload', 'loading', 'results'
  const [selectedFile, setSelectedFile] = useState(null);

  const handleAnalyze = (file) => {
    setSelectedFile(file);
    setView('loading');
    // Simulate analysis time
    setTimeout(() => {
      setView('results');
    }, 4000);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setView('upload');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {view === 'upload' && <UploadView onAnalyze={handleAnalyze} />}
        {view === 'loading' && <LoadingView />}
        {view === 'results' && <ResultsView onReset={handleReset} file={selectedFile} />}
      </main>

      <ChatWidget />
      <Footer />
    </div>
  );
}
