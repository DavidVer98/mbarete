// api/config.ts
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Crear una instancia de axios con configuración base
const api = axios.create({
  baseURL: 'http://192.168.100.2:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para agregar el token a todas las peticiones
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('jwt')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    } catch (error) {
      console.error('Error accessing AsyncStorage:', error)
      return config
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api