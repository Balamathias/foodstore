import { Product } from '@/src/app/types'
import Colors from '@/src/constants/Colors'
import { Link } from 'expo-router'
import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

export const defaultImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

const ProductListItem = ({ product }: { product: Product }) => {
  return (
    <Link href={`/menu/${product.id}`} asChild>
        <Pressable style={styles.container}>
            <Image style={styles.image} source={{ uri: product.image || defaultImage }} resizeMode='contain' />
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>$ {product.price.toFixed(2)}</Text>
        </Pressable>
    </Link>

  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      borderRadius: 8,
      backgroundColor: 'white',
      maxWidth: '50%',
    },
    image: {
      width: '100%',
      aspectRatio: 2 / 2,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      marginVertical: 10,
    },
    price: {
      color: Colors.light.tint,
    },
    
  });

export default ProductListItem