
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../Contexts/AuthContext'

export default function PrivateRoute({ Component }) {
    const { isAuth}=useContext(AuthContext)

    // if (!isAuth){

    //     return (<Navigate to="/auth/login"/>) 
    // } 

    return (<Component />)
}