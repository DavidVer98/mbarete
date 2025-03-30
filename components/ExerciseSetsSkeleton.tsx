import { YStack, XStack } from "tamagui"
import { Animated, View } from "react-native"
import { useEffect, useRef } from "react"

export const ExerciseSetsSkeleton = () => {
  const fadeAnim = useRef(new Animated.Value(0.3)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start()
  }, [])

  const SkeletonItem = () => (
    <Animated.View style={{ opacity: fadeAnim }}>
      <YStack backgroundColor="#1a1a1a" borderRadius={12} padding="$3" marginBottom="$2">
        <XStack space="$2" alignItems="center">
          <View style={{ width: 120, height: 20, backgroundColor: '#2a2a2a', borderRadius: 4 }} />
        </XStack>
        <XStack space="$4" marginTop="$2">
          <View style={{ width: 60, height: 16, backgroundColor: '#2a2a2a', borderRadius: 4 }} />
          <View style={{ width: 60, height: 16, backgroundColor: '#2a2a2a', borderRadius: 4 }} />
        </XStack>
      </YStack>
    </Animated.View>
  )

  return (
    <YStack>
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </YStack>
  )
}
