# 🌱 EcoVision - Smart Waste Sorter

A comprehensive web application for smart waste management with camera simulation, progress tracking, and environmental impact monitoring.

## 🚀 Features

### Core Features
- **Smart Waste Sorting**: Camera simulation to identify and sort waste items
- **Progress Tracking**: Monitor your waste sorting habits and environmental impact
- **Rewards System**: Earn credits and unlock badges for eco-friendly actions
- **Educational Content**: Learn about proper waste disposal and recycling
- **Community Tasks**: Participate in social challenges and environmental initiatives
- **Location Services**: Find nearby recycling centers and waste collection points

### Technical Features
- **PWA Support**: Offline functionality and app-like experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Updates**: Live tracking of user progress and statistics
- **Data Persistence**: Local storage for offline data management
- **Modern UI/UX**: Beautiful animations and intuitive interface

## 🛠️ Tech Stack

- **Frontend**: React 18 with Hooks
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Build Tool**: Create React App

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd waste-sorter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
ecovision/
├── public/                 # Static assets
│   ├── manifest.json      # PWA configuration
│   └── index.html         # Main HTML file
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── WasteSorter/   # Waste sorting components
│   │   ├── Dashboard/     # Dashboard widgets
│   │   ├── Shared/        # Common components
│   │   └── ...
│   ├── pages/            # Route components
│   │   ├── Home.jsx      # Landing page
│   │   ├── SortWaste.jsx # Main sorting feature
│   │   ├── Dashboard.jsx # User dashboard
│   │   └── ...
│   ├── context/          # React Context providers
│   │   ├── UserContext.js
│   │   ├── TrackerContext.js
│   │   └── AuthContext.js
│   ├── data/             # Static data files
│   │   ├── dummyWasteData.json
│   │   ├── tips.json
│   │   └── rewards.json
│   └── utils/            # Helper functions
└── package.json
```

## 🎯 Key Components

### Waste Sorting System
- **Camera Simulation**: Simulates real camera input for waste identification
- **Category Classification**: 6 waste categories (plastic, organic, e-waste, paper, glass, metal)
- **Disposal Tips**: Educational content for each waste type
- **Sector Support**: Household, industrial, and campus environments

### User Progress Tracking
- **Eco Credits**: Gamified reward system
- **Experience Points**: Level progression system
- **Streak Tracking**: Daily activity monitoring
- **Badge System**: Achievement unlocks

### Dashboard Analytics
- **Real-time Charts**: Visual representation of waste sorting data
- **Category Breakdown**: Pie charts showing waste distribution
- **Weekly Activity**: Bar charts for trend analysis
- **Recent Activity**: Timeline of user actions

## 🎨 Design System

### Color Palette
- **Primary Green**: `#22c55e` (Eco-friendly theme)
- **Secondary Blue**: `#3b82f6` (Technology/trust)
- **Accent Purple**: `#8b5cf6` (Innovation)
- **Warning Orange**: `#f59e0b` (E-waste)
- **Success Green**: `#10b981` (Positive actions)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Responsive**: Scales appropriately across devices

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=your_api_url_here
REACT_APP_MAPS_API_KEY=your_google_maps_key
```

### PWA Configuration
The app includes PWA support with:
- Service worker for offline functionality
- App manifest for installation
- Responsive design for mobile devices

## 📱 Mobile Support

The application is fully responsive and optimized for:
- **iOS Safari**: 12+
- **Android Chrome**: 80+
- **Desktop Browsers**: Chrome, Firefox, Safari, Edge

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Unsplash** for stock images
- **Lucide** for beautiful icons
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **Recharts** for data visualization

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Email: support@ecovision.com
- Documentation: [docs.ecovision.com](https://docs.ecovision.com)

---

**Made with ❤️ for a sustainable future** 