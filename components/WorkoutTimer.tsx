import { useState, useEffect, useRef } from "react"
import { YStack, XStack, Text, Button, ButtonText, Input, Label } from "tamagui"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Animated, Dimensions, TouchableWithoutFeedback, StyleSheet } from "react-native"
import * as Notifications from 'expo-notifications'

// Configurar el manejador de notificaciones fuera del componente
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

interface WorkoutTimerProps {
  defaultSeconds: number
  onTimerEnd: () => void
  onClose?: () => void
  visible: boolean
}

export function WorkoutTimer({ defaultSeconds = 60, onTimerEnd, onClose, visible }: WorkoutTimerProps) {
  const [seconds, setSeconds] = useState(defaultSeconds)
  const [isActive, setIsActive] = useState(false)
  const [customTime, setCustomTime] = useState(String(defaultSeconds))
  const [hasPermission, setHasPermission] = useState(false)

  // Animated values
  const slideAnim = useRef(new Animated.Value(-300)).current
  const fadeAnim = useRef(new Animated.Value(0)).current

  // Screen dimensions
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { height } = Dimensions.get("window")

  // Referencia para la ID de notificación
  const notificationId = useRef<string | undefined>()

  // Solicitar permisos al montar el componente
  useEffect(() => {
    async function requestPermissions() {
      const { status } = await Notifications.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    }

    requestPermissions()
  }, [])

  // Handle timer visibility changes
  useEffect(() => {
    if (visible) {
      // Show animation
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.7,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      // Hide animation
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -300,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()

      // Limpiar notificaciones al ocultar
      removeNotification()
    }
  }, [visible])

  // Función para eliminar la notificación
  const removeNotification = async () => {
    if (notificationId.current) {
      await Notifications.dismissNotificationAsync(notificationId.current)
      notificationId.current = undefined
    }
  }

  // Función para crear o actualizar la notificación
  const updateNotification = async (timeString: string) => {
    if (!hasPermission) return

    // Si hay una notificación previa, actualízala
    if (notificationId.current) {
      await Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      })
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Workout Timer",
          body: `Tiempo restante: ${timeString}`,
          autoDismiss: false,
        },
        identifier: notificationId.current,
        trigger: null, // Notificación inmediata
      })
    } else {
      // Crear nueva notificación
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Workout Timer",
          body: `Tiempo restante: ${timeString}`,
          autoDismiss: false,
        },
        trigger: null, // Notificación inmediata
      })
      notificationId.current = id
    }
  }

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isActive && seconds > 0) {
      // Formatear tiempo para mostrar
      const timeString = `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`

      // Mostrar notificación inicial
      updateNotification(timeString)

      interval = setInterval(() => {
        setSeconds((prev) => {
          const newValue = prev - 1

          if (newValue <= 0) {
            setIsActive(false)
            clearInterval(interval)
            onTimerEnd()

            // Notificación final
            updateNotification("¡Tiempo completado!")

            // Limpiar notificación después de unos segundos
            setTimeout(() => {
              removeNotification()
            }, 3000)

            return 0
          }

          // Actualizar notificación con el nuevo tiempo
          const newTimeString = `${Math.floor(newValue / 60)}:${(newValue % 60).toString().padStart(2, "0")}`
          updateNotification(newTimeString)

          return newValue
        })
      }, 1000)

      return () => {
        clearInterval(interval)
      }
    } else if (!isActive && notificationId.current) {
      // Si se pausa el temporizador, eliminar la notificación
      removeNotification()
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, seconds, hasPermission])

  // Limpiar notificaciones al desmontar
  useEffect(() => {
    return () => {
      removeNotification()
    }
  }, [])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setSeconds(Number(customTime))

    // Limpiar notificación al reiniciar
    removeNotification()
  }

  const updateCustomTime = (value: string) => {
    const numValue = Number(value)
    if (!isNaN(numValue) && numValue > 0) {
      setCustomTime(value)
      setSeconds(numValue)
    }
  }

  const handleBackdropPress = () => {
    if (onClose) {
      onClose()
    }
  }

  if (!visible) return null

  return (
    <>
      {/* Backdrop overlay */}
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />
      </TouchableWithoutFeedback>

      {/* Timer container */}
      <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]}>
        <YStack space="$2" style={{ backgroundColor: "#27262b", padding: "$4", borderRadius: 12, width: "100%" }} >
          <Text fontSize={40} fontWeight="bold" color="white" style={{ textAlign: "center" }}>
            {Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, "0")}
          </Text>

          <XStack space="$2" style={{ justifyContent: "center" }}>
            <Button
              style={{ backgroundColor: isActive ? "#ef4444" : "#22c55e", borderRadius: 8, paddingHorizontal: 20 }}
              onPress={toggleTimer}
            >
              <XStack space="$2" style={{ alignItems: "center" }} >
                <MaterialCommunityIcons name={isActive ? "pause" : "play"} size={24} color="white" />
                <ButtonText color="white">{isActive ? "Pausar" : "Iniciar"}</ButtonText>
              </XStack>
            </Button>

            <Button style={{ backgroundColor: "#4A148C", borderRadius: 8, paddingHorizontal: 20 }} onPress={resetTimer}>
              <XStack space="$2" style={{ alignItems: "center" }}>
                <MaterialCommunityIcons name="refresh" size={24} color="white" />
                <ButtonText color="white">Reiniciar</ButtonText>
              </XStack>
            </Button>
          </XStack>

          <XStack space="$2" style={{ alignItems: "center", marginTop: "$2" }} >
            <Label htmlFor="custom-time">
              <Text color="white">Tiempo de descanso (segundos):</Text>
            </Label>
            <Input
              id="custom-time"
              value={customTime}
              onChangeText={updateCustomTime}
              keyboardType="numeric"
              width={80}
              style={{ backgroundColor: "#444", borderRadius: 8, padding: 8 }}
              color="white"
            />
          </XStack>
        </YStack>
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000",
    zIndex: 10,
  },
  container: {
    position: "absolute",
    top: '5%', // Adjust this value to move the timer lower on the screen
    left: 0,
    right: 0,
    padding: 0,
    zIndex: 11,
  },
})