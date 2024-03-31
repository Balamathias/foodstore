import orders from '@/assets/data/orders'
import NotFound from '@/src/components/NotFound'
import { Text, View } from '@/src/components/Themed'
import OrderDetailCard from '@/src/components/orders/OrderDetailCard'
import OrderItem from '@/src/components/orders/OrderItem'
import { getOrderStatus } from '@/src/components/orders/utils'
import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { FlatList, ScrollView, StyleSheet } from 'react-native'

const OrderDetailScreen = () => {
    const { orderId } = useLocalSearchParams()
    const order = orders.find((order) => order.id.toString() === orderId)
    const statusColor = getOrderStatus(order!)
    if (!order) {
        return (
            <NotFound />
        )
    }
  return (
    <View style={styles.container}>
      <OrderDetailCard order={order} />
      <Text style={styles.det}>Order Items</Text>

      <FlatList 
        data={order.order_items}
        renderItem={({ item, index }) => <OrderItem key={index} orderItem={item} />}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, }}
      />
      <Stack.Screen options={{ title: `Order #${orderId}`, navigationBarColor: statusColor }} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        gap: 20,
    },
    det: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginVertical: 20,
    }
})

export default OrderDetailScreen