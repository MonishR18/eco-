import React, { useState } from 'react';

const Privacy = () => {
  const [activeSection, setActiveSection] = useState('privacy');

  const sections = [
    { id: 'privacy', label: 'Privacy Policy', icon: '🔒' },
    { id: 'terms', label: 'Terms of Service', icon: '📋' },
    { id: 'data', label: 'Data Usage', icon: '📊' },
    { id: 'cookies', label: 'Cookies Policy', icon: '🍪' }
  ];

  const privacyPolicy = {
    lastUpdated: 'January 15, 2024',
    sections: [
      {
        title: 'Information We Collect',
        content: [
          'Personal information (name, email address) when you create an account',
          'Waste sorting data and environmental impact metrics',
          'Usage analytics and app interaction data',
          'Device information and app performance data'
        ]
      },
      {
        title: 'How We Use Your Information',
        content: [
          'To provide and improve our waste sorting services',
          'To calculate your eco-score and track environmental impact',
          'To personalize your experience and provide relevant content',
          'To communicate with you about app updates and features',
          'To ensure app security and prevent fraud'
        ]
      },
      {
        title: 'Information Sharing',
        content: [
          'We do not sell, trade, or rent your personal information',
          'We may share anonymized data for research and environmental studies',
          'We may share information with service providers who assist in app operation',
          'We may disclose information if required by law or to protect our rights'
        ]
      },
      {
        title: 'Data Security',
        content: [
          'We implement industry-standard security measures',
          'Your data is encrypted during transmission and storage',
          'We regularly review and update our security practices',
          'We limit access to personal information to authorized personnel only'
        ]
      },
      {
        title: 'Your Rights',
        content: [
          'Access and review your personal information',
          'Update or correct your information',
          'Delete your account and associated data',
          'Opt-out of certain data collection',
          'Export your data in a portable format'
        ]
      }
    ]
  };

  const termsOfService = {
    lastUpdated: 'January 15, 2024',
    sections: [
      {
        title: 'Acceptance of Terms',
        content: [
          'By using EcoVision, you agree to these Terms of Service',
          'You must be at least 13 years old to use the app',
          'You are responsible for maintaining the security of your account',
          'You agree to use the app only for lawful purposes'
        ]
      },
      {
        title: 'User Responsibilities',
        content: [
          'Provide accurate and complete information',
          'Maintain the security of your login credentials',
          'Report any security concerns or suspicious activity',
          'Respect the intellectual property rights of others',
          'Not attempt to reverse engineer or hack the app'
        ]
      },
      {
        title: 'App Features and Availability',
        content: [
          'We strive to maintain app availability but cannot guarantee 100% uptime',
          'We may update, modify, or discontinue features at any time',
          'Some features may require internet connectivity',
          'We are not responsible for third-party service interruptions'
        ]
      },
      {
        title: 'Limitation of Liability',
        content: [
          'EcoVision is provided "as is" without warranties',
          'We are not liable for indirect, incidental, or consequential damages',
          'Our liability is limited to the amount you paid for the service',
          'We are not responsible for environmental impact calculations accuracy'
        ]
      },
      {
        title: 'Termination',
        content: [
          'You may terminate your account at any time',
          'We may terminate accounts that violate these terms',
          'Upon termination, your data will be deleted within 30 days',
          'Some information may be retained for legal or security purposes'
        ]
      }
    ]
  };

  const dataUsage = {
    lastUpdated: 'January 15, 2024',
    sections: [
      {
        title: 'Data Collection Categories',
        content: [
          'Account data: email, name, profile information',
          'Usage data: app interactions, features used, time spent',
          'Environmental data: waste entries, sorting habits, impact metrics',
          'Technical data: device info, app version, performance metrics'
        ]
      },
      {
        title: 'Data Processing Purposes',
        content: [
          'Account management and authentication',
          'Personalized experience and recommendations',
          'Environmental impact tracking and reporting',
          'App improvement and feature development',
          'Analytics and research purposes'
        ]
      },
      {
        title: 'Data Retention',
        content: [
          'Account data: retained while account is active',
          'Usage data: retained for 2 years for analytics',
          'Environmental data: retained indefinitely for impact tracking',
          'Deleted accounts: data removed within 30 days',
          'Backup data: may be retained for up to 90 days'
        ]
      },
      {
        title: 'Data Protection Measures',
        content: [
          'Encryption of data in transit and at rest',
          'Regular security audits and vulnerability assessments',
          'Access controls and authentication requirements',
          'Data backup and disaster recovery procedures',
          'Employee training on data protection practices'
        ]
      }
    ]
  };

  const cookiesPolicy = {
    lastUpdated: 'January 15, 2024',
    sections: [
      {
        title: 'What Are Cookies',
        content: [
          'Cookies are small text files stored on your device',
          'They help us remember your preferences and settings',
          'They enable certain app features and functionality',
          'They help us understand how you use the app'
        ]
      },
      {
        title: 'Types of Cookies We Use',
        content: [
          'Essential cookies: required for basic app functionality',
          'Preference cookies: remember your settings and choices',
          'Analytics cookies: help us understand app usage patterns',
          'Security cookies: help protect against fraud and abuse'
        ]
      },
      {
        title: 'Cookie Management',
        content: [
          'You can control cookies through your browser settings',
          'Disabling certain cookies may affect app functionality',
          'We do not use third-party advertising cookies',
          'Cookies are automatically deleted after a set period'
        ]
      },
      {
        title: 'Third-Party Services',
        content: [
          'We may use third-party services that set their own cookies',
          'These services help with analytics, security, and functionality',
          'Third-party cookies are subject to their respective privacy policies',
          'You can opt-out of non-essential third-party cookies'
        ]
      }
    ]
  };

  const getContent = () => {
    switch (activeSection) {
      case 'privacy':
        return privacyPolicy;
      case 'terms':
        return termsOfService;
      case 'data':
        return dataUsage;
      case 'cookies':
        return cookiesPolicy;
      default:
        return privacyPolicy;
    }
  };

  const currentContent = getContent();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">🔒 Privacy & Legal</h1>
          <p className="text-lg text-gray-600">
            Learn about how we protect your data and the terms governing your use of EcoVision.
          </p>
        </div>

        {/* Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex flex-wrap justify-center space-x-2 md:space-x-8">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeSection === section.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{section.icon}</span>
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="fade-in">
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {sections.find(s => s.id === activeSection)?.label}
              </h2>
              <span className="text-sm text-gray-500">
                Last updated: {currentContent.lastUpdated}
              </span>
            </div>

            <div className="prose prose-green max-w-none">
              <div className="space-y-8">
                {currentContent.sections.map((section, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <span className="text-green-500 mr-2 mt-1">•</span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-8 card bg-blue-50 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">📧 Contact Us</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
              <div>
                <p><strong>Privacy Questions:</strong></p>
                <p>Email: privacy@ecovision.app</p>
                <p>Phone: (555) 123-4567</p>
              </div>
              <div>
                <p><strong>Legal Inquiries:</strong></p>
                <p>Email: legal@ecovision.app</p>
                <p>Address: 123 Eco Street, Green City, GC 12345</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="card hover:shadow-lg transition-shadow duration-300 text-center">
              <div className="text-2xl mb-2">📥</div>
              <h4 className="font-semibold text-gray-900 mb-1">Download My Data</h4>
              <p className="text-sm text-gray-600">Export all your data in a portable format</p>
            </button>
            
            <button className="card hover:shadow-lg transition-shadow duration-300 text-center">
              <div className="text-2xl mb-2">🗑️</div>
              <h4 className="font-semibold text-gray-900 mb-1">Delete My Account</h4>
              <p className="text-sm text-gray-600">Permanently delete your account and data</p>
            </button>
            
            <button className="card hover:shadow-lg transition-shadow duration-300 text-center">
              <div className="text-2xl mb-2">⚙️</div>
              <h4 className="font-semibold text-gray-900 mb-1">Privacy Settings</h4>
              <p className="text-sm text-gray-600">Manage your privacy preferences</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
