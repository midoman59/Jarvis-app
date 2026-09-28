import { useState, useEffect } from 'react'
import { dbGet, dbSet, getTodayKey, getDefaultDailyLog } from '../services/database'

export const useDailyLog = () => {
  const [dailyLog, setDailyLog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDailyLog()
  }, [])

  const loadDailyLog = async () => {
    try {
      const today = getTodayKey()
      let log = await dbGet('daily_log', today)

      if (!log) {
        log = getDefaultDailyLog(today)
        await dbSet('daily_log', log)
      }

      setDailyLog(log)
    } catch (error) {
      console.error('Failed to load daily log:', error)
      setDailyLog(getDefaultDailyLog())
    } finally {
      setLoading(false)
    }
  }

  const updateDailyLog = async (updates) => {
    try {
      const today = getTodayKey()
      const updated = { ...dailyLog, ...updates, date: today }
      await dbSet('daily_log', updated)
      setDailyLog(updated)
      return updated
    } catch (error) {
      console.error('Failed to update daily log:', error)
    }
  }

  const addWater = async (amount) => {
    const newWater = Math.max(0, (dailyLog?.water || 0) + amount)
    return updateDailyLog({ water: newWater })
  }

  const addMeal = async (meal) => {
    const meals = dailyLog?.meals || []
    const newMeals = [...meals, { ...meal, id: Date.now(), addedAt: new Date().toISOString() }]
    const totalCalories = (dailyLog?.calories || 0) + (meal.calories || 0)

    return updateDailyLog({
      meals: newMeals,
      calories: totalCalories,
      protein: (dailyLog?.protein || 0) + (meal.protein || 0),
      carbs: (dailyLog?.carbs || 0) + (meal.carbs || 0),
      fat: (dailyLog?.fat || 0) + (meal.fat || 0)
    })
  }

  const removeMeal = async (mealId) => {
    const meal = dailyLog?.meals?.find(m => m.id === mealId)
    if (!meal) return

    const newMeals = dailyLog.meals.filter(m => m.id !== mealId)
    return updateDailyLog({
      meals: newMeals,
      calories: Math.max(0, (dailyLog?.calories || 0) - (meal.calories || 0)),
      protein: Math.max(0, (dailyLog?.protein || 0) - (meal.protein || 0)),
      carbs: Math.max(0, (dailyLog?.carbs || 0) - (meal.carbs || 0)),
      fat: Math.max(0, (dailyLog?.fat || 0) - (meal.fat || 0))
    })
  }

  const addSport = async (workout) => {
    const sports = dailyLog?.sport || []
    const newSports = [...sports, { ...workout, id: Date.now(), addedAt: new Date().toISOString() }]
    return updateDailyLog({ sport: newSports })
  }

  return {
    dailyLog,
    loading,
    addWater,
    addMeal,
    removeMeal,
    addSport,
    updateDailyLog
  }
}
