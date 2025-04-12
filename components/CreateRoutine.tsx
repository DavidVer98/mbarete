import { YStack, Input, Label, Text, styled } from 'tamagui'
import WeekDays from './WeekDays'
import { ExerciseList } from './ExerciseList'
import { ScrollView } from 'react-native'
import { useRoutineStore } from '../stores/routineStore'

const CreateRoutineCard = styled(YStack, {
  backgroundColor: '$background',
  padding: '$1',
})

export const CreateRoutine = () => {
  const { routine, setRoutine, errors } = useRoutineStore()
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <CreateRoutineCard>
        <YStack space="$1">
          <Text fontSize={24} fontWeight="bold" color="white">
            Nueva Rutina
          </Text>
          <Label htmlFor="routineName" color="white">
            <Text>Nombre de la Rutina</Text>
          </Label>
          <Input
            id="routineName"
            value={routine.name}
            onChangeText={text => setRoutine({ ...routine, name: text })}
            placeholder="Ej: Cardio Matutino"
            backgroundColor="#1E1E1E"
            // borderColor={errors.name ? "#ef4444" : "#4A148C"}
            color="white"
          />
          {errors.name && (
            <Text color="#ef4444" fontSize={12} paddingLeft="$2">
              {errors.name}
            </Text>
          )}

          <Label htmlFor="routineDescription" color="white">
            <Text>Descripción</Text>
          </Label>
          <Input
            id="routineDescription"
            value={routine.description}
            onChangeText={text => setRoutine({ ...routine, description: text })}
            placeholder="Describe tu rutina"
            multiline
            numberOfLines={3}
            backgroundColor="#1E1E1E"
            // borderColor={errors.description ? "#ef4444" : "#4A148C"}
            color="white"
          />
          {errors.description && (
            <Text color="#ef4444" fontSize={12} paddingLeft="$2">
              {errors.description}
            </Text>
          )}
          <WeekDays mode="week" />
          {errors.selectedDays && (
            <Text color="#ef4444" fontSize={12} paddingLeft="$2">
              {errors.selectedDays}
            </Text>
          )}
          <Label color="white">
            <Text>Ejercicios</Text>
          </Label>
          <ExerciseList />
          {errors.selectedExerciseIds && (
            <Text color="#ef4444" fontSize={12} paddingLeft="$2">
              {errors.selectedExerciseIds}
            </Text>
          )}
        </YStack>
      </CreateRoutineCard>
    </ScrollView>
  )
}
