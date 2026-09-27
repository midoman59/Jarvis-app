import { useState, useEffect } from 'react'
import { dbGet, dbSet, dbGetAll, dbDelete, getTodayKey } from '../services/database'

export const useObjectives = () => {
  const [objectives, setObjectives] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadObjectives()
  }, [])

  const loadObjectives = async () => {
    try {
      const allObjectives = await dbGetAll('objectives')
      const today = getTodayKey()

      // Filter objectives for today or without a specific date
      const todayObjectives = allObjectives.filter(
        obj => !obj.date || obj.date === today
      )

      setObjectives(todayObjectives)
    } catch (error) {
      console.error('Failed to load objectives:', error)
    } finally {
      setLoading(false)
    }
  }

  const addObjective = async (objective) => {
    try {
      const newObjective = {
        ...objective,
        completed: false,
        date: getTodayKey(),
        createdAt: new Date().toISOString()
      }

      await dbSet('objectives', newObjective)
      await loadObjectives()
      return newObjective
    } catch (error) {
      console.error('Failed to add objective:', error)
    }
  }

  const toggleObjective = async (id) => {
    try {
      const objective = objectives.find(obj => obj.id === id)
      if (objective) {
        const updated = { ...objective, completed: !objective.completed }
        await dbSet('objectives', updated)
        await loadObjectives()
      }
    } catch (error) {
      console.error('Failed to toggle objective:', error)
    }
  }

  const removeObjective = async (id) => {
    try {
      await dbDelete('objectives', id)
      await loadObjectives()
    } catch (error) {
      console.error('Failed to remove objective:', error)
    }
  }

  const getProgress = () => {
    if (objectives.length === 0) return 0
    const completed = objectives.filter(obj => obj.completed).length
    return Math.round((completed / objectives.length) * 100)
  }

  return {
    objectives,
    loading,
    addObjective,
    toggleObjective,
    removeObjective,
    getProgress
  }
}
