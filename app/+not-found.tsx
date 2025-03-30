import { Link, Stack } from 'expo-router'
import { StyleSheet, Text } from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={styles.container}>
        <Text>
          <ThemedText type="title">This screen doesn&apos;t exist.</ThemedText>
        </Text>
        <Link href="/" style={styles.link}>
          <Text>
            <ThemedText type="link">Go to home screen!</ThemedText>
          </Text>
        </Link>
      </ThemedView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
})
