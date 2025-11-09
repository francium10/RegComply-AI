import { 
  Heart, 
  Target, 
  Scale, 
  Beaker, 
  Tag, 
  Microscope 
} from 'lucide-react';

export const complianceData = {
  overallScore: 62,
  sectionsFound: '4/6',
  completeness: '66.7%',
  criticalIssues: 2,
  analysisTime: '47s',

  sections: [
    {
      icon: Heart,
      title: 'Device Description',
      score: 85,
      severity: 'low',
      description: 'Section is well-documented with comprehensive device specifications. Minor improvements can enhance clarity on technical specifications.',
      recommendations: [
        'Add more detail on materials composition (specific polymers used)',
        'Include dimensional specifications with tolerances',
        'Reference applicable ISO standards for device classification'
      ]
    },
    {
      icon: Target,
      title: 'Intended Use',
      score: 92,
      severity: 'low',
      description: 'Excellent description of intended use and indications. Clear patient population definition and usage scenarios provided.',
      recommendations: [
        'Consider adding contraindications section',
        'Specify age range for intended patient population'
      ]
    },
    {
      icon: Scale,
      title: 'Substantial Equivalence',
      score: undefined,
      severity: 'critical',
      description: 'CRITICAL: Substantial Equivalence section is completely missing from your document. This is a required section per 21 CFR 807.87.',
      recommendations: [
        'Identify predicate device: Find a legally marketed device with same intended use',
        'Comparison table: Create side-by-side comparison of technological characteristics',
        'Performance data: Demonstrate equivalent or better performance compared to predicate',
        'Cite predicate 510(k): Include predicate K-number and clearance date',
        'Review FDA guidance: "The 510(k) Program: Evaluating Substantial Equivalence"'
      ]
    },
    {
      icon: Beaker,
      title: 'Performance Testing',
      score: 58,
      severity: 'medium',
      description: 'Basic testing data provided but missing several critical test protocols. Bench testing results incomplete.',
      recommendations: [
        'Add shelf-life testing data (accelerated aging per ASTM F1980)',
        'Include sterilization validation protocol and results',
        'Add mechanical durability testing (fatigue, stress testing)',
        'Provide statistical analysis of test results (mean, SD, confidence intervals)',
        'Reference applicable consensus standards (ISO 10993, ISO 14971)'
      ]
    },
    {
      icon: Tag,
      title: 'Labeling',
      score: 78,
      severity: 'low',
      description: 'Labeling section adequately addresses key requirements. Instructions for use and warnings are present.',
      recommendations: [
        'Ensure all warnings comply with 21 CFR 801 requirements',
        'Add storage conditions and expiration dating to label',
        'Include symbols explanation per ISO 15223-1'
      ]
    },
    {
      icon: Microscope,
      title: 'Biocompatibility',
      score: undefined,
      severity: 'critical',
      description: 'CRITICAL: Biocompatibility section is missing. For devices with patient contact, this is required per ISO 10993-1.',
      recommendations: [
        'Risk assessment: Conduct biological evaluation per ISO 10993-1',
        'Testing required: Cytotoxicity, sensitization, irritation (minimum for limited contact)',
        'Extended contact: If >24 hours contact, add systemic toxicity, genotoxicity testing',
        'Material characterization: Provide chemical characterization of patient-contacting materials',
        'Review FDA guidance: "Use of ISO 10993-1 for Medical Devices"'
      ]
    }
  ],

  summaryData: {
    headline: 'Your submission needs improvements',
    details: 'Focus on the highlighted sections. Critical gaps identified in Substantial Equivalence and Biocompatibility sections.',
    estimatedWork: '4 hours',
    targetDate: 'Nov 24, 2024',
    priorityActions: [
      'Complete Substantial Equivalence section',
      'Add Biocompatibility testing data'
    ]
  }
};
