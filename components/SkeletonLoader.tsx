import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, Animated, Easing, ViewStyle, useColorScheme, DimensionValue } from 'react-native'
import { YStack, XStack, useTheme } from 'tamagui'

interface SkeletonProps {
  width?: DimensionValue
  height?: DimensionValue
  borderRadius?: number
  style?: ViewStyle
}

const Skeleton = ({ width = '100%', height = 20, borderRadius = 4, style }: SkeletonProps) => {
  const opacity = useRef(new Animated.Value(0.3)).current
  const theme = useTheme()
  const colorScheme = useColorScheme()
  
  // Choose appropriate skeleton color based on theme
  const skeletonColor = colorScheme === 'dark' 
    ? 'rgba(255,255,255,0.1)' // Dark gray for dark mode
    : 'rgba(0,0,0,0.07)' // Light gray for light mode

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    )

    animation.start()

    return () => {
      animation.stop()
    }
  }, [opacity])

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: skeletonColor,
          opacity,
        },
        style,
      ]}
    />
  )
}

// Card skeleton that mimics the StatCard component
export const CardSkeleton = ({ width = '100%', height = 120 }: SkeletonProps) => {
  const colorScheme = useColorScheme()
  
  // Card background color based on theme
  const cardBgColor = colorScheme === 'dark' 
    ? 'rgba(255,255,255,0.05)' // Very dark gray for dark mode
    : 'rgba(0,0,0,0.03)' // Very light gray for light mode

  return (
    <View
      style={[
        styles.card,
        {
          width,
          height,
          backgroundColor: cardBgColor,
        } as ViewStyle,
      ]}
    >
      {/* <Skeleton width={24} height={24} borderRadius={12} style={{ alignSelf: 'center' }} /> */}
      <Skeleton width={60} height={24} style={{ marginTop: 12, alignSelf: 'center' }} />
      <Skeleton width={80} height={16} style={{ marginTop: 8, alignSelf: 'center' }} />
    </View>
  )
}

// Row of card skeletons
export const CardRowSkeleton = ({ numCards = 2, height = 120 }: { numCards?: number; height?: DimensionValue }) => {
  return (
    <XStack space="$3" height={height}>
      {Array(numCards)
        .fill(0)
        .map((_, index) => (
          <CardSkeleton key={index} width={`${100 / numCards - 2}%`} height={height} />
        ))}
    </XStack>
  )
}

// Banner skeleton
export const BannerSkeleton = ({ height = 100 }: { height?: DimensionValue }) => {
  const colorScheme = useColorScheme()
  
  // Banner background color based on theme
  const bannerBgColor = colorScheme === 'dark' 
    ? 'rgba(255,255,255,0.05)' // Very dark gray for dark mode
    : 'rgba(0,0,0,0.03)' // Very light gray for light mode

  return (
    <View style={[styles.card, { height, backgroundColor: bannerBgColor } as ViewStyle]}>
      <XStack justifyContent="space-between" alignItems="center">
        <YStack space="$2" width="60%">
          <Skeleton width="80%" height={28} />
          <Skeleton width="60%" height={16} />
        </YStack>
        <Skeleton width={80} height={36} borderRadius={8} />
      </XStack>
    </View>
  )
}

// Workout suggestion skeleton
export const WorkoutCardSkeleton = ({ height = 200 }: { height?: DimensionValue }) => {
  const colorScheme = useColorScheme()
  
  // Workout card background color based on theme
  const cardBgColor = colorScheme === 'dark' 
    ? 'rgba(255,255,255,0.05)' // Very dark gray for dark mode
    : 'rgba(0,0,0,0.03)' // Very light gray for light mode

  return (
    <View style={[styles.card, { height, backgroundColor: cardBgColor } as ViewStyle]}>
      <YStack position="absolute" bottom={20} left={20} space="$1">
        <Skeleton width={160} height={22} />
        <Skeleton width={220} height={16} />
        <Skeleton width={120} height={36} borderRadius={8} style={{ marginTop: 8 }} />
      </YStack>
    </View>
  )
}

// Home screen skeleton loader that mimics the entire structure
export const HomeScreenSkeleton = () => {
  return (
    <YStack flex={1} p="$4" space="$5">
      <BannerSkeleton height={100} />
      <WorkoutCardSkeleton height={200} />
      <YStack space="$4">
        <Skeleton width={180} height={22} />
        <CardRowSkeleton numCards={2} height={120} />
        <CardRowSkeleton numCards={2} height={120} />
      </YStack>
    </YStack>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    overflow: 'hidden',
  },
})

export default Skeleton
