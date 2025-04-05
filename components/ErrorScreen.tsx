import React from 'react'
import { YStack, Text, Button } from 'tamagui'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { AlertCircle } from '@tamagui/lucide-icons'

interface ErrorScreenProps {
    onRetry: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ onRetry }) => {
    return (
        <YStack flex={1} backgroundColor="$background">
            <YStack 
                flex={1} 
                justifyContent="center" 
                alignItems="center" 
            >
                <AlertCircle size="$8" color="$red10"/>
                <YStack alignItems="center">
                    <Text 
                        color="$color" 
                        textAlign="center" 
                        fontSize="$5" 
                        fontWeight="bold"
                        marginTop="$6"
                    >
                        No pudimos cargar tus datos
                    </Text>
                    <Text 
                        color="$color" 
                        opacity={0.8} 
                        textAlign="center"
                        fontSize="$3"
                        marginTop="$1"
                    >
                        Verifica tu conexión a internet e intenta nuevamente
                    </Text>
                </YStack>
                <Button
                    mt="$6"
                    backgroundColor="$red10"
                    onPress={onRetry}
                    icon={<MaterialCommunityIcons name="refresh" size={20} color="white" />}
                >
                    <Text color="white">Reintentar</Text>
                </Button>
            </YStack>
        </YStack>
    )
}

export default ErrorScreen