export const badges = [
  {
    id: 1,
    name: "🌱 Seedling",
    description: "Just getting started on your eco-journey",
    requirement: 0,
    points: 0,
    color: "#10B981",
    unlocked: true
  },
  {
    id: 2,
    name: "🌿 Sprout",
    description: "Growing your environmental awareness",
    requirement: 50,
    points: 50,
    color: "#059669",
    unlocked: false
  },
  {
    id: 3,
    name: "🌳 Tree",
    description: "Making a real impact on waste reduction",
    requirement: 150,
    points: 150,
    color: "#047857",
    unlocked: false
  },
  {
    id: 4,
    name: "🌲 Forest",
    description: "A true environmental champion",
    requirement: 300,
    points: 300,
    color: "#065F46",
    unlocked: false
  },
  {
    id: 5,
    name: "🌏 Guardian",
    description: "Protector of our planet",
    requirement: 500,
    points: 500,
    color: "#064E3B",
    unlocked: false
  }
];

export const getCurrentBadge = (points) => {
  const sortedBadges = [...badges].sort((a, b) => b.requirement - a.requirement);
  return sortedBadges.find(badge => points >= badge.requirement) || badges[0];
};

export const getNextBadge = (points) => {
  const sortedBadges = [...badges].sort((a, b) => a.requirement - b.requirement);
  return sortedBadges.find(badge => points < badge.requirement) || badges[badges.length - 1];
};

export const getProgressPercentage = (points) => {
  const currentBadge = getCurrentBadge(points);
  const nextBadge = getNextBadge(points);
  
  if (currentBadge.id === badges[badges.length - 1].id) {
    return 100;
  }
  
  const currentRequirement = currentBadge.requirement;
  const nextRequirement = nextBadge.requirement;
  const progress = points - currentRequirement;
  const total = nextRequirement - currentRequirement;
  
  return Math.min(100, Math.max(0, (progress / total) * 100));
};

export const getPointsForWasteType = (wasteType) => {
  const pointValues = {
    'organic': 10,
    'plastic': 15,
    'metal': 20,
    'glass': 25,
    'paper': 10,
    'e-waste': 30
  };
  
  return pointValues[wasteType] || 10;
}; 