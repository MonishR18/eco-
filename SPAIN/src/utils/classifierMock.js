// Mock AI classifier for waste sorting
// In a real implementation, this would connect to a machine learning API

const wasteKeywords = {
  plastic: [
    'bottle', 'container', 'bag', 'wrapper', 'packaging', 'straw', 'cup', 'plate',
    'fork', 'spoon', 'knife', 'toy', 'bucket', 'basket', 'box', 'lid', 'cap'
  ],
  metal: [
    'can', 'aluminum', 'steel', 'tin', 'foil', 'wire', 'nail', 'screw', 'bolt',
    'key', 'coin', 'jewelry', 'tool', 'pipe', 'sheet', 'rod'
  ],
  organic: [
    'apple', 'banana', 'orange', 'vegetable', 'fruit', 'bread', 'rice', 'pasta',
    'meat', 'fish', 'egg', 'coffee', 'tea', 'leaf', 'flower', 'grass', 'wood'
  ],
  'e-waste': [
    'phone', 'laptop', 'computer', 'tablet', 'charger', 'cable', 'battery',
    'remote', 'tv', 'monitor', 'keyboard', 'mouse', 'headphone', 'speaker'
  ],
  glass: [
    'bottle', 'jar', 'window', 'mirror', 'lamp', 'vase', 'bowl', 'cup',
    'plate', 'container', 'tube', 'lens'
  ],
  paper: [
    'newspaper', 'magazine', 'book', 'cardboard', 'box', 'envelope', 'letter',
    'notebook', 'paper', 'tissue', 'napkin', 'bag', 'wrapper'
  ]
};

const confidenceLevels = [0.85, 0.92, 0.78, 0.95, 0.88, 0.82];

export const classifyWaste = async (imageFile) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
  
  // Mock classification based on file name or random selection
  const fileName = imageFile.name.toLowerCase();
  
  // Try to match keywords in filename
  let detectedType = null;
  for (const [type, keywords] of Object.entries(wasteKeywords)) {
    if (keywords.some(keyword => fileName.includes(keyword))) {
      detectedType = type;
      break;
    }
  }
  
  // If no match found, randomly select a type
  if (!detectedType) {
    const types = Object.keys(wasteKeywords);
    detectedType = types[Math.floor(Math.random() * types.length)];
  }
  
  // Add some randomness to make it more realistic
  const confidence = confidenceLevels[Math.floor(Math.random() * confidenceLevels.length)];
  
  // Sometimes return a different type to simulate classification errors
  const shouldError = Math.random() < 0.1; // 10% error rate
  if (shouldError) {
    const types = Object.keys(wasteKeywords).filter(type => type !== detectedType);
    detectedType = types[Math.floor(Math.random() * types.length)];
  }
  
  return {
    type: detectedType,
    confidence: confidence,
    alternatives: generateAlternatives(detectedType),
    processingTime: Math.random() * 2 + 1
  };
};

const generateAlternatives = (primaryType) => {
  const types = Object.keys(wasteKeywords).filter(type => type !== primaryType);
  const numAlternatives = Math.floor(Math.random() * 2) + 1; // 1-2 alternatives
  const alternatives = [];
  
  for (let i = 0; i < numAlternatives; i++) {
    const randomType = types[Math.floor(Math.random() * types.length)];
    alternatives.push({
      type: randomType,
      confidence: Math.random() * 0.3 + 0.1 // 10-40% confidence
    });
  }
  
  return alternatives;
};

export const classifyWasteFromText = (description) => {
  const lowerDesc = description.toLowerCase();
  
  // Try to match keywords in description
  for (const [type, keywords] of Object.entries(wasteKeywords)) {
    if (keywords.some(keyword => lowerDesc.includes(keyword))) {
      return {
        type: type,
        confidence: 0.85 + Math.random() * 0.1,
        alternatives: generateAlternatives(type),
        processingTime: Math.random() * 0.5 + 0.2
      };
    }
  }
  
  // Default to plastic if no match
  return {
    type: 'plastic',
    confidence: 0.6,
    alternatives: generateAlternatives('plastic'),
    processingTime: Math.random() * 0.5 + 0.2
  };
}; 