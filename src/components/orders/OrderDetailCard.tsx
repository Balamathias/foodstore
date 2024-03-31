import { useColorScheme, StyleSheet } from 'react-native'
import React from 'react'
import { Order } from '@/src/app/types'
import dayjs from 'dayjs'
import { getOrderStatus } from './utils'
import { Text, View } from '../Themed'
import Colors from '@/src/constants/Colors'

const OrderDetailCard = ({ order }: { order: Order }) => {
    const colorScheme = useColorScheme()
    const formattedDate = dayjs(order.created_at).format('DD/MM/YYYY')
    const statusColor = getOrderStatus(order)
  return (
    <View 
        style={[styles.container, {backgroundColor: Colors[colorScheme || 'light'].card}]}
    >
        <View style={[styles._container, {backgroundColor: Colors[colorScheme || 'light'].card}]}>
            <Text style={styles.orderName}>Order #{order.id}</Text>
            <Text style={styles.orderDate}>{formattedDate}</Text> 
        </View>
        <View style={[styles.orderStatus, { backgroundColor: statusColor }]}>
            <Text>{order.status}</Text>
        </View>
    </View>
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

export default OrderDetailCard