import React, { useState } from 'react';

const SocialTasks = () => {
  const [activeTab, setActiveTab] = useState('challenges');

  const tabs = [
    { id: 'challenges', label: 'Community Challenges', icon: '🏆' },
    { id: 'groups', label: 'Eco Groups', icon: '👥' },
    { id: 'events', label: 'Events', icon: '📅' },
    { id: 'sharing', label: 'Share & Inspire', icon: '💡' }
  ];

  const challenges = [
    {
      id: 1,
      title: 'Zero Waste Week',
      description: 'Join thousands of users in a week-long challenge to minimize waste',
      participants: 1247,
      daysLeft: 3,
      reward: 500,
      icon: '♻️',
      status: 'active'
    },
    {
      id: 2,
      title: 'Plastic-Free July',
      description: 'Eliminate single-use plastics from your daily routine',
      participants: 892,
      daysLeft: 15,
      reward: 300,
      icon: '🚫',
      status: 'active'
    },
    {
      id: 3,
      title: 'Green Commute Challenge',
      description: 'Use sustainable transportation for a week',
      participants: 567,
      daysLeft: 7,
      reward: 200,
      icon: '🚲',
      status: 'active'
    },
    {
      id: 4,
      title: 'Eco-Friendly Home',
      description: 'Make your home more sustainable with simple changes',
      participants: 234,
      daysLeft: 0,
      reward: 400,
      icon: '🏠',
      status: 'completed'
    }
  ];

  const groups = [
    {
      id: 1,
      name: 'Urban Gardeners',
      members: 156,
      description: 'Share tips on urban gardening and composting',
      icon: '🌱',
      isMember: true
    },
    {
      id: 2,
      name: 'Zero Waste Warriors',
      members: 89,
      description: 'Advanced strategies for zero waste living',
      icon: '♻️',
      isMember: false
    },
    {
      id: 3,
      name: 'Sustainable Fashion',
      members: 234,
      description: 'Eco-friendly clothing and fashion choices',
      icon: '👗',
      isMember: true
    },
    {
      id: 4,
      name: 'Green Tech Enthusiasts',
      members: 67,
      description: 'Technology for environmental conservation',
      icon: '💻',
      isMember: false
    }
  ];

  const events = [
    {
      id: 1,
      title: 'Community Cleanup Day',
      date: '2024-02-15',
      time: '10:00 AM',
      location: 'Central Park',
      participants: 45,
      description: 'Join us for a day of cleaning up our local park',
      icon: '🧹'
    },
    {
      id: 2,
      title: 'Recycling Workshop',
      date: '2024-02-20',
      time: '2:00 PM',
      location: 'Community Center',
      participants: 23,
      description: 'Learn advanced recycling techniques',
      icon: '📚'
    },
    {
      id: 3,
      title: 'Eco-Friendly Market',
      date: '2024-02-25',
      time: '11:00 AM',
      location: 'Downtown Plaza',
      participants: 78,
      description: 'Local vendors selling sustainable products',
      icon: '🛍️'
    }
  ];

  const tips = [
    {
      id: 1,
      title: 'DIY Natural Cleaners',
      content: 'Mix vinegar, baking soda, and essential oils for effective, eco-friendly cleaning solutions.',
      author: 'Sarah Green',
      likes: 45,
      icon: '🧼'
    },
    {
      id: 2,
      title: 'Composting in Small Spaces',
      content: 'Use a small bin with worms for apartment composting. It\'s odor-free and produces great soil!',
      author: 'Mike Eco',
      likes: 32,
      icon: '🪱'
    },
    {
      id: 3,
      title: 'Upcycling Old Clothes',
      content: 'Turn old t-shirts into reusable shopping bags or cleaning rags. Get creative!',
      author: 'Emma Sustainable',
      likes: 28,
      icon: '👕'
    }
  ];

  const renderChallenges = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="card">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">{challenge.icon}</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{challenge.title}</h3>
                <p className="text-sm text-gray-600">{challenge.description}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Participants</span>
                <span className="font-medium">{challenge.participants}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Days Left</span>
                <span className="font-medium">{challenge.daysLeft}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Reward</span>
                <span className="font-semibold text-green-600">+{challenge.reward} pts</span>
              </div>
            </div>
            
            <button
              className={`w-full mt-4 btn ${
                challenge.status === 'active' ? 'btn-primary' : 'btn-secondary'
              }`}
            >
              {challenge.status === 'active' ? 'Join Challenge' : 'Completed'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGroups = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groups.map((group) => (
          <div key={group.id} className="card">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">{group.icon}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{group.name}</h3>
                <p className="text-sm text-gray-600">{group.description}</p>
                <p className="text-xs text-gray-500">{group.members} members</p>
              </div>
            </div>
            
            <button
              className={`w-full btn ${
                group.isMember ? 'btn-outline' : 'btn-primary'
              }`}
            >
              {group.isMember ? 'Leave Group' : 'Join Group'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div key={event.id} className="card">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">{event.icon}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{event.title}</h3>
                <p className="text-sm text-gray-600">{event.description}</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>📅</span>
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>🕒</span>
                <span>{event.time}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>📍</span>
                <span>{event.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>👥</span>
                <span>{event.participants} participants</span>
              </div>
            </div>
            
            <button className="w-full btn btn-primary">
              Join Event
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSharing = () => (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Your Eco Tips</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tip Title
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter a catchy title for your tip"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tip Content
            </label>
            <textarea
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Share your sustainable living tip..."
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Share Tip
          </button>
        </form>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Community Tips</h3>
        {tips.map((tip) => (
          <div key={tip.id} className="card">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-lg">{tip.icon}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">{tip.title}</h4>
                <p className="text-gray-600 mb-3">{tip.content}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">by {tip.author}</span>
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600">
                      <span>👍</span>
                      <span>{tip.likes}</span>
                    </button>
                    <button className="text-gray-500 hover:text-blue-600">
                      💬 Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Social & Community</h1>
          <p className="text-gray-600">
            Connect with like-minded people and participate in environmental challenges
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
          {activeTab === 'challenges' && renderChallenges()}
          {activeTab === 'groups' && renderGroups()}
          {activeTab === 'events' && renderEvents()}
          {activeTab === 'sharing' && renderSharing()}
        </div>
      </div>
    </div>
  );
};

export default SocialTasks;
