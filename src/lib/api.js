const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

// API utility functions
class ApiClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL
    this.token = localStorage.getItem('token')
  }

  setToken(token) {
    this.token = token
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    return headers
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: this.getHeaders(),
      ...options
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new ApiError(data.message || 'An error occurred', response.status, data)
      }

      return data
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError('Network error occurred', 0, { originalError: error })
    }
  }

  async get(endpoint) {
    return this.request(endpoint)
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    })
  }

  async uploadFile(endpoint, formData) {
    const url = `${this.baseURL}${endpoint}`
    const headers = {}
    
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    console.log('uploadFile called:', { url, hasToken: !!this.token, endpoint })

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: formData
      })

      console.log('Upload response status:', response.status)
      
      const data = await response.json()
      console.log('Upload response data:', data)

      if (!response.ok) {
        throw new ApiError(data.message || 'An error occurred', response.status, data)
      }

      return data
    } catch (error) {
      console.error('Upload error:', error)
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError('Network error occurred', 0, { originalError: error })
    }
  }
}

// Custom error class for API errors
class ApiError extends Error {
  constructor(message, status, data = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }

  get isNetworkError() {
    return this.status === 0
  }

  get isClientError() {
    return this.status >= 400 && this.status < 500
  }

  get isServerError() {
    return this.status >= 500
  }

  get isUnauthorized() {
    return this.status === 401
  }

  get isForbidden() {
    return this.status === 403
  }

  get isNotFound() {
    return this.status === 404
  }

  get isValidationError() {
    return this.status === 400 && this.data.errors
  }
}

// Create API client instance
const apiClient = new ApiClient()

// Auth API functions
export const authAPI = {
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials)
    if (response.success && response.data.token) {
      apiClient.setToken(response.data.token)
    }
    return response
  },

  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData)
    if (response.success && response.data.token) {
      apiClient.setToken(response.data.token)
    }
    return response
  },

  logout: async () => {
    try {
      await apiClient.post('/auth/logout')
    } finally {
      apiClient.setToken(null)
    }
  },

  me: async () => {
    return apiClient.get('/auth/me')
  },

  changePassword: async (passwords) => {
    return apiClient.put('/auth/change-password', passwords)
  },

  forgotPassword: async (email) => {
    return apiClient.post('/auth/forgot-password', { email })
  }
}

// Contact API functions
export const contactAPI = {
  submit: async (contactData) => {
    return apiClient.post('/contacts', contactData)
  },

  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiClient.get(`/contacts${queryString ? `?${queryString}` : ''}`)
  },

  getById: async (id) => {
    return apiClient.get(`/contacts/${id}`)
  },

  update: async (id, updateData) => {
    return apiClient.put(`/contacts/${id}`, updateData)
  },

  delete: async (id) => {
    return apiClient.delete(`/contacts/${id}`)
  },

  getStats: async () => {
    return apiClient.get('/contacts/stats/summary')
  }
}

// Quote API functions
export const quoteAPI = {
  submit: async (quoteData, files = []) => {
    const formData = new FormData()
    
    // Add quote data
    Object.keys(quoteData).forEach(key => {
      if (quoteData[key] !== undefined && quoteData[key] !== null) {
        formData.append(key, quoteData[key])
      }
    })
    
    // Add files
    files.forEach(file => {
      formData.append('files', file)
    })
    
    return apiClient.uploadFile('/quotes', formData)
  },

  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiClient.get(`/quotes${queryString ? `?${queryString}` : ''}`)
  },

  getById: async (id) => {
    return apiClient.get(`/quotes/${id}`)
  },

  update: async (id, updateData) => {
    return apiClient.put(`/quotes/${id}`, updateData)
  },

  delete: async (id) => {
    return apiClient.delete(`/quotes/${id}`)
  },

  getStats: async () => {
    return apiClient.get('/quotes/stats/summary')
  }
}

// Blog API functions
export const blogAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiClient.get(`/blogs${queryString ? `?${queryString}` : ''}`)
  },

  getById: async (id) => {
    return apiClient.get(`/blogs/${id}`)
  },

  create: async (blogData, imageFile = null) => {
    console.log('blogAPI.create called with:', { blogData, imageFile })
    const formData = new FormData()
    
    // Add blog data
    Object.keys(blogData).forEach(key => {
      if (key === 'tags' && Array.isArray(blogData[key])) {
        formData.append(key, JSON.stringify(blogData[key]))
      } else if (blogData[key] !== undefined && blogData[key] !== null) {
        formData.append(key, blogData[key])
      }
    })
    
    // Add image file
    if (imageFile) {
      formData.append('image', imageFile)
    }
    
    console.log('FormData contents:', [...formData.entries()])
    
    const response = await apiClient.uploadFile('/blogs', formData)
    console.log('blogAPI.create response:', response)
    return response
  },

  update: async (id, blogData, imageFile = null) => {
    const formData = new FormData()
    
    // Add blog data
    Object.keys(blogData).forEach(key => {
      if (key === 'tags' && Array.isArray(blogData[key])) {
        formData.append(key, JSON.stringify(blogData[key]))
      } else if (blogData[key] !== undefined && blogData[key] !== null) {
        formData.append(key, blogData[key])
      }
    })
    
    // Add image file
    if (imageFile) {
      formData.append('image', imageFile)
    }
    
    const url = `${apiClient.baseURL}/blogs/${id}`
    const headers = {}
    
    if (apiClient.token) {
      headers.Authorization = `Bearer ${apiClient.token}`
    }

    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: formData
    })

    const data = await response.json()

    if (!response.ok) {
      throw new ApiError(data.message || 'An error occurred', response.status, data)
    }

    return data
  },

  delete: async (id) => {
    return apiClient.delete(`/blogs/${id}`)
  },

  toggleFeatured: async (id) => {
    return apiClient.put(`/blogs/${id}/toggle-featured`)
  },

  togglePublish: async (id) => {
    return apiClient.put(`/blogs/${id}/toggle-published`)
  },

  getStats: async () => {
    return apiClient.get('/blogs/stats/summary')
  }
}

// Portfolio API functions  
export const portfolioAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiClient.get(`/portfolio${queryString ? `?${queryString}` : ''}`)
  },

  getById: async (id) => {
    return apiClient.get(`/portfolio/${id}`)
  },

  create: async (portfolioData, imageFiles = []) => {
    const formData = new FormData()
    
    // Add portfolio data
    Object.keys(portfolioData).forEach(key => {
      if (Array.isArray(portfolioData[key])) {
        formData.append(key, JSON.stringify(portfolioData[key]))
      } else if (portfolioData[key] !== undefined && portfolioData[key] !== null) {
        formData.append(key, portfolioData[key])
      }
    })
    
    // Add image files
    imageFiles.forEach(file => {
      formData.append('images', file)
    })
    
    return apiClient.uploadFile('/portfolio', formData)
  },

  update: async (id, portfolioData, imageFiles = []) => {
    const formData = new FormData()
    
    // Add portfolio data
    Object.keys(portfolioData).forEach(key => {
      if (Array.isArray(portfolioData[key])) {
        formData.append(key, JSON.stringify(portfolioData[key]))
      } else if (portfolioData[key] !== undefined && portfolioData[key] !== null) {
        formData.append(key, portfolioData[key])
      }
    })
    
    // Add image files
    imageFiles.forEach(file => {
      formData.append('images', file)
    })
    
    const url = `${apiClient.baseURL}/portfolio/${id}`
    const headers = {}
    
    if (apiClient.token) {
      headers.Authorization = `Bearer ${apiClient.token}`
    }

    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: formData
    })

    const data = await response.json()

    if (!response.ok) {
      throw new ApiError(data.message || 'An error occurred', response.status, data)
    }

    return data
  },

  delete: async (id) => {
    return apiClient.delete(`/portfolio/${id}`)
  },

  updateStatus: async (id, status) => {
    return apiClient.put(`/portfolio/${id}/status`, { status })
  },

  toggleFeatured: async (id) => {
    return apiClient.put(`/portfolio/${id}/toggle-featured`)
  },

  togglePublished: async (id) => {
    return apiClient.put(`/portfolio/${id}/toggle-published`)
  },

  getStats: async () => {
    return apiClient.get('/portfolio/stats/summary')
  }
}

// Settings API functions
export const settingsAPI = {
  get: async () => {
    return apiClient.get('/settings')
  },

  getAdmin: async () => {
    return apiClient.get('/settings/admin')
  },

  update: async (settingsData, files = {}) => {
    const formData = new FormData()

    // Handle nested objects and arrays
    const appendNestedData = (data, prefix = '') => {
      Object.keys(data).forEach(key => {
        const value = data[key]
        const fieldName = prefix ? `${prefix}.${key}` : key

        if (value === null || value === undefined) {
          return
        }

        if (typeof value === 'object' && !Array.isArray(value) && !(value instanceof File)) {
          // For nested objects, stringify them
          formData.append(fieldName, JSON.stringify(value))
        } else if (Array.isArray(value)) {
          formData.append(fieldName, JSON.stringify(value))
        } else {
          formData.append(fieldName, value)
        }
      })
    }

    appendNestedData(settingsData)

    // Add files
    Object.keys(files).forEach(fieldName => {
      if (files[fieldName]) {
        formData.append(fieldName, files[fieldName])
      }
    })

    return apiClient.uploadFile('/settings', formData)
  },

  updateSection: async (section, sectionData) => {
    return apiClient.put(`/settings/section/${section}`, sectionData)
  },

  reset: async () => {
    return apiClient.delete('/settings/reset')
  },

  backup: async () => {
    return apiClient.post('/settings/backup')
  },

  getStorageInfo: async () => {
    return apiClient.get('/settings/storage-info')
  }
}

// Health check
export const healthAPI = {
  check: async () => {
    return apiClient.get('/health')
  }
}

export { ApiError, apiClient }
export default apiClient