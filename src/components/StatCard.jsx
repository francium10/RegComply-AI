import React from 'react';

export default function StatCard({ icon: Icon, value, label, color = 'blue' }) {
  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600',
    cyan: 'text-cyan-600'
  };

  return (
    <div className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-lg transition-shadow">
      <Icon className={`w-8 h-8 ${colorClasses[color]} mx-auto mb-3`} />
      <h3 className={`text-4xl font-bold ${colorClasses[color]} mb-2`}>{value}</h3>
      <p className="text-gray-600 text-sm">{label}</p>
    </div>
  );
}
