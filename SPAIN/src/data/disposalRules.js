export const disposalRules = {
  plastic: {
    name: "Plastic",
    category: "Non-Biodegradable",
    color: "#3B82F6",
    icon: "🥤",
    instructions: [
      "Rinse thoroughly to remove food residue",
      "Check the recycling number (1-7) on the bottom",
      "Remove caps and labels if possible",
      "Flatten to save space",
      "Place in designated plastic recycling bin"
    ],
    tips: [
      "Not all plastics are recyclable - check local guidelines",
      "Plastic bags should be returned to grocery stores",
      "Avoid mixing different types of plastic"
    ],
    ecoFact: "Only 9% of all plastic ever produced has been recycled."
  },
  
  metal: {
    name: "Metal",
    category: "Recyclable",
    color: "#F59E0B",
    icon: "🥫",
    instructions: [
      "Rinse thoroughly to remove food residue",
      "Crush cans to save space",
      "Remove any non-metal parts",
      "Separate aluminum from steel",
      "Place in metal recycling bin"
    ],
    tips: [
      "Aluminum cans are infinitely recyclable",
      "Scrap metal can often be sold for money",
      "Check for hazardous materials before recycling"
    ],
    ecoFact: "Recycling one aluminum can saves enough energy to power a TV for 3 hours."
  },
  
  organic: {
    name: "Organic",
    category: "Biodegradable",
    color: "#10B981",
    icon: "🍎",
    instructions: [
      "Remove any non-organic materials",
      "Cut large items into smaller pieces",
      "Layer with dry materials (leaves, paper)",
      "Keep compost pile moist but not wet",
      "Turn regularly for proper decomposition"
    ],
    tips: [
      "Avoid meat, dairy, and oily foods in home compost",
      "Use finished compost as natural fertilizer",
      "Composting reduces methane emissions from landfills"
    ],
    ecoFact: "Organic waste in landfills produces methane, a greenhouse gas 25 times more potent than CO2."
  },
  
  "e-waste": {
    name: "E-Waste",
    category: "Hazardous",
    color: "#EF4444",
    icon: "📱",
    instructions: [
      "Remove all personal data from devices",
      "Remove batteries if possible",
      "Do not throw in regular trash",
      "Find certified e-waste recycler",
      "Consider donation if still functional"
    ],
    tips: [
      "Many electronics stores offer trade-in programs",
      "Some manufacturers have take-back programs",
      "E-waste contains valuable metals like gold and silver"
    ],
    ecoFact: "Only 20% of e-waste is properly recycled globally."
  },
  
  glass: {
    name: "Glass",
    category: "Recyclable",
    color: "#8B5CF6",
    icon: "🍾",
    instructions: [
      "Rinse thoroughly to remove residue",
      "Remove caps and lids",
      "Separate by color if required",
      "Do not break glass",
      "Place in glass recycling bin"
    ],
    tips: [
      "Glass is 100% recyclable and can be recycled endlessly",
      "Different colored glass may need separate bins",
      "Broken glass should be wrapped before disposal"
    ],
    ecoFact: "Glass can be recycled endlessly without loss in quality or purity."
  },
  
  paper: {
    name: "Paper",
    category: "Recyclable",
    color: "#6B7280",
    icon: "📄",
    instructions: [
      "Remove any non-paper materials",
      "Keep paper clean and dry",
      "Flatten cardboard boxes",
      "Separate different types if required",
      "Place in paper recycling bin"
    ],
    tips: [
      "Paper with food residue should be composted, not recycled",
      "Shredded paper may need special handling",
      "Waxed paper is not recyclable"
    ],
    ecoFact: "Paper recycling saves 17 trees and 7,000 gallons of water per ton of paper."
  }
};

export const getDisposalRule = (wasteType) => {
  return disposalRules[wasteType] || disposalRules.plastic;
}; 