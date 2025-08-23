import { useState, useEffect } from 'react'

/**
 * Custom hook for fetching data with intelligent fallback to hardcoded data
 * @param {Function} apiCall - Async function that makes the API call
 * @param {*} fallbackData - Hardcoded data to use when API fails
 * @param {Array} dependencies - Dependencies array for useEffect
 * @param {Object} options - Additional options
 * @returns {Object} { data, isLoading, isFromAPI, error, refetch }
 */
export const useDataWithFallback = (apiCall, fallbackData, dependencies = [], options = {}) => {
  const [data, setData] = useState(fallbackData)
  const [isLoading, setIsLoading] = useState(true)
  const [isFromAPI, setIsFromAPI] = useState(false)
  const [error, setError] = useState(null)
  const [isInitialized, setIsInitialized] = useState(false)

  const { 
    enableRetry = true,
    retryDelay = 5000,
    maxRetries = 3,
    onSuccess,
    onError,
    transform
  } = options

  const fetchData = async (retryCount = 0) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const apiData = await apiCall()
      
      // Transform data if transformer function provided
      const transformedData = transform ? transform(apiData) : apiData
      
      setData(transformedData)
      setIsFromAPI(true)
      setError(null)
      
      if (onSuccess) {
        onSuccess(transformedData)
      }
      
      console.log('✅ API data loaded successfully')
    } catch (err) {
      console.warn('⚠️ API call failed, using fallback data:', err.message)
      
      setData(fallbackData)
      setIsFromAPI(false)
      setError(err)
      
      if (onError) {
        onError(err)
      }
      
      // Retry logic
      if (enableRetry && retryCount < maxRetries) {
        console.log(`🔄 Retrying API call in ${retryDelay}ms (attempt ${retryCount + 1}/${maxRetries})`)
        setTimeout(() => {
          fetchData(retryCount + 1)
        }, retryDelay)
        return
      }
    } finally {
      setIsLoading(false)
      setIsInitialized(true)
    }
  }

  const refetch = () => {
    setIsInitialized(false)
    fetchData()
  }

  useEffect(() => {
    fetchData()
  }, dependencies || []) // Default to empty array if null/undefined

  return { 
    data, 
    isLoading: isLoading && !isInitialized, 
    isFromAPI, 
    error, 
    refetch,
    isInitialized
  }
}

/**
 * Hook specifically for paginated data with fallback
 * @param {Function} apiCall - API call function that accepts pagination params
 * @param {*} fallbackData - Fallback data
 * @param {Object} paginationState - Current pagination state
 * @param {Object} options - Additional options
 * @returns {Object} Enhanced return object with pagination helpers
 */
export const usePaginatedDataWithFallback = (apiCall, fallbackData, paginationState, options = {}) => {
  const { page = 1, limit = 10, ...filters } = paginationState
  
  const fetchPaginatedData = async () => {
    return await apiCall({ page, limit, ...filters })
  }

  const result = useDataWithFallback(
    fetchPaginatedData,
    { data: fallbackData, pagination: { page: 1, limit: 10, total: fallbackData.length, pages: 1 } },
    [page, limit, JSON.stringify(filters)],
    options
  )

  return {
    ...result,
    items: result.data?.data || result.data || [],
    pagination: result.data?.pagination || { page: 1, limit: 10, total: result.data?.length || 0, pages: 1 }
  }
}

/**
 * Hook for single item data with fallback (e.g., blog post by slug)
 * @param {Function} apiCall - API call function
 * @param {*} fallbackData - Fallback data
 * @param {string} identifier - ID or slug
 * @param {Object} options - Additional options
 * @returns {Object} Standard return object
 */
export const useItemWithFallback = (apiCall, fallbackData, identifier, options = {}) => {
  const fetchItem = async () => {
    if (!identifier) throw new Error('No identifier provided')
    return await apiCall(identifier)
  }

  return useDataWithFallback(
    fetchItem,
    fallbackData,
    [identifier],
    options
  )
}

export default useDataWithFallback