import React from 'react'
import { Text, View } from '@/src/components/Themed'
import { Stack } from 'expo-router'

const Profile = () => {
  return (
    <View>
        <Stack.Screen options={{ title: "Profile" }} />
    </View>
  )
}

export default Profile