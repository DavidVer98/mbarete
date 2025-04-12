// app/_layout.tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Slot, usePathname } from 'expo-router'
import { AuthProvider } from '../hooks/AuthContext'
import { TamaguiProvider, Theme } from 'tamagui'
import config from '../tamagui.config'
import { useColorScheme } from 'react-native'
import { Toaster } from 'sonner-native'
import { useNavigationStore } from '@/stores/navigationStore'
import { useEffect } from 'react'

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const pathname = usePathname()
  const { addToHistory } = useNavigationStore()

  useEffect(() => {
    // No guardar las rutas del home o las rutas de autenticación
    if (!pathname.startsWith('/(auth)') && pathname !== '/(tabs)' && pathname !== '/') {
      addToHistory(pathname)
    }
  }, [pathname])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <TamaguiProvider config={config}>
          <Theme name={colorScheme === 'dark' ? 'dark' : 'light'}>
            <Slot />
            <Toaster />
          </Theme>
        </TamaguiProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  )
}
