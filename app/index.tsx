// app/index.tsx
import { Redirect } from 'expo-router'
import { useAuth } from '../hooks/AuthContext'
import { ActivityIndicator, View } from 'react-native'

export default function Index() {
  const { token, isLoading } = useAuth()

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '$background' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return <Redirect href={token ? "/(tabs)" : "/(auth)/login"} />
}