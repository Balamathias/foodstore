import { ScrollView } from 'react-native'
import React from 'react'
import Form from './form.dual'
import { Link } from 'expo-router'
import Colors from '@/src/constants/Colors'
import { Text, View } from '@/src/components/Themed'

const SignUp = () => {
  return (
    <ScrollView style={{paddingVertical: 12, paddingHorizontal: 15, marginVertical: 'auto'}}>
        <View style={{justifyContent: 'center', flex: 1}}>
          <Form type='sign-in' />
          <Text style={{ marginVertical: 10}}>Don&#39;t have an account yet? <Link href={'/sign-up'} style={{color: Colors.light.tint}}>Create an Account</Link></Text>
        </View>
    </ScrollView>
  )
}

export default SignUp