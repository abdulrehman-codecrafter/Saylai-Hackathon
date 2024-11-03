import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "./Home"
import About from "./About"
import Shop from "./Menu"
import Cart from './Cart'
import { doc, setDoc } from 'firebase/firestore'
import { firestore } from '../../config/firebase'
import Orders from './Orders'




export default function Frontened() {
  

  
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='menu' element={<Shop />} />
      <Route path='cart' element={<Cart />} />
      <Route path='orders' element={<Orders />} />


    </Routes>
  )
}
