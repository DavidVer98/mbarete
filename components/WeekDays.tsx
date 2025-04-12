import React, { useMemo } from 'react'
import { ScrollView, XStack, YStack, Text, styled } from 'tamagui'
import { useRoutineStore } from '../stores/routineStore'

const DayContainer = styled(YStack, {
  alignItems: 'center',
  justifyContent: 'center',
  width: 45,
  height: 60,
  borderRadius: 8,
  marginHorizontal: 4,
  backgroundColor: 'transparent',
  variants: {
    isToday: {
      true: {
        background: 'linear-gradient(180deg, #0ef2a3 0%, #00c4a3 100%)',
      },
      false: {
        backgroundColor: 'transparent',
      },
    },
    isSelected: {
      true: {
        background: 'linear-gradient(180deg, #00f2a3 0%, #00c4a3 100%)',
        borderWidth: 2,
        borderColor: '#0ef2a3',
      },
      false: {
        backgroundColor: '$background',
        borderWidth: 1,
        borderColor: '$gray6',
      },
    },
  } as const,
})

interface DayItemProps {
  item: { day: string; date: number; isToday: boolean }
  selected: boolean
  mode: 'week' | 'dates'
  onPress: () => void
}

const DayItem: React.FC<DayItemProps> = ({ item, selected, mode, onPress }) => (
  <DayContainer
    isToday={item.isToday}
    isSelected={selected}
    onPress={onPress}
    pressStyle={{ opacity: 0.8, scale: 0.95 }}
  >
    <Text fontSize={12} color={selected ? 'white' : '$gray11'} textTransform="uppercase">
      {item.day.slice(0, 3)}
    </Text>
  </DayContainer>
)

const MemoizedDayItem = React.memo(DayItem)

interface WeekDaysProps {
  mode?: 'week' | 'dates'
}

const WeekDays: React.FC<WeekDaysProps> = ({ mode = 'week' }) => {
  const { routine, setRoutine } = useRoutineStore()

  const handleDayPress = (dayIndex: number) => {
    const dayValue = dayIndex === 6 ? 0 : dayIndex + 1
    const newSelection = routine.selectedDays.includes(dayValue)
      ? routine.selectedDays.filter(d => d !== dayValue)
      : [...routine.selectedDays, dayValue]

    setRoutine({ ...routine, selectedDays: newSelection })
  }

  const dates = useMemo(() => {
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
    return days.map((day, index) => ({
      day,
      date: index + 1,
      isToday: (index + 1) % 7 === new Date().getDay(),
    }))
  }, [])

  return (
    <YStack paddingVertical="$2" paddingHorizontal="$0">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 0,
        }}
      >
        <XStack paddingVertical="$2">
          {dates.map((item, index) => {
            const dayValue = index === 6 ? 0 : index + 1
            const isSelected = routine.selectedDays.includes(dayValue)

            return (
              <MemoizedDayItem
                key={index}
                item={item}
                selected={isSelected}
                mode={mode}
                onPress={() => handleDayPress(index)}
              />
            )
          })}
        </XStack>
      </ScrollView>
    </YStack>
  )
}

export default React.memo(WeekDays)
