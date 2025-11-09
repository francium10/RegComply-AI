export function getBotResponse(userMessage) {
  const responses = {
    'main sections': `<strong>510(k) Main Sections:</strong><br><br>
      <strong>1. Device Description</strong> - Detailed specifications and design<br>
      <strong>2. Intended Use</strong> - Patient population and indications<br>
      <strong>3. Substantial Equivalence</strong> - Comparison to predicate device<br>
      <strong>4. Performance Testing</strong> - Bench testing and data<br>
      <strong>5. Labeling</strong> - Instructions for use and warnings<br>
      <strong>6. Biocompatibility</strong> - ISO 10993 testing results<br><br>
      Each section must meet specific FDA requirements per 21 CFR 807.87.`,
    
    'substantial equivalence': `<strong>Substantial Equivalence (SE)</strong> means your device has:<br><br>
      ✅ The <strong>same intended use</strong> as a legally marketed predicate device<br>
      ✅ <strong>Same technological characteristics</strong> OR different characteristics that don't raise safety/effectiveness concerns<br><br>
      <strong>What you need:</strong><br>
      • Identify a legally marketed predicate (with K-number)<br>
      • Create side-by-side comparison table<br>
      • Show performance data demonstrating equivalence<br>
      • Address any technological differences<br><br>
      <em>Tip: Use FDA's 510(k) database to find similar devices!</em>`,
    
    'rejection': `<strong>Top reasons for 510(k) rejection:</strong><br><br>
      🚫 <strong>Missing critical sections</strong> (32% of cases)<br>
      • Incomplete substantial equivalence comparison<br>
      • Missing biocompatibility data<br>
      • Inadequate performance testing<br><br>
      🚫 <strong>Inadequate predicate comparison</strong><br>
      • Wrong or invalid predicate device<br>
      • Insufficient technological comparison<br><br>
      🚫 <strong>Regulatory non-compliance</strong><br>
      • Not following 21 CFR 807 requirements<br>
      • Missing references to applicable standards<br><br>
      <strong>Pro tip:</strong> Use our AI analyzer to catch these issues before submission!`,
    
    'biocompatibility': `<strong>Biocompatibility Testing (ISO 10993-1):</strong><br><br>
      <strong>Required for devices with patient contact:</strong><br>
      • Cytotoxicity (cell toxicity)<br>
      • Sensitization (allergic reactions)<br>
      • Irritation or intracutaneous reactivity<br><br>
      <strong>For prolonged contact (>24 hours), also add:</strong><br>
      • Systemic toxicity<br>
      • Genotoxicity<br>
      • Implantation testing<br><br>
      <strong>What to include in 510(k):</strong><br>
      ✓ Biological risk assessment<br>
      ✓ Material characterization<br>
      ✓ Test reports from ISO 17025 accredited labs<br>
      ✓ Justification for test selection`,
    
    'performance testing': `<strong>Performance Testing Requirements:</strong><br><br>
      <strong>Bench Testing:</strong><br>
      • Mechanical testing (durability, fatigue)<br>
      • Shelf life/stability testing<br>
      • Sterilization validation<br>
      • Software verification & validation<br><br>
      <strong>Standards to reference:</strong><br>
      • ASTM F1980 (accelerated aging)<br>
      • ISO 14971 (risk management)<br>
      • ISO 13485 (quality management)<br><br>
      <strong>Statistical requirements:</strong><br>
      • Sample sizes with rationale<br>
      • Mean, standard deviation, confidence intervals<br>
      • Pass/fail criteria`,
    
    'timeline': `<strong>510(k) Review Timeline:</strong><br><br>
      📅 <strong>FDA Target:</strong> 90 days for standard review<br>
      ⏱️ <strong>Reality:</strong> 3-12 months average<br><br>
      <strong>Breakdown:</strong><br>
      • Administrative review: 15 days<br>
      • Substantive review: 60-90 days<br>
      • Additional info requests: +30-60 days each<br>
      • Final decision: 30 days after final submission`,
    
    'cost': `<strong>510(k) Submission Costs:</strong><br><br>
      💰 <strong>FDA User Fees (2024):</strong><br>
      • Standard: $6,250 | Small business: $1,563<br><br>
      💰 <strong>Development & Testing:</strong><br>
      • Performance testing: $20K-$100K<br>
      • Biocompatibility: $15K-$50K<br>
      • Clinical studies: $100K-$1M+<br><br>
      💰 <strong>Regulatory Consultants:</strong><br>
      • Traditional: $15K-$25K per submission<br>
      • <strong>Our AI Tool: $499</strong> 🎉`,
    
    'default': `I can help you with:<br><br>
      • <strong>510(k) sections</strong> and requirements<br>
      • <strong>Substantial equivalence</strong> guidance<br>
      • <strong>Performance testing</strong> protocols<br>
      • <strong>Biocompatibility</strong> requirements<br>
      • <strong>Common rejection</strong> reasons<br>
      • <strong>Submission timeline</strong> and costs<br><br>
      Try asking about any of these topics, or ask a specific question about your submission!`
  };

  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('section') || lowerMessage.includes('what are') || lowerMessage.includes('main')) {
    return responses['main sections'];
  } else if (lowerMessage.includes('substantial') || lowerMessage.includes('equivalence') || lowerMessage.includes('predicate')) {
    return responses['substantial equivalence'];
  } else if (lowerMessage.includes('reject') || lowerMessage.includes('refus') || lowerMessage.includes('fail')) {
    return responses['rejection'];
  } else if (lowerMessage.includes('biocompat') || lowerMessage.includes('iso 10993')) {
    return responses['biocompatibility'];
  } else if (lowerMessage.includes('perform') || lowerMessage.includes('test')) {
    return responses['performance testing'];
  } else if (lowerMessage.includes('time') || lowerMessage.includes('long') || lowerMessage.includes('timeline')) {
    return responses['timeline'];
  } else if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('expensive')) {
    return responses['cost'];
  } else {
    return responses['default'];
  }
}
