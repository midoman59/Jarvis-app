import { useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Sphere } from '@react-three/drei'
import { motion } from 'framer-motion'
import { LineChart, Line, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { Droplets, Flame, Trophy, Settings, Bell, ChevronRight } from 'lucide-react'
import Dashboard from './components/Dashboard'
import NavigationBar from './components/NavigationBar'
import './index.css'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [waterIntake, setWaterIntake] = useState(4)
  const [dailyData, setDailyData] = useState([
    { time: '08:00', water: 1, calories: 0 },
    { time: '12:00', water: 2, calories: 450 },
    { time: '16:00', water: 3, calories: 650 },
    { time: '20:00', water: 4, calories: 900 }
  ])

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
                <Settings size={24} />
              </button>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="flex-1 overflow-auto px-6 py-6">
          {activeTab === 'dashboard' && (
            <Dashboard
              waterIntake={waterIntake}
              setWaterIntake={setWaterIntake}
              dailyData={dailyData}
            />
          )}
          {activeTab === 'settings' && (
            <motion.div
              className="glass-dark p-8 rounded-2xl max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h2 className="text-2xl font-bold text-cyan-400 mb-6">⚙️ Paramètres</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm text-cyan-300">Rappel Eau (minutes)</label>
                  <input type="number" defaultValue="60" className="w-full bg-slate-900/50 border border-cyan-500/30 rounded-lg px-4 py-2 text-white" />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm text-cyan-300">Objectif Eau (L)</label>
                  <input type="number" defaultValue="2" className="w-full bg-slate-900/50 border border-cyan-500/30 rounded-lg px-4 py-2 text-white" />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm text-cyan-300">Objectif Calories</label>
                  <input type="number" defaultValue="2000" className="w-full bg-slate-900/50 border border-cyan-500/30 rounded-lg px-4 py-2 text-white" />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer Navigation */}
        <NavigationBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  )
}

export default App
