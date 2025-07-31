import React, { useState } from 'react';

const LearnHub = () => {
  const [activeTab, setActiveTab] = useState('articles');

  const tabs = [
    { id: 'articles', label: 'Articles', icon: '📖' },
    { id: 'tips', label: 'Daily Tips', icon: '💡' },
    { id: 'videos', label: 'Videos', icon: '🎥' },
    { id: 'resources', label: 'Resources', icon: '📚' }
  ];

  const articles = [
    {
      id: 1,
      title: 'The Complete Guide to Zero Waste Living',
      excerpt: 'Learn how to reduce your household waste by 90% with simple, practical steps.',
      readTime: '8 min read',
      category: 'Zero Waste',
      image: '🌱',
      featured: true
    },
    {
      id: 2,
      title: 'Understanding Recycling Symbols',
      excerpt: 'Decode the numbers and symbols on plastic containers to recycle correctly.',
      readTime: '5 min read',
      category: 'Recycling',
      image: '♻️'
    },
    {
      id: 3,
      title: 'Composting for Beginners',
      excerpt: 'Start composting at home with these easy-to-follow guidelines.',
      readTime: '6 min read',
      category: 'Composting',
      image: '🍃'
    },
    {
      id: 4,
      title: 'Sustainable Shopping Guide',
      excerpt: 'Make eco-friendly choices when shopping for groceries and household items.',
      readTime: '7 min read',
      category: 'Shopping',
      image: '🛍️'
    }
  ];

  const tips = [
    {
      id: 1,
      title: 'Use a Reusable Water Bottle',
      content: 'Save money and reduce plastic waste by carrying a reusable water bottle. You\'ll avoid buying single-use plastic bottles and stay hydrated throughout the day.',
      category: 'Daily Habits',
      icon: '💧'
    },
    {
      id: 2,
      title: 'Bring Your Own Shopping Bags',
      content: 'Keep reusable shopping bags in your car or by the door. This simple habit can save hundreds of plastic bags each year.',
      category: 'Shopping',
      icon: '🛍️'
    },
    {
      id: 3,
      title: 'Turn Off Unused Electronics',
      content: 'Unplug chargers and turn off electronics when not in use. This saves energy and reduces your carbon footprint.',
      category: 'Energy',
      icon: '⚡'
    },
    {
      id: 4,
      title: 'Choose Local and Seasonal Food',
      content: 'Buy local and seasonal produce to reduce transportation emissions and support local farmers.',
      category: 'Food',
      icon: '🥕'
    }
  ];

  const videos = [
    {
      id: 1,
      title: 'How to Sort Waste Properly',
      duration: '3:45',
      thumbnail: '📹',
      description: 'Learn the correct way to sort different types of waste for recycling.',
      views: '12.5K'
    },
    {
      id: 2,
      title: 'DIY Natural Cleaning Products',
      duration: '5:20',
      thumbnail: '🧼',
      description: 'Make your own eco-friendly cleaning products at home.',
      views: '8.9K'
    },
    {
      id: 3,
      title: 'Urban Gardening Tips',
      duration: '7:15',
      thumbnail: '🌱',
      description: 'Grow your own food in small spaces with these urban gardening techniques.',
      views: '15.2K'
    }
  ];

  const resources = [
    {
      id: 1,
      title: 'Waste Sorting Guide',
      type: 'PDF',
      size: '2.3 MB',
      description: 'Comprehensive guide to sorting different types of waste',
      icon: '📄'
    },
    {
      id: 2,
      title: 'Eco-Friendly Product Directory',
      type: 'Web App',
      description: 'Find sustainable alternatives to everyday products',
      icon: '🌍'
    },
    {
      id: 3,
      title: 'Carbon Footprint Calculator',
      type: 'Tool',
      description: 'Calculate your personal carbon footprint',
      icon: '🧮'
    },
    {
      id: 4,
      title: 'Local Recycling Centers Map',
      type: 'Interactive Map',
      description: 'Find recycling centers near you',
      icon: '🗺️'
    }
  ];

  const renderArticles = () => (
    <div className="space-y-6">
      {/* Featured Article */}
      {articles.filter(article => article.featured).map((article) => (
        <div key={article.id} className="card bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">{article.image}</div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Featured
                </span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {article.category}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{article.title}</h3>
              <p className="text-gray-600 mb-3">{article.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{article.readTime}</span>
                <button className="btn btn-primary text-sm">Read Article</button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Other Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.filter(article => !article.featured).map((article) => (
          <div key={article.id} className="card">
            <div className="flex items-center space-x-3 mb-3">
              <div className="text-2xl">{article.image}</div>
              <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                {article.category}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{article.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{article.excerpt}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{article.readTime}</span>
              <button className="btn btn-outline text-sm">Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTips = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tips.map((tip) => (
          <div key={tip.id} className="card">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-xl">{tip.icon}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-gray-900">{tip.title}</h3>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {tip.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{tip.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderVideos = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="card">
            <div className="relative mb-3">
              <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-4xl">{video.thumbnail}</span>
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{video.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{video.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{video.views} views</span>
              <button className="btn btn-primary text-sm">Watch</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource) => (
          <div key={resource.id} className="card">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xl">{resource.icon}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{resource.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>{resource.type}</span>
                  {resource.size && <span>{resource.size}</span>}
                </div>
              </div>
            </div>
            <button className="w-full mt-4 btn btn-outline">
              Access Resource
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Hub</h1>
          <p className="text-gray-600">
            Expand your knowledge about sustainability and environmental conservation
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="fade-in">
          {activeTab === 'articles' && renderArticles()}
          {activeTab === 'tips' && renderTips()}
          {activeTab === 'videos' && renderVideos()}
          {activeTab === 'resources' && renderResources()}
        </div>
      </div>
    </div>
  );
};

export default LearnHub;
