import { useAuth } from '../../hooks/AuthContext'
import { useState } from "react"
import { Alert, StatusBar } from "react-native"
import { router } from "expo-router"
import { Input, Button, YStack, XStack, Text, Image, Theme } from "tamagui"
import { useColorScheme } from '../../hooks/useColorScheme'

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth()
  const colorScheme = useColorScheme()

  const handleLogin = async () => {
    try {
      console.log("Intentando login...")
      const success = await login(email, password)
      console.log("Resultado login:", success)

      if (success) {
        console.log("Login exitoso, navegando...")
        router.replace("/(tabs)")
      } else {
        Alert.alert("Error", "Credenciales incorrectas")
      }
    } catch (error) {
      console.error("Error:", error)
      Alert.alert("Error", "Error de conexión")
    }
  }

  return (
    <Theme name={colorScheme === 'dark' ? 'dark' : 'light'}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colorScheme === 'dark' ? '#000000' : '#FFFFFF'}
      />
      <YStack flex={1} style={{
        backgroundColor: colorScheme === 'dark' ? '#000000' : '#FFFFFF',
        paddingTop: 40,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      }}>
        <YStack space="$5" style={{
          maxWidth: 350,
          width: '100%',
          padding: '$4',
          borderRadius: 16,
          alignItems: 'center',
        }} >
          <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            width={150}
            height={150}
            resizeMode="contain"
          />
          <Text style={{
            textAlign: "center",
            fontSize: 24,
            fontWeight: "bold",
          }}>
            Bienvenido
          </Text>
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            width="100%"
          // icon={<Mail size="$1" />}
          />
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="Contraseña"
            secureTextEntry
            width="100%"
          // icon={<Lock size="$1" />}
          />
          <Button onPress={handleLogin} size="$4" width="100%">
            <Text>Iniciar Sesión</Text>
          </Button>
          <XStack space="$2" style={{ alignItems: 'center', justifyContent: 'center', marginTop: '$4' }}>
            <Text>¿No tienes una cuenta?</Text>
            <Text color="$blue10">
              Regístrate
            </Text>
          </XStack>
        </YStack>
      </YStack>
    </Theme>
  )
}

