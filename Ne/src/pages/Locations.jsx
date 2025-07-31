import React, { useState } from 'react';

const Locations = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Locations', icon: '📍' },
    { id: 'recycling', label: 'Recycling Centers', icon: '♻️' },
    { id: 'composting', label: 'Composting Sites', icon: '🌱' },
    { id: 'hazardous', label: 'Hazardous Waste', icon: '⚠️' },
    { id: 'electronics', label: 'E-Waste', icon: '💻' },
    { id: 'businesses', label: 'Eco Businesses', icon: '🏢' }
  ];

  const locations = [
  {
    id: 1,
      name: 'Green Earth Recycling Center',
      category: 'recycling',
      address: '123 Eco Street, Downtown',
      phone: '(555) 123-4567',
      hours: 'Mon-Sat: 8AM-6PM',
      distance: '0.8 miles',
      rating: 4.8,
      accepts: ['Plastic', 'Paper', 'Glass', 'Metal'],
      description: 'Full-service recycling center with drive-through drop-off.',
      coordinates: { lat: 40.7128, lng: -74.0060 }
  },
  {
    id: 2,
      name: 'Community Composting Hub',
      category: 'composting',
      address: '456 Garden Lane, Westside',
      phone: '(555) 234-5678',
      hours: 'Daily: 7AM-7PM',
      distance: '1.2 miles',
      rating: 4.6,
      accepts: ['Food Waste', 'Yard Waste', 'Coffee Grounds'],
      description: 'Community composting facility with educational programs.',
      coordinates: { lat: 40.7589, lng: -73.9851 }
  },
  {
    id: 3,
      name: 'Safe Disposal Hazardous Waste',
      category: 'hazardous',
      address: '789 Safety Drive, Industrial District',
      phone: '(555) 345-6789',
      hours: 'Tue-Sat: 9AM-5PM',
      distance: '2.1 miles',
      rating: 4.9,
      accepts: ['Batteries', 'Paint', 'Chemicals', 'Fluorescent Bulbs'],
      description: 'Licensed hazardous waste disposal facility.',
      coordinates: { lat: 40.7505, lng: -73.9934 }
    },
    {
      id: 4,
      name: 'Tech Recycle E-Waste Center',
      category: 'electronics',
      address: '321 Tech Boulevard, Innovation District',
      phone: '(555) 456-7890',
      hours: 'Mon-Fri: 10AM-6PM',
      distance: '1.5 miles',
      rating: 4.7,
      accepts: ['Computers', 'Phones', 'TVs', 'Appliances'],
      description: 'Specialized electronic waste recycling with data destruction.',
      coordinates: { lat: 40.7484, lng: -73.9857 }
    },
    {
      id: 5,
      name: 'Eco-Friendly Market',
      category: 'businesses',
      address: '654 Green Avenue, Shopping District',
      phone: '(555) 567-8901',
      hours: 'Daily: 9AM-9PM',
      distance: '0.5 miles',
      rating: 4.5,
      accepts: ['Bulk Items', 'Packaging', 'Returns'],
      description: 'Zero-waste grocery store with bulk items and package-free options.',
      coordinates: { lat: 40.7614, lng: -73.9776 }
    },
    {
      id: 6,
      name: 'City Recycling Drop-off',
      category: 'recycling',
      address: '987 Municipal Way, City Center',
      phone: '(555) 678-9012',
      hours: 'Mon-Sun: 6AM-10PM',
      distance: '0.3 miles',
      rating: 4.3,
      accepts: ['Plastic', 'Paper', 'Glass', 'Metal', 'Cardboard'],
      description: '24/7 automated recycling drop-off center.',
      coordinates: { lat: 40.7589, lng: -73.9851 }
    }
  ];

  const filteredLocations = locations.filter(location => {
    const matchesCategory = selectedCategory === 'all' || location.category === selectedCategory;
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : '📍';
  };

  const getRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">📍 Find Eco-Friendly Locations</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover nearby recycling centers, composting sites, and eco-friendly businesses. 
            Find the perfect place to dispose of your waste responsibly.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Locations
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search by name or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="md:w-64">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="card mb-8">
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Interactive Map</h3>
              <p className="text-gray-500">Map integration would show all locations here</p>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {filteredLocations.length} Location{filteredLocations.length !== 1 ? 's' : ''} Found
          </h2>
        </div>

        {/* Location Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocations.map(location => (
            <div key={location.id} className="card hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getCategoryIcon(location.category)}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{location.name}</h3>
                    <p className="text-sm text-green-600 font-medium">{location.distance}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {getRatingStars(location.rating)}
                  <span className="text-sm text-gray-500 ml-1">({location.rating})</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 flex items-center">
                    <span className="mr-2">📍</span>
                    {location.address}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 flex items-center">
                    <span className="mr-2">📞</span>
                    {location.phone}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 flex items-center">
                    <span className="mr-2">🕒</span>
                    {location.hours}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Accepts:</strong>
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {location.accepts.map(item => (
                      <span
                        key={item}
                        className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-gray-600">{location.description}</p>

                <div className="flex space-x-2 pt-2">
                  <button className="flex-1 btn btn-primary text-sm">
                    Get Directions
                  </button>
                  <button className="flex-1 btn btn-outline text-sm">
                    Save Location
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredLocations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No locations found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Tips Section */}
        <div className="mt-12 card bg-blue-50 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">💡 Tips for Visiting</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <p><strong>Before you go:</strong></p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Check operating hours and requirements</li>
                <li>Sort your items properly</li>
                <li>Bring identification if required</li>
              </ul>
            </div>
            <div>
              <p><strong>What to bring:</strong></p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Clean, sorted materials</li>
                <li>Reusable containers</li>
                <li>Proof of residency (if needed)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;
