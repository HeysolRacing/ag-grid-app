import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import myContext from '../../context/data/MyContext'

function Home() {
  const context = useContext(myContext)
  console.log(context)
  // Destructure 
  const name = context?.name
  console.log(name)
  return (
    <Layout>
      <h1>Name : {name}</h1>
    </Layout>
  )
}

export default Home