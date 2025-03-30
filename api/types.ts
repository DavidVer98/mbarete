// api/types.ts
export interface LoginResponse {
    jwt: string;
    user: {
      id: string;
      email: string;
      name: string;
    };
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }

  export interface ExcerciseResponse {
    id: number;
    name: string;
    description: string;
    muscleGroup: {
      id: number;
      name: string;
    };

  }
    export interface CreateRoutineRequest {
      name: string;
      description: string;
      dayOfWeek: number[];
      exercises: {
        id: number;
      }[];
  }


  export interface GetRoutinesRequest {
    id: number
    name: string
    description: string
    totalExercises: number
    createdAt: Date
    trainingDays: number[]
  }

  export interface GetRoutinesDetailsRequest {
    id: number
    name: string
    description: string
    routineExercises: {
      id: number
      exercise: {
        id: number
        name: string
        description: string
        muscleGroup: string
      }
      progressLogs: {
        id: number;
        reps: number;
        weight: number;
    }[]
    }[]
    dayRoutines: {
      id: number
      dayOfWeek: number
      order: number
    }[]
  }

  export interface deleteExerciseFromRoutineRequest {
    routineId: number
    exerciseId: number
  }

  //addExerciseToRoutineRequest
  export interface addExerciseToRoutineRequest {
    id: number
  }


  export interface TodayRoutineExerciseDto {
    id: number
    name: string
    description: string
    muscleGroup: string
  }
  
  export interface TodayRoutineResponse {
    id: number;
    name: string;
    description: string;
    exercises: {
      id: number;
      name: string;
      description: string;
      muscleGroup: string;
      progressLogs: {
        id: number;
        reps: number;
        weight: number;
        date: Date;
        isNewRecord: boolean;
      }[];
    }[];
  }

  export interface CreateExerciseProgressLogDto {
    exerciseId: number
    reps: number
    weight: number
  }

  export interface ExerciseProgressLogResponse {
    id: number
    reps: number
    weight: number
    date: Date
    isNewRecord: boolean
    exerciseId: number
  }


  export interface ExerciseSetDto {
    reps: string
    weight: string
    isNewRecord: boolean
  }
  
  export interface ExerciseHistoryEntryDto {
    date: string
    sets: ExerciseSetDto[]
  }

  export interface MonthlyStatsDto {
    totalWorkouts: number;
    totalExercises: number;
    totalWeight: number;
    totalReps: number;
    personalRecords: number;
    mostFrequentExercise: {
      exerciseId: number;
      name: string;
      count: number;
    };
    bestDay: {
      date: string;
      totalWeight: number;
    };
    maxWeightExercise: {
      exerciseId: number;
      weight: number;
      name: string;
      date: string;
      reps: number;
    };
    maxRepsExercise: {
      exerciseId: number;
      reps: number;
      name: string;
      date: string;
      weight: number;
    };
  }
