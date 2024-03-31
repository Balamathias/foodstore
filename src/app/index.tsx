import { Link, Redirect } from 'expo-router'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import Button from '../components/Button'
import { useAuth } from '../providers/AuthProvider'
import Colors from '../constants/Colors'
import { signOut } from '../lib/supabase/auth'

const WelcomePage = () => {
    const { session, isPending } = useAuth()
    if (isPending) return <ActivityIndicator style={{borderColor: Colors.light.pending}} />
    if (!session) return <Redirect href={'/(auth)/sign-in'} />
  return (
    <View style={{gap: 15, flex: 1, padding: 10}}>
        <Link href={'/(admin)'} asChild>
            <Button text='Continue as Admin' />
        </Link>
        <Link href={'/(user)'} asChild>
            <Button text='Continue as User' />
        </Link>
        <Link href={'/(auth)/sign-in'} asChild>
            <Button text='Sign In' />
        </Link>
        <Link href={'/(auth)/sign-up'} asChild>
            <Button text='Sign Up' />
        </Link>
        <Button text='Sign Out' onPress={ async () => await signOut()} />
    </View>
  )
}

export default WelcomePage