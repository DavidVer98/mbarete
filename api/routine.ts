import api from "./config"
import {
  CreateRoutineRequest,
  GetRoutinesRequest,
  GetRoutinesDetailsRequest,
  TodayRoutineResponse,
} from "./types"

export const routineApi = {
  createRoutine: async (routine: CreateRoutineRequest) => {
    const response = await api.post("/routines/create-with-exercises", routine)
    return response.data
  },
  getRoutines: async () => {
    const response = await api.get<GetRoutinesRequest[]>("/routines/user")
    return response.data
  },
  getRoutineDetails: async (id: number) => {
    const response = await api.get<GetRoutinesDetailsRequest>(
      `/routines/detail/${id}`
    )
    return response.data
  },
  addExerciseToRoutine: async (routineId: number, exerciseId: number) => {
    const response = await api.post(
      `/routines/${routineId}/add-exercise/${exerciseId}`
    )
    return response.data
  },
  deleteExerciseFromRoutine: async (routineId: number, exerciseId: number) => {
    const response = await api.delete(
      `/routines/${routineId}/delete-exercise/${exerciseId}`
    )
    return response.data
  },
  getTodayRoutines: async () => {
    const response = await api.get<TodayRoutineResponse>("/routines/today-routines")
    return response.data
  },
}
