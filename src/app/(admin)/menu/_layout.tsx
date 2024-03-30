import Colors from '@/src/constants/Colors'
import { MaterialIcons } from '@expo/vector-icons'
import { Link, Stack } from 'expo-router'
import React from 'react'
import { Pressable } from 'react-native'

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ 
          title: "Menu",
          headerRight: () => (
            <Link href="/(admin)/menu/create" asChild>
              <Pressable>
                {({ pressed }) => (
                  <MaterialIcons
                    name="add"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }} />

      <Stack.Screen name='[productId]' options={{ 
          headerRight: () => (
            <Link href={`/(admin)/menu/edit/${9}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <MaterialIcons
                    name="edit"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }} />
    </Stack>
  )
}

export default Layout