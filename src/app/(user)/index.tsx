import { Redirect } from 'expo-router'
import React from 'react'

const Home = () => {
  return (
    <Redirect href={'/(user)/menu/'} />
  )
}

export default Home