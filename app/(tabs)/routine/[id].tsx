import { useState } from 'react'
import { ScrollView, Alert, Pressable } from 'react-native'
import { YStack, XStack, Text, Card, styled, Button, ButtonText } from 'tamagui'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { routineApi } from '@/api/routine'
import { GetRoutinesDetailsRequest } from '@/api/types'
import { ExerciseSetsSkeleton } from '@/components/ExerciseSetsSkeleton'
import { BackButton } from '@/components/BackButton'
import { toast } from 'sonner-native'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { useFocusEffect } from '@react-navigation/native'
import React from 'react'

// const DayCard = styled(Card, {
//   backgroundColor: '#00b283',
//   borderRadius: 6,
//   paddingVertical: 4,
//   paddingHorizontal: 8,
//   marginRight: 4,
// })

const ExerciseCard = styled(Card, {
  backgroundColor: '$background',
  borderRadius: 12,
  padding: 12,
  marginBottom: 8,
  borderWidth: 1,
  borderColor: 'rgba(128, 128, 128, 0.1)',
})

const DayIndicator = styled(XStack, {
  backgroundColor: '#00b28333',
  borderRadius: 20,
  paddingVertical: 6,
  paddingHorizontal: 12,
  marginRight: 6,
  borderWidth: 1,
  borderColor: '#00b283',
})

// Función auxiliar para obtener nombres de días
const getShortDayName = (dayNumber: number): string => {
  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
  return days[dayNumber]
}

export default function RoutineDetails() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const [routine, setRoutine] = useState<GetRoutinesDetailsRequest>()
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedExerciseId, setSelectedExerciseId] = useState<number | null>(null)

  useFocusEffect(
    React.useCallback(() => {
      const fetchRoutineDetails = async () => {
        try {
          setLoading(true)
          // Asumiendo que tienes un endpoint para obtener detalles de una rutina específica
          const routineData = await routineApi.getRoutineDetails(Number(id))
          console.log('Routine details:', routineData)
          setRoutine(routineData)
        } catch (error) {
          console.error('Error fetching routine details:', error)
          Alert.alert('Error', 'No se pudieron cargar los detalles de la rutina')
        } finally {
          setLoading(false)
        }
      }

      if (id) {
        fetchRoutineDetails()
      }
    }, [id])
  )

  const handleDeleteExercise = async (exerciseId: number) => {
    setSelectedExerciseId(exerciseId)
    setDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (selectedExerciseId) {
      try {
        const response = await routineApi.deleteExerciseFromRoutine(Number(id), selectedExerciseId)
        if (response) {
          const updatedRoutine = await routineApi.getRoutineDetails(Number(id))
          setRoutine(updatedRoutine)
          setDialogOpen(false)
          toast.success('Ejercicio eliminado correctamente')
        }
      } catch (error) {
        console.error('Error deleting exercise:', error)
        toast.error('No se pudo eliminar el ejercicio')
      }
    }
  }

  const handleAddExercise = () => {
    router.push({
      pathname: '/(tabs)/exercises/select',
      params: { routineId: id },
    })
  }

  if (loading) {
    return (
      <YStack
        flex={1}
        justifyContent="center"
        alignItems="center"
        backgroundColor="$background" // Se resuelve correctamente
      >
        <ExerciseSetsSkeleton />
      </YStack>
    )
  }

  if (!routine) {
    return (
      <YStack
        flex={1}
        justifyContent="center"
        alignItems="center"
        backgroundColor="$background"
        padding="$4"
      >
        <Text color="$color" fontSize={18}>
          No se encontró la rutina
        </Text>
        <Button marginTop={20} backgroundColor="#7B1FA2" onPress={() => router.back()}>
          <Text>
            <ButtonText>Volver</ButtonText>
          </Text>
        </Button>
      </YStack>
    )
  }

  return (
    <YStack flex={1} backgroundColor="$background" padding="$4">
      <ConfirmDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Eliminar ejercicio"
        description="¿Estás seguro que deseas eliminar este ejercicio de la rutina?"
        onConfirm={confirmDelete}
      />
      <XStack alignItems="center" justifyContent="space-between" marginBottom="$4" marginTop="$6">
        <BackButton />
        <Text fontSize={24} fontWeight="bold" flex={1} textAlign="center">
          Detalles de Rutina
        </Text>
        <XStack width={28} />
      </XStack>

      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack space="$4" paddingVertical="$4">
          <YStack space="$2">
            <Text fontSize={32} fontWeight="900" color="$color" letterSpacing={-1}>
              {routine.name}
            </Text>
            <Text fontSize={16} color="$color" opacity={0.7} lineHeight={22}>
              {routine.description}
            </Text>
          </YStack>

          <XStack marginTop="$2" flexWrap="wrap">
            {routine.dayRoutines?.map((dayRoutine, index) => (
              <DayIndicator key={dayRoutine.id || index}>
                <Text color="#00b283" fontSize={14} fontWeight="600">
                  {getShortDayName(index)}
                </Text>
              </DayIndicator>
            ))}
          </XStack>
        </YStack>

        <YStack space="$2">
          <XStack justifyContent="space-between" alignItems="center" marginBottom="$2">
            <Text fontSize={20} fontWeight="bold" color="$color">
              Ejercicios ({routine.routineExercises?.length || 0})
            </Text>
            <Button
              backgroundColor="#00b283"
              onPress={handleAddExercise}
              borderRadius={12}
              paddingHorizontal={12}
              paddingVertical={8}
              pressStyle={{ opacity: 0.8 }}
            >
              <XStack space="$2" alignItems="center">
                <Ionicons name="add-circle-outline" size={20} color="white" />
                <Text color="white">Añadir</Text>
              </XStack>
            </Button>
          </XStack>

          {routine.routineExercises?.map((routineExercise, index) => (
            <ExerciseCard key={routineExercise.id || index}>
              <YStack space="$1">
                <XStack justifyContent="space-between" alignItems="center">
                  <YStack flex={1}>
                    <Text fontSize={16} fontWeight="bold" color="$color">
                      {routineExercise.exercise.name}
                    </Text>
                    <Text fontSize={13} color="#9CA3AF" numberOfLines={2}>
                      {routineExercise.exercise.description}
                    </Text>
                  </YStack>
                  <Pressable
                    onPress={() => handleDeleteExercise(routineExercise.exercise.id)}
                    style={({ pressed }) => ({
                      opacity: pressed ? 0.6 : 1,
                      marginLeft: 8,
                      transform: [{ scale: pressed ? 0.95 : 1 }],
                      backgroundColor: pressed ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                      padding: 8,
                      borderRadius: 8,
                    })}
                  >
                    <MaterialCommunityIcons name="delete-outline" size={20} color="#ef4444" />
                  </Pressable>
                </XStack>
              </YStack>
            </ExerciseCard>
          ))}

          {(!routine.routineExercises || routine.routineExercises.length === 0) && (
            <Text color="#9CA3AF" textAlign="center" marginTop="$4">
              Esta rutina no tiene ejercicios asignados
            </Text>
          )}
        </YStack>
      </ScrollView>
    </YStack>
  )
}
