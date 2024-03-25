import { Redirect } from 'expo-router'
import React from 'react'

const Home = () => {
  return (
    <Redirect href={'/menu/'} />
  )
}

export default Home