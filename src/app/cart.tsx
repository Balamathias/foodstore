import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { FlatList, Platform, Text, View } from 'react-native'
import { useCart } from '../providers/CartProvider'
import CartListItem from '../components/cart/CartListItem'
import EmptyCart from '../components/cart/EmptyCart'
import Button from '../components/Button'

const CartScreen = () => {
  const { items, total } = useCart()

  if (!items || items.length === 0) {
    return <EmptyCart />
  }
  return (
    <View style={{ padding: 10, flex: 1 }}>

      <FlatList
        data={items}
        renderItem={({ item, index }) => (
          <CartListItem
            cartItem={item}
            key={index}
          />
        )}
        contentContainerStyle={{ gap: 10 }}
      />

      <View style={{ marginTop: 'auto', gap: 12 }}>
        <Text style={{ fontSize: 23, marginVertical: 10, fontWeight: '600' }}>Total: ${total.toFixed(2)}</Text>
        <Button text='Proceed to Checkout' />
      </View>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

export default CartScreen