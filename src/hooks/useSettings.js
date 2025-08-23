import { useDataWithFallback } from './useDataWithFallback'
import { settingsAPI } from '../lib/api'
import { FALLBACK_SETTINGS } from '../data/fallbackData'

export function useSettings() {
  return useDataWithFallback(
    () => settingsAPI.get(),
    FALLBACK_SETTINGS,
    [], // Empty dependency array - fetch only once
    {
      onSuccess: (data) => console.log('✅ Settings loaded from API'),
      onError: (error) => console.log('⚠️ Using fallback settings:', error.message)
    }
  )
}

export function useAdminSettings() {
  return useDataWithFallback(
    () => settingsAPI.getAdmin(),
    FALLBACK_SETTINGS,
    [], // Empty dependency array - fetch only once
    {
      onSuccess: (data) => console.log('✅ Admin settings loaded from API'),
      onError: (error) => console.log('⚠️ Using fallback admin settings:', error.message)
    }
  )
}