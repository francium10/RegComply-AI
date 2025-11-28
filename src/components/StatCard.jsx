// src/components/StatCard.jsx
import React from 'react';

export default function StatCard({ icon: Icon, value, label, color = 'blue' }) {
  const colorClasses = {
    blue: {
      bg: 'from-blue-500 to-blue-600',
      text: 'text-blue-600',
      shadow: 'shadow-blue-500/20',
      light: 'bg-blue-50',
    },
    green: {
      bg: 'from-green-500 to-emerald-600',
      text: 'text-green-600',
      shadow: 'shadow-green-500/20',
      light: 'bg-green-50',
    },
    red: {
      bg: 'from-red-500 to-rose-600',
      text: 'text-red-600',
      shadow: 'shadow-red-500/20',
      light: 'bg-red-50',
    },
    cyan: {
      bg: 'from-cyan-500 to-teal-600',
      text: 'text-cyan-600',
      shadow: 'shadow-cyan-500/20',
      light: 'bg-cyan-50',
    },
    purple: {
      bg: 'from-purple-500 to-indigo-600',
      text: 'text-purple-600',
      shadow: 'shadow-purple-500/20',
      light: 'bg-purple-50',
    },
    amber: {
      bg: 'from-amber-500 to-orange-600',
      text: 'text-amber-600',
      shadow: 'shadow-amber-500/20',
      light: 'bg-amber-50',
    },
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <div className={`group bg-white rounded-2xl p-6 md:p-8 shadow-lg ${colors.shadow} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
      <div className="flex flex-col items-center text-center">
        {/* Icon */}
        <div className={`w-14 h-14 ${colors.light} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <div className={`w-12 h-12 bg-gradient-to-br ${colors.bg} rounded-xl flex items-center justify-center shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        
        {/* Value */}
        <h3 className={`text-3xl md:text-4xl font-bold ${colors.text} mb-2`}>
          {value}
        </h3>
        
        {/* Label */}
        <p className="text-gray-600 text-sm font-medium">{label}</p>
      </div>
    </div>
  );
}
