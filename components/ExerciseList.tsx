// import { useState, useEffect } from "react"
// import { YStack, XStack, Button, Input, Text, Card, ScrollView, styled, ButtonText, Checkbox } from "tamagui"
// import { Ionicons } from '@expo/vector-icons'
// import { exerciseApi } from '../api/exercise'
// import { useRoutineStore } from '../stores/routineStore'

// const CategoryButton = styled(Button, {
//     borderRadius: 20,
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     marginHorizontal: 4,
//     variants: {
//         state: {
//             active: {
//                 backgroundColor: "#7B1FA2",
//             },
//             inactive: {
//                 backgroundColor: "transparent",
//                 borderWidth: 1,
//                 borderColor: "#4A148C",
//             },
//         },
//     },
// })

// const categories = [
//     { id: 'all', name: 'Todos' },
//     { id: 'pecho', name: 'Pecho' },
//     { id: 'espalda', name: 'Espalda' },
//     { id: 'piernas', name: 'Piernas' },
//     { id: 'brazos', name: 'Brazos' },
//     { id: 'abdomen', name: 'Abdomen' },
//     { id: 'hombros', name: 'Hombros' },
// ]

// interface Exercise {
//     id: number;
//     name: string;
//     description: string;
//     muscles: {
//         id: number;
//         name: string;
//     };
// }

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// interface ExerciseListProps {
//     onExercisesSelected: (exercises: Exercise[]) => void;
// }

// export const ExerciseList = () => {
//     const [searchQuery, setSearchQuery] = useState("")
//     const [exercises, setExercises] = useState<Exercise[]>([])
//     const [selectedCategory, setSelectedCategory] = useState("all")
//     const [isLoading, setIsLoading] = useState(true)

//     const { routine, setRoutine } = useRoutineStore()

//     useEffect(() => {
//         async function fetchExercises() {
//             setIsLoading(true)
//             try {
//                 const data = await exerciseApi.getExcercises()
//                 const transformed = data.map(ex => ({
//                     id: ex.id,
//                     name: ex.name,
//                     description: ex.description,
//                     muscles: ex.muscleGroup,
//                 }))
//                 setExercises(transformed)
//             } catch (error) {
//                 console.error("Error fetching exercises:", error)
//             } finally {
//                 setIsLoading(false)
//             }
//         }
//         fetchExercises()
//     }, [])

//     const handleExerciseToggle = (exercise: Exercise) => {
//         const isSelected = routine.selectedExerciseIds.includes(exercise.id)
//         let newExerciseIds
//         if (isSelected) {
//             newExerciseIds = routine.selectedExerciseIds.filter(e => e !== exercise.id)
//         } else {
//             newExerciseIds = [...routine.selectedExerciseIds, exercise.id]
//         }
//         setRoutine({ ...routine, selectedExerciseIds: newExerciseIds })
//     }

//     const filteredExercises = exercises.filter(exercise => {
//         const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
//         if (selectedCategory === "all") return matchesSearch
//         return matchesSearch && exercise.muscles.name.toLowerCase() === selectedCategory.toLowerCase()
//     })

//     return (
//         <YStack style={{ height: '100%' }}>
//             {/* Barra de búsqueda */}
//             <XStack
//                 alignItems="center"
//                 backgroundColor="#1E1E1E"
//                 borderColor="#4A148C"
//                 borderWidth={1}
//                 borderRadius={20}
//                 padding={12}
//                 height={56}
//             >
//                 <Ionicons name="search" size={24} color="#9CA3AF" style={{ marginRight: 12 }} />
//                 <Input
//                     value={searchQuery}
//                     onChangeText={setSearchQuery}
//                     placeholder="Buscar ejercicios..."
//                     backgroundColor="transparent"
//                     color="white"
//                     borderWidth={0}
//                     fontSize={16}
//                     placeholderTextColor="#9CA3AF"
//                     flex={1}
//                 />
//             </XStack>

//             {/* Categorías horizontales */}
//             <XStack height={70} padding="$2">
//                 <ScrollView
//                     horizontal
//                     showsHorizontalScrollIndicator={false}
//                     padding={4}
//                 >
//                     {categories.map((category) => (
//                         <CategoryButton
//                             key={category.id}
//                             state={selectedCategory === category.id ? "active" : "inactive"}
//                             onPress={() => setSelectedCategory(category.id)}
//                             marginHorizontal={4}
//                         >
//                             <XStack space="$2" alignItems="center">
//                                 <ButtonText
//                                     color={selectedCategory === category.id ? "white" : "#9CA3AF"}
//                                     fontSize={14}
//                                     fontWeight="600"
//                                 >
//                                     {category.name}
//                                 </ButtonText>
//                             </XStack>
//                         </CategoryButton>
//                     ))}
//                 </ScrollView>
//             </XStack>

//             {/* Lista de ejercicios con scroll */}
//             <ScrollView
//                 style={{ flex: 2 }}
//                 showsVerticalScrollIndicator={true}
//                 nestedScrollEnabled={true}
//             >
//                 <YStack space="$3" padding="$2">
//                     {isLoading ? (
//                         <Text color="white" fontSize={16} textAlign="center">Cargando ejercicios...</Text>
//                     ) : filteredExercises.length === 0 ? (
//                         <Text color="white" fontSize={16} textAlign="center">No se encontraron ejercicios</Text>
//                     ) : (
//                         filteredExercises.map((exercise) => (
//                             <Card
//                                 key={exercise.id}
//                                 backgroundColor="#1E1E1E"
//                                 borderRadius={16}
//                                 padding="$4"
//                             >
//                                 <XStack alignItems="center" justifyContent="space-between">
//                                     <YStack flex={1} space="$1">
//                                         <Text color="white" fontSize={18} fontWeight="bold">
//                                             {exercise.name}
//                                         </Text>
//                                         <Text color="#9CA3AF" fontSize={14}>
//                                             {exercise.muscles.name}
//                                         </Text>
//                                     </YStack>
//                                     <Checkbox
//                                         checked={routine.selectedExerciseIds.includes(exercise.id)}
//                                         onCheckedChange={() => handleExerciseToggle(exercise)}
//                                         backgroundColor={routine.selectedExerciseIds.includes(exercise.id) ? "#7B1FA2" : "#1E1E1E"}
//                                         borderRadius={8}
//                                         size="$5"
//                                     />
//                                 </XStack>
//                             </Card>
//                         ))
//                     )}
//                 </YStack>
//             </ScrollView>
//         </YStack>
//     )
// }