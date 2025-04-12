import { Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useNavigationStore } from '@/stores/navigationStore'

interface BackButtonProps {
  onPress?: () => void
  color?: string
  size?: number
}

export const BackButton = ({ onPress, color = '#00b283', size = 28 }: BackButtonProps) => {
  const router = useRouter()
  const { lastScreen, removeFromHistory } = useNavigationStore()

  const handleGoBack = () => {
    if (onPress) {
      onPress()
    } else {
      try {
        removeFromHistory() // Eliminar la pantalla actual del historial
        if (lastScreen) {
          router.push(lastScreen)
        } else {
          router.push('/(tabs)')
        }
      } catch (error) {
        console.error('Error navegando hacia atrás:', error)
        router.push('/(tabs)')
      }
    }
  }

  return (
    <Pressable
      onPress={handleGoBack}
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
        marginTop: 10,
      })}
    >
      <Ionicons name="chevron-back" size={size} color={color} />
    </Pressable>
  )
}
