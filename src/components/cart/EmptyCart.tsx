import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { useColorScheme } from 'react-native'
import Button from '../Button'
import { useRouter } from 'expo-router'
import Colors from '@/src/constants/Colors'
import { Text, View } from '../Themed'

const EmptyCart = () => {
  const router = useRouter()
  const colorScheme = useColorScheme()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 23 }}>
        <FontAwesome
          name="cart-arrow-down"
          style={{ padding: 5 }}
          size={30}
        />
        <Text style={{color: Colors[colorScheme || 'light'].text}}>Your cart is Empty!</Text>

        <Button text='Go for shopping' onPress={() => router.push('/') } />
    </View>
  )
}

export default EmptyCart