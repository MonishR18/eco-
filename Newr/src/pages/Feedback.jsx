import React, { useState } from 'react';

const Feedback = () => {
  const [activeTab, setActiveTab] = useState('submit');
  const [formData, setFormData] = useState({
    type: 'general',
    title: '',
    description: '',
    rating: 5,
    category: 'app',
    priority: 'medium'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const tabs = [
    { id: 'submit', label: 'Submit Feedback', icon: '📝' },
    { id: 'history', label: 'My Feedback', icon: '📋' },
    { id: 'faq', label: 'FAQ', icon: '❓' }
  ];

  const feedbackTypes = [
    { id: 'general', label: 'General Feedback', icon: '💬' },
    { id: 'bug', label: 'Bug Report', icon: '🐛' },
    { id: 'feature', label: 'Feature Request', icon: '💡' },
    { id: 'improvement', label: 'Improvement Suggestion', icon: '⚡' }
  ];

  const categories = [
    { id: 'app', label: 'App Functionality' },
    { id: 'ui', label: 'User Interface' },
    { id: 'performance', label: 'Performance' },
    { id: 'content', label: 'Content & Information' },
    { id: 'other', label: 'Other' }
  ];

  const priorities = [
    { id: 'low', label: 'Low', color: 'text-green-600' },
    { id: 'medium', label: 'Medium', color: 'text-yellow-600' },
    { id: 'high', label: 'High', color: 'text-orange-600' },
    { id: 'critical', label: 'Critical', color: 'text-red-600' }
  ];

  // Mock feedback history
  const feedbackHistory = [
    {
      id: 1,
      type: 'feature',
      title: 'Add dark mode support',
      description: 'Would love to see a dark mode option for better user experience.',
      rating: 5,
      category: 'ui',
      priority: 'medium',
      status: 'under_review',
      submittedAt: '2024-01-15T10:30:00Z',
      response: 'Thank you for your suggestion! We are currently evaluating dark mode implementation.'
    },
    {
      id: 2,
      type: 'bug',
      title: 'Points not updating correctly',
      description: 'Points are not updating immediately after sorting waste.',
      rating: 2,
      category: 'app',
      priority: 'high',
      status: 'in_progress',
      submittedAt: '2024-01-10T14:20:00Z',
      response: 'We have identified the issue and are working on a fix. Expected resolution: 1-2 days.'
    },
    {
      id: 3,
      type: 'improvement',
      title: 'Better waste type descriptions',
      description: 'The waste type descriptions could be more detailed with examples.',
      rating: 4,
      category: 'content',
      priority: 'low',
      status: 'completed',
      submittedAt: '2024-01-05T09:15:00Z',
      response: 'We have updated the waste type descriptions with more detailed examples and images.'
    }
  ];

  const faqItems = [
    {
      question: 'How do I report a bug?',
      answer: 'Use the "Submit Feedback" tab and select "Bug Report" as the feedback type. Provide as much detail as possible including steps to reproduce the issue.'
    },
    {
      question: 'How long does it take to get a response?',
      answer: 'We typically respond to feedback within 24-48 hours. Critical issues are prioritized and may receive faster responses.'
    },
    {
      question: 'Can I edit my feedback after submission?',
      answer: 'Currently, feedback cannot be edited after submission. If you need to provide additional information, please submit a new feedback entry referencing the original.'
    },
    {
      question: 'What happens to my feature requests?',
      answer: 'All feature requests are reviewed by our development team. Popular requests are prioritized for future updates. You can track the status in your feedback history.'
    },
    {
      question: 'How can I improve my feedback?',
      answer: 'Be specific, provide examples, and include relevant details like your device type, app version, and steps to reproduce issues. Screenshots are also helpful.'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSuccess(true);
    setLoading(false);
    setFormData({
      type: 'general',
      title: '',
      description: '',
      rating: 5,
      category: 'app',
      priority: 'medium'
    });
    
    setTimeout(() => setSuccess(false), 3000);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      submitted: { label: 'Submitted', color: 'bg-blue-100 text-blue-800' },
      under_review: { label: 'Under Review', color: 'bg-yellow-100 text-yellow-800' },
      in_progress: { label: 'In Progress', color: 'bg-orange-100 text-orange-800' },
      completed: { label: 'Completed', color: 'bg-green-100 text-green-800' },
      declined: { label: 'Declined', color: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status] || statusConfig.submitted;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getTypeIcon = (type) => {
    const typeConfig = feedbackTypes.find(t => t.id === type);
    return typeConfig ? typeConfig.icon : '💬';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderSubmitForm = () => (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Submit Your Feedback</h2>
      
      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          ✅ Thank you for your feedback! We'll review it and get back to you soon.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Feedback Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Feedback Type *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {feedbackTypes.map(type => (
              <label key={type.id} className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="type"
                  value={type.id}
                  checked={formData.type === type.id}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-lg mr-2">{type.icon}</span>
                <span className="text-sm">{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Brief description of your feedback"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Please provide detailed information about your feedback..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                className={`text-2xl ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                ★
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {formData.rating}/5 stars
            </span>
          </div>
        </div>

        {/* Category and Priority */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {priorities.map(priority => (
                <option key={priority.id} value={priority.id}>
                  {priority.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>
      </form>
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">My Feedback History</h2>
        <span className="text-sm text-gray-500">
          {feedbackHistory.length} feedback entries
        </span>
      </div>

      {feedbackHistory.map(feedback => (
        <div key={feedback.id} className="card">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{getTypeIcon(feedback.type)}</span>
              <div>
                <h3 className="font-semibold text-gray-900">{feedback.title}</h3>
                <p className="text-sm text-gray-500">
                  Submitted on {formatDate(feedback.submittedAt)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusBadge(feedback.status)}
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <span key={star} className={star <= feedback.rating ? 'text-yellow-400' : 'text-gray-300'}>
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>

          <p className="text-gray-700 mb-4">{feedback.description}</p>

          {feedback.response && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Response from EcoVision Team:</h4>
              <p className="text-blue-800">{feedback.response}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderFAQ = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
      
      {faqItems.map((item, index) => (
        <div key={index} className="card">
          <h3 className="font-semibold text-gray-900 mb-2">{item.question}</h3>
          <p className="text-gray-700">{item.answer}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">📝 Feedback & Support</h1>
          <p className="text-lg text-gray-600">
            Help us improve EcoVision by sharing your thoughts, reporting issues, or requesting new features.
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="fade-in">
          {activeTab === 'submit' && renderSubmitForm()}
          {activeTab === 'history' && renderHistory()}
          {activeTab === 'faq' && renderFAQ()}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
