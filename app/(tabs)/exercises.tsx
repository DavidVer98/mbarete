import { useState, useEffect } from 'react'
import { YStack, XStack, Button, Input, Text, Card, ScrollView, styled, ButtonText } from 'tamagui'
import { Ionicons } from '@expo/vector-icons'
import { Pressable } from 'react-native'
import { exerciseApi } from '../../api/exercise'
import { BackButton } from '@/components/BackButton'

const categories = [
  { id: 'all', name: 'Todos', icon: 'dumbbell' },
  { id: 'pecho', name: 'Pecho', icon: 'dumbbell' },
  { id: 'espalda', name: 'Espalda', icon: 'dumbbell' },
  { id: 'piernas', name: 'Piernas', icon: 'dumbbell' },
  { id: 'brazos', name: 'Brazos', icon: 'dumbbell' },
  { id: 'abdomen', name: 'Abdomen', icon: 'dumbbell' },
  { id: 'hombros', name: 'Hombros', icon: 'dumbbell' },
  { id: 'trapecio', name: 'Trapecio', icon: 'dumbbell' },
  { id: 'gluteos', name: 'Glúteos', icon: 'dumbbell' },
  { id: 'gemelos', name: 'Gemelos', icon: 'dumbbell' },
  { id: 'antebrazo', name: 'Antebrazo', icon: 'dumbbell' },
  { id: 'triceps', name: 'Tríceps', icon: 'dumbbell' },
  { id: 'biceps', name: 'Bíceps', icon: 'dumbbell' },
]
// Datos por defecto en caso de error o mientras carga la API
const defaultExercises = [
  {
    id: 1,
    name: 'Press de Banca',
    muscles: {
      id: 1,
      name: 'Pecho',
    },
    description: 'Ejercicio compuesto para desarrollar la fuerza del tren superior',
  },
]

const CategoryButton = styled(Button, {
  borderRadius: 12,
  paddingVertical: 8,
  paddingHorizontal: 16,
  marginHorizontal: 4,
  variants: {
    state: {
      active: {
        backgroundColor: '#00b283',
      },
      inactive: {
        backgroundColor: '$background',
        borderWidth: 1,
        borderColor: '#00b283',
      },
    },
  },
})

const ExerciseCard = styled(Card, {
  backgroundColor: '$background',
  borderRadius: 12,
  padding: 12,
  marginBottom: 8,
  borderWidth: 1,
  borderColor: 'rgba(128, 128, 128, 0.1)',
})

export default function Exercises() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [exercises, setExercises] = useState(defaultExercises)
  const [isLoading, setIsLoading] = useState(true)

  // Al montar el componente se obtienen los datos de la API
  useEffect(() => {
    async function fetchExercises() {
      setIsLoading(true)
      try {
        const data = await exerciseApi.getExcercises()
        const transformed = data.map(ex => ({
          id: ex.id,
          name: ex.name,
          description: ex.description,
          muscles: ex.muscleGroup,
        }))
        setExercises(transformed)
      } catch (error) {
        console.error('Error fetching exercises:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchExercises()
  }, [])

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
    // Check if category is "all" first, then return true to show everything
    if (selectedCategory === 'all') return matchesSearch
    // Otherwise filter by category
    return matchesSearch && exercise.muscles.name.toLowerCase() === selectedCategory.toLowerCase()
  })

  const LoadingSkeleton = () => (
    <ExerciseCard>
      <YStack padding="$4" space="$2">
        <YStack backgroundColor="#1a191d" height={24} width={200} borderRadius={8} />
        <YStack backgroundColor="#1a191d" height={16} width="100%" borderRadius={8} marginTop={8} />
        <YStack backgroundColor="#1a191d" height={16} width="80%" borderRadius={8} marginTop={4} />
        <XStack marginTop={8}>
          <YStack backgroundColor="#1a191d" height={28} width={80} borderRadius={20} />
        </XStack>
      </YStack>
    </ExerciseCard>
  )

  return (
    <YStack flex={1} backgroundColor="$background" padding="$4">
      <XStack alignItems="center" justifyContent="space-between" marginBottom="$4" marginTop="$6">
        <BackButton />
        <Text fontSize={24} fontWeight="bold" flex={1} textAlign="center">
          Listado de Ejercicios
        </Text>
        <XStack width={28} />
        {/* Este espacio mantiene el título centrado */}
      </XStack>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <YStack space="$4" paddingVertical="$2">
          <XStack
            alignItems="center"
            backgroundColor="$background"
            borderColor="$gray6"
            borderWidth={1}
            borderRadius={12}
            padding={12}
            height={48}
          >
            <Ionicons name="search" size={20} color="#666" style={{ marginRight: 8 }} />
            <Input
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Buscar ejercicios..."
              backgroundColor="$background"
              color="$color"
              borderWidth={0}
              borderRadius={12}
              placeholderTextColor="#666"
              flex={1}
            />
          </XStack>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginVertical: 16 }}
          >
            {categories.map(category => (
              <CategoryButton
                key={category.id}
                state={selectedCategory === category.id ? 'active' : 'inactive'}
                onPress={() => setSelectedCategory(category.id)}
              >
                <XStack alignItems="center">
                  <ButtonText color={selectedCategory === category.id ? 'white' : '#00b283'}>
                    {category.name}
                  </ButtonText>
                </XStack>
              </CategoryButton>
            ))}
          </ScrollView>

          <YStack space="$2">
            <Text fontSize={20} fontWeight="bold" color="$color" marginBottom="$2">
              Ejercicios ({filteredExercises.length})
            </Text>

            {isLoading
              ? [...Array(3)].map((_, index) => <LoadingSkeleton key={`skeleton-${index}`} />)
              : filteredExercises.map(exercise => (
                  <Pressable
                    key={exercise.id}
                    style={({ pressed }) => ({
                      opacity: pressed ? 0.9 : 1,
                      transform: [{ scale: pressed ? 0.98 : 1 }],
                    })}
                  >
                    <ExerciseCard>
                      <YStack space="$1">
                        <Text fontSize={16} fontWeight="bold" color="$color">
                          {exercise.name}
                        </Text>

                        <Text fontSize={13} color="#9CA3AF" numberOfLines={2}>
                          {exercise.description}
                        </Text>

                        <XStack marginTop="$1">
                          <Button
                            variant="outlined"
                            borderRadius={20}
                            paddingHorizontal={12}
                            paddingVertical={4}
                            backgroundColor="$background"
                            borderColor="#00b28333"
                            borderWidth={1}
                          >
                            <Text color="#00b283">{exercise.muscles.name}</Text>
                          </Button>
                        </XStack>
                      </YStack>
                    </ExerciseCard>
                  </Pressable>
                ))}
            {!isLoading && filteredExercises.length === 0 && (
              <Text color="#9CA3AF" textAlign="center" marginTop="$4">
                No se encontraron ejercicios
              </Text>
            )}
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  )
}
