import { motion } from 'framer-motion'
import { useSettings } from '../hooks/useSettings'
import { Save } from 'lucide-react'
import { useState } from 'react'

function Settings() {
  const { settings, updateSettings, loading } = useSettings()
  const [tempSettings, setTempSettings] = useState(settings)
  const [saved, setSaved] = useState(false)

  const handleChange = (key, value) => {
    setTempSettings(prev => ({
      ...prev,
      [key]: value
    }))
    setSaved(false)
  }

  const handleSave = async () => {
    await updateSettings(tempSettings)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-cyan-400 animate-pulse">Chargement...</div>
      </div>
    )
  }

  return (
    <motion.div
      className="glass-dark p-8 rounded-2xl max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold text-cyan-400 mb-8">⚙️ Paramètres</h2>

      <div className="space-y-8">
        {/* Water Settings */}
        <div className="border-b border-cyan-500/20 pb-6">
          <h3 className="text-lg font-semibold text-cyan-300 mb-4">💧 Hydratation</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-cyan-300 mb-2">Rappel d'eau (minutes)</label>
              <input
                type="number"
                min="1"
                value={tempSettings.waterReminder || 60}
                onChange={(e) => handleChange('waterReminder', parseInt(e.target.value))}
                className="w-full bg-slate-900/50 border border-cyan-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
              />
              <p className="text-xs text-gray-400 mt-1">Fréquence des rappels pour boire</p>
            </div>
            <div>
              <label className="block text-sm text-cyan-300 mb-2">Objectif d'eau (Litres)</label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={tempSettings.waterGoal || 8}
                onChange={(e) => handleChange('waterGoal', parseFloat(e.target.value))}
                className="w-full bg-slate-900/50 border border-cyan-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
              />
              <p className="text-xs text-gray-400 mt-1">Votre objectif quotidien</p>
            </div>
          </div>
        </div>

        {/* Nutrition Settings */}
        <div className="border-b border-cyan-500/20 pb-6">
          <h3 className="text-lg font-semibold text-cyan-300 mb-4">🔥 Nutrition</h3>
          <div>
            <label className="block text-sm text-cyan-300 mb-2">Objectif de calories</label>
            <input
              type="number"
              min="500"
              step="50"
              value={tempSettings.calorieGoal || 2000}
              onChange={(e) => handleChange('calorieGoal', parseInt(e.target.value))}
              className="w-full bg-slate-900/50 border border-cyan-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
            />
            <p className="text-xs text-gray-400 mt-1">Calories à consommer par jour</p>
          </div>
        </div>

        {/* Notifications */}
        <div className="border-b border-cyan-500/20 pb-6">
          <h3 className="text-lg font-semibold text-cyan-300 mb-4">🔔 Notifications</h3>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={tempSettings.notificationsEnabled || false}
              onChange={(e) => handleChange('notificationsEnabled', e.target.checked)}
              className="w-4 h-4 rounded border-cyan-500 bg-slate-900/50 cursor-pointer"
            />
            <span className="text-gray-300">Activer les notifications</span>
          </label>
          <p className="text-xs text-gray-400 mt-2">Recevez des rappels même hors de l'app</p>
        </div>

        {/* Theme */}
        <div className="pb-6">
          <h3 className="text-lg font-semibold text-cyan-300 mb-4">🎨 Apparence</h3>
          <div>
            <label className="block text-sm text-cyan-300 mb-2">Thème</label>
            <select
              value={tempSettings.theme || 'dark'}
              onChange={(e) => handleChange('theme', e.target.value)}
              className="w-full bg-slate-900/50 border border-cyan-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="dark">Sombre (par défaut)</option>
              <option value="light">Clair (bientôt)</option>
              <option value="auto">Auto</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500/30 to-purple-500/30 hover:from-cyan-500/50 hover:to-purple-500/50 text-cyan-400 transition"
        >
          <Save size={18} />
          Enregistrer
        </button>

        {saved && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-green-400"
          >
            ✓ Paramètres sauvegardés
          </motion.div>
        )}
      </div>

      {/* Info */}
      <div className="mt-8 p-4 bg-slate-900/30 rounded-lg border border-cyan-500/20">
        <p className="text-xs text-gray-400">
          💾 Tous vos paramètres sont sauvegardés localement sur votre appareil et restent privés.
        </p>
      </div>
    </motion.div>
  )
}

export default Settings
