import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@/src/providers/AuthProvider'

const Layout = () => {
  const { session } = useAuth()

  if (session) return <Redirect href={'/'} />
  
  return (
    <Stack />
  )
}

export default Layout