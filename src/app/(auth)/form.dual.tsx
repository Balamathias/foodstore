import { Text, TextInput, View } from '@/src/components/Themed'
import Colors from '@/src/constants/Colors'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, StyleSheet, useColorScheme } from 'react-native'
import Button from '@/src/components/Button'
import { Link, Stack } from 'expo-router'
import type { Form } from '@/src/@types'
import { useSignIn, useSignUp } from '@/src/lib/react-query'
import { supabase } from '@/src/lib/supabase'

export default function Form({ type }: {type: Form }) {
  const colorScheme = useColorScheme()
  const [errors, setErrors] = useState<string[]>([])

  const labelText = type === 'sign-in' ? 'Sign In' : 'Sign Up'

  const { mutate: signIn, isPending: signingIn, error: _signInError } = useSignIn()
  const { mutate: signUp, isPending: signingUp, error: _signUpError } = useSignUp()

  const [fields, setFields] = useState<{
    email: string,
    password: string,
  }>({
    email: '',
    password: '',
  })

  const resetFields = () => {
    setFields({
      email: '',
      password: '',
    })
  }



  const validateFields = () => {
        setErrors([])
        if (!fields.email || !fields.password) {
            setErrors(['All fields are required'])
            return
        }
    }

  const handleSubmit = async () => {
    validateFields()
    if (errors.length > 0) {
      alert(errors.join('\n'))
      return
    }

    if (type === 'sign-in') {
      signIn({
        email: fields.email,
        password: fields.password,
      }, {
        onError: (error) => Alert.alert('Error', error.message)
      })
    } else {
      signUp({
        email: fields.email,
        password: fields.password
      }, {
        onError: (error) => Alert.alert('Error', error.message)
      })
    }
    resetFields()
  }

  return (
    <View style={styles.container}>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput 
            placeholder='Email' 
            style={[{color: Colors[colorScheme || 'light'].text},styles.nameInput, {
            borderColor: Colors[colorScheme || 'light'].tint,
            }]} 
            lightColor={Colors.light.card} 
            darkColor={Colors.dark.card}
            value={fields.email}
            onChangeText={text => setFields({...fields, email: text})} 
            />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput 
            onChangeText={text => setFields({...fields, password: text})} 
            lightColor={Colors.light.card} 
            darkColor={Colors.dark.card}
            passwordRules={'required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8'} 
            placeholder='Password' 
            value={fields.password}
            placeholderTextColor={Colors[colorScheme || 'light'].text}
            secureTextEntry={true}
            style={[{color: Colors[colorScheme || 'light'].text},styles.nameInput, {borderColor: Colors[colorScheme || 'light'].tint,}]} 
          />
        </View>

        <View style={{marginTop: 'auto'}}>
          {
            signingIn || signingUp ? <ActivityIndicator style={{borderColor: Colors.light.pending}} />: (
              <Button text={labelText} onPress={handleSubmit}/>
            )
          }
        </View>

        <Stack.Screen options={{ title: labelText, headerRight: () => {
            return <Link href={`/${type === 'sign-in' ? 'sign-up': 'sign-in'}`}>
                <Text style={{color: Colors.light.tint}}>{type === 'sign-in' ? 'Sign Up' : 'Sign In'}</Text>
            </Link>
            
        }}} />
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        justifyContent: 'center',
        marginVertical: 'auto'
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
