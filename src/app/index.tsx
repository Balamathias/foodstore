import { Link } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import Button from '../components/Button'

const WelcomePage = () => {
  return (
    <View style={{gap: 15, flex: 1, padding: 10}}>
        <Link href={'/(admin)'} asChild>
            <Button text='Continue as Admin' />
        </Link>
        <Link href={'/(user)'} asChild>
            <Button text='Continue as User' />
        </Link>
    </View>
  )
}

export default WelcomePage