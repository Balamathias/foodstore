import products from '@/assets/data/products'
import Button from '@/src/components/Button'
import Colors from '@/src/constants/Colors'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'
import { CartItem, PizzaSize, Product } from '../../types'
import { useCart } from '@/src/providers/CartProvider'
import { Text, View } from '@/src/components/Themed'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

const ProductDetail = () => {
    const [selectedSize, setSelectedSize] = useState('M')
    const { productId } = useLocalSearchParams()
    const product = products.find(p => p.id === parseInt(productId as string) )
    const router = useRouter()

    const { addItem } = useCart()

    const onSelectStyle = (size: PizzaSize) => {
      setSelectedSize(size)
    }

    const addToCart = () => {
      if (!product) return null
      addItem(product as Product, selectedSize as PizzaSize)
      router.push('/cart')
    }

    if (!product) {
      return <Text style={{ textAlign: 'center', }}>Sorry, this product could not be found.</Text>
    }

  return (
    <View style={styles.container}>

        <Image source={{ uri: product?.image }} style={styles.image} />
        <Stack.Screen options={{ title: product?.name}} />
        <Text style={{marginVertical: 8}}>{product?.name}</Text>
        <Text style={styles.price}>Price: ${product?.price}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 15,
  },
})

export default ProductDetail