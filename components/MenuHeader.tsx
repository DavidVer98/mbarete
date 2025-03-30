import { ScrollView, XStack, YStack, Text, styled } from "tamagui"
import { HeaderMenu } from './HeaderMenu'

const DayContainer = styled(YStack, {
  alignItems: "center",
  justifyContent: "center",
  width: 45,
  height: 60,
  borderRadius: 8,
  marginHorizontal: 4,
  variants: {
    isToday: {
      true: {
        backgroundColor: "#0ef2a3",
      },
      false: {
        backgroundColor: "transparent",
      },
    },
  },
})

// Export the actual MenuHeader component that will be used in HomeScreen
export default function MenuHeader() {
  const getDates = () => {
    const dates = []
    const today = new Date()

    for (let i = -3; i < 6; i++) {
      const date = new Date()
      date.setDate(today.getDate() + i)
      dates.push({
        day: date.toLocaleDateString("es-ES", { weekday: "short" }),
        date: date.getDate(),
        isToday: i === 0,
      })
    }
    return dates
  }
  
  const getCurrentMonthYear = () => {
    const date = new Date()
    return date.toLocaleDateString("es-ES", { month: 'long', year: 'numeric' })
  }
  
  return (
    <YStack space="$2" backgroundColor="$background">
      <XStack 
        padding="$4" 
        marginTop="$6" 
        justifyContent="space-between" 
        alignItems="center"
      >
        <YStack space="$1">
          <Text fontSize="$6" fontWeight="bold" color="$color">
            Entrenamiento
          </Text>
          <Text fontSize="$4" color="$color11">
            {getCurrentMonthYear()}
          </Text>
        </YStack>
        <HeaderMenu />
      </XStack>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={{ paddingHorizontal: 0, backgroundColor: "$background" }}
      >
        <XStack paddingVertical="$0">
          {getDates().map((item, index) => (
            <DayContainer key={index} isToday={item.isToday}>
              <Text fontSize="$1" color={item.isToday ? "black" : "$color11"} textTransform="uppercase">
                {item.day.slice(0, 3)}
              </Text>
              <Text fontSize="$3" fontWeight="bold" color={item.isToday ? "black" : "$color12"} marginTop="$1">
                {item.date}
              </Text>
            </DayContainer>
          ))}
        </XStack>
      </ScrollView>
    </YStack>
  )
}
