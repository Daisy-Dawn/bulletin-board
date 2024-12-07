import React from 'react'
import "./RootLayout.css"
import { Outlet } from 'react-router-dom'
import Header from '../Components/Header/Header'
import { Footer } from '../Components/Footer/Footer'

const RootLayout = () => {
  return (
    <main>
        <Header />
        <Outlet />
        <Footer />
    </main>
  )
}

export default RootLayout