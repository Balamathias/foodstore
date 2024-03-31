import { Text, View } from '@/src/components/Themed'
import Colors from '@/src/constants/Colors'
import { useAuth } from '@/src/providers/AuthProvider'
import { Link } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  const { user } = useAuth()
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome {user?.email}</Text>
      <Link href={'/(admin)/menu'} asChild>
        <Text style={styles.sty}>Proceed to Menu</Text>
      </Link>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
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
  sty: {
    color: Colors.light.pending,
  },

})

export default Home