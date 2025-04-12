import React, { useState } from 'react'
import { ScrollView, Pressable } from 'react-native'
import { YStack, XStack, Text, Button, Card, Image, styled } from 'tamagui'
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import MenuHeader from '@/components/MenuHeader'
import { exerciseProgressLogApi } from '../../api/exerciseProgressLog'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AnimatePresence } from 'tamagui'
import ErrorScreen from '@/components/ErrorScreen'
import { HomeScreenSkeleton } from '@/components/SkeletonLoader'
import { useFocusEffect } from '@react-navigation/native'
import { useRouter } from 'expo-router'

const StatCard = styled(Card, {
  backgroundColor: '$background',
  borderRadius: 12,
  padding: 12,
  flex: 1,
  borderWidth: 1,
  borderColor: 'rgba(128, 128, 128, 0.1)',
})

const WelcomeCard = styled(Card, {
  backgroundColor: 'transparent',
  borderRadius: 16,
  overflow: 'hidden',
  borderWidth: 2,
  borderColor: 'rgba(0, 178, 131, 0.5)',
  shadowColor: '#00b283',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.6,
  shadowRadius: 10,
  elevation: 5,
})

const NeonGradient: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <LinearGradient
    colors={['#121212', '#101a1c', '#091d1a']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={{
      padding: 20,
      borderRadius: 16,
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <LinearGradient
      colors={['rgba(0, 178, 131, 0.3)', 'rgba(0, 151, 167, 0.1)', 'rgba(0, 119, 182, 0.2)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 16,
      }}
    />
    <YStack style={{ position: 'relative', zIndex: 2 }}>{children}</YStack>
  </LinearGradient>
)

const WorkoutCard = styled(Card, {
  backgroundColor: '$background',
  borderRadius: 12,
  height: 200,
  overflow: 'hidden',
  borderWidth: 1,
  borderColor: 'rgba(128, 128, 128, 0.1)',
})

const ActionButton = styled(Button, {
  borderRadius: 12,
  paddingVertical: 12,
  paddingHorizontal: 16,
  backgroundColor: '#00b283',
})

export default function HomeScreen() {
  interface MonthlyStats {
    totalWorkouts: number
    totalExercises: number
    totalWeight: number
    totalReps: number
    personalRecords: number
    mostFrequentExercise: {
      name: string
    }
  }

  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)
  const insets = useSafeAreaInsets()
  const router = useRouter()

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true
      async function fetchMonthlyStats() {
        try {
          const stats = await exerciseProgressLogApi.getMonthlyStats()
          if (isActive) {
            setMonthlyStats(stats)
          }
        } catch (err) {
          if (isActive) {
            setError(err)
          }
        } finally {
          if (isActive) {
            setLoading(false)
          }
        }
      }
      fetchMonthlyStats()
      return () => {
        isActive = false
      }
    }, [])
  )

  const handleRetry = async () => {
    setLoading(true)
    setError(null)
    try {
      const stats = await exerciseProgressLogApi.getMonthlyStats()
      setMonthlyStats(stats)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <YStack flex={1} bg="$background">
        <MenuHeader />
        <HomeScreenSkeleton />
      </YStack>
    )
  }

  if (error) {
    return (
      <YStack flex={1} bg="$background">
        <MenuHeader />
        <ErrorScreen onRetry={handleRetry} />
      </YStack>
    )
  }

  const currentStreak = 5

  const getDayText = (days: number) => {
    return days === 1 ? 'día' : 'días'
  }

  // Placeholder for next workout suggestion
  const nextWorkout = {
    name: 'Upper Body Strength',
    duration: '45 min',
    exercises: 8,
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070',
  }

  interface StatItemProps {
    icon: React.ReactNode
    value: string | number
    label: string
  }

  const StatItem = ({ icon, value, label }: StatItemProps) => (
    <StatCard>
      <Pressable
        style={({ pressed }) => ({
          opacity: pressed ? 0.9 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        })}
      >
        <YStack alignItems="center" space="$2" padding="$2">
          <XStack
            backgroundColor="#00b28320"
            borderRadius={40}
            width={50}
            height={50}
            alignItems="center"
            justifyContent="center"
          >
            {icon}
          </XStack>
          <Text fontSize={22} fontWeight="bold" color="$color">
            {value}
          </Text>
          <Text fontSize={14} color="#9CA3AF" textAlign="center">
            {label}
          </Text>
        </YStack>
      </Pressable>
    </StatCard>
  )

  return (
    <YStack flex={1} backgroundColor="$background">
      <MenuHeader />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Banner */}
        <YStack padding="$4" space="$4">
          <WelcomeCard animation="bouncy">
            <NeonGradient>
              <XStack alignItems="center" justifyContent="space-between">
                <YStack space="$2">
                  <Text
                    color="white"
                    fontSize={28}
                    fontWeight="bold"
                    style={{
                      textShadowColor: '#00b283',
                      textShadowOffset: { width: 0, height: 0 },
                      textShadowRadius: 10,
                    }}
                  >
                    ¡Hola! 👋
                  </Text>
                  <XStack alignItems="center" space="$2">
                    <FontAwesome5 name="fire" size={18} color="#00ffbb" />
                    <Text
                      color="rgba(255, 255, 255, 0.9)"
                      fontSize={16}
                      style={{
                        textShadowColor: 'rgba(0, 255, 187, 0.5)',
                        textShadowOffset: { width: 0, height: 0 },
                        textShadowRadius: 5,
                      }}
                    >
                      Racha de {currentStreak} {getDayText(currentStreak)}
                    </Text>
                  </XStack>
                </YStack>
                <ActionButton
                  pressStyle={{
                    opacity: 0.8,
                    scale: 0.97,
                    backgroundColor: '#00d6a1',
                  }}
                  onPress={() => router.push('/(tabs)/today-workout')}
                  animation="quick"
                  style={{
                    shadowColor: '#00ffbb',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.8,
                    shadowRadius: 8,
                    elevation: 6,
                  }}
                >
                  <XStack space="$2" alignItems="center">
                    <Ionicons name="play" size={16} color="white" />
                    <Text
                      color="white"
                      fontSize={16}
                      style={{
                        textShadowColor: 'rgba(0, 178, 131, 0.7)',
                        textShadowOffset: { width: 0, height: 0 },
                        textShadowRadius: 5,
                      }}
                    >
                      Entrenar
                    </Text>
                  </XStack>
                </ActionButton>
              </XStack>
            </NeonGradient>
          </WelcomeCard>

          {/* Next Workout Suggestion */}
          <WorkoutCard>
            <Image
              source={{ uri: nextWorkout.image }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
              }}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                padding: 20,
                justifyContent: 'flex-end',
              }}
            >
              <Text color="white" fontSize={22} fontWeight="bold">
                Workout Sugerido
              </Text>
              <Text color="white" fontSize={16} opacity={0.9}>
                {nextWorkout.name} • {nextWorkout.duration} • {nextWorkout.exercises} ejercicios
              </Text>
              <Button
                backgroundColor="#00b283"
                marginTop="$3"
                borderRadius={12}
                paddingVertical={8}
                paddingHorizontal={16}
                width={140}
                pressStyle={{ opacity: 0.8 }}
              >
                <Text color="white">Ver Detalles</Text>
              </Button>
            </LinearGradient>
          </WorkoutCard>

          {/* Monthly Stats Section */}
          {monthlyStats && (
            <AnimatePresence>
              <YStack space="$4" enterStyle={{ opacity: 0, y: 10 }} animation="quick">
                <Text fontSize={20} fontWeight="bold" color="$color">
                  Progreso Mensual
                </Text>

                <XStack space="$3">
                  <StatItem
                    icon={<MaterialCommunityIcons name="weight-lifter" size={24} color="#00b283" />}
                    value={monthlyStats.totalWorkouts}
                    label="Workouts Completados"
                  />
                  <StatItem
                    icon={<MaterialCommunityIcons name="dumbbell" size={24} color="#00b283" />}
                    value={monthlyStats.totalExercises}
                    label="Ejercicios"
                  />
                </XStack>

                <XStack space="$3">
                  <StatItem
                    icon={
                      <MaterialCommunityIcons name="weight-kilogram" size={24} color="#00b283" />
                    }
                    value={`${monthlyStats.totalWeight} kg`}
                    label="Peso Total"
                  />
                  <StatItem
                    icon={<MaterialCommunityIcons name="repeat" size={24} color="#00b283" />}
                    value={monthlyStats.totalReps}
                    label="Repeticiones"
                  />
                </XStack>

                <XStack space="$3">
                  <StatItem
                    icon={<MaterialCommunityIcons name="star" size={24} color="#00b283" />}
                    value={monthlyStats.personalRecords}
                    label="Records Personales"
                  />
                  <StatItem
                    icon={<MaterialCommunityIcons name="trophy" size={24} color="#00b283" />}
                    value={monthlyStats.mostFrequentExercise?.name ?? 'No hay datos'}
                    label="Ejercicio Favorito"
                  />
                </XStack>
              </YStack>
            </AnimatePresence>
          )}
        </YStack>
      </ScrollView>
    </YStack>
  )
}
