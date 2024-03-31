import { StyleSheet, useColorScheme, Image, View as DefView } from 'react-native'
import React from 'react'
import Colors from '@/src/constants/Colors';
import { useCart } from '@/src/providers/CartProvider';
import type { OrderItem as OrderItemProp } from '@/src/app/types';
import { defaultImage } from '../products/ProductListItem';
import { Text, View } from '../Themed';

const OrderItem = ({ orderItem  }: {orderItem: OrderItemProp }) => {
    const { updateQuantity } = useCart();
    const colorScheme = useColorScheme()
    return (
      <View style={[styles.container, { backgroundColor: Colors[colorScheme || 'light'].card}]}>
        <Image
          source={{ uri: orderItem.products.image || defaultImage }}
          style={styles.image}
          resizeMode="contain"
        />
        <DefView style={{ flex: 1 }}>
          <Text style={styles.title}>{orderItem.products.name}</Text>
          <DefView style={styles.subtitleContainer}>
            <Text style={styles.price}>${orderItem.products.price.toFixed(2)}</Text>
            <Text>Size: {orderItem.size}</Text>
          </DefView>
        </DefView>
        <DefView style={styles.quantitySelector}>
  
          <Text style={styles.quantity}>{orderItem.quantity}</Text>
        </DefView>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      borderRadius: 10,
      flex: 1,
      padding: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      width: 75,
      aspectRatio: 1,
      alignSelf: 'center',
      marginRight: 10,
    },
    title: {
      fontWeight: '500',
      fontSize: 16,
      marginBottom: 5,
    },
    subtitleContainer: {
      flexDirection: 'row',
      gap: 5,
    },
    quantitySelector: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      marginVertical: 10,
    },
    quantity: {
      fontWeight: '500',
      fontSize: 18,
      marginRight: 4
    },
    price: {
      color: Colors.light.tint,
      fontWeight: 'bold',
    },
  });

export default OrderItem