// import { YStack, Input, Label, Text, Card } from "tamagui"
// import WeekDays from "./WeekDays"
// import { ExerciseList } from "./ExerciseList"
// import { ScrollView } from "react-native"
// import { useRoutineStore } from "../stores/routineStore"

// export const CreateRoutine = () => {
//     const {
//         routine,
//         setRoutine,
//         errors,
//     } = useRoutineStore()

//     return (
//         <ScrollView showsVerticalScrollIndicator={false}>
//             <YStack space="$4" backgroundColor="$background">
//                 <Card backgroundColor="#27262b" padding="$3" borderRadius={16}>
//                     <YStack space="$4">
//                         <Text fontSize={24} fontWeight="bold" color="white">
//                             Nueva Rutina
//                         </Text>

//                         <YStack space="$1">
//                             <Label htmlFor="routineName" color="white">Nombre de la Rutina</Label>
//                             <Input
//                                 id="routineName"
//                                 value={routine.name}
//                                 onChangeText={(text) => setRoutine({ ...routine, name: text })}
//                                 placeholder="Ej: Cardio Matutino"
//                                 backgroundColor="#1a191d"
//                                 borderColor={errors.name ? "#ef4444" : "#4A148C"}
//                                 color="white"
//                             />
//                             {errors.name && (
//                                 <Text color="#ef4444" fontSize={12} paddingLeft="$2">
//                                     {errors.name}
//                                 </Text>
//                             )}
//                         </YStack>

//                         <YStack space="$1">
//                             <Label htmlFor="routineDescription" color="white">Descripción</Label>
//                             <Input
//                                 id="routineDescription"
//                                 value={routine.description}
//                                 onChangeText={(text) => setRoutine({ ...routine, description: text })}
//                                 placeholder="Describe tu rutina"
//                                 multiline
//                                 numberOfLines={3}
//                                 backgroundColor="#1a191d"
//                                 borderColor={errors.description ? "#ef4444" : "#4A148C"}
//                                 color="white"
//                             />
//                             {errors.description && (
//                                 <Text color="#ef4444" fontSize={12} paddingLeft="$2">
//                                     {errors.description}
//                                 </Text>
//                             )}
//                         </YStack>

//                         <YStack space="$1">
//                             <WeekDays mode="week" />
//                             {errors.selectedDays && (
//                                 <Text color="#ef4444" fontSize={12} paddingLeft="$2">
//                                     {errors.selectedDays}
//                                 </Text>
//                             )}
//                         </YStack>

//                         <YStack space="$1" height={450}>
//                             <Label color="white">Ejercicios</Label>
//                             <ExerciseList />
//                             {errors.selectedExerciseIds && (
//                                 <Text color="#ef4444" fontSize={12} paddingLeft="$2">
//                                     {errors.selectedExerciseIds}
//                                 </Text>
//                             )}
//                         </YStack>
//                     </YStack>
//                 </Card>
//             </YStack>
//         </ScrollView>
//     )
// }
