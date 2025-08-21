import { createContext, useContext, useReducer, useEffect } from 'react'
import { authAPI } from '../lib/api'

const AuthContext = createContext()

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isLoading: true,
  isAuthenticated: false
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false
      }
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false
      }
    
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false
      }
    
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token')
      
      if (token) {
        try {
          const response = await authAPI.me()
          if (response.success) {
            dispatch({
              type: 'SET_USER',
              payload: response.data.user
            })
          } else {
            localStorage.removeItem('token')
            dispatch({ type: 'SET_LOADING', payload: false })
          }
        } catch (error) {
          console.error('Auth initialization error:', error)
          localStorage.removeItem('token')
          dispatch({ type: 'SET_LOADING', payload: false })
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }

    initializeAuth()
  }, [])

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials)
      
      if (response.success) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: response.data
        })
        return { success: true }
      } else {
        return { success: false, message: response.message }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { 
        success: false, 
        message: error.message || 'Login failed. Please try again.' 
      }
    }
  }

  const logout = async () => {
    try {
      await authAPI.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      dispatch({ type: 'LOGOUT' })
    }
  }

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData)
      
      if (response.success) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: response.data
        })
        return { success: true }
      } else {
        return { success: false, message: response.message }
      }
    } catch (error) {
      console.error('Register error:', error)
      return { 
        success: false, 
        message: error.message || 'Registration failed. Please try again.' 
      }
    }
  }

  const value = {
    ...state,
    login,
    logout,
    register
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}