import { YStack, XStack, Card } from "tamagui"
import { Animated, View } from "react-native"
import { useEffect, useRef } from "react"

export const RoutineListSkeleton = () => {
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
      <Card backgroundColor="#27262b" borderRadius={16} overflow="hidden" marginVertical={8}>
        <YStack padding="$4" space="$2">
          <View style={{ width: '60%', height: 20, backgroundColor: '#2a2a2a', borderRadius: 4 }} />
          <View style={{ width: '80%', height: 16, backgroundColor: '#2a2a2a', borderRadius: 4, marginTop: 8 }} />
          <XStack justifyContent="space-between" alignItems="center" marginTop={16}>
            <View style={{ width: '30%', height: 16, backgroundColor: '#2a2a2a', borderRadius: 4 }} />
            <View style={{ width: '20%', height: 16, backgroundColor: '#2a2a2a', borderRadius: 4 }} />
          </XStack>
        </YStack>
      </Card>
    </Animated.View>
  )

  return (
    <YStack space="$4">
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </YStack>
  )
}
