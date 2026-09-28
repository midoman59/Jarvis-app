import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Plus, Minus, Utensils } from 'lucide-react'
import { useDailyLog } from '../hooks/useDailyLog'
import { searchFood, COMMON_FOODS, calculateMacros, getMacroSplitPercentages } from '../services/nutrition'

function Nutrition() {
  const { dailyLog, addMeal } = useDailyLog()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedFood, setSelectedFood] = useState(null)
  const [quantity, setQuantity] = useState(100)
  const [showCommon, setShowCommon] = useState(true)
  const [showCustomForm, setShowCustomForm] = useState(false)
  const [customFood, setCustomFood] = useState({ name: '', calories: 0, protein: 0, carbs: 0, fat: 0 })

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      setShowCommon(true)
      return
    }

    setLoading(true)
    try {
      const results = await searchFood(searchQuery)
      setSearchResults(results)
      setShowCommon(results.length === 0)
    } catch (error) {
      console.error('Search error:', error)
      setShowCommon(true)
    } finally {
      setLoading(false)
    }
  }

  const handleAddMeal = async () => {
    if (!selectedFood) return

    const macros = calculateMacros(quantity, selectedFood)
    const meal = {
      name: selectedFood.name,
      quantity,
      ...macros
    }

    await addMeal(meal)
    setSelectedFood(null)
    setQuantity(100)
    setSearchQuery('')
    setShowCommon(true)
  }

  const handleAddCustomFood = () => {
    if (!customFood.name.trim()) return

    const newFood = {
      ...customFood,
      id: `custom-${Date.now()}`
    }

    setSelectedFood(newFood)
    setCustomFood({ name: '', calories: 0, protein: 0, carbs: 0, fat: 0 })
    setShowCustomForm(false)
  }

  const foodList = showCommon
    ? COMMON_FOODS.map((f, i) => ({ ...f, id: `common-${f.name}` }))
    : searchResults

  const selectedMacros = selectedFood ? calculateMacros(quantity, selectedFood) : null
  const macroPercentages = selectedMacros ? getMacroSplitPercentages(selectedMacros) : null

  const calorieGoal = 2000
  const remainingCalories = calorieGoal - (dailyLog?.calories || 0)

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search & Food Selection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search Bar */}
          <motion.div
            className="glass-dark p-6 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-xl font-semibold text-cyan-400 mb-4 flex items-center gap-2">
              <Utensils size={20} /> Rechercher un aliment
            </h2>

            <div className="flex gap-2 mb-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Poulet, riz, pomme..."
                  className="w-full bg-slate-900/50 border border-cyan-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={loading}
                className="bg-gradient-to-r from-cyan-500/30 to-purple-500/30 hover:from-cyan-500/50 hover:to-purple-500/50 rounded-lg px-4 py-2 text-cyan-400 transition disabled:opacity-50"
              >
                <Search size={20} />
              </button>
            </div>

            {loading && <p className="text-cyan-400 text-sm">Recherche en cours...</p>}

            {!showCustomForm && (
              <button
                onClick={() => setShowCustomForm(true)}
                className="w-full mt-2 text-sm text-cyan-400 hover:text-cyan-300 p-2 rounded-lg border border-cyan-500/30 hover:border-cyan-500/50 transition"
              >
                + Ajouter un aliment personnalisé
              </button>
            )}

            {showCustomForm && (
              <div className="mt-4 p-4 rounded-lg bg-slate-900/30 space-y-3">
                <input
                  type="text"
                  placeholder="Nom de l'aliment"
                  value={customFood.name}
                  onChange={(e) => setCustomFood({ ...customFood, name: e.target.value })}
                  className="w-full bg-slate-900/50 border border-cyan-500/30 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Calories"
                    value={customFood.calories}
                    onChange={(e) => setCustomFood({ ...customFood, calories: parseInt(e.target.value) || 0 })}
                    className="bg-slate-900/50 border border-cyan-500/30 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                  />
                  <input
                    type="number"
                    placeholder="Protéines (g)"
                    value={customFood.protein}
                    onChange={(e) => setCustomFood({ ...customFood, protein: parseInt(e.target.value) || 0 })}
                    className="bg-slate-900/50 border border-cyan-500/30 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                  />
                  <input
                    type="number"
                    placeholder="Glucides (g)"
                    value={customFood.carbs}
                    onChange={(e) => setCustomFood({ ...customFood, carbs: parseInt(e.target.value) || 0 })}
                    className="bg-slate-900/50 border border-cyan-500/30 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                  />
                  <input
                    type="number"
                    placeholder="Lipides (g)"
                    value={customFood.fat}
                    onChange={(e) => setCustomFood({ ...customFood, fat: parseInt(e.target.value) || 0 })}
                    className="bg-slate-900/50 border border-cyan-500/30 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAddCustomFood}
                    disabled={!customFood.name.trim()}
                    className="flex-1 bg-cyan-500/30 hover:bg-cyan-500/50 disabled:opacity-50 rounded px-3 py-2 text-sm text-cyan-400 transition"
                  >
                    Ajouter
                  </button>
                  <button
                    onClick={() => {
                      setShowCustomForm(false)
                      setCustomFood({ name: '', calories: 0, protein: 0, carbs: 0, fat: 0 })
                    }}
                    className="flex-1 bg-slate-900/50 hover:bg-slate-800 rounded px-3 py-2 text-sm text-gray-400 transition"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Food List */}
          <motion.div
            className="glass-dark p-6 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-lg font-semibold text-cyan-300 mb-4">
              {showCommon ? 'Aliments courants' : 'Résultats'}
            </h3>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {foodList.length === 0 ? (
                <p className="text-gray-400 text-sm">
                  {searchQuery ? 'Aucun résultat trouvé' : 'Aucun aliment disponible'}
                </p>
              ) : (
                foodList.map(food => {
                  const isSelected = selectedFood?.id === food.id && selectedFood?.name === food.name
                  return (
                    <motion.button
                      key={food.id}
                      onClick={() => setSelectedFood(food)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full p-4 rounded-lg transition border-2 text-left cursor-pointer ${
                        isSelected
                          ? 'glass-dark border-cyan-500 bg-cyan-500/30 shadow-lg shadow-cyan-500/20'
                          : 'glass-dark border-cyan-500/20 hover:border-cyan-500/50 hover:bg-slate-900/40'
                      }`}
                    >
                      <div className="font-semibold text-cyan-300 text-sm">{food.name}</div>
                      <div className="text-xs text-gray-400 mt-1 flex justify-between">
                        <span>{food.calories} kcal/100g</span>
                        <span>P:{food.protein}g • C:{food.carbs}g • F:{food.fat}g</span>
                      </div>
                    </motion.button>
                  )
                })
              )}
            </div>
          </motion.div>
        </div>

        {/* Details & Add */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {/* Summary */}
          <div className="glass-dark p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-cyan-400 mb-4">📊 Aujourd'hui</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Calories</span>
                  <span className="text-cyan-400">{dailyLog?.calories || 0} / 2000</span>
                </div>
                <div className="w-full bg-slate-900/50 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-red-400 h-full rounded-full"
                    style={{ width: `${Math.min((dailyLog?.calories || 0) / 2000 * 100, 100)}%` }}
                  />
                </div>
              </div>
              <div className="text-xs text-gray-400 pt-2 border-t border-cyan-500/20">
                <div>Protéines: {dailyLog?.protein || 0}g</div>
                <div>Glucides: {dailyLog?.carbs || 0}g</div>
                <div>Lipides: {dailyLog?.fat || 0}g</div>
              </div>
            </div>
          </div>

          {/* Selected Food Details */}
          {selectedFood && (
            <motion.div
              className="glass-dark p-6 rounded-2xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">{selectedFood.name}</h3>

              {/* Quantity */}
              <div className="mb-4">
                <label className="block text-sm text-cyan-300 mb-2">Quantité (g)</label>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => setQuantity(Math.max(10, quantity - 50))}
                    className="p-2 bg-slate-900/50 hover:bg-slate-800 rounded"
                  >
                    <Minus size={16} className="text-cyan-400" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(10, parseInt(e.target.value) || 0))}
                    className="flex-1 bg-slate-900/50 border border-cyan-500/30 rounded px-2 py-1 text-white text-center focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 50)}
                    className="p-2 bg-slate-900/50 hover:bg-slate-800 rounded"
                  >
                    <Plus size={16} className="text-cyan-400" />
                  </button>
                </div>
              </div>

              {/* Macros */}
              {selectedMacros && (
                <div className="space-y-3">
                  <div className="bg-slate-900/30 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-orange-400 mb-2">
                      {selectedMacros.calories} kcal
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>Protéines</span>
                        <span className="text-cyan-400">{selectedMacros.protein}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Glucides</span>
                        <span className="text-cyan-400">{selectedMacros.carbs}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lipides</span>
                        <span className="text-cyan-400">{selectedMacros.fat}g</span>
                      </div>
                    </div>

                    {/* Macro percentages */}
                    <div className="mt-3 flex gap-1 h-2">
                      <div
                        className="bg-blue-500 rounded"
                        style={{ width: `${macroPercentages.protein}%` }}
                      />
                      <div
                        className="bg-yellow-500 rounded"
                        style={{ width: `${macroPercentages.carbs}%` }}
                      />
                      <div
                        className="bg-red-500 rounded"
                        style={{ width: `${macroPercentages.fat}%` }}
                      />
                    </div>
                    <div className="flex gap-2 text-xs mt-2">
                      <span className="text-blue-400">P{macroPercentages.protein}%</span>
                      <span className="text-yellow-400">C{macroPercentages.carbs}%</span>
                      <span className="text-red-400">L{macroPercentages.fat}%</span>
                    </div>
                  </div>

                  <button
                    onClick={handleAddMeal}
                    className="w-full bg-gradient-to-r from-orange-500/30 to-red-500/30 hover:from-orange-500/50 hover:to-red-500/50 rounded-lg py-2 text-orange-400 transition font-medium flex items-center justify-center gap-2"
                  >
                    <Plus size={18} /> Ajouter le repas
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Nutrition
