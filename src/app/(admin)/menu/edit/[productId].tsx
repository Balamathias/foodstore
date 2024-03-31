import { Text, TextInput, View } from '@/src/components/Themed'
import { defaultImage } from '@/src/components/products/ProductListItem'
import Colors from '@/src/constants/Colors'
import React, { useState } from 'react'
import { Alert, Image, Pressable, ScrollView, StyleSheet, useColorScheme } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import Button from '@/src/components/Button'
import products from '@/assets/data/products'
import { Stack, useLocalSearchParams } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'

export default function EditProductPage() {
  const { productId } = useLocalSearchParams()
  const product = products.find(p => p.id === parseInt(productId as string) )
  const colorScheme = useColorScheme()
  const [image, setImage] = React.useState(product?.image || defaultImage)
  const [errors, setErrors] = useState<string[]>([])

  const [fields, setFields] = useState<{
    name: string,
    price: string,
    description: string,
    image: ImagePicker.ImagePickerAsset | string | null | undefined
  }>({
    name: product?.name || '',
    price: product?.price.toString() ||'',
    description: product?.description ||'',
    image: null
  })

  const resetFields = () => {
    setFields({
      name: '',
      price: '',
      description: '',
      image: null
    })
    setImage(defaultImage)
  }

  const pickImageAsync = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      allowsEditing: true
    })

    if (!res.canceled) {
      setImage(res?.assets?.[0]?.uri)
      setFields({...fields, image: res?.assets.at(0)})

    } else {
      Alert.alert('No Image selected', 'You did not select any image')
    }
  } 

  const onDelete = () => {
    // database call to delete product
  }
  
  const confirmDelete = () => {
    Alert.alert('Delete Product', 'Are you sure you want to delete this product?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'Delete', onPress: onDelete, style: 'destructive'},
    ])
  }



  const validateFields = () => {
    setErrors([])
    if (!fields.name || !fields.price || !fields.image || !fields.description) {
      setErrors(['All fields are required'])
      return
    }

    if (isNaN(parseFloat(fields.price))) {
      setErrors(['Price must be a number'])
      return
    }
  }

  const updateProduct = () => {
    validateFields()
    if (errors.length > 0) {
      alert(errors.join('\n'))
      return
    }

    console.log(fields)
    resetFields()
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Pressable onPress={pickImageAsync} style={styles.selectImg}>
          <Image 
            source={{ uri: image }} 
            style={{ width: '50%', aspectRatio: 1, borderRadius: 50 }} 
          />
          <Text style={{alignSelf: 'center', marginVertical: 5, fontWeight: 'bold',}}>Select Image</Text>
        </Pressable>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput 
            placeholder='Name' 
            style={[{color: Colors[colorScheme || 'light'].text},styles.nameInput, {
            borderColor: Colors[colorScheme || 'light'].tint,
            }]} 
            lightColor={Colors.light.card} 
            darkColor={Colors.dark.card}
            value={fields.name}
            defaultValue={product?.name}
            onChangeText={text => setFields({...fields, name: text})} 
            />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Price ($)</Text>
          <TextInput 
            onChangeText={text => setFields({...fields, price: text})} 
            lightColor={Colors.light.card} 
            darkColor={Colors.dark.card} 
            placeholder='Price' 
            value={fields.price}
            defaultValue={product?.price.toString()}
            keyboardType='numeric'
            style={[{color: Colors[colorScheme || 'light'].text},styles.nameInput, {borderColor: Colors[colorScheme || 'light'].tint,}]} 
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput 
            onChangeText={text => setFields({...fields, description: text})} 
            lightColor={Colors.light.card} 
            darkColor={Colors.dark.card} 
            placeholder='Description' 
            value={fields.description}
            defaultValue={product?.description}
            style={[{color: Colors[colorScheme || 'light'].text},styles.nameInput, {borderColor: Colors[colorScheme || 'light'].tint,}]} 
          />
        </View>

        <View style={{marginTop: 'auto'}}>
            <Button text='Update Product' onPress={updateProduct}/>
        </View>
        <Stack.Screen options={{ title: 'Update Product', headerRight: () => {
            return <MaterialIcons 
                    name='delete' size={18} 
                    color={colorScheme === 'dark' ? 'pink' : 'red'} 
                    onPress={confirmDelete} 
                    style={{marginRight: 10}} 
                />
            
        }}} />
    </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        paddingHorizontal: 20,
        gap: 20,
        paddingBottom: 50,
    },
    inputContainer: {
        gap: 4,
    },
    selectImg: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        padding: 20,
        aspectRatio: 1,
        marginBottom: 5,
    },
    nameInput: {
        padding: 10,
        borderColor: Colors.light.tint,
        marginVertical: 10,
        borderRadius: 4,
    },
    label: {
        fontWeight: '500',
    },
})
