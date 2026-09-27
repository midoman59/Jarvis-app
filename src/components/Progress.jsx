import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { TrendingUp, Award, Flame, Droplets, Zap } from 'lucide-react'
import { useDailyLog } from '../hooks/useDailyLog'

function Progress() {
  const { dailyLog } = useDailyLog()
  const [timePeriod, setTimePeriod] = useState('week') // week, month, all

  // Mock historical data (in production, load from IndexedDB)
  const mockWeekData = [
    { date: 'Lun', water: 6, calories: 1800, workouts: 1 },
    { date: 'Mar', water: 7, calories: 2100, workouts: 0 },
    { date: 'Mer', water: 8, calories: 1950, workouts: 1 },
    { date: 'Jeu', water: 5, calories: 2300, workouts: 1 },
    { date: 'Ven', water: 8, calories: 2050, workouts: 0 },
    { date: 'Sam', water: 7, calories: 1900, workouts: 2 },
    { date: 'Dim', water: dailyLog?.water || 4, calories: dailyLog?.calories || 1500, workouts: 0 }
  ]

  const stats = useMemo(() => {
    const totalCalories = mockWeekData.reduce((sum, d) => sum + d.calories, 0)
    const totalWater = mockWeekData.reduce((sum, d) => sum + d.water, 0)
    const totalWorkouts = mockWeekData.reduce((sum, d) => sum + d.workouts, 0)
    const avgCalories = Math.round(totalCalories / mockWeekData.length)
    const avgWater = (totalWater / mockWeekData.length).toFixed(1)

    return {
      totalCalories,
      totalWater,
      totalWorkouts,
      avgCalories,
      avgWater,
      calorieGoal: 2000 * 7,
      waterGoal: 8 * 7
    }
  }, [])

  const achievements = [
    {
      id: 'water_warrior',
      title: 'Guerrier Hydraté',
      description: '8L d\'eau par jour pendant 7 jours',
      icon: Droplets,
      unlocked: stats.totalWater >= stats.waterGoal,
      progress: Math.round((stats.totalWater / stats.waterGoal) * 100)
    },
    {
      id: 'calorie_counter',
      title: 'Compteur de Calories',
      description: 'Enregistrer des repas 5 jours',
      icon: Flame,
      unlocked: dailyLog?.meals && dailyLog.meals.length >= 5,
      progress: dailyLog?.meals ? Math.min(dailyLog.meals.length * 20, 100) : 0
    },
    {
      id: 'fitness_fanatic',
      title: 'Passionné de Fitness',
      description: '3 entraînements par semaine',
      icon: Zap,
      unlocked: stats.totalWorkouts >= 3,
      progress: Math.round((stats.totalWorkouts / 3) * 100)
    },
    {
      id: 'goal_getter',
      title: 'Objectif Atteint',
      description: '10 objectifs complétés',
      icon: Award,
      unlocked: false,
      progress: 50
    }
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Stats Summary */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="glass-dark p-4 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Calories (7j)</p>
              <p className="text-2xl font-bold text-orange-400">{stats.totalCalories.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Objectif: {stats.calorieGoal.toLocaleString()}</p>
            </div>
            <Flame className="text-orange-400 opacity-50" size={32} />
          </div>
          <div className="mt-2 w-full bg-slate-900/50 rounded-full h-2">
            <div
              className="bg-orange-500 h-full rounded-full"
              style={{ width: `${Math.min((stats.totalCalories / stats.calorieGoal) * 100, 100)}%` }}
            />
          </div>
        </div>

        <div className="glass-dark p-4 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Eau (7j)</p>
              <p className="text-2xl font-bold text-blue-400">{stats.totalWater.toFixed(1)}L</p>
              <p className="text-xs text-gray-500">Objectif: {stats.waterGoal}L</p>
            </div>
            <Droplets className="text-blue-400 opacity-50" size={32} />
          </div>
          <div className="mt-2 w-full bg-slate-900/50 rounded-full h-2">
            <div
              className="bg-blue-500 h-full rounded-full"
              style={{ width: `${Math.min((stats.totalWater / stats.waterGoal) * 100, 100)}%` }}
            />
          </div>
        </div>

        <div className="glass-dark p-4 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Entraînements (7j)</p>
              <p className="text-2xl font-bold text-cyan-400">{stats.totalWorkouts}</p>
              <p className="text-xs text-gray-500">Objectif: 3</p>
            </div>
            <Zap className="text-cyan-400 opacity-50" size={32} />
          </div>
          <div className="mt-2 w-full bg-slate-900/50 rounded-full h-2">
            <div
              className="bg-cyan-500 h-full rounded-full"
              style={{ width: `${Math.min((stats.totalWorkouts / 3) * 100, 100)}%` }}
            />
          </div>
        </div>

        <div className="glass-dark p-4 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Moyennes</p>
              <p className="text-lg font-bold text-cyan-400">{stats.avgCalories} kcal</p>
              <p className="text-xs text-gray-500">{stats.avgWater}L par jour</p>
            </div>
            <TrendingUp className="text-cyan-400 opacity-50" size={32} />
          </div>
        </div>
      </motion.div>

      {/* Charts */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Calories Chart */}
        <div className="glass-dark p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-cyan-400 mb-4">Calories (7 jours)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockWeekData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,212,255,0.1)" />
              <XAxis dataKey="date" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #00d4ff' }}
                formatter={(value) => `${value} kcal`}
              />
              <Bar dataKey="calories" fill="#ff6b35" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Water Chart */}
        <div className="glass-dark p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-cyan-400 mb-4">Hydratation (7 jours)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockWeekData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,212,255,0.1)" />
              <XAxis dataKey="date" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #00d4ff' }}
                formatter={(value) => `${value}L`}
              />
              <Line
                type="monotone"
                dataKey="water"
                stroke="#00d4ff"
                dot={{ fill: '#00d4ff', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        className="glass-dark p-6 rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-semibold text-cyan-400 mb-6 flex items-center gap-2">
          <Award size={20} /> Réalisations
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map(achievement => {
            const Icon = achievement.icon
            return (
              <motion.div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 transition ${
                  achievement.unlocked
                    ? 'glass-dark border-yellow-500/50 bg-yellow-500/5'
                    : 'glass-dark border-cyan-500/20 opacity-60'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={achievement.unlocked ? 'text-yellow-400' : 'text-gray-400'} size={24} />
                  {achievement.unlocked && (
                    <span className="text-yellow-400 text-sm font-bold">✓</span>
                  )}
                </div>
                <h4 className="font-semibold text-white text-sm mb-1">{achievement.title}</h4>
                <p className="text-xs text-gray-400 mb-2">{achievement.description}</p>
                <div className="w-full bg-slate-900/50 rounded-full h-1.5">
                  <div
                    className={`h-full rounded-full transition ${
                      achievement.unlocked ? 'bg-yellow-500' : 'bg-cyan-500'
                    }`}
                    style={{ width: `${achievement.progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">{achievement.progress}%</p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Streaks */}
      <motion.div
        className="glass-dark p-6 rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-semibold text-cyan-400 mb-4">🔥 Séries</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/30 p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Jours consécutifs actifs</p>
            <p className="text-3xl font-bold text-cyan-400">5</p>
          </div>
          <div className="bg-slate-900/30 p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Repas enregistrés d'affilée</p>
            <p className="text-3xl font-bold text-orange-400">3</p>
          </div>
          <div className="bg-slate-900/30 p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Semaines complètes</p>
            <p className="text-3xl font-bold text-purple-400">1</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Progress
