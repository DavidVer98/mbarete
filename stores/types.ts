export interface Exercise{
    id: number;
    name: string;
    description: string;
    muscleGroup: muscleGroup;
}

export interface muscleGroup{
    id: number;
    name: string;
}

export interface RoutineState{
    name: string;
    description: string;
    selectedDays: number[];
    selectedExerciseIds: number[];  // Cambiado de selectedExercises: Exercise[]
}

export interface ValidationResult{
    valid: boolean
    errors: string[]
}