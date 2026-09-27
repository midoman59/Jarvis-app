import { useState } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { Droplets, Flame, Trophy, Plus, Check } from 'lucide-react'

function Dashboard({ waterIntake, setWaterIntake, dailyData }) {
  const [objectives, setObjectives] = useState([
    { id: 1, title: 'Morning Workout', completed: false, category: 'sport' },
    { id: 2, title: 'Read 30 min', completed: true, category: 'learning' },
    { id: 3, title: 'Log all meals', completed: false, category: 'nutrition' },
    { id: 4, title: 'Meditate', completed: false, category: 'wellness' }
  ])

  const toggleObjective = (id) => {
    setObjectives(objectives.map(obj =>
      obj.id === id ? { ...obj, completed: !obj.completed } : obj
    ))
  }

  const waterGoal = 8
  const waterProgress = (waterIntake / waterGoal) * 100
  const calorieGoal = 2000
  const totalCalories = dailyData[dailyData.length - 1]?.calories || 0

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 12 }
    }
  }

  return (
    <motion.div
      className="max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Water Intake Card */}
        <motion.div
          className="glass-dark p-6 rounded-2xl col-span-1"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-cyan-400">Consommation d'Eau</h3>
            <Droplets className="text-blue-400" size={24} />
          </div>

          <div className="mb-4">
            <div className="text-3xl font-bold text-white mb-2">{waterIntake}L / {waterGoal}L</div>
            <div className="w-full bg-slate-900/50 rounded-full h-3 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full"
                initial={{ width: 0 }}
                animate={{ width: `${waterProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setWaterIntake(Math.max(0, waterIntake - 0.5))}
              className="flex-1 bg-slate-900/50 hover:bg-slate-800 rounded-lg py-2 text-cyan-400 transition"
            >
              −
            </button>
            <button
              onClick={() => setWaterIntake(waterIntake + 0.5)}
              className="flex-1 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 hover:from-blue-500/50 hover:to-cyan-500/50 rounded-lg py-2 text-cyan-400 transition flex items-center justify-center gap-1"
            >
              <Plus size={18} /> Ajouter
            </button>
          </div>
        </motion.div>

        {/* Calories Card */}
        <motion.div
          className="glass-dark p-6 rounded-2xl col-span-1"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-cyan-400">Calories</h3>
            <Flame className="text-orange-400" size={24} />
          </div>

          <div className="mb-4">
            <div className="text-3xl font-bold text-white mb-2">{totalCalories} / {calorieGoal}</div>
            <div className="w-full bg-slate-900/50 rounded-full h-3 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-orange-500 to-red-400 h-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((totalCalories / calorieGoal) * 100, 100)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-orange-500/30 to-red-500/30 hover:from-orange-500/50 hover:to-red-500/50 rounded-lg py-2 text-orange-400 transition">
            + Ajouter un repas
          </button>
        </motion.div>

        {/* Today's Progress */}
        <motion.div
          className="glass-dark p-6 rounded-2xl col-span-1"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-cyan-400">Progression</h3>
            <Trophy className="text-yellow-400" size={24} />
          </div>

          <div className="mb-4">
            <div className="text-3xl font-bold text-white mb-2">
              {Math.round((objectives.filter(o => o.completed).length / objectives.length) * 100)}%
            </div>
            <p className="text-sm text-gray-400">{objectives.filter(o => o.completed).length} / {objectives.length} objectifs</p>
          </div>

          <div className="space-y-2">
            {objectives.map(obj => (
              <div key={obj.id} className="flex items-center gap-2">
                <button
                  onClick={() => toggleObjective(obj.id)}
                  className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition ${
                    obj.completed
                      ? 'bg-cyan-500 border-cyan-500'
                      : 'border-cyan-500/30 hover:border-cyan-500'
                  }`}
                >
                  {obj.completed && <Check size={16} className="text-slate-900" />}
                </button>
                <span className={`text-sm ${obj.completed ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                  {obj.title}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6" variants={itemVariants}>
        {/* Water Chart */}
        <div className="glass-dark p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-cyan-400 mb-4">Hydratation (Jour)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dailyData}>
              <defs>
                <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,212,255,0.1)" />
              <XAxis dataKey="time" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #00d4ff', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="water" stroke="#00d4ff" fillOpacity={1} fill="url(#colorWater)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Calories Chart */}
        <div className="glass-dark p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-cyan-400 mb-4">Calories (Jour)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dailyData}>
              <defs>
                <linearGradient id="colorCal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff6b35" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ff6b35" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,107,53,0.1)" />
              <XAxis dataKey="time" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #ff6b35', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="calories" stroke="#ff6b35" fillOpacity={1} fill="url(#colorCal)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Dashboard
