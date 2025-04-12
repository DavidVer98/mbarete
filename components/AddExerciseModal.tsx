import { Sheet, Button, Input, Label, YStack, Text, Select } from 'tamagui'
import { useState } from 'react'

interface AddExerciseModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddExercise: (exercise: { name: string; description: string; muscleGroup: string }) => void
}

export function AddExerciseModal({ open, onOpenChange, onAddExercise }: AddExerciseModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [muscleGroup, setMuscleGroup] = useState('')

  const handleSubmit = () => {
    if (name && description && muscleGroup) {
      onAddExercise({ name, description, muscleGroup })
      setName('')
      setDescription('')
      setMuscleGroup('')
      onOpenChange(false)
    }
  }

  return (
    <Sheet
      modal
      open={open}
      onOpenChange={onOpenChange}
      snapPoints={[50]}
      position={0}
      dismissOnSnapToBottom
    >
      <Sheet.Overlay />
      <Sheet.Frame padding="$4" backgroundColor="$background">
        <Sheet.Handle />
        <YStack space="$4">
          <Text fontSize={20} fontWeight="bold" color="$color">
            Añadir Nuevo Ejercicio
          </Text>

          <YStack space="$2">
            <Label htmlFor="name" color="$color">
              <Text>Nombre del ejercicio</Text>
            </Label>
            <Input
              id="name"
              value={name}
              onChangeText={setName}
              backgroundColor="$gray5"
              color="$color"
            />
          </YStack>

          <YStack space="$2">
            <Label htmlFor="description" color="$color">
              <Text>Descripción</Text>
            </Label>
            <Input
              id="description"
              value={description}
              onChangeText={setDescription}
              backgroundColor="$gray5"
              color="$color"
              multiline
              numberOfLines={3}
            />
          </YStack>

          <YStack>
            <Label htmlFor="muscleGroup" color="$color">
              <Text>Grupo muscular</Text>
            </Label>
            <Select id="muscleGroup" value={muscleGroup} onValueChange={setMuscleGroup}>
              <Select.Trigger backgroundColor="$gray5">
                <Select.Value placeholder="Selecciona grupo muscular" />
              </Select.Trigger>

              <Select.Content>
                <Select.ScrollUpButton />
                <Select.Viewport>
                  <Select.Group>
                    <Select.Item value="pecho" index={0}>
                      <Select.ItemText>
                        <Text>Pecho</Text>
                      </Select.ItemText>
                    </Select.Item>
                    <Select.Item value="espalda" index={1}>
                      <Select.ItemText>
                        <Text>Espalda</Text>
                      </Select.ItemText>
                    </Select.Item>
                    <Select.Item value="piernas" index={2}>
                      <Select.ItemText>
                        <Text>Piernas</Text>
                      </Select.ItemText>
                    </Select.Item>
                    <Select.Item value="hombros" index={3}>
                      <Select.ItemText>
                        <Text>Hombros</Text>
                      </Select.ItemText>
                    </Select.Item>
                    <Select.Item value="brazos" index={4}>
                      <Select.ItemText>
                        <Text>Brazos</Text>
                      </Select.ItemText>
                    </Select.Item>
                  </Select.Group>
                </Select.Viewport>
                <Select.ScrollDownButton />
              </Select.Content>
            </Select>
          </YStack>

          <Button
            onPress={handleSubmit}
            backgroundColor="$purple8"
            color="white"
            disabled={!name || !description || !muscleGroup}
          >
            <Text>Añadir Ejercicio</Text>
          </Button>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  )
}
