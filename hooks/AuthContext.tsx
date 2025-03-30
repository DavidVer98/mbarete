// hooks/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { authApi as apiLogin } from '../api/auth' // Importamos la función de login de la API

type AuthContextType = {
  token: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>
  checkToken: () => Promise<void>
};

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkToken()
  }, [])

  const checkToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('jwt')
      setToken(storedToken)
    } catch (error) {
      console.error('Error checking token:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (email: string, password: string) => {
    try {
      const data = await apiLogin.login({ email, password })
      if (data.jwt) {
        await AsyncStorage.setItem('jwt', data.jwt)
        setToken(data.jwt)
        console.log('Token almacenado:', data.jwt)
        return true
      }
      return false
    } catch (error) {
      console.error('Error de red:', error)
      return false
    }
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('jwt')
      setToken(null)
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  const value = {
    token,
    isLoading,
    login: handleLogin,
    logout,
    checkToken
  }

  if (isLoading) {
    return null // O un componente de loading si lo prefieres
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}