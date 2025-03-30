import React, { useState } from 'react'
import { Pressable, Modal } from 'react-native'
import { useAuth } from '../hooks/AuthContext'
import { router } from 'expo-router'
import { View, Text, Stack, Theme } from 'tamagui' // Importar componentes de Tamagui

export function HeaderMenu() {
  const [menuVisible, setMenuVisible] = useState(false)
  const { logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    setMenuVisible(false)
    router.replace('/(auth)/login')
  }

  return (
    <Theme name="dark">
      <View style={{ backgroundColor: "$background" }} >
        <Pressable
          onPress={() => setMenuVisible(true)}
          style={{ padding: 8, marginRight: 0 }}
        >
          <Stack width={24} height={24} style={{ justifyContent: "space-around" }}>
            <View
              height={2}
              width="100%"
              style={{ backgroundColor: "#fff", borderRadius: 2 }}
            />
            <View
              height={2}
              width="100%"
              style={{
                backgroundColor: "#fff",
                borderRadius: 2,
              }}
            />
            <View
              height={2}
              width="100%"
              style={{
                backgroundColor: "#fff",
                borderRadius: 2,
              }}
            />
          </Stack>
        </Pressable>

        <Modal
          visible={menuVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setMenuVisible(false)}
        >
          <Pressable
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'flex-start',
            }}
            onPress={() => setMenuVisible(false)}
          >
            <View
              style={{
                backgroundColor: "$background",
                top:50,
                right: 20,
                borderRadius: 8,
                padding: 8,
                minWidth: 150,
              }}
              position="absolute"
              shadowColor="#000"
              shadowOffset={{ width: 0, height: 2 }}
              shadowOpacity={0.25}
              shadowRadius={3.84}
            // elevation={5}
            >
              <Pressable
                style={{ padding: 12, borderRadius: 4 }}
                onPress={handleLogout}
              >
                <Text color="$red10" fontSize={16}>
                  Cerrar sesión
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      </View>
    </Theme>
  )
}