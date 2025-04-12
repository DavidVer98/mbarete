import { useEffect, useState } from 'react'
import { ScrollView, Pressable, TextInput } from 'react-native'
import { YStack, XStack, Text, Card, styled } from 'tamagui'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { exerciseApi } from '@/api/exercise'
import { routineApi } from '@/api/routine'
import { ExcerciseResponse, GetRoutinesDetailsRequest } from '@/api/types'
import { BackButton } from '@/components/BackButton'
import { toast } from 'sonner-native'
import { ExerciseSetsSkeleton } from '@/components/ExerciseSetsSkeleton'

const ExerciseCard = styled(Card, {
  backgroundColor: '$background',
  borderRadius: 12,
  padding: 12,
  marginBottom: 8,
  borderWidth: 1,
  borderColor: 'rgba(128, 128, 128, 0.1)',
})

const MuscleGroupTag = styled(Card, {
  backgroundColor: '#00b28333',
  borderRadius: 6,
  paddingVertical: 4,
  paddingHorizontal: 8,
  marginTop: 8,
  borderWidth: 1,
  borderColor: '#00b283',
  alignSelf: 'flex-start',
})

// const ConfirmButton = styled(Button, {
//   backgroundColor: '#00b283',
//   borderRadius: 12,
//   paddingVertical: 12,
//   marginVertical: 8,
//   variants: {
//     disabled: {
//       true: {
//         backgroundColor: 'rgba(0, 178, 131, 0.4)',
//       },
//     },
//   },
// })

const FloatingActionBar = styled(XStack, {
  position: 'absolute',
  bottom: 20,
  left: 20,
  right: 20,
  backgroundColor: 'rgba(50, 50, 50, 0.95)',
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 16,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 5,
})

export default function SelectExercise() {
  const { routineId } = useLocalSearchParams()
  const router = useRouter()
  const [exercises, setExercises] = useState<ExcerciseResponse[]>([])
  const [filteredExercises, setFilteredExercises] = useState<ExcerciseResponse[]>([])
  const [selectedExercises, setSelectedExercises] = useState<number[]>([])
  const [existingExercises, setExistingExercises] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [addingExercises, setAddingExercises] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Cargar los ejercicios disponibles
        const exercisesData = await exerciseApi.getExcercises()
        setExercises(exercisesData)
        setFilteredExercises(exercisesData)

        // Cargar detalles de la rutina para obtener ejercicios existentes
        if (routineId) {
          const routineDetails: GetRoutinesDetailsRequest = await routineApi.getRoutineDetails(
            Number(routineId)
          )

          // Extraer IDs de ejercicios que ya están en la rutina
          const existingExerciseIds =
            routineDetails.routineExercises?.map(routineExercise => routineExercise.exercise.id) ||
            []

          setExistingExercises(existingExerciseIds)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        toast.error('No se pudieron cargar los datos')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [routineId])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredExercises(exercises)
    } else {
      const lowercasedQuery = searchQuery.toLowerCase()
      const filtered = exercises.filter(
        exercise =>
          exercise.name.toLowerCase().includes(lowercasedQuery) ||
          exercise.description.toLowerCase().includes(lowercasedQuery) ||
          exercise.muscleGroup.name.toLowerCase().includes(lowercasedQuery)
      )
      setFilteredExercises(filtered)
    }
  }, [searchQuery, exercises])

  const toggleExerciseSelection = (exerciseId: number) => {
    setSelectedExercises(prev => {
      if (prev.includes(exerciseId)) {
        return prev.filter(id => id !== exerciseId)
      } else {
        return [...prev, exerciseId]
      }
    })
  }

  const handleConfirmSelection = async () => {
    if (selectedExercises.length === 0) return

    try {
      setAddingExercises(true)
      let successCount = 0

      // Filtrar ejercicios ya existentes para no volver a añadirlos
      const newExercisesToAdd = selectedExercises.filter(id => !existingExercises.includes(id))

      if (newExercisesToAdd.length === 0) {
        toast.info('Los ejercicios seleccionados ya están en la rutina')
        router.back()
        return
      }

      // Añadir ejercicios uno por uno
      for (const exerciseId of newExercisesToAdd) {
        try {
          await routineApi.addExerciseToRoutine(Number(routineId), exerciseId)
          successCount++
        } catch (error) {
          console.error(`Error añadiendo ejercicio ${exerciseId}:`, error)
        }
      }

      if (successCount === newExercisesToAdd.length) {
        toast.success(`${successCount} ejercicios añadidos correctamente`)
      } else if (successCount > 0) {
        toast.success(`${successCount} de ${newExercisesToAdd.length} ejercicios añadidos`)
      } else {
        toast.error('No se pudieron añadir los ejercicios')
      }

      router.back()
    } catch (error: unknown) {
      console.error('Error al añadir ejercicios:', error)
      toast.error('Error al añadir ejercicios')
    } finally {
      setAddingExercises(false)
    }
  }

  const clearSelection = () => {
    setSelectedExercises([])
  }

  return (
    <YStack flex={1} backgroundColor="$background" padding="$4">
      <XStack alignItems="center" justifyContent="space-between" marginBottom="$4" marginTop="$6">
        <BackButton />
        <Text fontSize={24} fontWeight="bold" flex={1} textAlign="center">
          Añadir Ejercicio
        </Text>
        <XStack width={28} />
      </XStack>

      <YStack marginBottom="$4">
        <XStack
          backgroundColor="$background"
          borderWidth={1}
          borderColor="rgba(128, 128, 128, 0.2)"
          borderRadius={12}
          paddingHorizontal="$3"
          paddingVertical="$2"
          alignItems="center"
        >
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            placeholder="Buscar ejercicios..."
            placeholderTextColor="#9CA3AF"
            style={{
              flex: 1,
              color: '#fff',
              fontSize: 16,
              paddingHorizontal: 10,
              paddingVertical: 8,
            }}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <Pressable onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </Pressable>
          ) : null}
        </XStack>
      </YStack>

      {loading ? (
        <YStack flex={1} justifyContent="center" alignItems="center">
          <ExerciseSetsSkeleton />
        </YStack>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <YStack space="$2">
            <XStack justifyContent="space-between" alignItems="center" marginBottom="$2">
              <Text fontSize={20} fontWeight="bold" color="$color">
                Ejercicios ({filteredExercises.length})
              </Text>
              {selectedExercises.length > 0 && (
                <Pressable onPress={clearSelection}>
                  <Text color="#00b283" fontSize={14}>
                    Limpiar ({selectedExercises.length})
                  </Text>
                </Pressable>
              )}
            </XStack>

            {filteredExercises.length === 0 ? (
              <YStack padding="$4" justifyContent="center" alignItems="center">
                <Ionicons name="search-outline" size={40} color="#9CA3AF" />
                <Text marginTop="$2" color="#9CA3AF" textAlign="center">
                  No se encontraron ejercicios con &quot;{searchQuery}&quot;
                </Text>
              </YStack>
            ) : (
              filteredExercises.map(exercise => {
                const isSelected = selectedExercises.includes(exercise.id)
                const isExistingInRoutine = existingExercises.includes(exercise.id)

                return (
                  <ExerciseCard
                    key={exercise.id}
                    borderColor={
                      isSelected
                        ? '#00b283'
                        : isExistingInRoutine
                          ? '#9CA3AF'
                          : 'rgba(128, 128, 128, 0.1)'
                    }
                    borderWidth={isSelected || isExistingInRoutine ? 2 : 1}
                    opacity={isExistingInRoutine ? 0.8 : 1}
                    pressStyle={{ scale: 0.98 }}
                    onPress={() => toggleExerciseSelection(exercise.id)}
                  >
                    <YStack space="$1">
                      <XStack justifyContent="space-between" alignItems="center">
                        <YStack flex={1}>
                          <XStack alignItems="center" space="$1">
                            <Text fontSize={16} fontWeight="bold" color="$color">
                              {exercise.name}
                            </Text>
                            {isExistingInRoutine && (
                              <XStack
                                backgroundColor="rgba(156, 163, 175, 0.2)"
                                paddingHorizontal={6}
                                paddingVertical={2}
                                borderRadius={6}
                              >
                                <Text fontSize={11} color="#9CA3AF">
                                  En rutina
                                </Text>
                              </XStack>
                            )}
                          </XStack>
                          <Text fontSize={13} color="#9CA3AF" numberOfLines={2}>
                            {exercise.description}
                          </Text>
                          <MuscleGroupTag>
                            <Text color="#00b283" fontSize={13} fontWeight="500">
                              {exercise.muscleGroup.name}
                            </Text>
                          </MuscleGroupTag>
                        </YStack>
                        <XStack
                          width={24}
                          height={24}
                          borderWidth={2}
                          borderColor={
                            isSelected
                              ? '#00b283'
                              : isExistingInRoutine
                                ? '#9CA3AF'
                                : 'rgba(128, 128, 128, 0.5)'
                          }
                          borderRadius={12}
                          alignItems="center"
                          justifyContent="center"
                          backgroundColor={
                            isSelected
                              ? '#00b28333'
                              : isExistingInRoutine
                                ? 'rgba(156, 163, 175, 0.2)'
                                : 'transparent'
                          }
                        >
                          {isSelected && <Ionicons name="checkmark" size={16} color="#00b283" />}
                          {isExistingInRoutine && !isSelected && (
                            <Ionicons name="checkmark" size={16} color="#9CA3AF" />
                          )}
                        </XStack>
                      </XStack>
                    </YStack>
                  </ExerciseCard>
                )
              })
            )}
          </YStack>
        </ScrollView>
      )}

      {selectedExercises.length > 0 && (
        <FloatingActionBar justifyContent="space-between" alignItems="center">
          <Text color="white" fontSize={16}>
            {selectedExercises.length} ejercicio{selectedExercises.length > 1 ? 's' : ''}{' '}
            seleccionado{selectedExercises.length > 1 ? 's' : ''}
          </Text>
          <Pressable
            onPress={handleConfirmSelection}
            disabled={addingExercises}
            style={({ pressed }) => ({
              backgroundColor: pressed ? 'rgba(0, 178, 131, 0.8)' : '#00b283',
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 8,
              opacity: addingExercises ? 0.6 : 1,
            })}
          >
            <Text color="white" fontWeight="600">
              {addingExercises ? 'Añadiendo...' : 'Confirmar'}
            </Text>
          </Pressable>
        </FloatingActionBar>
      )}
    </YStack>
  )
}
