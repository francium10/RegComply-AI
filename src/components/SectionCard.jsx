import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

export default function SectionCard({ 
  icon: Icon, 
  title, 
  score, 
  severity, 
  description, 
  recommendations,
  isExpanded = false 
}) {
  const [expanded, setExpanded] = useState(isExpanded);

  const severityStyles = {
    critical: {
      badge: 'bg-red-600 text-white',
      border: 'border-l-4 border-red-600',
      background: 'bg-red-50',
      text: 'text-red-800'
    },
    high: {
      badge: 'bg-yellow-600 text-white',
      border: 'border-l-4 border-yellow-600',
      background: 'bg-yellow-50',
      text: 'text-yellow-800'
    },
    medium: {
      badge: 'bg-cyan-600 text-white',
      border: 'border-l-4 border-cyan-600',
      background: 'bg-cyan-50',
      text: 'text-cyan-800'
    },
    low: {
      badge: 'bg-green-600 text-white',
      border: 'border-l-4 border-green-600',
      background: 'bg-green-50',
      text: 'text-green-800'
    }
  };

  const style = severityStyles[severity];

  return (
    <div className={`${style.border} ${style.background} rounded-lg p-5 mb-4 cursor-pointer transition-all hover:shadow-md`}>
      <div 
        className="flex justify-between items-start"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start space-x-4 flex-1">
          <Icon className="w-6 h-6 mt-1 flex-shrink-0" />
          <div className="text-left">
            <h5 className="font-bold text-lg text-gray-800 flex items-center space-x-2">
              <span>{title}</span>
            </h5>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {score !== undefined && (
            <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
              Score: {score}/100
            </span>
          )}
          <span className={`${style.badge} px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap`}>
            {severity.toUpperCase()}
          </span>
          {expanded ? (
            <ChevronUp className="w-5 h-5 flex-shrink-0" />
          ) : (
            <ChevronDown className="w-5 h-5 flex-shrink-0" />
          )}
        </div>
      </div>

      {expanded && (
        <div className="mt-4 ml-10">
          <p className="text-gray-700 mb-4 text-left">{description}</p>
          
          {severity === 'critical' && (
            <div className="bg-red-100 border border-red-300 rounded p-3 mb-4 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-800 font-semibold text-left">
                <strong>FDA Requirement:</strong> This is a critical section. Missing or inadequate content will result in submission rejection.
              </p>
            </div>
          )}

          {recommendations && recommendations.length > 0 && (
            <div>
              <h6 className="font-bold text-gray-800 mb-3 flex items-center space-x-2 text-left">
                <span>💡</span>
                <span>Recommendations</span>
              </h6>
              <ul className="space-y-2 ml-4 text-left">
                {recommendations.map((rec, idx) => (
                  <li key={idx} className="text-sm text-gray-700 list-disc">
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div> 
  );
}