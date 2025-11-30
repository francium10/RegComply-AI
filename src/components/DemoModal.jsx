// src/components/DemoModal.jsx
import React, { useState, useEffect } from 'react';
import { 
  X, Play, Pause, ChevronLeft, ChevronRight, Upload, FileText, 
  Zap, CheckCircle, AlertTriangle, MessageCircle, Target, Shield,
  Clock, BarChart3, Sparkles, ArrowRight
} from 'lucide-react';

export default function DemoModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const steps = [
    {
      id: 'upload',
      title: 'Upload Your Document',
      description: 'Simply drag and drop your 510(k) PDF or use our guided profile builder to input your device information.',
      color: 'purple',
    },
    {
      id: 'analyze',
      title: 'AI-Powered Analysis',
      description: 'Our advanced AI scans your document against FDA requirements, checking for completeness and compliance issues.',
      color: 'blue',
    },
    {
      id: 'results',
      title: 'Get Detailed Results',
      description: 'Receive a comprehensive compliance report with scores, identified gaps, and prioritized recommendations.',
      color: 'green',
    },
    {
      id: 'chat',
      title: 'Ask Questions',
      description: 'Use our AI assistant to get instant answers about FDA requirements and guidance on improving your submission.',
      color: 'cyan',
    },
  ];

  // Auto-advance steps when playing
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setProgress(0);
      return;
    }

    if (!isPlaying) return;

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setCurrentStep(current => (current + 1) % steps.length);
          return 0;
        }
        return prev + 2;
      });
    }, 80);

    return () => clearInterval(progressInterval);
  }, [isOpen, isPlaying, steps.length]);

  const goToStep = (idx) => {
    setCurrentStep(idx);
    setProgress(0);
  };

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
    setProgress(0);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
    setProgress(0);
  };

  if (!isOpen) return null;

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Product Demo</h3>
              <p className="text-sm text-gray-500">See how RegComply AI works</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Content */}
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left - Animated Preview */}
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-1 overflow-hidden">
              {/* Browser Chrome */}
              <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-t-xl">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <div className="flex-1 mx-4">
                  <div className="bg-gray-700 rounded-lg px-3 py-1 text-xs text-gray-400 max-w-[200px]">
                    regcomplyai.org
                  </div>
                </div>
              </div>
              
              {/* Screen Content */}
              <div className="bg-gray-50 rounded-b-xl aspect-[4/3] overflow-hidden relative">
                {/* Step 1: Upload */}
                <div className={`absolute inset-0 p-4 transition-all duration-500 ${currentStep === 0 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}>
                  <UploadDemo />
                </div>

                {/* Step 2: Analyze */}
                <div className={`absolute inset-0 p-4 transition-all duration-500 ${currentStep === 1 ? 'opacity-100 translate-x-0' : currentStep < 1 ? 'opacity-0 translate-x-full' : 'opacity-0 -translate-x-full'}`}>
                  <AnalyzeDemo />
                </div>

                {/* Step 3: Results */}
                <div className={`absolute inset-0 p-4 transition-all duration-500 ${currentStep === 2 ? 'opacity-100 translate-x-0' : currentStep < 2 ? 'opacity-0 translate-x-full' : 'opacity-0 -translate-x-full'}`}>
                  <ResultsDemo />
                </div>

                {/* Step 4: Chat */}
                <div className={`absolute inset-0 p-4 transition-all duration-500 ${currentStep === 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
                  <ChatDemo />
                </div>
              </div>
            </div>

            {/* Right - Step Info */}
            <div className="flex flex-col">
              {/* Step Indicator */}
              <div className="flex items-center space-x-2 mb-6">
                {steps.map((step, idx) => (
                  <button
                    key={step.id}
                    onClick={() => goToStep(idx)}
                    className="flex-1 relative"
                  >
                    <div className={`h-1.5 rounded-full transition-colors ${
                      idx <= currentStep ? 'bg-purple-200' : 'bg-gray-200'
                    }`}>
                      <div 
                        className={`h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-100 ${
                          idx < currentStep ? 'w-full' : idx === currentStep ? '' : 'w-0'
                        }`}
                        style={{ width: idx === currentStep ? `${progress}%` : idx < currentStep ? '100%' : '0%' }}
                      />
                    </div>
                  </button>
                ))}
              </div>

              {/* Step Number */}
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                  currentStepData.color === 'purple' ? 'from-purple-500 to-indigo-600 shadow-purple-500/30' :
                  currentStepData.color === 'blue' ? 'from-blue-500 to-cyan-600 shadow-blue-500/30' :
                  currentStepData.color === 'green' ? 'from-green-500 to-emerald-600 shadow-green-500/30' :
                  'from-cyan-500 to-teal-600 shadow-cyan-500/30'
                }`}>
                  {currentStep + 1}
                </div>
                <div className="text-sm text-gray-500">Step {currentStep + 1} of {steps.length}</div>
              </div>

              {/* Step Title & Description */}
              <h4 className="text-2xl font-bold text-gray-900 mb-3">{currentStepData.title}</h4>
              <p className="text-gray-600 leading-relaxed mb-8">{currentStepData.description}</p>

              {/* Features for current step */}
              <div className="space-y-3 mb-8">
                {currentStep === 0 && (
                  <>
                    <FeatureItem icon={Upload} text="Drag & drop PDF upload" />
                    <FeatureItem icon={FileText} text="Or use guided profile builder" />
                    <FeatureItem icon={Shield} text="Secure & HIPAA compliant" />
                  </>
                )}
                {currentStep === 1 && (
                  <>
                    <FeatureItem icon={Zap} text="Analysis in under 60 seconds" />
                    <FeatureItem icon={Target} text="Checks against FDA requirements" />
                    <FeatureItem icon={BarChart3} text="Section-by-section evaluation" />
                  </>
                )}
                {currentStep === 2 && (
                  <>
                    <FeatureItem icon={CheckCircle} text="Overall compliance score" />
                    <FeatureItem icon={AlertTriangle} text="Critical issues highlighted" />
                    <FeatureItem icon={FileText} text="Actionable recommendations" />
                  </>
                )}
                {currentStep === 3 && (
                  <>
                    <FeatureItem icon={MessageCircle} text="Ask any FDA question" />
                    <FeatureItem icon={Sparkles} text="AI-powered responses" />
                    <FeatureItem icon={Clock} text="Available 24/7" />
                  </>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={prevStep}
                    className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-gray-50 transition"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl transition ${
                      isPlaying 
                        ? 'bg-purple-100 text-purple-600' 
                        : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={nextStep}
                    className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-gray-50 transition"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center space-x-2"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
}

// Feature item component
function FeatureItem({ icon: Icon, text }) {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
        <Icon className="w-4 h-4 text-purple-600" />
      </div>
      <span className="text-sm text-gray-700">{text}</span>
    </div>
  );
}

// Demo Screen Components
function UploadDemo() {
  const [isDragging, setIsDragging] = useState(false);
  const [hasFile, setHasFile] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setIsDragging(true), 500);
    const timer2 = setTimeout(() => {
      setIsDragging(false);
      setHasFile(true);
    }, 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      setIsDragging(false);
      setHasFile(false);
    };
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="text-xs font-semibold text-gray-500 mb-2">UPLOAD DOCUMENT</div>
      <div className={`flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all ${
        isDragging ? 'border-purple-500 bg-purple-50 scale-[1.02]' : hasFile ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white'
      }`}>
        {hasFile ? (
          <div className="text-center animate-fade-in">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm font-semibold text-gray-800">510k_submission.pdf</p>
            <p className="text-xs text-gray-500">2.4 MB • Ready to analyze</p>
          </div>
        ) : (
          <div className="text-center">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 transition-colors ${
              isDragging ? 'bg-purple-500' : 'bg-gray-200'
            }`}>
              <Upload className={`w-6 h-6 ${isDragging ? 'text-white animate-bounce' : 'text-gray-500'}`} />
            </div>
            <p className="text-sm text-gray-600">
              {isDragging ? 'Drop your file here!' : 'Drag & drop your PDF'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function AnalyzeDemo() {
  const [progress, setProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState(0);
  const tasks = ['Extracting sections...', 'Checking compliance...', 'Analyzing content...', 'Generating report...'];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 4;
      });
      setCurrentTask(prev => (prev + 1) % tasks.length);
    }, 200);

    return () => {
      clearInterval(interval);
      setProgress(0);
      setCurrentTask(0);
    };
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center">
      {/* Spinner */}
      <div className="relative w-20 h-20 mb-4">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="35" fill="none" stroke="#e5e7eb" strokeWidth="6" />
          <circle
            cx="40" cy="40" r="35" fill="none"
            stroke="url(#demoGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${(progress / 100) * 220} 220`}
            className="transition-all duration-200"
          />
          <defs>
            <linearGradient id="demoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9333ea" />
              <stop offset="100%" stopColor="#4f46e5" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-purple-600">{Math.min(progress, 100)}%</span>
        </div>
      </div>
      
      <p className="text-sm font-semibold text-gray-800 mb-1">Analyzing Document</p>
      <p className="text-xs text-gray-500 h-4">{tasks[currentTask]}</p>
      
      {/* Progress bar */}
      <div className="w-full max-w-[200px] h-1.5 bg-gray-200 rounded-full mt-4 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function ResultsDemo() {
  const [showItems, setShowItems] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowItems(prev => Math.min(prev + 1, 4));
    }, 300);

    return () => {
      clearInterval(interval);
      setShowItems(0);
    };
  }, []);

  const sections = [
    { name: 'Device Description', score: 85, color: 'green' },
    { name: 'Intended Use', score: 45, color: 'red' },
    { name: 'Substantial Equivalence', score: 72, color: 'yellow' },
    { name: 'Biocompatibility', score: 90, color: 'green' },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Score Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-xs font-semibold text-gray-500">COMPLIANCE SCORE</div>
          <div className="text-2xl font-bold text-purple-600">72/100</div>
        </div>
        <div className="flex items-center space-x-1 text-xs">
          <AlertTriangle className="w-3 h-3 text-amber-500" />
          <span className="text-gray-600">3 issues found</span>
        </div>
      </div>

      {/* Section Scores */}
      <div className="flex-1 space-y-2">
        {sections.map((section, idx) => (
          <div 
            key={section.name}
            className={`bg-white rounded-lg p-2 shadow-sm border-l-4 transition-all duration-300 ${
              idx < showItems ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            } ${
              section.color === 'green' ? 'border-green-500' :
              section.color === 'red' ? 'border-red-500' : 'border-amber-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-700">{section.name}</span>
              <span className={`text-xs font-bold ${
                section.color === 'green' ? 'text-green-600' :
                section.color === 'red' ? 'text-red-600' : 'text-amber-600'
              }`}>{section.score}%</span>
            </div>
            <div className="h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  section.color === 'green' ? 'bg-green-500' :
                  section.color === 'red' ? 'bg-red-500' : 'bg-amber-500'
                }`}
                style={{ width: idx < showItems ? `${section.score}%` : '0%' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatDemo() {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setMessages([{ type: 'user', text: 'What are the main 510(k) sections?' }]);
      setTyping(true);
    }, 300);

    const timer2 = setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: 'The main 510(k) sections include: Device Description, Intended Use, Substantial Equivalence, Performance Testing, and Labeling...' 
      }]);
    }, 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      setMessages([]);
      setTyping(false);
    };
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
          <MessageCircle className="w-3 h-3 text-white" />
        </div>
        <span className="text-xs font-semibold text-gray-700">FDA Compliance Assistant</span>
      </div>

      <div className="flex-1 bg-white rounded-xl p-3 space-y-2 overflow-hidden">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div className={`max-w-[80%] px-3 py-2 rounded-xl text-xs ${
              msg.type === 'user' 
                ? 'bg-purple-600 text-white rounded-br-md' 
                : 'bg-gray-100 text-gray-700 rounded-bl-md'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-gray-100 rounded-xl rounded-bl-md px-3 py-2">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="mt-2 flex items-center space-x-2">
        <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2 text-xs text-gray-400">
          Ask a question...
        </div>
        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
          <ArrowRight className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
}