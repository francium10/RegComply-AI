import React from 'react';

export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="text-center">
      <div className="text-5xl text-purple-600 mb-4 flex justify-center">
        <Icon className="w-12 h-12" />
      </div>
      <h5 className="text-lg font-bold text-gray-800 mb-2">{title}</h5>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
