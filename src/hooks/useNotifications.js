import { useEffect, useState } from 'react'
import { useSettings } from './useSettings'
import { useDailyLog } from './useDailyLog'
import { scheduleWaterReminder, sendImmediateNotification, requestNotificationPermission } from '../services/notifications'

export const useNotifications = () => {
  const { settings } = useSettings()
  const { dailyLog } = useDailyLog()
  const [notificationEnabled, setNotificationEnabled] = useState(false)
  const [permissionGranted, setPermissionGranted] = useState(false)

  useEffect(() => {
    initializeNotifications()
  }, [settings.notificationsEnabled])

  const initializeNotifications = async () => {
    if (!settings.notificationsEnabled) {
      setNotificationEnabled(false)
      return
    }

    const granted = await requestNotificationPermission()
    setPermissionGranted(granted)

    if (granted) {
      setNotificationEnabled(true)
      scheduleReminders()
    }
  }

  const scheduleReminders = async () => {
    if (settings.waterReminder && settings.notificationsEnabled) {
      await scheduleWaterReminder(settings.waterReminder)
    }
  }

  const sendWaterReminder = async () => {
    await sendImmediateNotification(
      '💧 Hydratation',
      `Bois un verre d'eau! Tu as consommé ${dailyLog?.water || 0}L / ${settings.waterGoal}L`
    )
  }

  const sendMealReminder = async () => {
    await sendImmediateNotification(
      '🍽️ Nutrition',
      `N'oublie pas de logger tes repas! Calories: ${dailyLog?.calories || 0} / ${settings.calorieGoal}`
    )
  }

  const sendWorkoutReminder = async () => {
    await sendImmediateNotification(
      '🏋️ Entraînement',
      'C\'est un bon moment pour faire de l\'exercice!'
    )
  }

  return {
    notificationEnabled,
    permissionGranted,
    sendWaterReminder,
    sendMealReminder,
    sendWorkoutReminder
  }
}
