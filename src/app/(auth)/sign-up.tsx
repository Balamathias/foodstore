import { ScrollView } from 'react-native'
import React from 'react'
import Form from './form.dual'
import { Link } from 'expo-router'
import Colors from '@/src/constants/Colors'
import { Text } from '@/src/components/Themed'

const SignUp = () => {
  return (
    <ScrollView style={{paddingVertical: 12, paddingHorizontal: 15}}>
        <Form type='sign-up' />
      <Text style={{ marginVertical: 10}}>Already have an account? <Link href={'/sign-in'} style={{color: Colors.light.tint}}>Login</Link></Text>
    </ScrollView>
  )
}

export default SignUp