import { motion } from 'framer-motion'
import { Home, Zap, TrendingUp, Utensils } from 'lucide-react'

function NavigationBar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'objectives', label: 'Objectifs', icon: Zap },
    { id: 'progress', label: 'Progression', icon: TrendingUp },
    { id: 'nutrition', label: 'Nutrition', icon: Utensils }
  ]

  return (
    <motion.nav
      className="glass-dark border-t border-cyan-500/20 px-6 py-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="max-w-7xl mx-auto flex gap-8 overflow-x-auto">
        {tabs.map(tab => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/50'
                  : 'text-gray-400 hover:text-cyan-400'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{tab.label}</span>
            </motion.button>
          )
        })}
      </div>
    </motion.nav>
  )
}

export default NavigationBar
