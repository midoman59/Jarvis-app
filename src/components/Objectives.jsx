import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Check, Trash2, Flag, Target } from 'lucide-react'
import { useObjectives } from '../hooks/useObjectives'
import { useDailyLog } from '../hooks/useDailyLog'

function Objectives() {
  const { objectives, addObjective, toggleObjective, removeObjective, getProgress, loading } = useObjectives()
  const { dailyLog } = useDailyLog()
  const [newTitle, setNewTitle] = useState('')
  const [category, setCategory] = useState('general')
  const [showForm, setShowForm] = useState(false)
  const [objectiveType, setObjectiveType] = useState('simple')
  const [targetValue, setTargetValue] = useState('')
  const [targetUnit, setTargetUnit] = useState('L')

  const handleAddObjective = async () => {
    if (newTitle.trim()) {
      const objective = {
        title: newTitle,
        category,
        type: objectiveType,
        targetValue: objectiveType !== 'simple' ? parseFloat(targetValue) || 0 : null,
        targetUnit: objectiveType !== 'simple' ? targetUnit : null
      }

      await addObjective(objective)
      setNewTitle('')
      setCategory('general')
      setObjectiveType('simple')
      setTargetValue('')
      setTargetUnit('L')
      setShowForm(false)
    }
  }

  const categories = [
    { id: 'general', label: '📌 Général', color: 'cyan' },
    { id: 'sport', label: '🏃 Sport', color: 'purple' },
    { id: 'nutrition', label: '🍎 Nutrition', color: 'orange' },
    { id: 'wellness', label: '🧘 Bien-être', color: 'green' },
    { id: 'learning', label: '📚 Apprentissage', color: 'blue' }
  ]

  const getCategoryColor = (cat) => {
    const mapping = {
      sport: 'from-purple-500/20 to-purple-500/5 border-purple-500/30',
      nutrition: 'from-orange-500/20 to-orange-500/5 border-orange-500/30',
      wellness: 'from-green-500/20 to-green-500/5 border-green-500/30',
      learning: 'from-blue-500/20 to-blue-500/5 border-blue-500/30',
      general: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/30'
    }
    return mapping[cat] || mapping.general
  }

  const grouped = categories.reduce((acc, cat) => {
    acc[cat.id] = objectives.filter(obj => obj.category === cat.id)
    return acc
  }, {})

  const progress = getProgress()
  const completedCount = objectives.filter(obj => obj.completed).length

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-cyan-400 animate-pulse">Chargement...</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Summary Card */}
      <motion.div
        className="glass-dark p-6 rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">Mes Objectifs</h2>
            <p className="text-gray-400">{completedCount} / {objectives.length} complétés</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-cyan-400">{progress}%</div>
            <p className="text-sm text-gray-400">Progression du jour</p>
          </div>
        </div>
        <div className="mt-4 w-full bg-slate-900/50 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-cyan-500 to-purple-500 h-full rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Add New Objective */}
      <motion.div
        className="glass-dark p-6 rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 text-cyan-400 transition border border-cyan-500/30"
          >
            <Plus size={20} />
            Ajouter un objectif
          </button>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-cyan-300 mb-2">Titre</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddObjective()}
                placeholder="Ex: Faire 30 min de sport"
                className="w-full bg-slate-900/50 border border-cyan-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm text-cyan-300 mb-2">Catégorie</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-900/50 border border-cyan-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-cyan-300 mb-2">Type d'objectif</label>
              <select
                value={objectiveType}
                onChange={(e) => setObjectiveType(e.target.value)}
                className="w-full bg-slate-900/50 border border-cyan-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="simple">Simple (pas de valeur)</option>
                <option value="water">💧 Eau (Litres)</option>
                <option value="calories">🔥 Calories</option>
                <option value="protein">💪 Protéines (g)</option>
                <option value="custom">📊 Personnalisé</option>
              </select>
            </div>

            {objectiveType !== 'simple' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-cyan-300 mb-2">Valeur cible</label>
                  <input
                    type="number"
                    value={targetValue}
                    onChange={(e) => setTargetValue(e.target.value)}
                    placeholder="Ex: 8"
                    className="w-full bg-slate-900/50 border border-cyan-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                {objectiveType === 'custom' && (
                  <div>
                    <label className="block text-sm text-cyan-300 mb-2">Unité</label>
                    <input
                      type="text"
                      value={targetUnit}
                      onChange={(e) => setTargetUnit(e.target.value)}
                      placeholder="Ex: km"
                      className="w-full bg-slate-900/50 border border-cyan-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                )}
                {objectiveType !== 'custom' && (
                  <div>
                    <label className="block text-sm text-cyan-300 mb-2">Unité</label>
                    <input
                      type="text"
                      value={targetUnit}
                      disabled
                      className="w-full bg-slate-900/30 border border-cyan-500/30 rounded-lg px-4 py-2 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={handleAddObjective}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg py-2 text-white font-medium transition hover:opacity-90"
              >
                Créer
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 bg-slate-900/50 hover:bg-slate-800 rounded-lg py-2 text-gray-400 transition"
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Objectives by Category */}
      <div className="space-y-6">
        {categories.map(cat => {
          const catObjectives = grouped[cat.id] || []
          if (catObjectives.length === 0) return null

          const completed = catObjectives.filter(obj => obj.completed).length

          return (
            <motion.div
              key={cat.id}
              className={`glass-dark p-6 rounded-2xl border bg-gradient-to-br ${getCategoryColor(cat.id)}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  {cat.label}
                  <span className="text-xs text-gray-400">({completed}/{catObjectives.length})</span>
                </h3>
                <Flag size={20} className="text-gray-400 opacity-50" />
              </div>

              <div className="space-y-2">
                {catObjectives.map(obj => (
                  <motion.div
                    key={obj.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/20 hover:bg-slate-900/40 transition group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <button
                      onClick={() => toggleObjective(obj.id)}
                      className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition ${
                        obj.completed
                          ? 'bg-cyan-500 border-cyan-500'
                          : 'border-cyan-500/30 hover:border-cyan-500'
                      }`}
                    >
                      {obj.completed && <Check size={16} className="text-slate-900" />}
                    </button>

                    <div className="flex-1">
                      <div className={`${obj.completed ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                        {obj.title}
                      </div>
                      {obj.targetValue && (
                        <div className="text-xs text-cyan-400 mt-1 flex items-center gap-2">
                          <Target size={12} />
                          {obj.type === 'water' && `${obj.targetValue}${obj.targetUnit} / ${dailyLog?.water || 0}${obj.targetUnit}`}
                          {obj.type === 'calories' && `${obj.targetValue} kcal / ${dailyLog?.calories || 0} kcal`}
                          {obj.type === 'protein' && `${obj.targetValue}${obj.targetUnit} / ${dailyLog?.protein || 0}${obj.targetUnit}`}
                          {obj.type === 'custom' && `${obj.targetValue}${obj.targetUnit}`}
                          {obj.type !== 'custom' && obj.type !== 'water' && obj.type !== 'calories' && obj.type !== 'protein' && `${obj.targetValue}${obj.targetUnit}`}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => removeObjective(obj.id)}
                      className="opacity-0 group-hover:opacity-100 transition text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
        })}

        {objectives.length === 0 && (
          <div className="glass-dark p-12 rounded-2xl text-center">
            <p className="text-gray-400">Aucun objectif pour le moment</p>
            <p className="text-sm text-gray-500 mt-2">Crée ton premier objectif ci-dessus !</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Objectives
