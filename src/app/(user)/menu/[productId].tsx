import products from '@/assets/data/products'
import Button from '@/src/components/Button'
import Colors from '@/src/constants/Colors'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, useColorScheme } from 'react-native'
import { CartItem, PizzaSize, Product } from '../../types'
import { useCart } from '@/src/providers/CartProvider'
import { Text, View } from '@/src/components/Themed'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

const ProductDetail = () => {
    const [selectedSize, setSelectedSize] = useState('M')
    const { productId } = useLocalSearchParams()
    const product = products.find(p => p.id === parseInt(productId as string) )
    const router = useRouter()
    const colorScheme = useColorScheme()

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
        <Text style={styles.price}>${product?.price}</Text>

        <Text style={styles.selectSizeText}>Select Size</Text>

        <View style={[styles.sizeContainer, {backgroundColor: Colors[colorScheme || 'light'].background,}]} >
          {
            sizes.map((size) => (
              <Pressable onPress={() => onSelectStyle(size as PizzaSize)} 
                style={[styles.size, {backgroundColor: Colors[colorScheme || 'light'].tabIconSelected}, { 
                  backgroundColor: selectedSize === size ? Colors.light.tabIconSelected : Colors[colorScheme || 'light'].card,
                  }]}
                  key={size}
                >
                <Text style={[styles.sizeText, { 
                  color: selectedSize === size || colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,
                  }]}>{size}</Text>
              </Pressable>
            ))
          }
        </View>

        <Button text='Add to Cart' style={{ marginVertical: 30 }} onPress={addToCart}/>

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
    marginTop: 'auto',
  },

  selectSizeText: {
    marginVertical: 10,
    fontSize: 20,
    fontWeight: '600'
  },

  sizeContainer: {
    flexDirection: 'row',
    gap: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
    marginBottom: 30
  },

  size: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeText: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  }
})

export default ProductDetail