import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'
import Button from '../Button'
import { useRouter } from 'expo-router'

const EmptyCart = () => {
  const router = useRouter()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 23 }}>
        <FontAwesome
          name="cart-arrow-down"
          style={{ padding: 5 }}
          size={30}
        />
        <Text>Your cart is Empty!</Text>

        <Button text='Go for shopping' onPress={() => router.push('/') } />
    </View>
  )
}

export default EmptyCart