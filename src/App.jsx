import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Settings as SettingsIcon, Bell } from 'lucide-react'
import Dashboard from './components/Dashboard'
import Objectives from './components/Objectives'
import Nutrition from './components/Nutrition'
import Progress from './components/Progress'
import Settings from './components/Settings'
import NavigationBar from './components/NavigationBar'
import './index.css'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  useEffect(() => {
    registerServiceWorker()
  }, [])

  const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('/service-worker.js')
        console.log('Service Worker registered')
      } catch (error) {
        console.log('Service Worker registration failed:', error)
      }
    }
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 30] }}>
          <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <motion.header
          className="glass-dark border-b border-cyan-500/20 px-6 py-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <motion.h1
              className="text-3xl font-bold glow text-cyan-400"
              animate={{ textShadow: ['0 0 10px rgba(0,212,255,0.5)', '0 0 20px rgba(0,212,255,0.8)', '0 0 10px rgba(0,212,255,0.5)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ⚡ JARVIS
            </motion.h1>
            <div className="flex gap-4 items-center">
              <button className="relative p-2 text-cyan-400 hover:text-cyan-300">
                <Bell size={24} />
                <motion.span
                  className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full pulse-neon"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </button>
              <button
                onClick={() => setActiveTab(activeTab === 'settings' ? 'dashboard' : 'settings')}
                className="p-2 text-cyan-400 hover:text-cyan-300"
              >
                <SettingsIcon size={24} />
              </button>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="flex-1 overflow-auto px-6 py-6">
          {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
          {activeTab === 'objectives' && <Objectives />}
          {activeTab === 'nutrition' && <Nutrition />}
          {activeTab === 'progress' && <Progress />}
          {activeTab === 'settings' && <Settings />}
        </div>

        {/* Footer Navigation */}
        <NavigationBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  )
}

export default App
