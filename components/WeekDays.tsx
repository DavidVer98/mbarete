import React, { useMemo } from "react"
import { ScrollView, XStack, YStack, Text, styled } from "tamagui"
import { useRoutineStore } from "../stores/routineStore"

// Definición del contenedor del día con estilos
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
        background: "linear-gradient(180deg, #0ef2a3 0%, #00c4a3 100%)",
      },
      false: {
        backgroundColor: "transparent",
      },
    },
    isSelected: {
      true: {
        background: "linear-gradient(180deg, #00f2a3 0%, #00c4a3 100%)",
        borderWidth: 2,
        borderColor: "#0ef2a3",
      },
      false: {
        backgroundColor: "transparent",
      },
    },
  } as const,
})

// Componente para cada día, separado y memorizado para evitar renders innecesarios
interface DayItemProps {
  item: { day: string; date: number; isToday: boolean };
  selected: boolean;
  mode: "week" | "dates";
  onPress: () => void;
}

const DayItem: React.FC<DayItemProps> = ({ item, selected, mode, onPress }) => (
  <DayContainer
    isToday={item.isToday}
    isSelected={mode === "week" && selected}
    onPress={onPress}
    pressStyle={mode === "week" ? { opacity: 0.8, scale: 0.95 } : undefined}
  >
    <Text
      fontSize="$1"
      color={
        item.isToday
          ? "$gray11"
          : mode === "week" && selected
          ? "white"
          : "$gray11"
      }
      textTransform="uppercase"
    >
      {mode === "week" ? item.day.slice(0, 3) : item.day}
    </Text>
    {mode === "dates" && (
      <Text
        fontSize="$3"
        fontWeight="bold"
        color={item.isToday ? "black" : "$gray12"}
        marginTop="$1"
      >
        {item.date}
      </Text>
    )}
  </DayContainer>
)

const MemoizedDayItem = React.memo(DayItem)

interface WeekDaysProps {
  mode?: "week" | "dates";
  onDaysSelected?: (days: number[]) => void;
}

const WeekDays: React.FC<WeekDaysProps> = ({ mode = "dates" }) => {
  const { routine, setRoutine } = useRoutineStore()

  const handleDayPress = (dayIndex: number) => {
    if (mode !== "week") return
    const dayOfWeek = dayIndex === 6 ? 0 : dayIndex + 1
    const newSelection = routine.selectedDays.includes(dayOfWeek)
      ? routine.selectedDays.filter((d) => d !== dayOfWeek)
      : [...routine.selectedDays, dayOfWeek]

    setRoutine({ ...routine, selectedDays: newSelection })
  }

  const dates = useMemo(() => {
    if (mode === "week") {
      return [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo",
      ].map((day, index) => ({
        day,
        date: index + 1,
        isToday: ((index + 1) % 7) === new Date().getDay(),
      }))
    } else {
      const datesArray = []
      const today = new Date()
      for (let i = -3; i < 6; i++) {
        const date = new Date()
        date.setDate(today.getDate() + i)
        datesArray.push({
          day: date.toLocaleDateString("es-ES", { weekday: "short" }),
          date: date.getDate(),
          isToday: i === 0,
        })
      }
      return datesArray
    }
  }, [mode])

  return (
    <YStack space="$2" backgroundColor="$background">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 0,
          backgroundColor: "$background",
        }}
      >
        <XStack paddingVertical="$0">0
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
