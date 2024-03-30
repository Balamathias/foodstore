import { View, Text } from 'react-native'
import React from 'react'
import products from '@/assets/data/products'
import { Stack, useLocalSearchParams } from 'expo-router'

export default function EditProductPage() {
  const { productId } = useLocalSearchParams()
  const product = products.find(p => p.id === parseInt(productId as string) )
  return (
    <View>
        <Text>{product?.name}</Text>
      <Text>EditProductPage</Text>
       <Stack.Screen options={{ title: product?.name}} />
    </View>
  )
}