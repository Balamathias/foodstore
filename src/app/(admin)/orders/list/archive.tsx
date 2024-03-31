import { FlatList, StyleSheet, View } from 'react-native';

import { Stack } from 'expo-router';
import orders from '@/assets/data/orders';
import OrderListItem from '@/src/components/orders/OrderListItem';

export default function AchivedOrders() {
  return (
    <View style={styles.container}>
      <FlatList 
        data={orders}
        renderItem={({ item, index }) => <OrderListItem order={item} key={index} />}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, padding: 10 }}
      />
      {/* <Stack.Screen options={{ title: "Archived" }} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
