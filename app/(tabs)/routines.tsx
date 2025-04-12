import { useState } from 'react'
import { YStack, XStack, Button, Text, Card, styled } from 'tamagui'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { Pressable, ScrollView } from 'react-native'
import { CreateRoutine } from '../../components/CreateRoutine'
import { BackButton } from '../../components/BackButton'
import { useRoutineStore } from '@/stores/routineStore'
import { routineApi } from '@/api/routine'
import { useRouter } from 'expo-router'
import { RoutineListSkeleton } from '../../components/RoutineListSkeleton'
import { useFocusEffect } from '@react-navigation/native'
import React from 'react'
import { toast } from 'sonner-native'

const StyledButton = styled(Button, {
  borderRadius: 12,
  paddingVertical: 12,
  paddingHorizontal: 16,
  variants: {
    variant: {
      active: {
        backgroundColor: '#00b283',
      },
      inactive: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#00b283',
      },
    },
  },
}) as React.ComponentType<{
  variant?: 'active' | 'inactive'
  children?: React.ReactNode
  onPress?: () => void
}>

const RoutineCard = styled(Card, {
  backgroundColor: '$background',
  borderRadius: 12,
  padding: 12,
  marginBottom: 8,
  borderWidth: 1,
  borderColor: 'rgba(128, 128, 128, 0.1)',
})

const getShortDayName = (dayNumber: number): string => {
  const days = ['D', 'L', 'M', 'M', 'J', 'V', 'S']
  return days[dayNumber]
}

const defaultRoutines = [
  {
    id: 1,
    name: 'Morning Power Boost',
    description: 'Energetic morning routine to start your day right',
    totalExercises: 8,
    createdAt: new Date(),
    trainingDays: [1, 2, 3, 4, 5],
  },
]

export default function Routines() {
  const [routines, setRoutines] = useState(defaultRoutines)
  const [activeView, setActiveView] = useState('list')
  const [activeButton, setActiveButton] = useState('list')
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  const fetchRoutines = async () => {
    try {
      const routines = await routineApi.getRoutines()
      setRoutines(routines)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchRoutines()
    }, [])
  )

  const { routine, validateRoutine, resetRoutine, clearErrors } = useRoutineStore()

  const handleSaveRoutine = async () => {
    clearErrors()
    const { valid } = validateRoutine()
    if (valid) {
      try {
        await routineApi.createRoutine({
          name: routine.name,
          description: routine.description,
          dayOfWeek: routine.selectedDays,
          exercises: routine.selectedExerciseIds.map(id => ({ id })),
        })
        resetRoutine()
        toast.success('Tu rutina ha sido guardada exitosamente')
        // Cambiar a la vista de lista y actualizar las rutinas
        setActiveView('list')
        setActiveButton('list')
        fetchRoutines() // Actualizar la lista de rutinas
      } catch (error) {
        toast.error(`Ocurrió un error al guardar la rutina: ${error}`)
      }
    }
  }

  const navigateToRoutineDetails = (routineId: number) => {
    router.push({
      pathname: '/(tabs)/routine/[id]',
      params: { id: routineId },
    })
  }

  if (loading) {
    return (
      <YStack flex={1} backgroundColor="$background" padding="$4" space="$4">
        <Text fontSize={24} fontWeight="bold" textAlign="center" marginTop="$4">
          Rutinas
        </Text>
        <RoutineListSkeleton />
      </YStack>
    )
  }

  if (!loading && routines.length === 0) {
    return (
      <YStack
        flex={1}
        justifyContent="center"
        alignItems="center"
        backgroundColor="$background"
        padding="$4"
      >
        <Text fontSize={18} color="#9CA3AF" textAlign="center">
          No tienes rutinas creadas{'\n'}
          Crea tu primera rutina para comenzar
        </Text>
      </YStack>
    )
  }

  return (
    <YStack flex={1} backgroundColor="$background" padding="$4">
      <XStack alignItems="center" justifyContent="space-between" marginBottom="$4" marginTop="$6">
        <BackButton />
        <Text fontSize={24} fontWeight="bold" flex={1} textAlign="center">
          Rutinas
        </Text>
        <XStack width={28} />
        {/* Este espacio mantiene el título centrado */}
      </XStack>

      <XStack space="$2" justifyContent="center" marginBottom="$4">
        <StyledButton
          variant={activeButton === 'list' ? 'active' : 'inactive'}
          onPress={() => {
            setActiveView('list')
            setActiveButton('list')
          }}
        >
          <XStack space="$2" alignItems="center">
            <MaterialCommunityIcons
              name="clipboard-list"
              size={20}
              color={activeButton === 'list' ? 'white' : '#00b283'}
            />
            <Text color={activeButton === 'list' ? 'white' : '#00b283'}>Mis Rutinas</Text>
          </XStack>
        </StyledButton>

        <StyledButton
          variant={activeButton === 'create' ? 'active' : 'inactive'}
          onPress={() => {
            setActiveView('create')
            setActiveButton('create')
          }}
        >
          <XStack space="$2" alignItems="center">
            <MaterialCommunityIcons
              name="playlist-plus"
              size={20}
              color={activeButton === 'create' ? 'white' : '#00b283'}
            />
            <Text color={activeButton === 'create' ? 'white' : '#00b283'}>Crear Nueva</Text>
          </XStack>
        </StyledButton>
      </XStack>

      {activeView === 'list' && (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <YStack space="$2">
            {routines.map(routine => (
              <Pressable
                key={routine.id}
                onPress={() => navigateToRoutineDetails(routine.id)}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.9 : 1,
                })}
              >
                <RoutineCard>
                  <YStack space="$1">
                    <Text fontSize={18} fontWeight="bold" color="$color">
                      {routine.name}
                    </Text>
                    <Text fontSize={13} color="#9CA3AF">
                      {routine.description}
                    </Text>
                    <XStack justifyContent="space-between" alignItems="center" marginTop="$1">
                      <XStack space="$1" alignItems="center">
                        <MaterialCommunityIcons name="dumbbell" size={16} color="#9CA3AF" />
                        <Text color="#9CA3AF" fontSize={13}>
                          {routine.totalExercises} ejercicios
                        </Text>
                      </XStack>
                      <XStack space="$2" alignItems="center">
                        <MaterialCommunityIcons name="calendar-week" size={16} color="#00b283" />
                        <XStack space="$1">
                          {routine.trainingDays.map(day => (
                            <Text key={day} color="#00b283" fontSize={11}>
                              {getShortDayName(day)}
                            </Text>
                          ))}
                        </XStack>
                        <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                      </XStack>
                    </XStack>
                  </YStack>
                </RoutineCard>
              </Pressable>
            ))}
          </YStack>
        </ScrollView>
      )}

      {activeView === 'create' && (
        <YStack space="$4" flex={1}>
          <CreateRoutine />
          <Button
            backgroundColor="#00b283"
            onPress={handleSaveRoutine}
            pressStyle={{ opacity: 0.8 }}
            borderRadius={12}
            paddingVertical={12}
          >
            <Text color="white">Guardar Rutina</Text>
          </Button>
        </YStack>
      )}
    </YStack>
  )
}
