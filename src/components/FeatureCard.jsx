// src/components/FeatureCard.jsx
import React from 'react';

export default function FeatureCard({ icon: Icon, title, description, color = 'purple' }) {
  const colorClasses = {
    purple: 'from-purple-500 to-indigo-600 shadow-purple-500/30',
    green: 'from-green-500 to-emerald-600 shadow-green-500/30',
    blue: 'from-blue-500 to-cyan-600 shadow-blue-500/30',
    amber: 'from-amber-500 to-orange-600 shadow-amber-500/30',
  };

  return (
    <div className="group text-center p-4 md:p-6 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-xl">
      <div className={`relative w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 bg-gradient-to-br ${colorClasses[color]} rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}>
        <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
      </div>
      <h5 className="text-base md:text-lg font-bold text-gray-900 mb-2">{title}</h5>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
