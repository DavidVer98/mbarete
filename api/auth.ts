import api from './config'
import { LoginRequest, LoginResponse } from './types'

// // Configuración base de Axios (¡IMPORTANTE para Android!)
// axios.defaults.baseURL = 'http://192.168.100.2:3001'; // Para Android Emulator
// // axios.defaults.baseURL = 'http://192.168.x.xxx:3001'; // Para dispositivo físico

// api/auth.ts
export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', credentials)
    return response.data
  },
  
  logout: async () => {
    await api.post('/auth/logout')
  },
  
  register: async (userData: LoginRequest) => {
    const response = await api.post('/auth/register', userData)
    return response.data
  }
}