import api from "./config"
import { ExcerciseResponse } from "./types"

export const exerciseApi = {
  getExcercises: async (): Promise<ExcerciseResponse[]> => {
    const response = await api.get<ExcerciseResponse[]>("/exercise")
    return response.data
  },
}
