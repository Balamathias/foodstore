import products from '@/assets/data/products'
import Colors from '@/src/constants/Colors'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet } from 'react-native'
import { Text, View } from '@/src/components/Themed'

const ProductDetail = () => {
    const { productId } = useLocalSearchParams()
    const product = products.find(p => p.id === parseInt(productId as string) )
    const router = useRouter()

    if (!product) {
      return <Text style={{ textAlign: 'center', }}>Sorry, this product could not be found.</Text>
    }

  return (
    <ScrollView style={styles.container}>

        <Image source={{ uri: product?.image }} style={styles.image} />
        <View style={styles.listGroup}>
          <Text style={{fontWeight: 'bold'}}>Name</Text>
          <Text style={{marginVertical: 8}}>{product?.name}</Text>
        </View>
        <View style={styles.listGroup}>
          <Text style={{fontWeight: 'bold'}}>Price</Text>
          <Text style={styles.price}>Price: ${product?.price}</Text>
        </View>
        <View style={styles.listGroup}>
          <Text style={{fontWeight: 'bold'}}>Description</Text>
          <Text style={styles.desc}>{product?.description}</Text>
        </View>
        <Stack.Screen options={{ title: product?.name}} />
    </ScrollView>
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
  desc: {
    fontSize: 16,
  },
  listGroup: {
    padding: 10,
    borderRadius: 8,
  },
})

export default ProductDetail