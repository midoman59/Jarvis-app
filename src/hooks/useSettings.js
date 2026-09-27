import { useState, useEffect } from 'react'
import { dbGet, dbSet } from '../services/database'

const DEFAULT_SETTINGS = {
  waterReminder: 60, // minutes
  waterGoal: 8, // liters
  calorieGoal: 2000,
  notificationsEnabled: true,
  theme: 'dark'
}

export const useSettings = () => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const stored = await dbGet('settings', 'user-settings')
      if (stored) {
        setSettings({ ...DEFAULT_SETTINGS, ...stored.value })
      } else {
        setSettings(DEFAULT_SETTINGS)
      }
    } catch (error) {
      console.error('Failed to load settings:', error)
      setSettings(DEFAULT_SETTINGS)
    } finally {
      setLoading(false)
    }
  }

  const updateSettings = async (updates) => {
    try {
      const newSettings = { ...settings, ...updates }
      await dbSet('settings', {
        key: 'user-settings',
        value: newSettings,
        updatedAt: new Date().toISOString()
      })
      setSettings(newSettings)
      return newSettings
    } catch (error) {
      console.error('Failed to update settings:', error)
    }
  }

  return {
    settings,
    loading,
    updateSettings
  }
}
