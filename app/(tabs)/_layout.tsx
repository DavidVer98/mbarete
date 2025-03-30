import { Tabs } from 'expo-router'
import { useAuth } from '../../hooks/AuthContext'
import { Home, ListTodo, Dumbbell } from "@tamagui/lucide-icons"
import { useEffect } from 'react'
import { router } from 'expo-router'
import { HeaderMenu } from '../../components/HeaderMenu'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme, Pressable } from 'react-native'
import { Theme, ThemeableStack } from 'tamagui'
import { MaterialCommunityIcons } from '@expo/vector-icons'

// Create a wrapper component for Tamagui icons in tab bar
const TabBarIcon = ({ 
  Icon, 
  color, 
  size 
}: { 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: any, 
  color: string, 
  size: number 
}) => {
  // Use $color syntax for dynamic colors in Tamagui
  return (
    <ThemeableStack>
      <Icon size={size} color="$color" opacity={color === '#00f1a2' ? 1 : 0.6} />
    </ThemeableStack>
  )
}

const FloatingButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        position: 'absolute',
        bottom: 2, // Adjust to align with tab bar
        alignSelf: 'center',
        backgroundColor: '#00b283',
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <MaterialCommunityIcons name="calendar" size={32} color="white" />
    </Pressable>
  )
}

export default function TabsLayout() {
  const { token } = useAuth()
  const colorScheme = useColorScheme()

  useEffect(() => {
    if (!token) {
      router.replace('/(auth)/login')
    }
  }, [token])

  const handleStartWorkout = () => {
    router.push('/today-workout')
  }

  return (
    <Theme name={colorScheme === 'dark' ? 'dark' : 'light'}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      <Tabs
        screenOptions={{
          headerRight: () => <HeaderMenu />,
          tabBarActiveTintColor: '#00f1a2',
          tabBarInactiveTintColor: '#6b7280',
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#711c9e' : 'white',
            height: 80
          },
          headerShadowVisible: false,
          tabBarStyle: {
            backgroundColor: colorScheme === 'dark' ? '#151515' : 'white',
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
            height: 60,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Inicio',
            headerShown: false,
            headerTitle: '',
            tabBarIcon: ({ color, size }) => (
              <TabBarIcon Icon={Home} color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="routines"
          options={{
            title: 'Rutinas',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <TabBarIcon Icon={ListTodo} color={color} size={size} />
            ),
          }}
        />

        {/* Pantalla invisible para el botón central */}
        <Tabs.Screen
          name="today-workout"
          options={{
            title: '',
            headerShown: false,
            tabBarButton: () => (
              <FloatingButton onPress={handleStartWorkout} />
            ),
          }}
        />

        <Tabs.Screen
          name="exercises"
          options={{
            title: 'Ejercicios',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <TabBarIcon Icon={Dumbbell} color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explorar',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <TabBarIcon Icon={MaterialCommunityIcons} color={color} size={size} />
            ),
          }}
        />
        {/* <Tabs.Screen
          name="routine/[id]"
          options={{
            href: null, // Esta opción evita que se genere como destino de navegación en la UI
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="exercises/select"
          options={{
            href: null, // Esta opción evita que se genere como destino de navegación en la UI
            headerShown: false,
          }}
        />

        <Tabs.Screen
          name="workout/[id]"
          options={{
            title: '',
            href: null,
            headerShown: false,
          }}
        />
      <Tabs.Screen
          name="workout-exercise/[id]"
          options={{
            title: '',
            href: null,
            headerShown: false,
          }}
        /> */}
      </Tabs>
    </Theme>
  )
}