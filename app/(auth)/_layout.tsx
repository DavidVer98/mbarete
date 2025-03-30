import { Stack, Redirect } from 'expo-router'
import { useAuth } from '../../hooks/AuthContext'
import { TamaguiProvider, Theme } from 'tamagui'
import tamaguiConfig from '../../tamagui.config'
import { useColorScheme, StatusBar } from 'react-native'

export default function AuthLayout() {
  const { token } = useAuth()
  const colorScheme = useColorScheme()

  // Si hay token, redirige a las tabs
  if (token) {
    return <Redirect href="/(tabs)" />
  }

  // Si no hay token, muestra las pantallas de autenticación
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Theme name={colorScheme === 'dark' ? 'dark' : 'light'}>
        <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor="$background" />
        <Stack
          screenOptions={{
            contentStyle: {
              flex: 1,
              backgroundColor: '$background',
            },
          }}
        >
          <Stack.Screen
            name="login"
            options={{
              headerTitle: '', // Elimina el título
              headerShown: false, // Alternativamente, oculta completamente la cabecera
            }}
          />
          {/* <Stack.Screen name="register" /> */}
        </Stack>
      </Theme>
    </TamaguiProvider>
  )
}
