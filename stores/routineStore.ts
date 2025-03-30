import { create } from 'zustand'
import { Exercise, RoutineState } from './types'

interface Routine {
    name: string;
    description: string;
    selectedDays: number[];
    selectedExerciseIds: number[];
}

interface ValidationErrors {
    name?: string;
    description?: string;
    selectedDays?: string;
    selectedExerciseIds?: string;
}

interface RoutineStore {
    routine: Routine;
    setRoutine: (routine: RoutineState) => void;
    addExercise: (exercise: Exercise) => void;
    removeExercise: (exercise: Exercise) => void;
    addDay: (day: number) => void;
    removeDay: (day: number) => void;
    resetRoutine: () => void;
    errors: ValidationErrors;
    validateRoutine: () => { valid: boolean; errors: ValidationErrors };
    clearErrors: () => void;
}

export const useRoutineStore = create<RoutineStore>((set, get) => ({
    routine: {
        name: "",
        description: "",
        selectedDays: [],
        selectedExerciseIds: []
    },
    setRoutine: (routine: RoutineState) => set({ routine }),
    addExercise: (exercise: Exercise) => set(state => ({
        routine: {
            ...state.routine,
            selectedExercises: [...state.routine.selectedExerciseIds, exercise.id]
        }
    })),
    removeExercise: (exercise: Exercise) => set(state => ({
        routine: {
            ...state.routine,
            selectedExercises: state.routine.selectedExerciseIds.filter(e => e !== exercise.id)
        }
    })),
    addDay: (day: number) => set(state => ({
        routine: {
            ...state.routine,
            selectedDays: [...state.routine.selectedDays, day]
        }
    })),
    removeDay: (day: number) => set(state => ({
        routine: {
            ...state.routine,
            selectedDays: state.routine.selectedDays.filter(d => d !== day)
        }
    })),
    resetRoutine: () => set({ routine: {
        name: "",
        description: "",
        selectedDays: [],
        selectedExerciseIds: []
    }}),
    errors: {},
    
    clearErrors: () => set({ errors: {} }),

    validateRoutine: () => {
        const { name, description, selectedDays, selectedExerciseIds } = get().routine
        const errors: ValidationErrors = {}
        
        if (!name.trim()) {
            errors.name = "El nombre de la rutina es requerido"
        }
        
        if (!description.trim()) {
            errors.description = "La descripción de la rutina es requerida"
        }
        
        if (selectedDays.length === 0) {
            errors.selectedDays = "Debes seleccionar al menos un día"
        }
        
        if (selectedExerciseIds.length === 0) {
            errors.selectedExerciseIds = "Debes seleccionar al menos un ejercicio"
        }

        set({ errors })
        return {
            valid: Object.keys(errors).length === 0,
            errors
        }
    }
}))