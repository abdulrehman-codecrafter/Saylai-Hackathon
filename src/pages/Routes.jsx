import React, { useContext } from 'react'
import {Route,Routes} from 'react-router-dom'
import Frontened from "./Frontened"
import Auth from "./Auth"
import Dashboard from './Dashboard'
import PrivateRoute from "./PrivateRoute"
import { AuthContext } from '../Contexts/AuthContext'


export default function Index() {
  const {isAuth}=useContext(AuthContext)
  return (
    <Routes>
      <Route path='/*' element={<Frontened />}/>
      <Route path='auth/*' element={<Auth />}/>
      <Route path='dashboard/*' element={<PrivateRoute Component={Dashboard} />}/>
    </Routes>
  )
}
