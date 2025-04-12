import { Dialog, Adapt, Sheet, Button, Text, XStack, YStack } from 'tamagui'
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  onConfirm: () => void
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog modal open={open} onOpenChange={onOpenChange}>
      <Adapt when="sm" platform="touch">
        <Sheet animation="quick" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$4">
            <YStack space="$2" alignItems="center">
              <MaterialCommunityIcons name="alert-circle-outline" size={32} color="#ef4444" />
              <Text fontSize={18} fontWeight="bold" color="$color">
                {title}
              </Text>
              <Text fontSize={14} color="#9CA3AF" textAlign="center">
                {description}
              </Text>
            </YStack>
            <XStack space="$4" justifyContent="center">
              <Button
                onPress={() => onOpenChange(false)}
                backgroundColor="$gray5"
                pressStyle={{ opacity: 0.8 }}
                borderRadius={8}
                paddingHorizontal={20}
              >
                <Text color="$color">Cancelar</Text>
              </Button>
              <Button
                onPress={() => {
                  onConfirm()
                  onOpenChange(false)
                }}
                backgroundColor="#ef4444"
                pressStyle={{ opacity: 0.8 }}
                borderRadius={8}
                paddingHorizontal={20}
              >
                <Text color="white">Eliminar</Text>
              </Button>
            </XStack>
          </Sheet.Frame>
          <Sheet.Overlay />
        </Sheet>
      </Adapt>
    </Dialog>
  )
}
