import { Product } from '@/src/app/types'
import Colors from '@/src/constants/Colors'
import { Link, useSegments } from 'expo-router'
import React from 'react'
import { Image, Pressable, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native'
import { Text, View } from '../Themed'

export const defaultImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

const ProductListItem = ({ product }: { product: Product }) => {
  const segments = useSegments()
  const colorScheme = useColorScheme()
  return (
    <Link href={`/${segments[0]}/menu/${product.id}` as any} asChild>
        <TouchableOpacity style={{ flex: 1, maxWidth: '50%', }}>
            <View style={[styles.container, {backgroundColor: Colors[colorScheme || 'light'].card}]}>
              <Image style={styles.image} source={{ uri: product.image || defaultImage }} resizeMode='contain' />
              <Text style={[styles.title]}>{product.name}</Text>
              <Text style={styles.price}>$ {product.price.toFixed(2)}</Text>
            </View>
        </TouchableOpacity>
    </Link>

  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      borderRadius: 8,
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