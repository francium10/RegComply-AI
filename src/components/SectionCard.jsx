// src/components/SectionCard.jsx
import React from 'react';
import { ChevronDown, ChevronUp, AlertCircle, Lightbulb } from 'lucide-react';

export default function SectionCard({ 
  icon: Icon, 
  title, 
  score, 
  severity, 
  description, 
  recommendations,
  isExpanded = false 
}) {
  const severityStyles = {
    critical: {
      badge: 'bg-gradient-to-r from-red-500 to-rose-600 text-white',
      border: 'border-l-4 border-red-500',
      background: 'bg-gradient-to-r from-red-50 to-rose-50',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
    high: {
      badge: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
      border: 'border-l-4 border-amber-500',
      background: 'bg-gradient-to-r from-amber-50 to-orange-50',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
    },
    medium: {
      badge: 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white',
      border: 'border-l-4 border-cyan-500',
      background: 'bg-gradient-to-r from-cyan-50 to-blue-50',
      iconBg: 'bg-cyan-100',
      iconColor: 'text-cyan-600',
    },
    low: {
      badge: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
      border: 'border-l-4 border-green-500',
      background: 'bg-gradient-to-r from-green-50 to-emerald-50',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    }
  };

  const style = severityStyles[severity] || severityStyles.medium;

  return (
    <div className={`${style.border} ${style.background} rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md`}>
      {/* Header - Always visible */}
      <div className="p-4 md:p-5">
        <div className="flex items-start justify-between gap-4">
          {/* Left side - Icon and Title */}
          <div className="flex items-start space-x-3 md:space-x-4 flex-1 min-w-0">
            <div className={`${style.iconBg} w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
              <Icon className={`w-5 h-5 md:w-6 md:h-6 ${style.iconColor}`} />
            </div>
            <div className="min-w-0 flex-1">
              <h5 className="font-bold text-base md:text-lg text-gray-900 truncate">
                {title}
              </h5>
              {!isExpanded && description && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-1 hidden md:block">
                  {description}
                </p>
              )}
            </div>
          </div>
          
          {/* Right side - Score, Badge, Chevron */}
          <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
            {score !== undefined && (
              <span className="hidden sm:inline-flex items-center bg-white/80 backdrop-blur-sm text-gray-700 px-3 py-1.5 rounded-lg text-sm font-semibold border border-gray-200">
                {score}/100
              </span>
            )}
            <span className={`${style.badge} px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold uppercase tracking-wide shadow-sm`}>
              {severity}
            </span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isExpanded ? 'bg-gray-100' : 'hover:bg-gray-100'}`}>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </div>
          </div>
        </div>

        {/* Mobile Score */}
        {score !== undefined && (
          <div className="sm:hidden mt-3 flex items-center space-x-2">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${
                  score >= 80 ? 'bg-green-500' : 
                  score >= 60 ? 'bg-amber-500' : 'bg-red-500'
                } transition-all duration-500`}
                style={{ width: `${score}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-gray-600">{score}/100</span>
          </div>
        )}
      </div>

      {/* Expandable Content */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 md:px-5 pb-4 md:pb-5 pt-0">
          {/* Divider */}
          <div className="border-t border-gray-200/50 mb-4" />
          
          {/* Description */}
          <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-4">
            {description}
          </p>
          
          {/* Critical Warning */}
          {severity === 'critical' && (
            <div className="bg-red-100 border border-red-200 rounded-xl p-4 mb-4 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-red-800">FDA Requirement</p>
                <p className="text-sm text-red-700 mt-1">
                  This is a critical section. Missing or inadequate content will result in submission rejection.
                </p>
              </div>
            </div>
          )}

          {/* Recommendations */}
          {recommendations && recommendations.length > 0 && (
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
              <h6 className="font-bold text-gray-900 mb-3 flex items-center space-x-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                <span>Recommendations</span>
              </h6>
              <ul className="space-y-2">
                {recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
