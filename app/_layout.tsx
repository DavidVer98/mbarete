// app/_layout.tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Slot } from 'expo-router'
import { AuthProvider } from '../hooks/AuthContext'
import { TamaguiProvider, Theme } from 'tamagui'
import config from '../tamagui.config'
import { useColorScheme } from 'react-native'
import { Toaster } from 'sonner-native'

export default function RootLayout() {
  const colorScheme = useColorScheme()

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
