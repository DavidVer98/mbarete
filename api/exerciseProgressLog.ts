import api from "./config"
import { CreateExerciseProgressLogDto, ExerciseHistoryEntryDto, ExerciseProgressLogResponse, MonthlyStatsDto } from "./types"

export const exerciseProgressLogApi = {
  createExerciseProgressLog: async (exerciseProgressLog: CreateExerciseProgressLogDto): Promise<void> => {
    await api.post("/exercise-progress-log/create", exerciseProgressLog)
  },
  getExerciseProgressLogs: async (exerciseId: number): Promise<ExerciseProgressLogResponse[]> => {
    const response = await api.get<ExerciseProgressLogResponse[]>(`/exercise-progress-log/${exerciseId}`)
    return response.data
  },
  editExerciseProgressLog: async (exerciseProgressLog: CreateExerciseProgressLogDto, exerciseProgressLogId: number): Promise<void> => {
    await api.patch(`/exercise-progress-log/edit/${exerciseProgressLogId}`, exerciseProgressLog)
  },
  deleteExerciseProgressLog: async (exerciseProgressLogId: number): Promise<void> => {
    await api.delete(`/exercise-progress-log/delete/${exerciseProgressLogId}`)
  },

  async getExerciseHistory(exerciseId: number): Promise<ExerciseHistoryEntryDto[]> {
    const response = await api.get<ExerciseHistoryEntryDto[]>(`/exercise-progress-log/${exerciseId}/history`)
    return response.data
  },

  async getMonthlyStats(): Promise<MonthlyStatsDto> {
    const response = await api.get<MonthlyStatsDto>("/exercise-progress-log/stats/monthly")
    return response.data
  }
}
