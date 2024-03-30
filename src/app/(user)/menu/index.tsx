import { FlatList, StyleSheet, View } from 'react-native';

import products from '@/assets/data/products';
import ProductListItem from '@/src/components/products/ProductListItem';
import { Redirect } from 'expo-router';

export default function TabOneScreen() {
  return <Redirect href={'/(admin)/menu'} />
  return (
    <View style={styles.container}>
      <FlatList 
        data={products}
        renderItem={({index, item}) => <ProductListItem key={index} product={item}/>}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, padding: 10 }}
        columnWrapperStyle={{ gap: 12 }}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
});
