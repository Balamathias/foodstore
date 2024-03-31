import React from 'react'
import { Text, View } from '../Themed'
import { Pressable, StyleSheet, useColorScheme } from 'react-native'
import Colors from '@/src/constants/Colors'
import { Order } from '@/src/app/types'
import dayjs from 'dayjs'
import { Link, useRouter } from 'expo-router'
import { getOrderStatus } from './utils'

const OrderListItem = ({ order }: { order: Order }) => {
    const colorScheme = useColorScheme()
    const formattedDate = dayjs(order.created_at).format('DD/MM/YYYY')
    const router = useRouter()

    const statusColor = getOrderStatus(order)

  return (
    <Pressable 
        style={[styles.container, {backgroundColor: Colors[colorScheme || 'light'].card}]}
        onPress={() => router.push(`/orders/${order.id}`)}
    >
        <View style={[styles._container, {backgroundColor: Colors[colorScheme || 'light'].card}]}>
            <Text style={styles.orderName}>Order #{order.id}</Text>
            <Text style={styles.orderDate}>{formattedDate}</Text> 
        </View>
        <View style={[styles.orderStatus, { backgroundColor: statusColor }]}>
            <Text>{order.status}</Text>
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        gap: 5,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    _container: {
        flex: 1,
        flexDirection: 'column',
        gap: 5,
    },
    orderName: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 10,
    },
    orderDate: {
        color: Colors.light.tabIconDefault,
    },
    orderStatus: {
        backgroundColor: Colors.light.tint,
        marginTop: 5,
        borderRadius: 20,
        height: 26,
        width: 64,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default OrderListItem