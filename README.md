# ⚡ JARVIS - Personal AI Companion PWA

Your personal AI companion for daily objectives, nutrition tracking, water intake reminders, and health progress monitoring. A beautiful, futuristic PWA built with React, Three.js, and modern web technologies.

## 🌟 Features

- **📱 Progressive Web App (PWA)** - Install as a native app on your phone
- **🎨 Futuristic 3D Dashboard** - Beautiful glassmorphic UI with animated 3D backgrounds
- **💧 Water Intake Tracking** - Programmable reminders to stay hydrated
- **🔥 Nutrition & Macros** - Log meals and track calories with Open Food Facts integration
- **🏃 Sport/Exercise Logging** - Monitor your daily physical activities
- **🎯 Daily Objectives** - Checklist for your daily goals
- **📊 Progress Visualization** - Charts and graphs for hydration, calories, and achievements
- **🔔 Background Notifications** - Smart reminders even when the app is closed (Service Worker)
- **⚙️ Customizable Reminders** - Adjust reminder frequency (default: 1 hour)
- **📱 Offline Support** - Full offline functionality with local storage

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/midoman59/jarvis-app.git
cd jarvis-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build

# Preview production build
npm run serve
```

## 🏗️ Tech Stack

- **Frontend Framework**: React 19
- **Styling**: TailwindCSS v3 + Custom CSS
- **3D Graphics**: Three.js + React Three Fiber
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Build Tool**: Vite
- **Icons**: Lucide React
- **PWA**: Service Workers + Web Push API

## 📱 Installation as PWA

1. Open the app in your browser
2. Click the "Install" button in the address bar (or menu)
3. The app will be installed on your device
4. Access it like any native app

## 🎮 How to Use

### Dashboard
- **Water Intake**: Click the `+` button to log water, see your daily progress
- **Calories**: Add meals to track daily calorie intake with macros
- **Daily Objectives**: Check off tasks as you complete them
- **Visuals**: View hydration and calorie charts throughout the day

### Settings
- Configure reminder intervals (in minutes)
- Set daily water goals (in liters)
- Customize calorie targets

### Notifications
- Get smart reminders at intervals you set
- Snooze notifications for 30 minutes
- Notifications work even when the app is closed

## 🔧 Configuration

### Reminder Frequency
Default: 60 minutes (1 hour)

Edit in the Settings tab to adjust the interval:
- Water reminders keep you hydrated throughout the day
- All notifications are customizable

### Daily Goals
- **Water**: Default 8L - Adjust in settings
- **Calories**: Default 2000 - Personalize your target

## 🌐 Deployment

### Deploy on Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

Vercel will automatically detect it's a Vite project and build it.

### Deploy on Netlify

```bash
npm run build
# Drag & drop the 'dist' folder to Netlify
```

## 📊 Data & Privacy

- **Local Storage**: All your data is stored locally in your browser (IndexedDB)
- **No Cloud Sync** (Yet): Currently all data is device-only
- **Offline-First**: The app works completely offline
- **Future**: Optional cloud sync with Notion integration planned

## 🗒️ Project Structure

```
jarvis-app/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx      # Main dashboard component
│   │   └── NavigationBar.jsx  # Navigation tabs
│   ├── App.jsx                # Root component
│   ├── index.css              # Global styles
│   └── main.jsx               # Entry point
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── service-worker.js      # Background notifications
│   └── icons/                 # App icons
├── vite.config.js             # Vite config
├── tailwind.config.js         # TailwindCSS config
└── package.json
```

## 🎯 Roadmap

- [ ] Nutrition database integration (Open Food Facts API)
- [ ] Cloud sync with Notion
- [ ] Habit tracking
- [ ] Workout templates
- [ ] Social features (share progress)
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Export data as PDF

## 🐛 Known Issues

- Bundle size is large due to Three.js (~1.6MB). Consider code-splitting for production.
- Service Worker notifications require HTTPS in production

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit PRs.

## 📄 License

MIT

## 🙋 Support

For questions or issues, open a GitHub issue.

---

**Made with ❤️ by Claude**
