import { useState } from 'react'
import { motion } from 'framer-motion'
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { Droplets, Flame, Trophy, Plus, Check, Trash2 } from 'lucide-react'
import { useDailyLog } from '../hooks/useDailyLog'
import { useObjectives } from '../hooks/useObjectives'
import { useSettings } from '../hooks/useSettings'

function Dashboard({ setActiveTab }) {
  const { dailyLog, addWater, loading: logLoading } = useDailyLog()
  const { objectives, toggleObjective, removeObjective, getProgress, addObjective, loading: objLoading } = useObjectives()
  const { settings } = useSettings()
  const [newObjectiveTitle, setNewObjectiveTitle] = useState('')

  const waterGoal = settings.waterGoal || 8
  const waterProgress = (dailyLog?.water || 0) / waterGoal * 100
  const calorieGoal = settings.calorieGoal || 2000
  const totalCalories = dailyLog?.calories || 0
  const objectiveProgress = getProgress()

  const handleAddWater = () => {
    addWater(0.5)
  }

  const handleAddObjective = async () => {
    if (newObjectiveTitle.trim()) {
      await addObjective({ title: newObjectiveTitle, category: 'general' })
      setNewObjectiveTitle('')
    }
  }

  // Generate chart data from daily log
  const chartData = [
    { time: '08:00', water: 0, calories: 0 },
    { time: '12:00', water: Math.min(dailyLog?.water || 0, waterGoal / 2), calories: Math.floor((totalCalories / calorieGoal) * 100 * 0.5) },
    { time: '16:00', water: Math.min(dailyLog?.water || 0, waterGoal * 0.75), calories: Math.floor((totalCalories / calorieGoal) * 100 * 0.75) },
    { time: '20:00', water: dailyLog?.water || 0, calories: totalCalories }
  ]

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

  if (logLoading || objLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-cyan-400 animate-pulse">Chargement...</div>
      </div>
    )
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
            <div className="text-3xl font-bold text-white mb-2">{(dailyLog?.water || 0).toFixed(1)}L / {waterGoal}L</div>
            <div className="w-full bg-slate-900/50 rounded-full h-3 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(waterProgress, 100)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => addWater(-0.5)}
              className="flex-1 bg-slate-900/50 hover:bg-slate-800 rounded-lg py-2 text-cyan-400 transition"
            >
              −
            </button>
            <button
              onClick={handleAddWater}
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

          <div className="space-y-2">
            {dailyLog?.meals && dailyLog.meals.length > 0 && (
              <div className="text-xs text-gray-400 mb-2">
                {dailyLog.meals.length} repas enregistré(s)
              </div>
            )}
            <button
              onClick={() => setActiveTab('nutrition')}
              className="w-full bg-gradient-to-r from-orange-500/30 to-red-500/30 hover:from-orange-500/50 hover:to-red-500/50 rounded-lg py-2 text-orange-400 transition">
              + Ajouter un repas
            </button>
          </div>
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
            <div className="text-3xl font-bold text-white mb-2">{objectiveProgress}%</div>
            <p className="text-sm text-gray-400">{objectives.filter(o => o.completed).length} / {objectives.length} objectifs</p>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {objectives.length === 0 ? (
              <p className="text-xs text-gray-500 italic">Aucun objectif pour aujourd'hui</p>
            ) : (
              objectives.map(obj => (
                <div key={obj.id} className="flex items-center gap-2 group">
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
                  <span className={`text-sm flex-1 ${obj.completed ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                    {obj.title}
                  </span>
                  <button
                    onClick={() => removeObjective(obj.id)}
                    className="opacity-0 group-hover:opacity-100 transition text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="mt-3 flex gap-2">
            <input
              type="text"
              value={newObjectiveTitle}
              onChange={(e) => setNewObjectiveTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddObjective()}
              placeholder="Nouvel objectif..."
              className="flex-1 bg-slate-900/50 border border-cyan-500/30 rounded px-2 py-1 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={handleAddObjective}
              className="bg-cyan-500/30 hover:bg-cyan-500/50 rounded px-2 py-1 text-cyan-400 transition"
            >
              <Plus size={14} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6" variants={itemVariants}>
        {/* Water Chart */}
        <div className="glass-dark p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-cyan-400 mb-4">Hydratation (Jour)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
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
            <AreaChart data={chartData}>
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
