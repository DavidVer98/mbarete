import React, { useState, useEffect } from 'react'
import { ScrollView, ActivityIndicator } from 'react-native'
import { YStack, XStack, Text, Button, Card, Image } from 'tamagui'

// import { useRouter } from 'expo-router'
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import MenuHeader from '@/components/MenuHeader'
import { exerciseProgressLogApi } from '../../api/exerciseProgressLog'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AnimatePresence } from 'tamagui'

export default function HomeScreen() {
  interface MonthlyStats {
    totalWorkouts: number;
    totalExercises: number;
    totalWeight: number;
    totalReps: number;
    personalRecords: number;
    mostFrequentExercise: {
      name: string;
    };
  }


  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)
  const insets = useSafeAreaInsets()
  // const router = useRouter()

  useEffect(() => {
    async function fetchMonthlyStats() {
      try {
        const stats = await exerciseProgressLogApi.getMonthlyStats()
        setMonthlyStats(stats)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchMonthlyStats()
  }, [])

  if (loading) {
    return (
      <YStack flex={1} style={{ justifyContent: "center", alignItems: "center", backgroundColor: "$background" }}>
        <ActivityIndicator size="large" color="#7B1FA2" />
      </YStack>
    )
  }

  if (error) {
    return (
      <YStack flex={1} style={{ justifyContent: "center", alignItems: "center", backgroundColor: "$background" }}>
        <Text color="$color">Error: {error}</Text>
      </YStack>
    )
  }

  const currentStreak = 5

  // Placeholder for next workout suggestion
  const nextWorkout = {
    name: "Upper Body Strength",
    duration: "45 min",
    exercises: 8,
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070"
  }

  interface StatCardProps {
    icon: React.ReactNode;
    value: string | number;
    label: string;
    gradient?: [string, string];
  }

  const StatCard = ({ icon, value, label, gradient = ['#4A148C', '#7B1FA2'] as [string, string] }: StatCardProps) => (
    <Card
      elevate
      size="$4"
      bordered
      flex={1}
      animation="bouncy"
      scale={0.95}
      hoverStyle={{ scale: 0.97 }}
      pressStyle={{ scale: 0.93 }}
    >
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          padding: 16,
          borderRadius: 12,
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
        <Text color="white" fontSize={24} fontWeight="bold" style={{ marginTop: "$2" }}>
          {value}
        </Text>
        <Text color="white" opacity={0.8} fontSize={14} style={{ textAlign: "center" }}>
          {label}
        </Text>
      </LinearGradient>
    </Card>
  )

  return (
    <YStack flex={1} bg="$background">
      <MenuHeader />
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        style={{ backgroundColor: '$background' }}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Banner */}
        <YStack p="$4" space="$5">
          <Card overflow="hidden" bordered borderRadius="$6">
            <LinearGradient
              colors={['#5E35B1', '#3949AB']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                padding: 20,
                borderRadius: 16,
              }}
            >
              <XStack style={{ alignItems: "center", justifyContent: "space-between" }}>
                <YStack space="$2">
                  <Text color="white" fontSize={28} fontWeight="bold">
                    ¡Hola! 👋
                  </Text>
                  <XStack style={{ alignItems: "center" }} space="$2">
                    <FontAwesome5 name="fire" size={18} color="#FFC107" />
                    <Text color="white" opacity={0.9} fontSize={16}>
                      Racha de {currentStreak} días
                    </Text>
                  </XStack>
                </YStack>
                <Button
                  style={{ backgroundColor: "#FFFFFF30", borderRadius: "$6" }}
                  size="$4"
                  pressStyle={{ opacity: 0.8 }}
                  icon={<Ionicons name="play" size={16} color="white" />}
                // onPress={() => router.push('/workout/start')}
                >
                  <Text color="white" fontSize={16}>
                    Entrenar
                  </Text>
                </Button>
              </XStack>
            </LinearGradient>
          </Card>

          {/* Next Workout Suggestion */}
          <Card overflow="hidden" bordered borderRadius="$6" height={200}>
            <Image
              source={{ uri: nextWorkout.image }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: 16,
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
                style={{
                  marginTop: "$3", backgroundColor: "#FFFFFF20", borderRadius: "$4"
                }}
                width={120}
                pressStyle={{ opacity: 0.8 }}
              >
                <Text color="white">Ver Detalles</Text>
              </Button>
            </LinearGradient>
          </Card>

          {/* Monthly Stats Section */}
          {monthlyStats && (
            <AnimatePresence>
              <YStack space="$4" enterStyle={{ opacity: 0, y: 10 }} animation="quick">
                <Text fontSize={22} fontWeight="bold">
                  Progreso Mensual
                </Text>

                <XStack space="$3" height={120}>
                  <StatCard
                    icon={<MaterialCommunityIcons name="weight-lifter" size={24} color="white" />}
                    value={monthlyStats.totalWorkouts}
                    label="Workouts Completados"
                    gradient={['#5E35B1', '#3949AB']}
                  />
                  <StatCard
                    icon={<MaterialCommunityIcons name="dumbbell" size={24} color="white" />}
                    value={monthlyStats.totalExercises}
                    label="Ejercicios"
                    gradient={['#7B1FA2', '#512DA8']}
                  />
                </XStack>

                <XStack space="$3" height={120}>
                  <StatCard
                    icon={<MaterialCommunityIcons name="weight-kilogram" size={24} color="white" />}
                    value={`${monthlyStats.totalWeight} kg`}
                    label="Peso Total"
                    gradient={['#00897B', '#00695C']}
                  />
                  <StatCard
                    icon={<MaterialCommunityIcons name="repeat" size={24} color="white" />}
                    value={monthlyStats.totalReps}
                    label="Repeticiones"
                    gradient={['#00ACC1', '#0097A7']}
                  />
                </XStack>

                <XStack space="$3" height={120}>
                  <StatCard
                    icon={<MaterialCommunityIcons name="star" size={24} color="white" />}
                    value={monthlyStats.personalRecords}
                    label="Records Personales"
                    gradient={['#F57C00', '#FF8F00']}
                  />
                  <StatCard
                    icon={<MaterialCommunityIcons name="trophy" size={24} color="white" />}
                    value={monthlyStats.mostFrequentExercise.name}
                    label="Ejercicio Favorito"
                    gradient={['#D84315', '#E64A19']}
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